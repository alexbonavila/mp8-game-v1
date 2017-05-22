import Phaser from 'phaser'
import globals from '../globals'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#000000'
  }

  preload () {

  }

  create () {
    this.createGameWinImage()
  }

  createGameWinImage(){
    this.img_game_win = game.add.sprite(375, 225, 'game_win');

    this.img_game_win.anchor.set(0.5);

    this.img_game_win.inputEnabled = true;

    this.img_game_win.events.onInputDown.add(this.listener, this);
  }

  listener(){
    this.state.start('Game')
  }
}