'use strict';

let state = 'title';
let cnv;
let points = 0;
let w = 600;
let h = 600;
let player;
let coins = [];
let playerImg;
let coinImg;

function preload() {
  playerImg = loadImage("assets/turtle.png");
  coinImg = loadImage("assets/seaweed.png");
}

function setup() {
  cnv = createCanvas(w, h);

  textFont('Arial Black');

  player = new Player();
  //  coins[0] = new coins();
  coins.push(new Coin());

}

function draw() {
  switch (state) {
    case 'title':
      title();
      cnv.mouseClicked(titleMouseClicked);
      break;
    case 'level 1':
      level1();
      cnv.mouseClicked(level1MouseClicked);
      break;
    case 'you win':
      youWin();
      cnv.mouseClicked(youWinMouseClicked);
      break;
    default:
      break;
  }
}

function keyPressed() {
  if (keyCode == LEFT_ARROW) {
    player.direction = 'left'
  } else if (keyCode == RIGHT_ARROW) {
    player.direction = 'right'
  } else if (keyCode == UP_ARROW) {
    player.direction = 'up'
  } else if (keyCode == DOWN_ARROW) {
    player.direction = 'down'
  } else if (key == ' ') {
    player.direction = 'still';
  }
}
///spacebar is ''


function title() {
  background(137, 252, 182);
  textSize(60);
  textAlign(CENTER);
  fill(14, 17, 44);
  text('CLICKING GAME', w / 2, h / 5);
  textSize(25);
  text('click anywhere to begin', w / 2, h / 2);
}

function titleMouseClicked() {
  console.log('canvas is clicked on title page');
  state = 'level 1'
}

function level1() {
  background(87, 251, 234);
  //text('tap-tap-tap!', w / 2, h / 2);
  if (random(1) <= 0.01) {
    coins.push(new Coin());
  }

  player.display();
  player.move();

  //iteration throught coins array to display and move items

  //using for loop
  for (let i = 0; i < coins.length; i++) {
     coins[i].display();
     coins[i].move();
    }

  //using forEach loop; can use index
  //coins.forEach(function(coin){
  //coin.display();
  //  coin.move();
  //  })

  //using a for of loop, but no acess to index in this loop
  // for (let coin of coins) {
  //   coin.display();
  //   coin.move();
  // }


  //check for collsion, if there is a collsion increase points by 1 and splice that coin out of the array
  // need to iterate backward through the array

  for (let i = coins.length - 1; i >= 0; i--)
    if (dist(player.x, player.y, coins[i].x, coins[i].y) <= (player.r + coins[i].r) / 2) {
      points++;
      coins.splice(i, 1);
    } else if (coins[i].y > h){
      coins.splice(i, 1);
      console.log('coin is out of town');
    }

  text(`points: ${points}`, w / 6, h - 30);
}

function level1MouseClicked() {
  //points++;
  //  console.log('points = ' + points);
  //  if (points >= 10) {
  //  state = 'you win'
  //}
  //n:points = points += 1; short hand is --> points++;
}

function youWin() {
  background(251, 87, 186);
  textSize(80);
  stroke(255);
  text('YOU WIN', w / 2, h / 4);
  textSize(30);
  text('click anywhere to restart', w / 2, h / 2);

}

function youWinMouseClicked() {
  state = 'level 1';
  points = 0;
}
