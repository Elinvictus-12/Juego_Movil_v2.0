const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 360,
  height: 640,
  backgroundColor: '#222',
  scale: {
    mode: Phaser.Scale.FIT
  },
  scene: {
    preload,
    create
  }  
};

const game = new Phaser.Game(config);

let score = 0;
let personaje;
let indexPersonaje = 0;

let personajes = [
  'assets/CH1.png',
  'assets/CH2.png',
  'assets/CH3.png'
];

function preload() {
  this.load.image('player1', personajes[0]);
  this.load.image('player2', personajes[1]);
  this.load.image('player3', personajes[2]);
}

function create() {
  const scene = this;
 
  personaje = this.add.image(300, 300, 'player1');
  personaje.setInteractive();
  personaje.setScale(0.3);

  personaje.on('pointerdown', () => {
    score++;
    document.getElementById("score").innerText = "Puntos: " + score;

    personaje.x = Phaser.Math.Between(50, 310); 
    personaje.y = Phaser.Math.Between(50, 590);

    if (score === 10) {
      document.getElementById("titulo").innerText = "¡Ganaste!";
      personaje.disableInteractive();
      scene.time.delayedCall(2000, () => {
        scene.scene.restart();
      });
    }
  });

  document.getElementById("cambiarPersonaje").addEventListener('click', () => {
    indexPersonaje = (indexPersonaje + 1) % personajes.length;
    personaje.setTexture('player' + (indexPersonaje + 1));
  });
}
