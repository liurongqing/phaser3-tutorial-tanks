import TiledBackground from '~/classes/TiledBackground'
import { SceneKeys } from '~/consts/index'

export default class Main extends Phaser.Scene {
  background: any
  river: any
  tank1: any
  tank2: any
  message: any[]
  canFire: boolean
  messageText: any
  messageTimer: any
  shootTimer: any

  constructor() {
    super(SceneKeys.MAIN)
  }

  init() {
    this.message = []
    this.canFire = false
  }

  create() {
    const { width, height } = this.scale
    this.align.grid({ debug: true })
    this.background = new TiledBackground(this, 'dirt')
    this.makeRiver()

    this.placeTanks()

    this.setUpMessages()

    this.messageText = this.add.text(width * 0.5, height * 0.5, 'Message', {
      fontSize: 30,
      color: '#000000',
      fontFamily: 'Fresca'
    }).setOrigin(0.5)


    this.messageTimer = this.time.addEvent({
      delay: 1000,
      callback: this.setNextMessage,
      callbackScope: this,
      loop: true
    })

    this.input.on('pointerdown', this.clicked, this)

  }

  setNextMessage() {
    const message = this.message.shift()
    if (this.message.length === 0) {
      this.canFire = true
      this.messageTimer.remove(false)
      var delay = 500 + Math.random() * 1000
      this.shootTimer = this.time.addEvent({
        delay,
        callback: this.computerShoot,
        callbackScope: this,
        loop: false
      })
    }

    this.messageText.setText(message.text)
      .setStyle(message.style)
  }

  computerShoot() {
    this.showBullet(this.tank2, this.tank1)
  }

  clicked() {
    if (this.canFire) {
      this.showBullet(this.tank1, this.tank2)
    } else {
      this.showBullet(this.tank2, this.tank1)
    }
  }

  tankHit(tank) {
    const angle = Math.floor(Math.random() * 90) - 45
    let ty = 0
    if (tank === this.tank1) {
      ty = this.scale.height
    }
    this.tweens.add({
      targets: tank,
      duration: 500,
      y: ty,
      angle
    })
  }

  showSmoke(tank) {
    const smoke = this.add.image(0, 0, 'smoke')
    this.align.vw(smoke, 0.2)
    let ty = 0
    if (tank == this.tank1) {
      console.log('tank1')
      this.align.placeAtIndex(smoke, 7)
      ty = this.scale.height
    } else {
      this.align.placeAtIndex(smoke, 17)
    }
    this.tweens.add({
      targets: smoke,
      duration: 1500,
      y: ty,
      scaleX: 0,
      scaleY: 0,
      alpha: 0
    })
  }

  showBullet(firedTank, hitTank) {
    this.showSmoke(firedTank)
    let ty = hitTank.y
    let bulletKey = 'bullet1'
    let startY, angle
    if (firedTank === this.tank2) {
      ty = hitTank.y
      bulletKey = 'bullet2'
      startY = firedTank.y + firedTank.displayHeight * 0.5
      angle = 180
    } else {
      startY = firedTank.y - firedTank.displayHeight * 0.5
      angle = 0
    }

    var bullet = this.add.image(firedTank.x, startY, bulletKey)
    bullet.angle = angle
    this.align.vw(bullet, 0.05)

    this.tweens.add({
      targets: bullet,
      duration: 200,
      y: ty,
      onComplete: this.onBulletComplete,
      onCompleteParams: [{ tank: hitTank, scope: this }]
    })

  }

  onBulletComplete(tween, targets, custom) {
    // this.tankHit(custom)
    custom.scope.tankHit(custom.tank)
    targets[0].destroy()
  }

  setUpMessages() {
    this.message.push({
      text: 'Ready',
      style: {
        fontFamily: 'Fresca',
        fontSize: 46,
        color: '#000000'
      }
    })
    this.message.push({
      text: 'Steady',
      style: {
        fontFamily: 'Fresca',
        fontSize: 46,
        color: '#000000'
      }
    })
    this.message.push({
      text: 'Fire',
      style: {
        fontFamily: 'Fresca',
        fontSize: 72,
        color: '#ff0000'
      }
    })
  }

  placeTanks() {
    this.tank1 = this.add.image(0, 0, 'tank1')
    this.tank2 = this.add.image(0, 0, 'tank2')

    this.align.placeAtIndex(this.tank1, 22)
    this.align.placeAtIndex(this.tank2, 2)

    this.align.vw(this.tank1, 0.2)
    this.align.vw(this.tank2, 0.2)
  }

  makeRiver() {
    const { width, height } = this.scale
    this.river = this.add.graphics()
    this.river.fillStyle(0x12e5e8, 1)
    const riverH = height * 0.2
    this.river.fillRect(0, 0, width, riverH)
    this.river.y = height * 0.5 - riverH * 0.5
  }
}
