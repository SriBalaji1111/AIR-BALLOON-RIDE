var balloon,balloonImage1,balloonImage2;
var positionRef;
var position;
var database;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }


function setup() {
  
  createCanvas(1500,700);

  database = firebase.database();
  
  positionRef = database.ref('balloon/height');
  positionRef.on("value", readPosition, showError);
  
  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  textSize(20); 
}


function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
	writePosition(-3,0);
	
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(3,0);
    
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(0,-3);
	balloon.scale = balloon.scale - 0.001;
	
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(0,+3);	
	balloon.scale = balloon.scale + 0.001;
  }

  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
  drawSprites();
}

function writePosition(x,y){
	
	database.ref('balloon/height').set({
		
		x: balloon.x + x,
		y: balloon.y + y
		
	})
}

function readPosition(data){

  position = data.val();	
  balloon.x = position.x;
  balloon.y = position.y;
	
}
function showError(){

  console.log("Error accessing Database");	
	
}