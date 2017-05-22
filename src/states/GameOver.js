import Phaser from 'phaser'
import globals from '../globals'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#000000'
  }

  preload () {

  }

  create () {
    this.createGameOverImage()
  }

  createGameOverImage(){
    this.img_game_over = game.add.sprite(375, 225, 'game_over');

    this.img_game_over.anchor.set(0.5);

    this.img_game_over.inputEnabled = true;

    this.img_game_over.events.onInputDown.add(this.listener, this);
  }

  listener(){
    this.state.start('Game')
  }
}