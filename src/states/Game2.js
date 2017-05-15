import Phaser from 'phaser'
import globals from '../globals'

export default class extends Phaser.State {
  init () {}

  preload () {

  }

  create () {
    globals.level=2;


    this.firstBuildGame2()

    //Added physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    //Creating and capturing cursors
    this.cursor = this.input.keyboard.createCursorKeys()
    this.input.keyboard.addKeyCapture([Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.RIGHT, Phaser.Keyboard.LEFT])


    this.createPlayer()



    this.levelText = this.game.add.text(15, 5, 'Level '+ globals.level, {fontSize: '16px', fill: '#ffff'})
    this.levelText.fixedToCamera = true

    if (!this.game.device.desktop) {
      this.addMobileInputs()
    }
  }

  update () {
    this.game.physics.arcade.collide(this.player, this.groundLayer2)

    this.inputs()
  }

  render () {
    // if (__DEV__) {
    //   this.game.debug.spriteInfo(this.mushroom, 32, 32)
    // }
  }


  firstBuildGame2(){
    this.map = this.game.add.tilemap('tilemap2')
    this.map.addTilesetImage('P6yozhP', 'tiles')

    this.backgroundlayer2 = this.map.createLayer('BackgroundLayer2')
    this.groundLayer2 = this.map.createLayer('GroundLayer2')
    this.styleLayer2 = this.map.createLayer('StyleLayer2')

    this.map.setCollisionBetween(1, 100, true, 'GroundLayer2')

    this.backgroundlayer2.resizeWorld()

    //this.map.setCollisionBetween(1, 10000, true, 'GroundLayer2');

    //Scale
    //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true
    this.scale.updateLayout()
  }


  createPlayer() {
    //Create player
    this.player = this.game.add.sprite(35, 450, 'dude')
    this.game.physics.arcade.enable(this.player)

    //The camera follows the player
    this.game.camera.follow(this.player)

    //Ativating collides grevity
    this.player.body.bounce.y = 0.2
    this.player.body.gravity.y = 420
    this.player.body.collideWorldBounds = true

    //adding anifations to walk left and right
    this.player.animations.add('left', [0, 1, 2, 3], 10, true)
    this.player.animations.add('right', [5, 6, 7, 8], 10, true)
  }

  inputs () {
    if (this.cursor.left.isDown || this.moveLeft) {
      this.player.body.velocity.x = -200
      this.player.animations.play('left');

    } else if (this.cursor.right.isDown || this.moveRight) {
      this.player.body.velocity.x = 200
      this.player.animations.play('right');

    } else {
      this.player.animations.stop();
      this.player.frame = 4;
      this.player.body.velocity.x = 0
    }

    //  Allow the player to jump if they are touching the ground.
    if (this.cursor.up.isDown)
    {
      this.jumpPlayer();
    }
  }

  jumpPlayer () {
    if (this.player.body.onFloor())
    {
      this.player.body.velocity.y = -350;
    }
  }

  addMobileInputs () {
    this.jumpButton = this.add.sprite(430, 130, 'jump')
    this.jumpButton.inputEnabled = true
    this.jumpButton.events.onInputDown.add(this.jumpPlayer, this)
    this.jumpButton.alpha = 0.5

    this.moveLeft = false
    this.moveRight = false

    this.leftButton = this.add.sprite(10, 130, 'left')
    this.leftButton.inputEnabled = true
    this.leftButton.events.onInputOver.add(function () {
      this.moveLeft = true
    }, this)
    this.leftButton.events.onInputOut.add(function () {
      this.moveLeft = false
    }, this)
    this.leftButton.events.onInputDown.add(function () {
      this.moveLeft = true
    }, this)
    this.leftButton.events.onInputUp.add(function () {
      this.moveLeft = false
    }, this)
    this.leftButton.alpha = 0.5

    this.rightButton = this.add.sprite(110, 130, 'right')
    this.rightButton.inputEnabled = true
    this.rightButton.events.onInputOver.add(function () {
      this.moveRight = true
    }, this)
    this.rightButton.events.onInputOut.add(function () {
      this.moveRight = false
    }, this)
    this.rightButton.events.onInputDown.add(function () {
      this.moveRight = true
    }, this)
    this.rightButton.events.onInputUp.add(function () {
      this.moveRight = false
    }, this)
    this.rightButton.alpha = 0.5
  }

}