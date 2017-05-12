import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    //this.load.image('mushroom', 'assets/images/mushroom2.png')
    this.load.tilemap('tilemap', 'assets/tiled_map1.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.image('tiles', 'assets/P6yozhP.png')
    this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48)

  }

  create () {
    this.state.start('Game')
  }
}
