import WebFontLoader from '~/classes/WebFontFile'
import { SceneKeys } from '~/consts/index'

export default class Preloader extends Phaser.Scene {
  constructor() {
    super(SceneKeys.PRELOAD)
  }
  preload() {
    this.load.image('button1', 'assets/images/ui/buttonStart.png')
    this.load.image('title', 'assets/images/main/title.png')
    this.load.image('dirt', 'assets/images/main/dirt.png')
    this.load.image('tank1', 'assets/images/main/tank1.png')
    this.load.image('tank2', 'assets/images/main/tank2.png')
    this.load.image('smoke', 'assets/images/main/smoke.png')
    this.load.image('bullet1', 'assets/images/main/bullet1.png')
    this.load.image('bullet2', 'assets/images/main/bullet2.png')

    const fonts = new WebFontLoader(this.load, [
      'Fresca'
    ])
    this.load.addFile(fonts)
  }
  create() {
    this.scene.start(SceneKeys.GAME)
  }
  update() { }
}
