import Phaser from 'phaser'
import globals from '../globals'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#000000'
  }

  preload () {

  }

  create () {
    this.img_game_over = game.add.sprite(375, 125, 'new_game');
    this.img_game_over.anchor.set(0.5);
    this.img_game_over.inputEnabled = true;
    this.img_game_over.events.onInputDown.add(this.startGame, this);

    this.musicOnOff()
  }

  startGame(){
    this.state.start('Game')
  }

  musicOnOff(){
    if(globals.on_off_music==="ON"){
      globals.on_off_music="OFF"
      this.addMusicIcon("music_off")
    }else{
      globals.on_off_music="ON"
      this.addMusicIcon("music_on")
    }
  }

  addMusicIcon(icon_name){
    this.img_game_over = game.add.sprite(375, 325, icon_name);
    this.img_game_over.anchor.set(0.5);
    this.img_game_over.inputEnabled = true;
    this.img_game_over.events.onInputDown.add(this.musicOnOff, this);
  }

}