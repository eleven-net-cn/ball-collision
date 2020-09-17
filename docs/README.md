[@eleven.fe/ball-collision - v1.3.0](README.md)

# @eleven.fe/ball-collision - v1.3.0

## Index

### Classes

* [Ball](classes/ball.md)
* [Collision](classes/collision.md)

### Interfaces

* [BallConfig](interfaces/ballconfig.md)
* [BallSetting](interfaces/ballsetting.md)
* [CollisionConfig](interfaces/collisionconfig.md)

### Variables

* [isAndroid](README.md#const-isandroid)
* [isIOS](README.md#const-isios)
* [isMobile](README.md#const-ismobile)
* [isWinPhone](README.md#const-iswinphone)
* [resizeEvent](README.md#const-resizeevent)
* [ua](README.md#const-ua)

### Functions

* [random](README.md#random)
* [randomRgba](README.md#randomrgba)
* [setupCanvas](README.md#setupcanvas)

## Variables

### `Const` isAndroid

• **isAndroid**: *boolean* = /android/i.test(ua)

Defined in src/utils.ts:4

___

### `Const` isIOS

• **isIOS**: *boolean* = /(ipad|iphone|ipod)/i.test(ua)

Defined in src/utils.ts:3

___

### `Const` isMobile

• **isMobile**: *boolean* = isIOS || isAndroid || isWinPhone

Defined in src/utils.ts:6

___

### `Const` isWinPhone

• **isWinPhone**: *boolean* = /windows phone/i.test(ua)

Defined in src/utils.ts:5

___

### `Const` resizeEvent

• **resizeEvent**: *"orientationchange" | "resize"* = 'orientationchange' in window ? 'orientationchange' : 'resize'

Defined in src/utils.ts:36

___

### `Const` ua

• **ua**: *string* = window.navigator.userAgent

Defined in src/utils.ts:1

## Functions

###  random

▸ **random**(`min`: number, `max`: number): *number*

Defined in src/utils.ts:28

**Parameters:**

Name | Type |
------ | ------ |
`min` | number |
`max` | number |

**Returns:** *number*

___

###  randomRgba

▸ **randomRgba**(): *string*

Defined in src/utils.ts:32

**Returns:** *string*

___

###  setupCanvas

▸ **setupCanvas**(`canvas`: HTMLCanvasElement): *CanvasRenderingContext2D*

Defined in src/utils.ts:12

创建绘图
 - 移动端保持高清：https://www.html5rocks.com/en/tutorials/canvas/hidpi/

**Parameters:**

Name | Type |
------ | ------ |
`canvas` | HTMLCanvasElement |

**Returns:** *CanvasRenderingContext2D*
