export default class TiledBackground extends Phaser.GameObjects.Group {
  scene: Phaser.Scene
  key: string
  x: number
  y: number

  constructor(scene: Phaser.Scene, key: string) {
    super(scene)
    this.scene = scene
    this.key = key
    this.x = 0
    this.y = 0

    this.addTile()
  }

  addTile() {
    const { width, height } = this.scene.scale
    const tile = this.scene.add.image(this.x, this.y, this.key)
    this.add(tile)
    this.x += tile.displayWidth
    if (this.x > width + tile.displayWidth) {
      this.y += tile.displayHeight
      this.x = 0
    }
    if (this.y < height + tile.displayHeight) {
      this.addTile()
    }
  }

  update() {

  }
}
