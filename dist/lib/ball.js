"use strict";
/*
 * @Desc: Ball
 * @Author: Eleven
 * @Date: 2020-07-24 15:12:45
 * @Last Modified by: Eleven
 * @Last Modified time: 2020-07-26 01:51:40
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Ball = /** @class */ (function () {
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
    function Ball(_a) {
        var ctx = _a.ctx, img = _a.img, imgSrc = _a.imgSrc, bgColor = _a.bgColor, x = _a.x, y = _a.y, r = _a.r, velX = _a.velX, velY = _a.velY, speedMin = _a.speedMin, speedMax = _a.speedMax;
        this.ctx = ctx; // 画板
        this.img = img;
        this.imgSrc = imgSrc;
        this.bgColor = bgColor;
        this.x = x;
        this.y = y;
        this.r = r;
        this.velX = velX;
        this.velY = velY;
        this.speedMin = speedMin;
        this.speedMax = speedMax;
        this.isLoading = false;
    }
    /**
     * 绘制小球
     *  - 即使图片非圆形也可以
     */
    Ball.prototype.draw = function () {
        var _this = this;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        if (!!this.bgColor && typeof this.bgColor === 'string') {
            this.ctx.fillStyle = this.bgColor;
            this.ctx.fill();
        }
        this.ctx.clip();
        if (!this.img && !!this.imgSrc && typeof this.imgSrc === 'string') {
            var img_1 = new Image();
            if (/^data:/.test(this.imgSrc)) {
                // 使用 base64 编码
                img_1.src = this.imgSrc;
                this.img = img_1;
            }
            else if (!this.isLoading) {
                this.isLoading = true;
                // 使用 http 链接加载
                img_1.onload = function () {
                    _this.img = img_1;
                    _this.isLoading = false;
                };
                img_1.src = this.imgSrc;
            }
        }
        this.img &&
            this.img instanceof Image &&
            this.ctx.drawImage(this.img, this.x - this.r, this.y - this.r, 2 * this.r, 2 * this.r);
        this.ctx.restore();
    };
    /**
     * 检测撞击
     * @param balls 画布上所有小球
     */
    Ball.prototype.detect = function (balls) {
        var _this = this;
        return balls.map(function (ball) {
            if (_this !== ball) {
                // 判断与其它小球的碰撞距离（排除自身）
                var dxv = _this.x + _this.velX - (ball.x + ball.velX);
                var dyv = _this.y + _this.velY - (ball.y + ball.velY);
                var distance = Math.sqrt(dxv * dxv + dyv * dyv);
                if (distance <= _this.r + ball.r) {
                    // 距离小于两个小球的圆心距离，反弹
                    var dvx = _this.velX - ball.velX;
                    var dvy = _this.velY - ball.velY;
                    var dx = _this.x - ball.x;
                    var dy = _this.y - ball.y;
                    var xx_yy = dx * dx + dy * dy;
                    var v_dvx = (dvx * dx * dx + dvy * dx * dy) / xx_yy;
                    var v_dvy = (dvy * dy * dy + dvx * dx * dy) / xx_yy;
                    _this.velX = _this._checkSpeed(_this.velX - v_dvx);
                    _this.velY = _this._checkSpeed(_this.velY - v_dvy);
                    ball.velX = _this._checkSpeed(ball.velX + v_dvx);
                    ball.velY = _this._checkSpeed(ball.velY + v_dvy);
                }
            }
            return ball;
        });
    };
    /**
     * 更新位移
     */
    Ball.prototype.update = function () {
        var canvas = this.ctx.canvas;
        var rect = canvas.getBoundingClientRect();
        if (this.x + this.r >= rect.width) {
            this.velX = -this.velX;
        }
        if (this.x - this.r <= 0) {
            this.velX = -this.velX;
        }
        if (this.y + this.r >= rect.height) {
            this.velY = -this.velY;
        }
        if (this.y - this.r <= 0) {
            this.velY = -this.velY;
        }
        this.x += this.velX;
        this.y += this.velY;
    };
    /**
     * 控制运动速度
     * @param speed 位移速度
     */
    Ball.prototype._checkSpeed = function (speed) {
        if (speed > this.speedMax) {
            speed = this.speedMax;
        }
        else if (speed < this.speedMin) {
            speed = this.speedMin;
        }
        return speed;
    };
    return Ball;
}());
exports.default = Ball;
//# sourceMappingURL=ball.js.map