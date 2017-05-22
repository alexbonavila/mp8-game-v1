import Phaser from 'phaser'
import globals from '../globals'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#000000'
    console.log("init")
  }

  preload () {
    console.log("preload")
  }

  create () {
    this.createGameOverImage()
  }

  createGameOverImage(){
    console.log("create1")
    this.img_game_over = game.add.sprite(375, 225, 'game_over');

    this.img_game_over.anchor.set(0.5);

    console.log("create2")

    this.img_game_over.inputEnabled = true;

    this.img_game_over.events.onInputDown.add(this.listener, this);

    console.log("create3")
  }

  listener(){
    this.state.start('Game')
  }
}