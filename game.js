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
let game = new Phaser.Game(config);

let player;
let cursors;

let enemies;
let enemyInterval;

let bullets;


function preload() {
    this.load.image("sky", "assets/sky.png");
  this.load.spritesheet("dude", "assets/dude.png", {
    frameWidth: 32,
    frameHeight: 48,
  });

  this.load.image("bullet", "assets/bomb.png");
  this.load.image("enemy", "assets/star.png");
}

function create() {

    this.add.image(400, 300, "sky");
  player = this.physics.add.sprite(100, 450, "dude");
  player.setCollideWorldBounds(true);
  cursors = this.input.keyboard.createCursorKeys();

  enemies = this.physics.add.group();

  enemyInterval = this.time.addEvent({
    delay: 1000,
    callback: spawnEnemy,
    loop: true,
  });

  bullets = this.physics.add.group();
  
  this.input.on("pointerdown", shoot);
  this.input.keyboard.on("keydown-SPACE", shoot);

}

function shoot(pointer) {
    const bullet = bullets.create(player.x, player.y, "bullet");
    const angle = Phaser.Math.Angle.Between(player.x, player.y, pointer.x, pointer.y);
    const velocity = new Phaser.Math.Vector2(Math.cos(angle), Math.sin(angle)).scale(400);
    bullet.setVelocity(velocity.x, velocity.y);
  }
  
function spawnEnemy() {
    const enemy = enemies.create(
      Phaser.Math.Between(0, config.width),
      Phaser.Math.Between(0, config.height),
      "enemy"
    );
    enemy.setVelocity(
      Phaser.Math.Between(-200, 200),
      Phaser.Math.Between(-200, 200)
    );
  }
  

function update() {
    this.physics.overlap(bullets, enemies, hitEnemy);

    if (cursors.left.isDown) {
        player.setVelocityX(-160);
      } else if (cursors.right.isDown) {
        player.setVelocityX(160);
      } else {
        player.setVelocityX(0);
      }
    
      if (cursors.up.isDown) {
        player.setVelocityY(-160);
      } else if (cursors.down.isDown) {
        player.setVelocityY(160);
      } else {
        player.setVelocityY(0);
      }
}

function hitEnemy(bullet, enemy) {
    bullet.destroy();
    enemy.destroy();
  }