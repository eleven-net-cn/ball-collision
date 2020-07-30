(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.BallCollision = factory());
}(this, (function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    /*
     * @Desc: Ball
     * @Author: Eleven
     * @Date: 2020-07-24 15:12:45
     * @Last Modified by: Eleven
     * @Last Modified time: 2020-07-26 01:51:40
     */
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

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    /**
     * lodash (Custom Build) <https://lodash.com/>
     * Build: `lodash modularize exports="npm" -o ./`
     * Copyright jQuery Foundation and other contributors <https://jquery.org/>
     * Released under MIT license <https://lodash.com/license>
     * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
     * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     */

    /** Used as the `TypeError` message for "Functions" methods. */
    var FUNC_ERROR_TEXT = 'Expected a function';

    /** Used as references for various `Number` constants. */
    var NAN = 0 / 0;

    /** `Object#toString` result references. */
    var symbolTag = '[object Symbol]';

    /** Used to match leading and trailing whitespace. */
    var reTrim = /^\s+|\s+$/g;

    /** Used to detect bad signed hexadecimal string values. */
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

    /** Used to detect binary string values. */
    var reIsBinary = /^0b[01]+$/i;

    /** Used to detect octal string values. */
    var reIsOctal = /^0o[0-7]+$/i;

    /** Built-in method references without a dependency on `root`. */
    var freeParseInt = parseInt;

    /** Detect free variable `global` from Node.js. */
    var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

    /** Detect free variable `self`. */
    var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

    /** Used as a reference to the global object. */
    var root = freeGlobal || freeSelf || Function('return this')();

    /** Used for built-in method references. */
    var objectProto = Object.prototype;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var objectToString = objectProto.toString;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeMax = Math.max,
        nativeMin = Math.min;

    /**
     * Gets the timestamp of the number of milliseconds that have elapsed since
     * the Unix epoch (1 January 1970 00:00:00 UTC).
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Date
     * @returns {number} Returns the timestamp.
     * @example
     *
     * _.defer(function(stamp) {
     *   console.log(_.now() - stamp);
     * }, _.now());
     * // => Logs the number of milliseconds it took for the deferred invocation.
     */
    var now = function() {
      return root.Date.now();
    };

    /**
     * Creates a debounced function that delays invoking `func` until after `wait`
     * milliseconds have elapsed since the last time the debounced function was
     * invoked. The debounced function comes with a `cancel` method to cancel
     * delayed `func` invocations and a `flush` method to immediately invoke them.
     * Provide `options` to indicate whether `func` should be invoked on the
     * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
     * with the last arguments provided to the debounced function. Subsequent
     * calls to the debounced function return the result of the last `func`
     * invocation.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is
     * invoked on the trailing edge of the timeout only if the debounced function
     * is invoked more than once during the `wait` timeout.
     *
     * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
     * until to the next tick, similar to `setTimeout` with a timeout of `0`.
     *
     * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
     * for details over the differences between `_.debounce` and `_.throttle`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to debounce.
     * @param {number} [wait=0] The number of milliseconds to delay.
     * @param {Object} [options={}] The options object.
     * @param {boolean} [options.leading=false]
     *  Specify invoking on the leading edge of the timeout.
     * @param {number} [options.maxWait]
     *  The maximum time `func` is allowed to be delayed before it's invoked.
     * @param {boolean} [options.trailing=true]
     *  Specify invoking on the trailing edge of the timeout.
     * @returns {Function} Returns the new debounced function.
     * @example
     *
     * // Avoid costly calculations while the window size is in flux.
     * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
     *
     * // Invoke `sendMail` when clicked, debouncing subsequent calls.
     * jQuery(element).on('click', _.debounce(sendMail, 300, {
     *   'leading': true,
     *   'trailing': false
     * }));
     *
     * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
     * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
     * var source = new EventSource('/stream');
     * jQuery(source).on('message', debounced);
     *
     * // Cancel the trailing debounced invocation.
     * jQuery(window).on('popstate', debounced.cancel);
     */
    function debounce(func, wait, options) {
      var lastArgs,
          lastThis,
          maxWait,
          result,
          timerId,
          lastCallTime,
          lastInvokeTime = 0,
          leading = false,
          maxing = false,
          trailing = true;

      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      wait = toNumber(wait) || 0;
      if (isObject(options)) {
        leading = !!options.leading;
        maxing = 'maxWait' in options;
        maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
      }

      function invokeFunc(time) {
        var args = lastArgs,
            thisArg = lastThis;

        lastArgs = lastThis = undefined;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
      }

      function leadingEdge(time) {
        // Reset any `maxWait` timer.
        lastInvokeTime = time;
        // Start the timer for the trailing edge.
        timerId = setTimeout(timerExpired, wait);
        // Invoke the leading edge.
        return leading ? invokeFunc(time) : result;
      }

      function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime,
            result = wait - timeSinceLastCall;

        return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
      }

      function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime;

        // Either this is the first call, activity has stopped and we're at the
        // trailing edge, the system time has gone backwards and we're treating
        // it as the trailing edge, or we've hit the `maxWait` limit.
        return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
          (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
      }

      function timerExpired() {
        var time = now();
        if (shouldInvoke(time)) {
          return trailingEdge(time);
        }
        // Restart the timer.
        timerId = setTimeout(timerExpired, remainingWait(time));
      }

      function trailingEdge(time) {
        timerId = undefined;

        // Only invoke if we have `lastArgs` which means `func` has been
        // debounced at least once.
        if (trailing && lastArgs) {
          return invokeFunc(time);
        }
        lastArgs = lastThis = undefined;
        return result;
      }

      function cancel() {
        if (timerId !== undefined) {
          clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = undefined;
      }

      function flush() {
        return timerId === undefined ? result : trailingEdge(now());
      }

      function debounced() {
        var time = now(),
            isInvoking = shouldInvoke(time);

        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;

        if (isInvoking) {
          if (timerId === undefined) {
            return leadingEdge(lastCallTime);
          }
          if (maxing) {
            // Handle invocations in a tight loop.
            timerId = setTimeout(timerExpired, wait);
            return invokeFunc(lastCallTime);
          }
        }
        if (timerId === undefined) {
          timerId = setTimeout(timerExpired, wait);
        }
        return result;
      }
      debounced.cancel = cancel;
      debounced.flush = flush;
      return debounced;
    }

    /**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == 'object' || type == 'function');
    }

    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike(value) {
      return !!value && typeof value == 'object';
    }

    /**
     * Checks if `value` is classified as a `Symbol` primitive or object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
     * @example
     *
     * _.isSymbol(Symbol.iterator);
     * // => true
     *
     * _.isSymbol('abc');
     * // => false
     */
    function isSymbol(value) {
      return typeof value == 'symbol' ||
        (isObjectLike(value) && objectToString.call(value) == symbolTag);
    }

    /**
     * Converts `value` to a number.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to process.
     * @returns {number} Returns the number.
     * @example
     *
     * _.toNumber(3.2);
     * // => 3.2
     *
     * _.toNumber(Number.MIN_VALUE);
     * // => 5e-324
     *
     * _.toNumber(Infinity);
     * // => Infinity
     *
     * _.toNumber('3.2');
     * // => 3.2
     */
    function toNumber(value) {
      if (typeof value == 'number') {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
        value = isObject(other) ? (other + '') : other;
      }
      if (typeof value != 'string') {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, '');
      var isBinary = reIsBinary.test(value);
      return (isBinary || reIsOctal.test(value))
        ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
        : (reIsBadHex.test(value) ? NAN : +value);
    }

    var lodash_debounce = debounce;

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
    /**
     * 随机数
     */
    function random(min, max) {
        return Math.floor(Math.random() * (max - min) * 100) / 100 + min;
    }
    /**
     * 随机颜色
     */
    function randomRgba() {
        return "rgb(" + random(0, 255) + ", " + random(0, 255) + ", " + random(0, 255) + ")";
    }
    var resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';

    /*
     * @Desc: 小球撞击动画 —— canvas
     * @Author: Eleven
     * @Date: 2020-07-24 15:04:41
     * @Last Modified by: Eleven
     * @Last Modified time: 2020-07-30 17:58:19
     */
    var Collision = /** @class */ (function () {
        /**
         * @param canvas 画板 HTMLElement
         * @param balls 指定的小球集合，允许单独指定配置
         * @param speedMin 最小位移速度，单位：px，默认：-2
         * @param speedMax 最大位移速度，单位：px，默认：2
         * @param bgColor canvas 画布背景颜色，默认：'transparent' 透明
         * @param docEl 页面节点（或可以视作页面实际承载容器的节点），默认：document.documentElement
         * @param designWidth 设计稿的宽度，默认：375（balls 中配置的小球尺寸，应当与此处的设计稿宽度匹配）
         */
        function Collision(_a) {
            var _this = this;
            var canvas = _a.canvas, _b = _a.balls, balls = _b === void 0 ? [] : _b, _c = _a.speedMin, speedMin = _c === void 0 ? -2 : _c, _d = _a.speedMax, speedMax = _d === void 0 ? 2 : _d, _e = _a.bgColor, bgColor = _e === void 0 ? 'transparent' : _e, _f = _a.docEl, docEl = _f === void 0 ? document.documentElement : _f, _g = _a.designWidth, designWidth = _g === void 0 ? 375 : _g;
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
            this._onResize = lodash_debounce(function () {
                _this.destroy();
                _this._init();
            }, 150, { maxWait: 1000 });
            if (!canvas) {
                throw new Error('not valid canvas element');
            }
            this.canvas = canvas;
            this.speedMin = speedMin;
            this.speedMax = speedMax;
            this.bgColor = bgColor === 'random' ? randomRgba() : bgColor;
            this.ballsSetting = balls;
            this.docEl = docEl;
            this.designWidth = designWidth;
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
            var rateScale = docWidth / this.designWidth; // 相对设计稿的缩放倍率
            // 小球半径、圆心坐标，各种尺寸屏幕缩放适配
            var ballsComputed = this.ballsSetting.map(function (ball) {
                return __assign(__assign({}, ball), {
                    r: ball.r * rateScale,
                    x: ball.x * rateScale,
                    y: ball.y * rateScale
                });
            });
            this.ctx = setupCanvas(this.canvas);
            this.balls = ballsComputed.map(function (_a) {
                var x = _a.x, y = _a.y, r = _a.r, velX = _a.velX, velY = _a.velY, img = _a.img, imgSrc = _a.imgSrc, bgColor = _a.bgColor, speedMin = _a.speedMin, speedMax = _a.speedMax;
                return new Ball({
                    ctx: _this.ctx,
                    x: x,
                    y: y,
                    r: r,
                    img: img,
                    imgSrc: imgSrc,
                    bgColor: bgColor === 'random' ? randomRgba() : bgColor,
                    velX: velX || random(speedMin || _this.speedMin, speedMax || _this.speedMax),
                    velY: velY || random(speedMin || _this.speedMin, speedMax || _this.speedMax),
                    speedMin: speedMin || _this.speedMin,
                    speedMax: speedMax || _this.speedMax // 允许设置单个小球的最大速度
                });
            });
        };
        Collision.prototype._bindEvents = function () {
            window.addEventListener(resizeEvent, this._onResize, false);
        };
        /**
         * 销毁 animation frame
         */
        Collision.prototype.destroy = function () {
            var rect = this.canvas.getBoundingClientRect();
            window.removeEventListener(resizeEvent, this._onResize, false);
            window.cancelAnimationFrame(this.raf);
            this.ctx.clearRect(0, 0, rect.width, rect.height);
        };
        return Collision;
    }());

    return Collision;

})));
//# sourceMappingURL=ball-collision.umd.js.map
