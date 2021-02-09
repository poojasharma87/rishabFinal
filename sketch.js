
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var platforms=[];
var robos=[];
var score=0;
var roboGroup;
gameState="play";
function preload()
{
	
	  
	 gunImg=loadImage("Delta blasters.png");

	 swordImg=loadImage("Samuraisword.png");

	 playerRunning=loadAnimation("Red--unscreen.gif");
	 playerAttack = loadAnimation("Final-unscreen.gif");

	 vrakImg=loadImage("Vrak.png");

	 robotImg=loadImage("Robo.png");
							

	  gameBackground = loadImage('https://la-wit.github.io/build-an-infinite-runner/build/images/environments/industrialBackground.png');
platformBackground = loadImage('https://la-wit.github.io/build-an-infinite-runner/build/images/environments/industrialPlatform.png');
                      
}

function setup() {
	createCanvas(800,400);
	backgr=createSprite(400,200,1600,400);
	backgr.addImage(gameBackground);
	backgr.scale=1.0;
	backgr.velocityX=-2;
	backgr.x=backgr.width/2;

	player=createSprite(100,370,100,100);	
	player.addAnimation("running",playerRunning);
	player.addAnimation("attack", playerAttack);
	player.scale=0.5;
	player.setCollider("rectangle",-60,0,150,200);

	vrak=createSprite(250,300,50,50);
	  vrak.addImage(vrakImg);
	  vrak.velocityX=-2;
	  vrak.scale=0.5;
	  vrak.visible=false;
    //player.debug=true;
	roboGroup = new Group();

	engine = Engine.create();
	world = engine.world;
	
	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(255);
 
    if(gameState==="play")
  {
    if (backgr.x < 350){
      backgr.x = backgr.width/2;
    }
   if (keyDown("space") && player.y>200) {
	   player.velocityY=-10;
   }
   player.velocityY=player.velocityY+0.5;
   console.log(player.y);
   if (keyWentDown("s")) {
	   player.changeAnimation("attack",playerAttack);
	   player.scale=0.8;
   }
   if (keyWentUp("s")) {
	player.changeAnimation("running",playerRunning);
	player.scale=0.5;
}
	spawnPlatforms();
	//spawnMonsters();
  for( var i=0;i<platforms.length;i++ ){
	
    player.collide(platforms[i]);
  
  for( var j=0;j<robos.length;j++ ){
	
    robos[j].collide(platforms[i]);
	
	
  }
}
if(roboGroup.isTouching(player)){
	roboGroup.destroyEach();
	score=score+1;
   }
  console.log(player.x);
  if (player.x<100) {
	  player.x=100;
  }
  if(score>=5){
	  robo.setVelocityXEach(0);
  }
}
if (gameState==="end"){
background(0);
}
  drawSprites();
  textSize(30);
  fill(255);
  text("Score "+score,650,50);
}

function spawnPlatforms() {
  //write code here to spawn the platforms
  if (frameCount % 60 === 0) {
	platbg=createSprite(random(50,700),350,random(10,30),30);
	platbg.addImage(platformBackground);
	platbg.velocityX=-2;
	platbg.scale=0.25;
   // platbg.debug=true;
    
     //assign lifetime to the variable
	 robo=createSprite(platbg.x,350,50,50);
	  robo.addImage(robotImg);
	  robo.velocityX=-2;
	  robo.scale=1.1;
	  //robo.debug=true;
	  robo.setCollider("rectangle",0,0,30,100);
	  
	  
	   //assign lifetime to the variable
	  robo.lifetime = 200;
	  
	 
	  robos.push(robo);
	  roboGroup.add(robo);
	  //console.log(robo.x);
    platbg.lifetime = 200;
    
   
	platforms.push(platbg);
	//console.log(platbg.x);
  }
  
}

function spawnMonsters() {
	//write code here to spawn the platforms
	if (frameCount % 100 === 0) {
	  robo=createSprite(70,300,50,50);
	  robo.addImage(robotImg);
	  robo.velocityX=-2;
	  robo.scale=1.1;
	  robo.debug=true;
	  robo.setCollider("rectangle",0,0,30,100);
	  
	  
	   //assign lifetime to the variable
	  robo.lifetime = 200;
	  
	 
	  robos.push(robo);
	  roboGroup.add(robo);
	  console.log(robo.x);
	}
	
  }
 



