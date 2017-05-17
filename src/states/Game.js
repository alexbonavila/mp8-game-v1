/* globals __DEV__ */
import Phaser from 'phaser'
import globals from '../globals'
import Mushroom from '../sprites/Mushroom'

export default class extends Phaser.State {
  init () {}

  preload () {

  }

  create () {
    globals.level = 'Level 1'
    globals.score = 0
    globals.lives = 3

    this.firstBuildGame1()

    //Added physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    //Creating and capturing cursors
    this.cursor = this.input.keyboard.createCursorKeys()
    this.input.keyboard.addKeyCapture([Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.RIGHT, Phaser.Keyboard.LEFT])

    this.createPlayer()

    this.addStars()

    this.addEnemy()

    this.addBlueStar()

    this.coinSound = this.game.add.audio('coin', 0.2)
    this.jumpSound = this.game.add.audio('jump', 0.2)
    this.backMusic = this.game.add.audio('back', 0.1, true);
    //this.backMusic.play();

    this.levelText = this.game.add.text(15, 5, globals.level, {fontSize: '16px', fill: '#ffff'})
    this.levelText.fixedToCamera = true

    this.scoreText = this.game.add.text(15, 20, 'Score: ' + globals.score, {fontSize: '16px', fill: '#ffff'})
    this.scoreText.fixedToCamera = true

    this.addLives()

    if (!this.game.device.desktop) {
      this.addMobileInputs()
    }
  }

  update () {
    this.game.physics.arcade.collide(this.player, this.groundLayer)
    this.game.physics.arcade.collide(this.stars, this.groundLayer)
    this.game.physics.arcade.collide(this.blue_star, this.groundLayer)
    this.game.physics.arcade.collide(this.enemy, this.groundLayer)

    this.game.physics.arcade.overlap(this.player, this.stars, this.takeStar, null, this)
    this.game.physics.arcade.overlap(this.player, this.blue_star, this.nextLevel, null, this)

    this.inputs()
    this.enemyMovement()
  }

  render () {
    if (globals.level === 'Level 2') {
      this.state.start('Game2')
    }
  }

  firstBuildGame1 () {
    this.map = this.game.add.tilemap('tilemap')
    this.map.addTilesetImage('P6yozhP', 'tiles')

    this.backgroundlayer = this.map.createLayer('BackgroundLayer')
    this.groundLayer = this.map.createLayer('GroundLayer')

    this.map.setCollisionBetween(1, 100, true, 'GroundLayer')

    this.backgroundlayer.resizeWorld()

    //this.map.setCollisionBetween(1, 10000, true, 'GroundLayer');

    //Scale
    //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true
    this.scale.updateLayout()
  }

  createPlayer () {
    //Create player
    this.player = this.game.add.sprite(1, 450, 'dude')
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

  addStars () {
    this.stars = this.game.add.group()

    //  We will enable physics for any star that is created in this group
    this.stars.enableBody = true

    var x_axis_star = 50

    for (var i = 0; i < 8; i++) {
      this.star = this.stars.create(x_axis_star, 250, 'star')
      this.star.body.gravity.y = 700
      this.star.body.bounce.y = 0.7 + Math.random() * 0.2

      if (i === 4) {
        x_axis_star = x_axis_star + 250
      } else {
        x_axis_star = x_axis_star + 200
      }

    }
  }

  addEnemy () {
    this.enemy = this.game.add.group()
    this.enemy.enableBody = true

    this.enemy1 = this.enemy.create(180, 750, 'enemy')
    this.enemy2 = this.enemy.create(1530, 400, 'enemy')

    this.enemy1.body.gravity.y = 300
    this.enemy1.body.velocity.x = 40
    this.enemy2.body.gravity.y = 300
    this.enemy2.body.velocity.x = 80

  }

  addBlueStar () {
    this.blue_star = this.game.add.sprite(1975, 250, 'blue_star')
    this.game.physics.arcade.enable(this.blue_star)

    this.blue_star.body.gravity.y = 700
  }

  addLives () {
    this.lives = game.add.group()
    var x_axis=15;

    for (var i = 0; i < globals.lives; i++) {
      this.heart = this.game.add.sprite(x_axis, 40, 'heart')
      this.heart.fixedToCamera = true
      x_axis+=30
    }

    this.lives.fixedToCamera = true;

  }

  takeStar (player, star) {
    star.body.enable = false
    game.add.tween(star.scale).to({x: 0}, 150).start()
    game.add.tween(star).to({y: 50}, 150).start()

    globals.score += 10
    this.scoreText.text = 'Score: ' + globals.score
    this.coinSound.play()
  }

  jumpPlayer () {
    if (this.player.body.onFloor()) {
      this.player.body.velocity.y = -350
      this.jumpSound.play()
    }
  }

  nextLevel () {
    globals.level = 'Level 2'
  }

  enemyMovement () {
    if (parseInt(this.enemy1.body.x) > 280) {
      this.enemy1.body.velocity.x = -40
    } else if (parseInt(this.enemy1.body.x) < 180) {
      this.enemy1.body.velocity.x = 40
    }

    if (parseInt(this.enemy2.body.x) > 1530) {
      this.enemy2.body.velocity.x = -80
    } else if (parseInt(this.enemy2.body.x) < 1290) {
      this.enemy2.body.velocity.x = 80
    }
  }

  inputs () {
    if (this.cursor.left.isDown || this.moveLeft) {
      this.player.body.velocity.x = -200
      this.player.animations.play('left')

    } else if (this.cursor.right.isDown || this.moveRight) {
      this.player.body.velocity.x = 200
      this.player.animations.play('right')

    } else {
      this.player.animations.stop()
      this.player.frame = 4
      this.player.body.velocity.x = 0
    }

    //  Allow the player to jump if they are touching the ground.
    if (this.cursor.up.isDown) {
      this.jumpPlayer()
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
