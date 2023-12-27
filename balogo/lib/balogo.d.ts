import { Inputs, BALogoConstructor } from './types';
export declare class BALogo {
    private graphOffset;
    private paddingX;
    private horizontalTilt;
    private textBaseLine;
    private fontSize;
    private canvasHeight;
    private canvasWidth;
    private canvasWidthL;
    private canvasWidthR;
    private textWidthL;
    private textWidthR;
    private textMetricsL;
    private textMetricsR;
    private transparentBg;
    private font;
    private fontFamily;
    private hollowPath;
    constructor({ options, config }: BALogoConstructor);
    loadFonts(text: string): Promise<void>;
    draw({ textL, textR }: Inputs): Promise<void>;
}
