[@eleven.fe/ball-collision - v1.3.1](../README.md) › [Collision](collision.md)

# Class: Collision

## Hierarchy

* **Collision**

## Index

### Constructors

* [constructor](collision.md#constructor)

### Methods

* [destroy](collision.md#destroy)

## Constructors

###  constructor

\+ **new Collision**(`__namedParameters`: object): *[Collision](collision.md)*

*Defined in [src/collision.ts:30](https://github.com/Eleven90/ball-collision/blob/2a85db6/src/collision.ts#L30)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`balls` | [BallSetting](../interfaces/ballsetting.md)[] | [] | 指定的小球集合，允许单独指定配置 |
`bgColor` | string | "transparent" | canvas 画布背景颜色，默认：'transparent' 透明 |
`canvas` | any | - | 画板 HTMLElement |
`designWidth` | number | 375 | 设计稿的宽度，默认：375（balls 中配置的小球尺寸，应当与此处的设计稿宽度匹配） |
`docEl` | any | document.documentElement | 页面节点（或可以视作页面实际承载容器的节点），默认：document.documentElement |
`resetOnResize` | boolean | true | 浏览器 resize 或移动端 orientationchange 事件触发时，是否重置画布，默认：true |
`resetOnlyWidth` | boolean | true | 浏览器 resize 或移动端 orientationchange 事件触发时，仅宽度有变化时，才会 reset，默认：true  |
`scaleInPC` | boolean | true | PC端是否自动缩放，默认：true，即移动端和 PC 端统一都自动缩放 |
`speedMax` | number | 2 | 最大位移速度，单位：px，默认：2 |
`speedMin` | number | -2 | 最小位移速度，单位：px，默认：-2 |

**Returns:** *[Collision](collision.md)*

## Methods

###  destroy

▸ **destroy**(): *void*

*Defined in [src/collision.ts:171](https://github.com/Eleven90/ball-collision/blob/2a85db6/src/collision.ts#L171)*

销毁 animation frame

**Returns:** *void*
