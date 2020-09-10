import { SceneKeys } from '~/consts/index'
import TiledBackground from '~/classes/TiledBackground'

export default class Main extends Phaser.Scene {
  background: any
  river: any
  tank1: any
  tank2: any
  message: []

  constructor() {
    super(SceneKeys.MAIN)
  }

  init() {
    this.message = []
  }

  create() {
    this.align.grid({ debug: true })
    this.background = new TiledBackground(this, 'dirt')
    this.makeRiver()

    this.placeTanks()

    this.input.on('pointerdown', this.clicked, this)

  }

  clicked() {
    // this.tankKit(this.tank1)
    this.showSmoke(this.tank1)
  }

  tankKit(tank) {
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
    if (tank.y == this.tank1) {
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
