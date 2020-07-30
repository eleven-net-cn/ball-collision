"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeEvent = exports.randomRgba = exports.random = exports.setupCanvas = exports.isMobile = exports.isWinPhone = exports.isAndroid = exports.isIOS = void 0;
var ua = window.navigator.userAgent;
exports.isIOS = /(ipad|iphone|ipod)/i.test(ua);
exports.isAndroid = /android/i.test(ua);
exports.isWinPhone = /windows phone/i.test(ua);
exports.isMobile = exports.isIOS || exports.isAndroid || exports.isWinPhone;
/**
 * 创建绘图
 *  - 移动端保持高清：https://www.html5rocks.com/en/tutorials/canvas/hidpi/
 */
function setupCanvas(canvas) {
    if (!canvas) {
        throw new Error('not valid canvas element');
    }
    var ctx = canvas.getContext('2d');
    var dpr = window.devicePixelRatio || 1;
    var rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx && ctx.scale(dpr, dpr);
    return ctx;
}
exports.setupCanvas = setupCanvas;
function random(min, max) {
    return Math.floor(Math.random() * (max - min) * 100) / 100 + min;
}
exports.random = random;
function randomRgba() {
    return "rgb(" + random(0, 255) + ", " + random(0, 255) + ", " + random(0, 255) + ")";
}
exports.randomRgba = randomRgba;
exports.resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';
//# sourceMappingURL=utils.js.map