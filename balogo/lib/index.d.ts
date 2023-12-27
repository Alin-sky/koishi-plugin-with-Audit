import { Context, Schema } from 'koishi';
import { BALogoConfig } from './types';
export declare const name = "ba-logo";
export declare const using: readonly ["puppeteer"];
export declare const usage = "\n# \u501F\uFF08chao\uFF09\u9274\u81EA[ba-logo](https://github.com/SaarChaffee/koishi-plugin-ba-logo)\n";
export interface Config {
    process: {
        method: {
            id: number;
            APIKey: string;
            SKey: string;
            url: string;
        };
    };
    returns: string;
}
export declare const Config: Schema<BALogoConfig>;
export declare function apply(ctx: Context, config: Config): Promise<void>;
