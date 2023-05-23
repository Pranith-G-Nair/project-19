var PLAY = 1;
var END = 0;
var gameState = PLAY;
var bg,bgimg
var astronaut, astronaut_running, astronaut_collided;
var ground, invisibleGround, groundImage;
var alien,alienimg
var bulletsGroup, bulletsImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound
var spaceKeyActive=true

function preload(){
  astronaut_running = loadAnimation("two.png","three.png","four.png","five.png",
  "six.png","seven.png","eight.png","nine.png");
  bulletsImage= loadImage("bullets.png")
  bgimg = loadImage("background2.png")
 alienimg=loadImage("alien.png")
 astronaut_collided=loadAnimation("collided.png")
}

function setup() {
  createCanvas(1300, 650);

  bg=createSprite(600,325)
  bg.addImage(bgimg)
  bg.scale=1.9
  bg.velocityX=-2
  
 astronaut = createSprite(100,460,20,50);
 astronaut.addAnimation("running", astronaut_running);
 astronaut.addAnimation("collided",astronaut_collided)
 astronaut.scale = 0.5;

 alien=createSprite(1200,460,20,50)
 alien.addImage(alienimg)
 alien.scale=0.6

 bulletsGroup=new Group()
 
 invisibleGround = createSprite(50,600,400,10);
 invisibleGround.visible = false;
  
 
}

function draw() {
  
  background(180);
 if(bg.x<0)
  {
   bg.x=1300
  }
 
  // jump when the space key is pressed
  if(keyDown("space")&& spaceKeyActive && astronaut.y >= 150) {
    astronaut.velocityY = -10;
  }
  
astronaut.velocityY = astronaut.velocityY + 0.8
astronaut .collide(invisibleGround);  
spawnbullets()

if(bulletsGroup.isTouching(astronaut)){
astronaut.changeAnimation("collided",astronaut_collided)
spaceKeyActive=false;

}
drawSprites();}


function reset(){
  gameState = PLAY

  obstaclesGroup.destroyEach()
  cloudsGroup.destroyEach()

  //trex.changeAnimation("running", trex_running)

  score=0

}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnbullets() {
    if (frameCount % 200 === 0) {
    var bullets = createSprite(1100,430);
    bullets.addImage(bulletsImage);
    bullets.scale = 0.2;
    bullets.velocityX = -3;
    
     //assign lifetime to the variable
    bullets.lifetime = 400;
        
    //add each cloud to the group
    bulletsGroup.add(bullets);
  }
}

