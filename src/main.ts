import 'phaser'
import { AlignPlugin } from 'phaser3-align-plugin'



import scene from '~/scenes/index'

const isDesktop = checkIsDesktop()
const width = isDesktop ? 375 : window.innerWidth
const height = isDesktop ? 667 : window.innerHeight
const designWidth = 750
const designHeight = 1334
const designRatio = designWidth / designHeight

window.designRatio = designRatio

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: 'root',
    width,
    height
  },
  plugins: {
    scene: [
      {
        key: 'AlignPlugin',
        plugin: AlignPlugin,
        mapping: 'align'
      }
    ]
  },
  scene
}

function checkIsDesktop() {
  const ua = navigator.userAgent;

  return /Windows/.test(ua)
    || (/Mac OS/.test(ua) && !(/like Mac OS/.test(ua)))
    || /CrOS/.test(ua)
    || (/Linux/.test(ua) && !(/Silk/).test(ua))
}

export default new Phaser.Game(config)
