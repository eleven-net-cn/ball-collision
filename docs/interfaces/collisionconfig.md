[@eleven.fe/ball-collision - v1.3.0](../README.md) › [CollisionConfig](collisionconfig.md)

# Interface: CollisionConfig

Collision 初始化配置【docEl、designWidth 是自动处理页面尺寸适配的关键参数】
 - canvas 画板 HTMLElement
 - balls 指定的小球集合，允许单独指定配置
 - speedMin 最小位移速度，单位：px，默认：-2
 - speedMax 最大位移速度，单位：px，默认：2
 - bgColor canvas 画布背景颜色，默认：'transparent' 透明（合法的颜色值或 'random'）
 - docEl 页面节点（或可以视作页面实际承载容器的节点），默认：document.documentElement
 - designWidth 设计稿的宽度，默认：375（balls 中配置的小球尺寸，应当与此处的设计稿宽度匹配）
 - scaleInPC PC端是否动缩放，默认：true，即在移动端和 PC 端都会自动缩放，如果 PC 端不需要缩放可以配置为 false 关闭
 - resetOnResize 浏览器 resize 或移动端 orientationchange 事件触发时，是否重置画布，默认：true
 - resetOnlyWidth 浏览器 resize 或移动端 orientationchange 事件触发时，仅宽度有变化时，才会 reset，默认：true

## Hierarchy

* **CollisionConfig**

## Index

### Properties

* [balls](collisionconfig.md#balls)
* [bgColor](collisionconfig.md#optional-bgcolor)
* [canvas](collisionconfig.md#canvas)
* [designWidth](collisionconfig.md#optional-designwidth)
* [docEl](collisionconfig.md#optional-docel)
* [resetOnResize](collisionconfig.md#optional-resetonresize)
* [resetOnlyWidth](collisionconfig.md#optional-resetonlywidth)
* [scaleInPC](collisionconfig.md#optional-scaleinpc)
* [speedMax](collisionconfig.md#optional-speedmax)
* [speedMin](collisionconfig.md#optional-speedmin)

## Properties

###  balls

• **balls**: *[BallSetting](ballsetting.md)[]*

Defined in src/types/index.ts:16

___

### `Optional` bgColor

• **bgColor**? : *undefined | string*

Defined in src/types/index.ts:19

___

###  canvas

• **canvas**: *HTMLCanvasElement | any*

Defined in src/types/index.ts:15

___

### `Optional` designWidth

• **designWidth**? : *undefined | number*

Defined in src/types/index.ts:21

___

### `Optional` docEl

• **docEl**? : *HTMLElement | any*

Defined in src/types/index.ts:20

___

### `Optional` resetOnResize

• **resetOnResize**? : *undefined | false | true*

Defined in src/types/index.ts:23

___

### `Optional` resetOnlyWidth

• **resetOnlyWidth**? : *undefined | false | true*

Defined in src/types/index.ts:24

___

### `Optional` scaleInPC

• **scaleInPC**? : *undefined | false | true*

Defined in src/types/index.ts:22

___

### `Optional` speedMax

• **speedMax**? : *undefined | number*

Defined in src/types/index.ts:18

___

### `Optional` speedMin

• **speedMin**? : *undefined | number*

Defined in src/types/index.ts:17
