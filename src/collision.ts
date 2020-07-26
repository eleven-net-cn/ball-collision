/*
 * @Desc: 小球撞击动画 —— canvas
 * @Author: Eleven
 * @Date: 2020-07-24 15:04:41
 * @Last Modified by: Eleven
 * @Last Modified time: 2020-07-26 01:49:52
 */

import { CollisionConfig, BallSetting } from './types'
import Ball from './Ball'
import debounce from 'lodash.debounce'

const resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize'

/**
 * 创建绘图
 *  - 移动端保持高清：https://www.html5rocks.com/en/tutorials/canvas/hidpi/
 */
function setupCanvas(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  if (!canvas) {
    throw new Error('not valid canvas element')
  }

  const ctx = canvas.getContext('2d')
  const dpr = window.devicePixelRatio || 1
  const rect = canvas.getBoundingClientRect()

  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr
  ctx && ctx.scale(dpr, dpr)

  return <CanvasRenderingContext2D>ctx
}

/**
 * 随机数
 */
function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) * 100) / 100 + min
}

/**
 * 随机颜色
 */
function randomRgba(): string {
  return `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`
}

class Collision {
  private ctx?: CanvasRenderingContext2D
  private raf?: number
  private balls: Ball[] = []
  private rectCanvas: any

  private readonly canvas: HTMLCanvasElement
  private readonly speedMin: number
  private readonly speedMax: number
  private readonly bgColor: string
  private readonly ballsSetting: BallSetting[]
  private readonly docEl: HTMLElement
  private readonly designWidth: number

  /**
   * @param canvas 画板 HTMLElement
   * @param balls 指定的小球集合，允许单独指定配置
   * @param speedMin 最小位移速度，单位：px，默认：-2
   * @param speedMax 最大位移速度，单位：px，默认：2
   * @param bgColor canvas 画布背景颜色，默认：'transparent' 透明
   * @param docEl 页面节点（或可以视作页面实际承载容器的节点），默认：document.documentElement
   * @param designWidth 设计稿的宽度，默认：375（balls 中配置的小球尺寸，应当与此处的设计稿宽度匹配）
   */
  constructor({
    canvas,
    balls = [],
    speedMin = -2,
    speedMax = 2,
    bgColor = 'transparent',
    docEl = document.documentElement,
    designWidth = 375
  }: CollisionConfig) {
    if (!canvas) {
      throw new Error('not valid canvas element')
    }

    this.canvas = canvas
    this.speedMin = speedMin
    this.speedMax = speedMax
    this.bgColor = bgColor === 'random' ? randomRgba() : bgColor
    this.ballsSetting = balls
    this.docEl = docEl
    this.designWidth = designWidth

    this._init()
  }

  /**
   * 初始化
   */
  private _init(): void {
    this.rectCanvas = this.canvas.getBoundingClientRect()

    // 创建小球
    this._create()
    // 启动，初始速度随机
    this._run()
    // 绑定事件
    this._bindEvents()
  }

  /**
   * 创建 ctx、balls
   *  - 自动处理不同屏幕计算适配
   */
  private _create(): void {
    const docWidth = this.docEl.clientWidth // 页面可是区域的宽度
    const rateScale = docWidth / this.designWidth // 相对设计稿的缩放倍率
    // 小球半径、圆心坐标，各种尺寸屏幕缩放适配
    const ballsComputed = this.ballsSetting.map(ball => {
      return {
        ...ball,
        ...{
          r: ball.r * rateScale,
          x: ball.x * rateScale,
          y: ball.y * rateScale
        }
      }
    })

    this.ctx = setupCanvas(this.canvas)
    this.balls = ballsComputed.map(
      ({ x, y, r, velX, velY, img, imgSrc, bgColor, speedMin, speedMax }) =>
        new Ball({
          ctx: <CanvasRenderingContext2D>this.ctx,
          x,
          y,
          r,
          img,
          imgSrc,
          bgColor: bgColor === 'random' ? randomRgba() : bgColor,
          velX: velX || random(speedMin || this.speedMin, speedMax || this.speedMax), // 允许设置单个小球的初始横向位移速度
          velY: velY || random(speedMin || this.speedMin, speedMax || this.speedMax), // 允许设置单个小球的初始纵向位移速度
          speedMin: speedMin || this.speedMin, // 允许设置单个小球的最小速度
          speedMax: speedMax || this.speedMax // 允许设置单个小球的最大速度
        })
    )
  }

  /**
   * 开始运动
   */
  private _run: VoidFunction = () => {
    if (!this.ctx) {
      throw new Error('not valid ctx')
    }

    // 清空画板
    this.ctx.clearRect(0, 0, this.rectCanvas.width, this.rectCanvas.height)
    // 绘制背景
    this.ctx.fillStyle = this.bgColor
    this.ctx.fillRect(0, 0, this.rectCanvas.width, this.rectCanvas.height)

    this.balls.map(ball => {
      ball.draw()
      this.balls = ball.detect(this.balls)
      ball.update()
    })

    this.raf = window.requestAnimationFrame(this._run)
  }

  private _bindEvents(): void {
    window.addEventListener(resizeEvent, this._onResize, false)
  }

  private _onResize: VoidFunction = debounce(
    () => {
      this.destroy()
      this._init()
    },
    150,
    { maxWait: 1000 }
  )

  /**
   * 销毁 animation frame
   */
  destroy(): void {
    const rect = this.canvas.getBoundingClientRect()

    window.removeEventListener(resizeEvent, this._onResize, false)
    window.cancelAnimationFrame(<number>this.raf)
    // 清空画板
    ;(<CanvasRenderingContext2D>this.ctx).clearRect(0, 0, rect.width, rect.height)
  }
}

export default Collision
