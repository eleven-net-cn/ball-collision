[@eleven.fe/ball-collision - v1.3.0](../README.md) › [BallConfig](ballconfig.md)

# Interface: BallConfig

小球
 - ctx canvas 绘图 context
 - x 圆心 x 坐标
 - y 圆心 y 坐标
 - r 小球半径
 - img 小球对应图片（Image）
 - imgSrc 小球对应图片的 src（BASE64或 http 链接）
 - velX 水平位移速度
 - velY 垂直位移速度
 - speedMin 最小位移速度
 - speedMax 最大位移速度
 - bgColor 小球背景色（合法的颜色值或 'random'）

## Hierarchy

* **BallConfig**

## Index

### Properties

* [bgColor](ballconfig.md#optional-bgcolor)
* [ctx](ballconfig.md#ctx)
* [img](ballconfig.md#optional-img)
* [imgSrc](ballconfig.md#optional-imgsrc)
* [r](ballconfig.md#r)
* [speedMax](ballconfig.md#speedmax)
* [speedMin](ballconfig.md#speedmin)
* [velX](ballconfig.md#velx)
* [velY](ballconfig.md#vely)
* [x](ballconfig.md#x)
* [y](ballconfig.md#y)

## Properties

### `Optional` bgColor

• **bgColor**? : *undefined | string*

Defined in src/types/index.ts:78

___

###  ctx

• **ctx**: *CanvasRenderingContext2D*

Defined in src/types/index.ts:68

___

### `Optional` img

• **img**? : *HTMLImageElement*

Defined in src/types/index.ts:76

___

### `Optional` imgSrc

• **imgSrc**? : *undefined | string*

Defined in src/types/index.ts:77

___

###  r

• **r**: *number*

Defined in src/types/index.ts:71

___

###  speedMax

• **speedMax**: *number*

Defined in src/types/index.ts:75

___

###  speedMin

• **speedMin**: *number*

Defined in src/types/index.ts:74

___

###  velX

• **velX**: *number*

Defined in src/types/index.ts:72

___

###  velY

• **velY**: *number*

Defined in src/types/index.ts:73

___

###  x

• **x**: *number*

Defined in src/types/index.ts:69

___

###  y

• **y**: *number*

Defined in src/types/index.ts:70
