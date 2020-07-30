"use strict";
/*
 * @Desc: 小球撞击动画 —— canvas
 * @Author: Eleven
 * @Date: 2020-07-24 15:04:41
 * @Last Modified by: Eleven
 * @Last Modified time: 2020-07-31 00:33:50
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Ball_1 = require("./Ball");
var lodash_debounce_1 = require("lodash.debounce");
var utils_1 = require("./utils");
var Collision = /** @class */ (function () {
    /**
     * @param canvas 画板 HTMLElement
     * @param balls 指定的小球集合，允许单独指定配置
     * @param speedMin 最小位移速度，单位：px，默认：-2
     * @param speedMax 最大位移速度，单位：px，默认：2
     * @param bgColor canvas 画布背景颜色，默认：'transparent' 透明
     * @param docEl 页面节点（或可以视作页面实际承载容器的节点），默认：document.documentElement
     * @param designWidth 设计稿的宽度，默认：375（balls 中配置的小球尺寸，应当与此处的设计稿宽度匹配）
     * @param scaleInPC PC端是否自动缩放，默认：true，即移动端和 PC 端统一都自动缩放
     */
    function Collision(_a) {
        var _this = this;
        var canvas = _a.canvas, _b = _a.balls, balls = _b === void 0 ? [] : _b, _c = _a.speedMin, speedMin = _c === void 0 ? -2 : _c, _d = _a.speedMax, speedMax = _d === void 0 ? 2 : _d, _e = _a.bgColor, bgColor = _e === void 0 ? 'transparent' : _e, _f = _a.docEl, docEl = _f === void 0 ? document.documentElement : _f, _g = _a.designWidth, designWidth = _g === void 0 ? 375 : _g, _h = _a.scaleInPC, scaleInPC = _h === void 0 ? true : _h;
        this.balls = [];
        /**
         * 开始运动
         */
        this._run = function () {
            if (!_this.ctx) {
                throw new Error('not valid ctx');
            }
            // 清空画板
            _this.ctx.clearRect(0, 0, _this.rectCanvas.width, _this.rectCanvas.height);
            // 绘制背景
            _this.ctx.fillStyle = _this.bgColor;
            _this.ctx.fillRect(0, 0, _this.rectCanvas.width, _this.rectCanvas.height);
            _this.balls.map(function (ball) {
                ball.draw();
                _this.balls = ball.detect(_this.balls);
                ball.update();
            });
            _this.raf = window.requestAnimationFrame(_this._run);
        };
        this._onResize = lodash_debounce_1.default(function () {
            _this.destroy();
            _this._init();
        }, 150, { maxWait: 1000 });
        if (!canvas) {
            throw new Error('not valid canvas element');
        }
        this.canvas = canvas;
        this.speedMin = speedMin;
        this.speedMax = speedMax;
        this.bgColor = bgColor === 'random' ? utils_1.randomRgba() : bgColor;
        this.ballsSetting = balls;
        this.docEl = docEl;
        this.designWidth = designWidth;
        this.scaleInPC = scaleInPC;
        this._init();
    }
    /**
     * 初始化
     */
    Collision.prototype._init = function () {
        this.rectCanvas = this.canvas.getBoundingClientRect();
        // 创建小球
        this._create();
        // 启动，初始速度随机
        this._run();
        // 绑定事件
        this._bindEvents();
    };
    /**
     * 创建 ctx、balls
     *  - 自动处理不同屏幕计算适配
     */
    Collision.prototype._create = function () {
        var _this = this;
        var docWidth = this.docEl.clientWidth; // 页面可视区域的宽度（或实际的页面最大宽度）
        // 相对设计稿的缩放倍率（PC 端可配置参数不进行缩放）
        var rateScale = !this.scaleInPC && !utils_1.isMobile ? 1 : docWidth / this.designWidth;
        // 小球半径、圆心坐标，各种尺寸屏幕缩放适配
        var ballsComputed = this.ballsSetting.map(function (ball) {
            return __assign(__assign({}, ball), {
                r: ball.r * rateScale,
                x: ball.x * rateScale,
                y: ball.y * rateScale
            });
        });
        this.ctx = utils_1.setupCanvas(this.canvas);
        this.balls = ballsComputed.map(function (_a) {
            var x = _a.x, y = _a.y, r = _a.r, velX = _a.velX, velY = _a.velY, img = _a.img, imgSrc = _a.imgSrc, bgColor = _a.bgColor, speedMin = _a.speedMin, speedMax = _a.speedMax;
            return new Ball_1.default({
                ctx: _this.ctx,
                x: x,
                y: y,
                r: r,
                img: img,
                imgSrc: imgSrc,
                bgColor: bgColor === 'random' ? utils_1.randomRgba() : bgColor,
                velX: velX || utils_1.random(speedMin || _this.speedMin, speedMax || _this.speedMax),
                velY: velY || utils_1.random(speedMin || _this.speedMin, speedMax || _this.speedMax),
                speedMin: speedMin || _this.speedMin,
                speedMax: speedMax || _this.speedMax // 允许设置单个小球的最大速度
            });
        });
    };
    Collision.prototype._bindEvents = function () {
        window.addEventListener(utils_1.resizeEvent, this._onResize, false);
    };
    /**
     * 销毁 animation frame
     */
    Collision.prototype.destroy = function () {
        var rect = this.canvas.getBoundingClientRect();
        window.removeEventListener(utils_1.resizeEvent, this._onResize, false);
        window.cancelAnimationFrame(this.raf);
        this.ctx.clearRect(0, 0, rect.width, rect.height);
    };
    return Collision;
}());
exports.default = Collision;
//# sourceMappingURL=collision.js.map