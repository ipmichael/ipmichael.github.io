function Coin(x,y){
	
	this.x = x;
	this.y = y;
	this.stillExists= true;
	this.width = 5;
	this.height = 5;
	this.stillExists = true;

	/*Values for box collision*/
	this.top = this.y;
	this.left = this.x;
	this.right = this.x + this.width;
	this.bottom = this.y + this.height;


}
Coin.prototype.collect = function(){
	this.stillExists=false;
}