[@eleven.fe/ball-collision - v1.3.0](../README.md) › [Ball](ball.md)

# Class: Ball

## Hierarchy

* **Ball**

## Index

### Constructors

* [constructor](ball.md#constructor)

### Methods

* [detect](ball.md#detect)
* [draw](ball.md#draw)
* [update](ball.md#update)

## Constructors

###  constructor

\+ **new Ball**(`__namedParameters`: object): *[Ball](ball.md)*

Defined in src/ball.ts:24

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type | Description |
------ | ------ | ------ |
`bgColor` | undefined &#124; string | 小球背景色 |
`ctx` | CanvasRenderingContext2D | canvas 绘图 context |
`img` | undefined &#124; HTMLImageElement | 小球对应图片（Image） |
`imgSrc` | undefined &#124; string | 小球对应图片的 src（BASE64或 http 链接） |
`r` | number | 小球半径 |
`speedMax` | number | 最大位移速度  |
`speedMin` | number | 最小位移速度 |
`velX` | number | 水平位移速度 |
`velY` | number | 垂直位移速度 |
`x` | number | 圆心 x 坐标 |
`y` | number | 圆心 y 坐标 |

**Returns:** *[Ball](ball.md)*

## Methods

###  detect

▸ **detect**(`balls`: [Ball](ball.md)[]): *[Ball](ball.md)[]*

Defined in src/ball.ts:98

检测撞击

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`balls` | [Ball](ball.md)[] | 画布上所有小球  |

**Returns:** *[Ball](ball.md)[]*

___

###  draw

▸ **draw**(): *void*

Defined in src/ball.ts:58

绘制小球
 - 即使图片非圆形也可以

**Returns:** *void*

___

###  update

▸ **update**(): *void*

Defined in src/ball.ts:129

更新位移

**Returns:** *void*
