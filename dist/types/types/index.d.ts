/**
 * Collision 初始化配置【docEl、designWidth 是自动处理页面尺寸适配的关键参数】
 *  - canvas 画板 HTMLElement
 *  - balls 指定的小球集合，允许单独指定配置
 *  - speedMin 最小位移速度，单位：px，默认：-2
 *  - speedMax 最大位移速度，单位：px，默认：2
 *  - bgColor canvas 画布背景颜色，默认：'transparent' 透明（合法的颜色值或 'random'）
 *  - docEl 页面节点（或可以视作页面实际承载容器的节点），默认：document.documentElement
 *  - designWidth 设计稿的宽度，默认：375（balls 中配置的小球尺寸，应当与此处的设计稿宽度匹配）
 *  - scaleInPC PC端是否动缩放，默认：true，即在移动端和 PC 端都会自动缩放，如果 PC 端不需要缩放可以配置为 false 关闭
 */
export interface CollisionConfig {
    canvas: HTMLCanvasElement | any;
    balls: BallSetting[];
    speedMin?: number;
    speedMax?: number;
    bgColor?: string;
    docEl?: HTMLElement | any;
    designWidth?: number;
    scaleInPC?: boolean;
}
/**
 * 小球初始配置
 *  - x 圆心 x 坐标
 *  - y 圆心 y 坐标
 *  - r 小球半径
 *  - img 小球对应图片（Image）
 *  - imgSrc 小球对应图片的 src（BASE64或 http 链接）
 *  - bgColor 小球背景色（合法的颜色值或 'random'）
 *  - velX 水平位移速度
 *  - velY 垂直位移速度
 *  - speedMin 最小位移速度
 *  - speedMax 最大位移速度
 */
export interface BallSetting {
    x: number;
    y: number;
    r: number;
    img?: HTMLImageElement;
    imgSrc?: string;
    bgColor?: string;
    velX?: number;
    velY?: number;
    speedMin?: number;
    speedMax?: number;
}
/**
 * 小球
 *  - ctx canvas 绘图 context
 *  - x 圆心 x 坐标
 *  - y 圆心 y 坐标
 *  - r 小球半径
 *  - img 小球对应图片（Image）
 *  - imgSrc 小球对应图片的 src（BASE64或 http 链接）
 *  - velX 水平位移速度
 *  - velY 垂直位移速度
 *  - speedMin 最小位移速度
 *  - speedMax 最大位移速度
 *  - bgColor 小球背景色（合法的颜色值或 'random'）
 */
export interface BallConfig {
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    r: number;
    velX: number;
    velY: number;
    speedMin: number;
    speedMax: number;
    img?: HTMLImageElement;
    imgSrc?: string;
    bgColor?: string;
}
