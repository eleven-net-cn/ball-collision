import { BallConfig } from './types';
declare class Ball {
    private img?;
    private imgSrc?;
    private bgColor?;
    private x;
    private y;
    private r;
    private velX;
    private velY;
    private isLoading;
    private readonly ctx;
    private readonly speedMin;
    private readonly speedMax;
    /**
     * @param ctx canvas 绘图 context
     * @param img 小球对应图片（Image）
     * @param imgSrc 小球对应图片的 src（BASE64或 http 链接）
     * @param bgColor 小球背景色
     * @param x 圆心 x 坐标
     * @param y 圆心 y 坐标
     * @param r 小球半径
     * @param velX 水平位移速度
     * @param velY 垂直位移速度
     * @param speedMin 最小位移速度
     * @param speedMax 最大位移速度
     */
    constructor({ ctx, img, imgSrc, bgColor, x, y, r, velX, velY, speedMin, speedMax }: BallConfig);
    /**
     * 绘制小球
     *  - 即使图片非圆形也可以
     */
    draw(): void;
    /**
     * 检测撞击
     * @param balls 画布上所有小球
     */
    detect(balls: Ball[]): Ball[];
    /**
     * 更新位移
     */
    update(): void;
    /**
     * 控制运动速度
     * @param speed 位移速度
     */
    private _checkSpeed;
}
export default Ball;
