"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apply = exports.Config = exports.usage = exports.using = exports.name = void 0;
const path_1 = __importDefault(require("path"));
const koishi_1 = require("koishi");
exports.name = 'ba-logo';
const logger = new koishi_1.Logger('ba-logo');
exports.using = ['puppeteer'];
exports.usage = `
# 借（chao）鉴自[ba-logo](https://github.com/SaarChaffee/koishi-plugin-ba-logo)
`;
exports.Config = koishi_1.Schema.object({
    process: koishi_1.Schema.object({
        method: koishi_1.Schema.union([
            koishi_1.Schema.object({
                id: koishi_1.Schema.string().required().description('APP ID'),
                APIKey: koishi_1.Schema.string().required().description('API Key'),
                SKey: koishi_1.Schema.string().required().description('Secret Key')
            }).description('百度审核'),
            koishi_1.Schema.object({
                url: koishi_1.Schema.string().required().description('自定义后端的url(未完工)')
            }).description('自定义后端')
        ])
    }).description('审核配置'),
    returns: koishi_1.Schema.string().default('输入内容可能有问题(◎﹏◎)').description('不合规的返回内容'),
    fontSize: koishi_1.Schema.number().default(84),
    transparent: koishi_1.Schema.boolean().default(false),
    haloX: koishi_1.Schema.number().default(-18),
    haloY: koishi_1.Schema.number().default(0)
});
function normalize(...file) {
    return path_1.default.posix.normalize(path_1.default.resolve(...file));
}
async function validator(texts, session) {
    const results = [];
    for (const text of texts) {
        if (text === null || text === undefined || text === '') {
            results.push({ result: 'invalid', msg: '输入不完整' });
            return results;
        }
        if (text.includes(' ')) {
            results.push({ result: 'text', msg: text });
            continue;
        }
        const t = koishi_1.h.parse(text)[0];
        switch (t.type) {
            case 'at': {
                results.push({ result: 'at', msg: (await session.bot.getGuildMember(session.channelId, t.attrs.id)).user.name });
                break;
            }
            case 'text': {
                results.push({ result: 'text', msg: t.attrs.content });
                break;
            }
            default: {
                results.push({ result: 'invalid', msg: '输入无效' });
                return results;
            }
        }
    }
    return results;
}
const baiduapi = 'https://aip.baidubce.com/rest/2.0/solution/v1/text_censor/v2/user_defined';
const baidu_token_url = 'https://aip.baidubce.com/oauth/2.0/token';
async function apply(ctx, config) {
    const id = config.process.method.id;
    const apikey = config.process.method.APIKey;
    const skey = config.process.method.SKey;
    const url = config.process.method.url;
    const user_out_mess = config.returns;
    var token = '';
    async function tokens() {
        const grant = 'grant_type=client_credentials';
        const tokenurl = `${baidu_token_url}?${grant}&client_id=${apikey}&client_secret=${skey}`;
        try {
            const out1 = await ctx.http.get(tokenurl);
            console.log(out1.access_token);
            token = out1.access_token;
            return token;
        }
        catch (error) {
            logger.info(error);
        }
    }
    await tokens();
    async function process_baidu(text) {
        const params = {
            text: text
        };
        const accessToken = token;
        const urls = `${baiduapi}?access_token=${accessToken}`;
        const configs = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        const post = await ctx.http.post(urls, params, configs)
            .catch(error => {
            logger.info('请求失败:', error);
        });
        if (post.conclusion == '不合规') {
            logger.info('内容不合规');
            logger.info(post);
        }
        return post.conclusion;
    }
    ctx.i18n.define('zh', require('./locales/zh-CN'));
    ctx.i18n.define('en', require('./locales/en-US'));
    ctx.i18n.define('jp', require('./locales/ja-JP'));
    ctx
        .command('balogo <textL:string> <textR:string>')
        .option('fontSize', '-f <font:number>')
        .option('transparent', '-t')
        .option('haloX', '-x <x:number>')
        .option('haloY', '-y <y:number>')
        .action(async ({ session, options }, textL, textR) => {
        const text = textL + textR;
        //审核
        const process_out = await process_baidu(text);
        console.log(process_out);
        if (process_out == '不合规') {
            return user_out_mess;
        }
        //
        const results = await validator([textL, textR], session);
        if (results.some(r => r.result === 'invalid')) {
            return session.text(results.find(r => r.result === 'invalid').msg);
        }
        else {
            const page = await session.app.puppeteer.browser.newPage();
            await page.goto(`file:///${normalize(__dirname, '../public/index.html')}`, { waitUntil: 'networkidle0' });
            await page.evaluate(async (inputs, config) => {
                const ba = new BALogo(config);
                await ba.draw(inputs);
            }, { textL: results[0].msg, textR: results[1].msg }, { options, config: ctx.config });
            const canvas = await page.$('#output');
            const im = await canvas.screenshot({ type: 'png', omitBackground: true });
            await session.send(koishi_1.h.image(im, 'image/png'));
            await page.close();
        }
    });
}
exports.apply = apply;
