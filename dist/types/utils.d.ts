export declare const isIOS: boolean;
export declare const isAndroid: boolean;
export declare const isWinPhone: boolean;
export declare const isMobile: boolean;
/**
 * 创建绘图
 *  - 移动端保持高清：https://www.html5rocks.com/en/tutorials/canvas/hidpi/
 */
export declare function setupCanvas(canvas: HTMLCanvasElement): CanvasRenderingContext2D;
export declare function random(min: number, max: number): number;
export declare function randomRgba(): string;
export declare const resizeEvent: string;
