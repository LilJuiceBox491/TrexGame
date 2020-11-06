var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage, cloudImage, cloudGroup, cloud, ob1, ob2, ob3, ob4, ob5, ob6, obGroup, ob, score, goi, go, rei, re, js, ds, cps;
var PLAY = 1;
var OVER = 0;
var gameState;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  ob1 = loadImage("obstacle1.png")
  ob2 = loadImage("obstacle2.png")
  ob3 = loadImage("obstacle3.png")
  ob4 = loadImage("obstacle4.png")
  ob5 = loadImage("obstacle5.png")
  ob6 = loadImage("obstacle6.png")
  cloudImage = loadImage("cloud.png")
  groundImage = loadImage("ground2.png")
  trex_collided = loadImage("trex_collided.png");
  goi = loadImage("gameOver.png");
  rei = loadImage("restart.png");
  js=loadSound("jump.mp3");
  ds=loadSound("die.mp3");
  cps=loadSound("checkPoint.mp3");
}

function setup() { 
  createCanvas(600, 200);
  
  score = 0;
  
  gameState=PLAY;
  
  go=createSprite(300,90);
  go.addImage(goi);
  go.visible=false;
  
  re=createSprite(300,140);
  re.addImage(rei);
  re.scale=0.75;
  re.visible=false;
  
  cloudGroup=createGroup(); 
  obGroup=createGroup();
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addImage("tc",trex_collided)
  trex.scale = 0.5;
  trex.setCollider("circle",0,0,45);
  trex.debug=true;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -8;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
}

function draw() {
  background("white");
  
  textSize(20)
  fill("black");
  textStyle(BOLD);
  text("Score: "+score,470,40)
  
  if (gameState===PLAY){
  if(keyDown("space")&&trex.y>120) {
    trex.velocityY = -12;
    js.play();  
  }

    
  ground.velocityX = -(10+score/100); 
    
    score=score+Math.round(getFrameRate()/55)
    
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){ 
    ground.x = ground.width/2;
  }
  
  if(score>0&&score%100===0){
    cps.play();
  }  
    
  spawnClouds();
  spawnObby(); 
  
  if(obGroup.isTouching(trex)){
    gameState=OVER;
    ds.play();
  }
}
  
  if(gameState===OVER){
    ground.velocityX=0;
    trex.velocityY=0;
    obGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    obGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    trex.changeImage("tc",trex_collided)
    go.visible=true
    go.depth=cloud.depth+1;
    re.visible=true
    re.depth=cloud.depth+1;
    if(mousePressedOver(re)){
    gameState=PLAY;
    score=0;
    trex.changeAnimation("running", trex_running);
    re.visible=false;
    go.visible=false;
    obGroup.destroyEach(); 
    cloudGroup.destroyEach();
    }
  }
  
  trex.collide(invisibleGround);
  drawSprites();
}

function spawnClouds(){
  if(frameCount%60===0){
    cloud=createSprite(600,Math.round(random(10,120)));
    cloud.addImage(cloudImage);
    cloud.velocityX=-(10+score/300);
    cloud.lifetime=120;
    cloud.scale=0.55;
    cloud.depth=trex.depth;
    trex.depth=trex.depth+1;
    cloudGroup.add(cloud);
  }
}

function spawnObby(){
  if(frameCount%80===0){
    ob=createSprite(600,165);
    ob.velocityX=-(10+score/100);
    ob.lifetime=100;
    ob.scale=0.55;
    var rand=Math.round(random(1,6));
    switch(rand){
      case 1: ob.addImage(ob1);
        break;
      case 2: ob.addImage(ob2);
        break;
        case 3: ob.addImage(ob3);
        break;
        case 4: ob.addImage(ob4);
        break;
        case 5: ob.addImage(ob5);
        break;
        case 6: ob.addImage(ob6);
        break;
        default:break;
    }
    obGroup.add(ob);
  }
}