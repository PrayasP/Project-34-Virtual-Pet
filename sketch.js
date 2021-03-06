var dog, happyDog, database, foodS, foodStock;

function preload()
{
	dog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500,500);
  database = firebase.database();

  dogSprite = createSprite(250,250);
  dogSprite.addImage(dog);
  dogSprite.scale = 0.24;

  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
  
}


function draw() {  

  background(46, 139, 87);

  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dogSprite.addImage(happyDog);
  }


  drawSprites();
  textSize(17);
  fill("BLACK");
  text("Food remaining: "+foodS,150,80);
  textSize(18);
  text("Note : Press UP ARROW to feed ", 90,10,300,20);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
if(x<= 0){
  x =0;
}else{
  x = x-1;
}

database.ref('/').update({
  Food: x,
})
}




