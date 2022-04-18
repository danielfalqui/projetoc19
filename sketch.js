var towerImg,tower;
var ghostImg,ghost;
var coinImg,coin,coinGroup;
var diamanteImg,diamante,diamanteGroup;
var coins = 0;

var gameState = "espera";

function preload(){
 towerImg = loadImage("tower.png");
 ghostImg = loadImage("ghost-standing.png");
 coinImg = loadImage("coin.png");
 diamanteImg = loadImage("diamante.png");
}

function setup() {
 createCanvas(600, 600);

 coinGroup = new Group();
 diamanteGroup = new Group();

 tower = createSprite(300,300);
 tower.addImage("tower",towerImg);
 tower.velocityY = 1;

 ghost = createSprite(200,200,50,50);
 ghost.scale = 0.5
 ghost.addImage("ghost",ghostImg);

}

function draw() {
    
    
    if(gameState === "play"){

    if(tower.y > 400){
        tower.y = 300
          }
    if(keyDown("LEFT_ARROW")){
     ghost.x = ghost.x-3;
     }
    if(keyDown("RIGHT_ARROW")){
     ghost.x = ghost.x+3;
     }
    if(keyDown("SPACE")){
     ghost.velocityY = -12;
          }      
    ghost.velocityY = ghost.velocityY+0.8;

    if(coinGroup.isTouching(ghost)){
        coins = coins+1;
        coinGroup.destroyEach();
      }
   
    spawnCoins();
    spawnDiamante();
   
    }

 if(ghost.y > 600 || diamanteGroup.isTouching(ghost)){
    ghost.destroy();
    gameState = "end";
  }
 drawSprites();
 if(gameState === "espera"){
  background("black")
  textSize(30);
  stroke("green");
  fill("red");
  text("aperte espaço", 200, 200);
  if(keyDown("SPACE")){
    gameState = "play";
   }      
}
 stroke("red");
 fill("blue");
 textSize(15);
 text("money: "+ coins, 50,50);
 if(gameState === "end"){
    background("black");
    textSize(30);
    stroke("green");
    fill("red");
    text("bye bye friend", 200, 200);
     }      
  }
 
function spawnCoins(){
    if(frameCount % 240 === 0)
    {
    coin = createSprite(200,-50,10,10);
    coin.x = Math.round(random(120,400));
    coin.scale = 0.1;
    coin.velocityY = 2;
    coin.addImage(coinImg);
    
    coin.lifeTime = 400;

    ghost.depth = coin.depth;
    ghost.depth += 1;

    coinGroup.add(coin)
    }
}

function spawnDiamante(){
  if(frameCount % 240 === 0)
  {
  diamante = createSprite(200,-50,10,10);
  diamante.x = Math.round(random(120,400));
  diamante.scale = 0.1;
  diamante.velocityY = 3;
  diamante.addImage(diamanteImg);
  
  diamante.lifeTime = 400;

  ghost.depth = diamante.depth;
  ghost.depth += 1;

  diamanteGroup.add(diamante)
  }
}