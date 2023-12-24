import { type Context, Schema } from 'koishi';
export declare const name = "xibao";
export declare const using: readonly ["puppeteer"];
export declare const usage = "\n# \u501F\uFF08chao\uFF09\u9274\u81EA[@ifrank/xibao](https://github.com/ifrvn/cecilia#readme)\n\u52A0\u4E86\u5BA1\u6838\u7CFB\u7EDF\n";
interface StyleConfig {
    fontFamily: string;
    maxFontSize: number;
    minFontSize: number;
    offsetWidth: number;
}
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
    xibao: StyleConfig;
    beibao: StyleConfig;
    advanced: {
        importCSS: string;
        custom: string;
    };
}
export declare const Config: Schema<Schemastery.ObjectS<{
    readonly process: Schema<Schemastery.ObjectS<{
        readonly method: Schema<Schemastery.ObjectS<{
            readonly id: Schema<string, string>;
            readonly APIKey: Schema<string, string>;
            readonly SKey: Schema<string, string>;
        }> | Schemastery.ObjectS<{
            readonly url: Schema<string, string>;
        }>, Schemastery.ObjectT<{
            readonly id: Schema<string, string>;
            readonly APIKey: Schema<string, string>;
            readonly SKey: Schema<string, string>;
        }> | Schemastery.ObjectT<{
            readonly url: Schema<string, string>;
        }>>;
    }>, Schemastery.ObjectT<{
        readonly method: Schema<Schemastery.ObjectS<{
            readonly id: Schema<string, string>;
            readonly APIKey: Schema<string, string>;
            readonly SKey: Schema<string, string>;
        }> | Schemastery.ObjectS<{
            readonly url: Schema<string, string>;
        }>, Schemastery.ObjectT<{
            readonly id: Schema<string, string>;
            readonly APIKey: Schema<string, string>;
            readonly SKey: Schema<string, string>;
        }> | Schemastery.ObjectT<{
            readonly url: Schema<string, string>;
        }>>;
    }>>;
    readonly returns: Schema<string, string>;
    readonly xibao: Schema<Schemastery.ObjectS<{
        readonly fontFamily: Schema<string, string>;
        readonly maxFontSize: Schema<number, number>;
        readonly minFontSize: Schema<number, number>;
        readonly offsetWidth: Schema<number, number>;
    }>, Schemastery.ObjectT<{
        readonly fontFamily: Schema<string, string>;
        readonly maxFontSize: Schema<number, number>;
        readonly minFontSize: Schema<number, number>;
        readonly offsetWidth: Schema<number, number>;
    }>>;
    readonly beibao: Schema<Schemastery.ObjectS<{
        readonly fontFamily: Schema<string, string>;
        readonly maxFontSize: Schema<number, number>;
        readonly minFontSize: Schema<number, number>;
        readonly offsetWidth: Schema<number, number>;
    }>, Schemastery.ObjectT<{
        readonly fontFamily: Schema<string, string>;
        readonly maxFontSize: Schema<number, number>;
        readonly minFontSize: Schema<number, number>;
        readonly offsetWidth: Schema<number, number>;
    }>>;
    readonly advanced: Schema<Schemastery.ObjectS<{
        readonly importCSS: Schema<"https://gitee.com/ifrank/harmonyos-fonts/raw/main/css/harmonyos_sans_sc.css" | "https://raw.githubusercontent.com/ifrvn/harmonyos-fonts/main/css/harmonyos_sans_sc.css" | Schemastery.ObjectS<{
            readonly custom: Schema<string, string>;
        }>, "https://gitee.com/ifrank/harmonyos-fonts/raw/main/css/harmonyos_sans_sc.css" | "https://raw.githubusercontent.com/ifrvn/harmonyos-fonts/main/css/harmonyos_sans_sc.css" | Schemastery.ObjectT<{
            readonly custom: Schema<string, string>;
        }>>;
    }>, Schemastery.ObjectT<{
        readonly importCSS: Schema<"https://gitee.com/ifrank/harmonyos-fonts/raw/main/css/harmonyos_sans_sc.css" | "https://raw.githubusercontent.com/ifrvn/harmonyos-fonts/main/css/harmonyos_sans_sc.css" | Schemastery.ObjectS<{
            readonly custom: Schema<string, string>;
        }>, "https://gitee.com/ifrank/harmonyos-fonts/raw/main/css/harmonyos_sans_sc.css" | "https://raw.githubusercontent.com/ifrvn/harmonyos-fonts/main/css/harmonyos_sans_sc.css" | Schemastery.ObjectT<{
            readonly custom: Schema<string, string>;
        }>>;
    }>>;
}>, Schemastery.ObjectT<{
    readonly process: Schema<Schemastery.ObjectS<{
        readonly method: Schema<Schemastery.ObjectS<{
            readonly id: Schema<string, string>;
            readonly APIKey: Schema<string, string>;
            readonly SKey: Schema<string, string>;
        }> | Schemastery.ObjectS<{
            readonly url: Schema<string, string>;
        }>, Schemastery.ObjectT<{
            readonly id: Schema<string, string>;
            readonly APIKey: Schema<string, string>;
            readonly SKey: Schema<string, string>;
        }> | Schemastery.ObjectT<{
            readonly url: Schema<string, string>;
        }>>;
    }>, Schemastery.ObjectT<{
        readonly method: Schema<Schemastery.ObjectS<{
            readonly id: Schema<string, string>;
            readonly APIKey: Schema<string, string>;
            readonly SKey: Schema<string, string>;
        }> | Schemastery.ObjectS<{
            readonly url: Schema<string, string>;
        }>, Schemastery.ObjectT<{
            readonly id: Schema<string, string>;
            readonly APIKey: Schema<string, string>;
            readonly SKey: Schema<string, string>;
        }> | Schemastery.ObjectT<{
            readonly url: Schema<string, string>;
        }>>;
    }>>;
    readonly returns: Schema<string, string>;
    readonly xibao: Schema<Schemastery.ObjectS<{
        readonly fontFamily: Schema<string, string>;
        readonly maxFontSize: Schema<number, number>;
        readonly minFontSize: Schema<number, number>;
        readonly offsetWidth: Schema<number, number>;
    }>, Schemastery.ObjectT<{
        readonly fontFamily: Schema<string, string>;
        readonly maxFontSize: Schema<number, number>;
        readonly minFontSize: Schema<number, number>;
        readonly offsetWidth: Schema<number, number>;
    }>>;
    readonly beibao: Schema<Schemastery.ObjectS<{
        readonly fontFamily: Schema<string, string>;
        readonly maxFontSize: Schema<number, number>;
        readonly minFontSize: Schema<number, number>;
        readonly offsetWidth: Schema<number, number>;
    }>, Schemastery.ObjectT<{
        readonly fontFamily: Schema<string, string>;
        readonly maxFontSize: Schema<number, number>;
        readonly minFontSize: Schema<number, number>;
        readonly offsetWidth: Schema<number, number>;
    }>>;
    readonly advanced: Schema<Schemastery.ObjectS<{
        readonly importCSS: Schema<"https://gitee.com/ifrank/harmonyos-fonts/raw/main/css/harmonyos_sans_sc.css" | "https://raw.githubusercontent.com/ifrvn/harmonyos-fonts/main/css/harmonyos_sans_sc.css" | Schemastery.ObjectS<{
            readonly custom: Schema<string, string>;
        }>, "https://gitee.com/ifrank/harmonyos-fonts/raw/main/css/harmonyos_sans_sc.css" | "https://raw.githubusercontent.com/ifrvn/harmonyos-fonts/main/css/harmonyos_sans_sc.css" | Schemastery.ObjectT<{
            readonly custom: Schema<string, string>;
        }>>;
    }>, Schemastery.ObjectT<{
        readonly importCSS: Schema<"https://gitee.com/ifrank/harmonyos-fonts/raw/main/css/harmonyos_sans_sc.css" | "https://raw.githubusercontent.com/ifrvn/harmonyos-fonts/main/css/harmonyos_sans_sc.css" | Schemastery.ObjectS<{
            readonly custom: Schema<string, string>;
        }>, "https://gitee.com/ifrank/harmonyos-fonts/raw/main/css/harmonyos_sans_sc.css" | "https://raw.githubusercontent.com/ifrvn/harmonyos-fonts/main/css/harmonyos_sans_sc.css" | Schemastery.ObjectT<{
            readonly custom: Schema<string, string>;
        }>>;
    }>>;
}>>;
export declare function apply(ctx: Context, config: Config): Promise<void>;
export {};
