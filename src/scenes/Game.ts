import { SceneKeys } from '~/consts/index'

export default class Game extends Phaser.Scene {
  constructor() {
    super(SceneKeys.GAME)
  }

  preload() { }

  create() {
    this.align.grid({ rows: 11, cols: 11, debug: true })

    const btnStart = this.add.image(240, 320, 'button1')
      .setInteractive()
    this.align.vw(btnStart, 0.4)
    this.align.placeAtIndex(btnStart, 93)

    const title = this.add.image(240, 100, 'title')
    this.align.vw(title, 0.8)
    this.align.placeAtIndex(title, 38)


    this.startGame()
    // btnStart.on('pointerdown', this.startGame, this)

  }

  update() { }

  startGame() {
    this.scene.start(SceneKeys.MAIN)
  }
}
