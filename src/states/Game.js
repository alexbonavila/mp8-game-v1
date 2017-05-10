/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'

export default class extends Phaser.State {
  init () {}
  preload () {
    this.load.tilemap('tilemap', 'assets/tiled_map1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tiles', 'assets/P6yozhP.png');
  }

  create () {

    this.map = this.game.add.tilemap('tilemap');
    this.map.addTilesetImage('P6yozhP', 'tiles');

    this.backgroundlayer = this.map.createLayer('BackgroundLayer');
    this.groundLayer = this.map.createLayer('GroundLayer');
  }

  render () {
    // if (__DEV__) {
    //   this.game.debug.spriteInfo(this.mushroom, 32, 32)
    // }
  }
}
