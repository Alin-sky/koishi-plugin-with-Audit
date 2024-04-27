import { readFileSync } from 'fs'
import path from 'path'
import { type Context, Schema, Logger } from 'koishi'
import { } from 'koishi-plugin-puppeteer'
import outdent from 'outdent'
import querystring from 'querystring';

export const name = 'xibao'
export const using = ['puppeteer'] as const

export const usage = `
# 借（chao）鉴自[@ifrank/xibao](https://github.com/ifrvn/cecilia#readme)
加了审核系统
`

interface StyleConfig {
  fontFamily: string
  maxFontSize: number
  minFontSize: number
  offsetWidth: number
}
export interface Config {
  process: {
    method: {
      id: number
      APIKey: string
      SKey: string
      url: string
    }
  }
  returns: string
  xibao: StyleConfig
  beibao: StyleConfig
  advanced: {
    importCSS: string,
    custom: string
  }
}

export const Config = Schema.object({
  process:
    Schema.object({
      method: Schema.union([
        Schema.object({
          id: Schema.string().required().description('APP ID'),
          APIKey: Schema.string().required().description('API Key'),
          SKey: Schema.string().required().description('Secret Key')
        }).description('百度审核'),
        Schema.object({
          url: Schema.string().required().description('自定义后端的url(未完工)')
        }).description('自定义后端')
      ])
    }).description('审核配置'),
  returns: Schema.string().default('输入内容可能有问题(◎﹏◎)').description('不合规的返回内容'),

  xibao: Schema.object({
    fontFamily: Schema.string().default('"HarmonyOS Sans SC", "Source Han Sans CN", sans-serif')
      .description('字体（参照 CSS 中的 [font-family](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-family) ）'),
    maxFontSize: Schema.number().min(1).default(80).description('最大字体大小（px）'),
    minFontSize: Schema.number().min(1).default(38).description('最小字体大小（px）'),
    offsetWidth: Schema.number().min(1).default(900)
      .description('单行最大宽度（px），任意一行文本达到此宽度后会缩小字体以尽可能不超出此宽度，直到字体大小等于`minFontSize`'),
  }).description('喜报配置'),
  beibao: Schema.object({
    fontFamily: Schema.string().default('"HarmonyOS Sans SC", "Source Han Sans CN", sans-serif')
      .description('字体（参照 CSS 中的 [font-family](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-family) ）'),
    maxFontSize: Schema.number().min(1).default(90).description('最大字体大小（px）'),
    minFontSize: Schema.number().min(1).default(38).description('最小字体大小（px）'),
    offsetWidth: Schema.number().min(1).default(900)
      .description('单行最大宽度（px），任意一行文本达到此宽度后会缩小字体以尽可能不超出此宽度，直到字体大小等于`minFontSize`'),
  }).description('悲报配置'),

  advanced:
    Schema.object({
      importCSS: Schema.union([
        Schema.const('https://gitee.com/ifrank/harmonyos-fonts/raw/main/css/harmonyos_sans_sc.css').description('国内源（Gitee）'),
        Schema.const('https://raw.githubusercontent.com/ifrvn/harmonyos-fonts/main/css/harmonyos_sans_sc.css').description('国外源（GitHub）'),
        Schema.object({
          custom: Schema.string().role('textarea')
            .default('https://ghproxy.com/https://raw.githubusercontent.com/ifrvn/harmonyos-fonts/main/css/harmonyos_sans_sc.css')
            .description('自定义外部 CSS 地址')
        }).description('自定义')
      ]).description('导入外部 CSS 样式，可用于自定义字体等。')
        .default('https://gitee.com/ifrank/harmonyos-fonts/raw/main/css/harmonyos_sans_sc.css'),
    }).description('高级配置'),
})




const baiduapi = 'https://aip.baidubce.com/rest/2.0/solution/v1/text_censor/v2/user_defined'
const baidu_token_url = 'https://aip.baidubce.com/oauth/2.0/token'



export async function apply(ctx: Context, config: Config) {
  const log1 = "@alintec/koishi-plugin-xibao"
  const logger: Logger = new Logger(log1)
  const id = config.process.method.id
  const apikey = config.process.method.APIKey
  const skey = config.process.method.SKey
  const url = config.process.method.url
  const user_out_mess = config.returns
  var token = ''

  async function tokens() {
    const grant = 'grant_type=client_credentials'
    const tokenurl = `${baidu_token_url}?${grant}&client_id=${apikey}&client_secret=${skey}`
    try {
      const out1 = await ctx.http.get(tokenurl)
      console.log(out1.access_token)
      token = out1.access_token
      return token
    } catch (error) { logger.info(error) }
  }
  await tokens()
  
  async function process_baidu(text: string): Promise<string> {
    const accessToken = token
    const urls = `${baiduapi}?access_token=${accessToken}`;
    const configs = {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    // 使用 URLSearchParams 格式化数据
    const data = new URLSearchParams();
    data.append('text', text);
    const post = await ctx.http.post(urls, data, configs);
    console.log(await post)
    if (post.conclusion == '不合规') {
      logger.info('内容不合规')
      logger.info(post)
    }
    return post.conclusion
  }


  ctx.command('喜报 <text:text>', '生成一张喜报')
    .usage('喜报 要在喜报上写的内容，支持换行')
    .example('喜报 这可以喜')
    .action(async (_, text) => {
      if (!text) return '请在指令空格后输入内容，具体使用方式请查看帮助信息'
      //审核
      const process_out = await process_baidu(text)
      console.log(process_out)
      if (process_out == '不合规') {
        return user_out_mess
      }
      //
      const img = readFileSync(path.resolve(__dirname, './xibao.jpg'))
      return await ctx.puppeteer.render(
        html({
          text,
          fontFamily: config.xibao.fontFamily,
          fontColor: '#ff0a0a',
          strokeColor: '#ffde00',
          maxFontSize: config.xibao.maxFontSize,
          minFontSize: config.xibao.minFontSize,
          offsetWidth: config.xibao.offsetWidth,
          img,
          importCSS: config.advanced.importCSS === 'custom' ? config.advanced.custom : config.advanced.importCSS
        })
      )
    })

  ctx.command('悲报 <text:text>', '生成一张悲报')
    .usage('悲报 要在悲报上写的内容，支持换行')
    .example('悲报 这不可以喜')
    .action(async (_, text) => {
      if (!text) return '请在指令空格后输入内容，具体使用方式请查看帮助信息'
      //审核
      const process_out = await process_baidu(text)
      console.log(process_out)
      if (process_out == '不合规') {
        return user_out_mess
      }
      //
      const img = readFileSync(path.resolve(__dirname, './beibao.jpg'))
      return await ctx.puppeteer.render(
        html({
          text,
          fontFamily: config.beibao.fontFamily,
          fontColor: '#000500',
          strokeColor: '#c6c6c6',
          maxFontSize: config.beibao.maxFontSize,
          minFontSize: config.beibao.minFontSize,
          offsetWidth: config.beibao.offsetWidth,
          img,
          importCSS: config.advanced.importCSS === 'custom' ? config.advanced.custom : config.advanced.importCSS
        })
      )
    })
}

function html(params: {
  text: string,
  fontFamily: string,
  fontColor: string,
  strokeColor: string,
  maxFontSize: number,
  minFontSize: number,
  offsetWidth: number,
  img: Buffer,
  importCSS: string
}) {
  return outdent`
  <head>
    <style>
      @import url('${params.importCSS}');
      body {
        width: 960px;
        height: 768px;
        padding: 0 32;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        margin: 0;
        font-weight: 900;
        font-family: ${params.fontFamily};
        color: ${params.fontColor};
        -webkit-text-stroke: 2.5px ${params.strokeColor};
        background-image: url(data:image/png;base64,${params.img.toString('base64')});
        background-repeat: no-repeat;
      }
    </style>
  </head>
  <body>
    <div>${params.text.replaceAll('\n', '<br/>')}</div>
  </body>
  <script>
    const dom = document.querySelector('body')
    const div = dom.querySelector('div')
    let fontSize = ${params.maxFontSize}
    dom.style.fontSize = fontSize + 'px'
    while (div.offsetWidth >= ${params.offsetWidth} && fontSize > ${params.minFontSize}) {
      dom.style.fontSize = --fontSize + 'px'
    }
  </script>`
}