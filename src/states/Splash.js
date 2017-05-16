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
    this.load.tilemap('tilemap2', 'assets/tiled_map2.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.image('tiles', 'assets/P6yozhP.png')
    this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48)
    this.game.load.image('star', 'assets/star.png');
    this.game.load.image('blue_star', 'assets/blue_star.png');
    this.game.load.image('enemy', 'assets/enemy.png');
    this.game.load.image('red_star', 'assets/red_star.png');
    this.game.load.image('heart', 'assets/heart.png');

  }

  create () {
    this.state.start('Game')
  }
}
