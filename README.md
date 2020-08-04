# [ball-collision](https://www.npmjs.com/package/@eleven.fe/ball-collision)

小球撞击动画，canvas 绘制。

## Introduction

- 纯 js 库（gzipped: 2.4 KB）

- 支持 typescript（https://eleven90.github.io/ball-collision/）

- canvas、window.requestAnimationFrame 绘制动画

- canvas 在移动端高清屏的模糊问题内部已处理，不会有图片模糊的困扰。

- 针对移动端所有尺寸屏幕，内部实现了类似 REM 的缩放机制，会自动做缩放处理。

    如果需要在 PC 端关闭缩放效果（移动端不支持关闭缩放），请配置 `scaleInPC` 参数为 false。

- 如果你的页面并不总是与设备屏幕等宽，例如：你的移动端页面，在 PC 端展示时，有设置最大宽度、剩余空间留白。

    那么此时，你必须要配置 `docEl` 参数，该参数的 clientWidth 应当等于实际的页面宽度。（否则 canvas 画布会与页面等宽，样式展示上会有偏差。）

- 可以使用参数 `designWidth`（默认：375）指定设计稿，小球半径、圆心位置等数值，均是指定设计稿中的数值。

## Example

1. 气泡撞击

    [example/index.html](./example/index.html)

    ![](./example/images/example/bubble.gif)

2. 位置、背景色、尺寸等全随机

    [example/random.html](./example/random.html)

    ![](./example/images/example/random.gif)

## Installation

yarn

```sh
yarn add @eleven.fe/ball-collision
```

npm

```sh
npm i @eleven.fe/ball-collision
```

## Options

```ts
/**
 * Collision 初始化参数【docEl、designWidth 是自动处理页面尺寸适配的关键参数】
 *  - canvas 画板 HTMLElement
 *  - balls 指定的小球集合，允许单独指定配置
 *  - speedMin 最小位移速度，单位：px，默认：-2
 *  - speedMax 最大位移速度，单位：px，默认：2
 *  - bgColor canvas 画布背景颜色，默认：'transparent' 透明（合法的颜色值或 'random'）
 *  - docEl 页面节点（或可以视作页面实际承载容器的节点），默认：document.documentElement
 *  - designWidth 设计稿的宽度，默认：375（balls 中配置的小球尺寸，应当与此处的设计稿宽度匹配）
 *  - scaleInPC PC端是否动缩放，默认：true，即在移动端和 PC 端都会自动缩放，如果 PC 端不需要缩放可以配置为 false 关闭
 */
interface CollisionConfig {
  canvas: HTMLCanvasElement | any
  balls: BallSetting[]
  speedMin?: number
  speedMax?: number
  bgColor?: string
  docEl?: HTMLElement | any
  designWidth?: number
  scaleInPC?: boolean
}
```

```ts
/**
 * 小球初始配置
 *  - x 圆心 x 坐标
 *  - y 圆心 y 坐标
 *  - r 小球半径
 *  - img 小球对应图片对象（new Image()）
 *  - imgSrc 小球对应图片的 src（BASE64或 http 链接）
 *  - bgColor 小球背景色（合法的颜色值或 'random'）
 *  - velX 水平位移速度
 *  - velY 垂直位移速度
 *  - speedMin 最小位移速度
 *  - speedMax 最大位移速度
 */
interface BallSetting {
  x: number
  y: number
  r: number
  img?: HTMLImageElement
  imgSrc?: string
  bgColor?: string
  velX?: number
  velY?: number
  speedMin?: number
  speedMax?: number
}
```

## Methods

#### destroy()

销毁 animation frame，移除事件监听等，建议在（react、vue）组件卸载前调用一次。

## Getting Started

先准备一个 canvas 标签，并设置 css 样式。

```html
<!-- 先准备一个 canvas 标签。css 样式可以随意指定，画布内容会随之缩放。 -->
<canvas id="canvas_wrapper" class="canvas-wrapper"></canvas>
```

###### 初始化示例一：普通配置

```js
import BallCollision from '@eleven.fe/ball-collision'

/**
 * 1、配置 x、y、r 时，注意不要让小球的位置重叠
 * 2、移动端设备，不需要考虑设备像素比，
 *    即：x、y、r 等不需要乘 2、乘 3（因为，内部已自动做了canvas的适配）
 * 3、所有配置的位置、尺寸等数值，与指定的宽度设计稿相匹配，可以通过 designWidth 参数指定设计稿宽度，默认：375。
 */
const balls = [
  {
    x: 50, // 圆心 x 坐标，单位：px
    y: 50, // 圆心 y 坐标，单位：px
    r: 45, // 小球半径，单位：px
    bgColor: 'random', // 背景色可以指定，也可以随机
    imgSrc: 'https://mat1.gtimg.com/sports/nba/logo/1602/13.png'
  },
  {
    x: 125,
    y: 140,
    r: 45,
    bgColor: 'random',
    imgSrc: 'https://mat1.gtimg.com/sports/nba/logo/1602/13.png'
  },
  ...
]

// 初始化
new BallCollision({
  canvas: document.getElementById('canvas_wrapper'),
  balls: balls,
  speedMin: -2, // 单位：px
  speedMax: 2, // 单位：px
  bgColor: 'transparent', // bgColor支持随机，也可以指定（合法的颜色值）
  scaleInPC: true, // scaleInPC PC端是否动缩放，默认：true，即在移动端和 PC 端都会自动缩放，如果 PC 端不需要缩放可以配置为 false 关闭
})
```

###### 初始化示例二：通过 img 参数指定图片

```js
import BallCollision from '@eleven.fe/ball-collision'

const img = new Image()

img.onload = function() {
  // 图片 load 完成
  createCollision()
}
img.src = 'https://mat1.gtimg.com/sports/nba/logo/1602/13.png'


function createCollision() {
  /**
   * 1、配置 x、y、r 时，注意不要让小球的位置重叠
   * 2、移动端设备，不需要考虑设备像素比，
   *    即：x、y、r 等不需要乘 2、乘 3（因为，内部已自动做了canvas的适配）
   * 3、所有配置的位置、尺寸等数值，与指定的宽度设计稿相匹配，可以通过 designWidth 参数指定设计稿宽度，默认：375。
   */
  const balls = [
    {
      x: 50, // 圆心 x 坐标，单位：px
      y: 50, // 圆心 y 坐标，单位：px
      r: 45, // 小球半径，单位：px
      bgColor: 'random', // 背景色可以指定，也可以随机
      img,
    },
    {
      x: 125,
      y: 140,
      r: 45,
      bgColor: 'random',
      img,
    },
    ...
  ]

  // 初始化
  new BallCollision({
    canvas: document.getElementById('canvas_wrapper'),
    balls: balls,
    speedMin: -2, // 单位：px
    speedMax: 2, // 单位：px
    bgColor: 'transparent', // bgColor支持随机，也可以指定（合法的颜色值）
    scaleInPC: true, // scaleInPC PC端是否动缩放，默认：true，即在移动端和 PC 端都会自动缩放，如果 PC 端不需要缩放可以配置为 false 关闭
  })
}
```

###### 初始化示例三：小球位置、大小、背景色随机

```js
import BallCollision from '@eleven.fe/ball-collision'

const _canvas = document.getElementById('canvas_wrapper')
const _docEl = document.querySelector('.wrapper')
const ua = window.navigator.userAgent
const isIOS = /(ipad|iphone|ipod)/i.test(ua)
const isAndroid = /android/i.test(ua)
const isWinPhone = /windows phone/i.test(ua)
const isMobile = isIOS || isAndroid || isWinPhone
const designWidth = 375
const scaleInPC = false
const scaleRate = !scaleInPC && !isMobile ? 1 : _docEl.clientWidth / designWidth

// 初始化
new BallCollision({
  canvas: _canvas,
  balls: createRandomBalls(10, 30, 50),
  speedMin: -5, // 单位：px
  speedMax: 5, // 单位：px
  bgColor: 'random', // bgColor支持随机，也可以指定（合法的颜色值）
  docEl: _docEl,
  designWidth: designWidth, // 设计稿的宽度，默认：375（所有配置的尺寸、位置等，都是指定宽度的设计稿数值）
  scaleInPC: scaleInPC, // PC 端是否自动缩放（默认：true，在移动端和PC端都会自动缩放，如果 PC 端不需要缩放可以配置为 false 关闭）
})

/**
 * 随机生成小球位置、大小、颜色
 * @param {Number} ballCount 小球数量
 * @param {Number} ballMin 小球半径最小值
 * @param {Number} ballMax 小球半径最大值
 */
function createRandomBalls(ballCount, ballMin, ballMax) {
  const rectCanvas = _canvas.getBoundingClientRect()
  let balls = []

  while (balls.length < ballCount) {
    balls.push(createBall(balls, ballMin, ballMax, rectCanvas))
  }
  return balls
}

function createBall(balls, ballMin, ballMax, rectCanvas) {
  const r = random(ballMin, ballMax)
  // 缩放是随机时需要特别考虑的因素
  const x = random(r, rectCanvas.width/scaleRate - r)
  const y = random(r, rectCanvas.height/scaleRate - r)
  const bgColor = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')'

  // 随机比较麻烦的是：考虑初始的位置重叠问题
  for (let i = 0; i < balls.length; i++) {
    const dx = balls[i].x - x
    const dy = balls[i].y - y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < balls[i].r + r) {
      return createBall(balls, ballMin, ballMax, rectCanvas)
    }
  }

  return {
    x: x,
    y: y,
    r: r,
    bgColor: bgColor,
  }
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min) * 100) / 100 + min
}
```

## Using in React & Hooks & Typescript

```js
import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import BallCollision, { BallSetting } from '@eleven.fe/ball-collision'

const CanvasWrapper = styled.canvas`
  width: 100%;
  height: 100vh;
`

// 小球初始配置
const balls: BallSetting[] = [
  {
    x: 50, // 圆心 x 坐标，单位：px
    y: 50, // 圆心 y 坐标，单位：px
    r: 45, // 小球半径，单位：px
    bgColor: 'random', // 背景色随机
    imgSrc: 'https://mat1.gtimg.com/sports/nba/logo/1602/13.png'
  },
  {
    x: 125,
    y: 140,
    r: 45,
    bgColor: 'random',
    imgSrc: 'https://mat1.gtimg.com/sports/nba/logo/1602/13.png'
  },
  {
    x: 200,
    y: 60,
    r: 45,
    bgColor: 'random',
    imgSrc: 'https://mat1.gtimg.com/sports/nba/logo/1602/13.png'
  },
  {
    x: 220,
    y: 160,
    r: 45,
    bgColor: 'random',
    imgSrc: 'https://mat1.gtimg.com/sports/nba/logo/1602/13.png'
  },
  {
    x: 160,
    y: 260,
    r: 45,
    bgColor: 'random',
    imgSrc: 'https://mat1.gtimg.com/sports/nba/logo/1602/13.png'
  }
]

export default function Ball() {
  let canvasEl = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // 初始化
    canvasEl &&
      new BallCollision({
        canvas: canvasEl,
        balls,
        speedMin: -2,
        speedMax: 2,
        bgColor: 'random',
      })
  }, [])

  return (
    <>
      <CanvasWrapper
        ref={(el: any) => {
          canvasEl = el
        }}
      />
    </>
  )
}
```
