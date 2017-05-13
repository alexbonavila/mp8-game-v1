import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {}

  preload () {

  }

  create () {
    this.firstBuildGame2()

    //Added physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    //Creating and capturing cursors
    this.cursor = this.input.keyboard.createCursorKeys()
    this.input.keyboard.addKeyCapture([Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.RIGHT, Phaser.Keyboard.LEFT])


    this.createPlayer()
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
    this.player = this.game.add.sprite(1, 1, 'dude')
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


}