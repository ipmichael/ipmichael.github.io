
function Player(name, color, x, y){

	if(name==undefined){
		this.name = "undefined name";
	}else{
		this.name = name;
	}
	if(color==undefined){
		this.color = "black";
	}else{
		this.color = color;
	}
	if(x==undefined){
		this.x = 0;
	}else{
		this.x = x;
	}
	if(y==undefined){
		this.y=0;
	}else{
		this.y = y;
	}
	
	/*Defaults*/
	this.width = 5;
	this.height = 5;
	this.velX = 0;
	this.velY = 0;
	this.speed = 3;
	this.jumping = false;
	
	/*Values for collision*/
	this.top = y;
	this.left = x;
	this.right = x+width;
	this.bottom = y+height;
	this.coins=0;
	this.onPlatform = false;

}

Player.prototype.jump = function() {
  if(!this.jumping){
    this.jumping = true;
    this.velY = -this.speed*2;
   }
};
Player.prototype.goRight = function(){
	 if (this.velX < this.speed) {                         
         this.velX++;                  
     }          
}
Player.prototype.goLeft = function(){
	if(-this.velX <this.speed){
		this.velX--;
	}
}
Player.prototype.gotCoin = function(){
	this.coins++;
}

