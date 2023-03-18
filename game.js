const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);

function preload() {
    this.load.spritesheet("dude", "assets/dude.png", {
        frameWidth: 32,
        frameHeight: 48,
    });

  this.load.image("enemy", "assets/star.png");
  this.load.image("bomb", "assets/bomb.png");
}

let hero;
let heroSpeed = 200;
let bullets;


function create() {
    hero = this.physics.add.sprite(400, 300, 'dude');
  
    enemies = this.physics.add.group();
    bullets = this.physics.add.group();
    for (let i = 0; i < 10; i++) {
      let enemy = enemies.create(
        Phaser.Math.Between(0, 800),
        Phaser.Math.Between(0, 600),
        'enemy'
      );
      enemy.setCollideWorldBounds(true);
    }
    
    
  this.physics.add.collider(hero, enemies, () => {
    hero.destroy();
  });

   // Add input controls
   cursors = this.input.keyboard.createCursorKeys();
   fireButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  

}

function update() {

    enemies.getChildren().forEach((enemy) => {
        enemy.setVelocity(
          Phaser.Math.Between(-200, 200),
          Phaser.Math.Between(-200, 200)
        );
      });

      // Move the player
  if (cursors.left.isDown) {
    hero.setVelocityX(-200);
  } else if (cursors.right.isDown) {
    hero.setVelocityX(200);
  } else {
    hero.setVelocityX(0);
  }
  if (cursors.up.isDown) {
    hero.setVelocityY(-200);
  } else if (cursors.down.isDown) {
    hero.setVelocityY(200);
  } else {
    hero.setVelocityY(0);
  }

  // Fire a bullet
  if (fireButton.isDown) {
    let bullet = bullets.create(hero.x, hero.y, 'bomb');
    bullet.setVelocityY(-400);
  }

      
}

function attack() {
    let closestEnemy = enemies.getClosest(hero);
    if (closestEnemy && Phaser.Math.Distance.Between(hero.x, hero.y, closestEnemy.x, closestEnemy.y) < 50) {
      killEnemy(closestEnemy);
    }
  }

function killEnemy(enemy) {
    enemy.disableBody(true, true);
    if (enemies.countActive() === 0) {
      // Spawn boss

      alert('BOSS TIME')
    }
  }