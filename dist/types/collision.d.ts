import { CollisionConfig } from './types';
declare class Collision {
    private ctx?;
    private raf?;
    private balls;
    private rectCanvas;
    private docElWidth;
    private readonly canvas;
    private readonly speedMin;
    private readonly speedMax;
    private readonly bgColor;
    private readonly ballsSetting;
    private readonly docEl;
    private readonly designWidth;
    private readonly scaleInPC;
    private readonly resetOnResize;
    private readonly resetOnlyWidth;
    /**
     * @param canvas 画板 HTMLElement
     * @param balls 指定的小球集合，允许单独指定配置
     * @param speedMin 最小位移速度，单位：px，默认：-2
     * @param speedMax 最大位移速度，单位：px，默认：2
     * @param bgColor canvas 画布背景颜色，默认：'transparent' 透明
     * @param docEl 页面节点（或可以视作页面实际承载容器的节点），默认：document.documentElement
     * @param designWidth 设计稿的宽度，默认：375（balls 中配置的小球尺寸，应当与此处的设计稿宽度匹配）
     * @param scaleInPC PC端是否自动缩放，默认：true，即移动端和 PC 端统一都自动缩放
     * @param resetOnResize 浏览器 resize 或移动端 orientationchange 事件触发时，是否重置画布，默认：true
     * @param resetOnlyWidth 浏览器 resize 或移动端 orientationchange 事件触发时，仅宽度有变化时，才会 reset，默认：true
     */
    constructor({ canvas, balls, speedMin, speedMax, bgColor, docEl, designWidth, scaleInPC, resetOnResize, resetOnlyWidth }: CollisionConfig);
    /**
     * 初始化
     */
    private _init;
    /**
     * 创建 ctx、balls
     *  - 自动处理不同屏幕计算适配
     */
    private _create;
    /**
     * 开始运动
     */
    private _run;
    private _bindEvents;
    private _onResize;
    /**
     * 销毁 animation frame
     */
    destroy(): void;
}
export default Collision;
