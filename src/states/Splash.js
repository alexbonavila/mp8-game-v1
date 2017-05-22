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
    this.game.load.image('star', 'assets/star.png')
    this.game.load.image('blue_star', 'assets/blue_star.png')
    this.game.load.image('enemy', 'assets/enemy.png')
    this.game.load.image('red_star', 'assets/red_star.png')
    this.game.load.image('heart', 'assets/heart.png')
    this.game.load.image('dust', 'assets/dust.png')
    this.game.load.image('exp', 'assets/exp.png')
    this.game.load.image('game_over', 'assets/game_over.png')
    this.game.load.image('game_win', 'assets/game_win.png')
    this.game.load.audio('dead', ['assets/sounds/dead.wav', 'assets/sounds/dead.mp3'])
    this.game.load.audio('dust', ['assets/sounds/dust.wav', 'assets/sounds/dust.mp3'])
    this.game.load.audio('jump', ['assets/sounds/jump.wav', 'assets/sounds/jump.mp3'])
    this.game.load.audio('coin', ['assets/sounds/coin.wav', 'assets/sounds/coin.mp3'])
    this.game.load.audio('back', ['assets/sounds/back.wav', 'assets/sounds/back.mp3'])

  }

  create () {
    this.state.start('Game')
  }
}
