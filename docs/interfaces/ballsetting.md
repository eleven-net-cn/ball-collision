[@eleven.fe/ball-collision - v1.3.0](../README.md) › [BallSetting](ballsetting.md)

# Interface: BallSetting

小球初始配置
 - x 圆心 x 坐标
 - y 圆心 y 坐标
 - r 小球半径
 - img 小球对应图片（Image）
 - imgSrc 小球对应图片的 src（BASE64或 http 链接）
 - bgColor 小球背景色（合法的颜色值或 'random'）
 - velX 水平位移速度
 - velY 垂直位移速度
 - speedMin 最小位移速度
 - speedMax 最大位移速度

## Hierarchy

* **BallSetting**

## Index

### Properties

* [bgColor](ballsetting.md#optional-bgcolor)
* [img](ballsetting.md#optional-img)
* [imgSrc](ballsetting.md#optional-imgsrc)
* [r](ballsetting.md#r)
* [speedMax](ballsetting.md#optional-speedmax)
* [speedMin](ballsetting.md#optional-speedmin)
* [velX](ballsetting.md#optional-velx)
* [velY](ballsetting.md#optional-vely)
* [x](ballsetting.md#x)
* [y](ballsetting.md#y)

## Properties

### `Optional` bgColor

• **bgColor**? : *undefined | string*

Defined in src/types/index.ts:46

___

### `Optional` img

• **img**? : *HTMLImageElement*

Defined in src/types/index.ts:44

___

### `Optional` imgSrc

• **imgSrc**? : *undefined | string*

Defined in src/types/index.ts:45

___

###  r

• **r**: *number*

Defined in src/types/index.ts:43

___

### `Optional` speedMax

• **speedMax**? : *undefined | number*

Defined in src/types/index.ts:50

___

### `Optional` speedMin

• **speedMin**? : *undefined | number*

Defined in src/types/index.ts:49

___

### `Optional` velX

• **velX**? : *undefined | number*

Defined in src/types/index.ts:47

___

### `Optional` velY

• **velY**? : *undefined | number*

Defined in src/types/index.ts:48

___

###  x

• **x**: *number*

Defined in src/types/index.ts:41

___

###  y

• **y**: *number*

Defined in src/types/index.ts:42
