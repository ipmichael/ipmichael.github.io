(function() {
   		 var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
   		
   		 window.requestAnimationFrame = requestAnimationFrame;
		
		})();

		var canvas = document.getElementById("canvas"),
		ctx = canvas.getContext("2d"),
		width = 500,
		height = 230,
		keys = [],
		friction = 0.9,
		gravity = 0.3,
    numCoins = 15,
    scoreSection = 30;
    
		/*Declares the players and puts them into an array*/
		var player1 = new Player("Azam","#d8480e",width/2,height-5);
		var player2 = new Player("Nabil","#840ed8",width/3,height-5);
    
    var imageCoin = new Image;
    var imagePlatform = new Image;
    var imageBlast = new Image;
    imageCoin.src = "Practice_game/bitcoin.jpg";
    imagePlatform.src = "Practice_game/platform.jpg";
    imageBlast = new Image;
    var coinSound = new Audio('Practice_game/coin.wav');
    var jumpSound = new Audio('Practice_game/jump.wav');
    var gameOver = new Audio('Practice_game/game_over.mp3');
		var players =[player1,player2];
    var coins = {};
    var platforms = {};
    var start = new Date;


    /*Create all the platforms*/
    for(i =0; i<5;i++){
      /*randomly choose x and y coordinates for platform*/
      var randomX = (Math.random()* (width - (6 * player1.width))) + (player1.width*6),
      randomY =(Math.random() *(height - (player1.height * 6))) + scoreSection;
     
      platforms[i] = {
      x: randomX,
      y: randomY,
      height: (6 * player1.height),
      width: 6 * (player1.width),
      top: randomY,
      left: randomX,
      right: randomX +( 4 * player1.width),
      bottom: randomY + (4*player1.height)

    };
    }
    
    /*Instiate all the coins with random locations on the canvas*/
    for(i=0; i<numCoins; i++){

        coins[i] = new Coin((Math.random() * (width- player1.width)) + player1.width,
          (Math.random()*(height - player1.height ))+scoreSection);
    }

		canvas.width = width;
		canvas.height = height; 

	/*Returns true if there is going to be a collision*/
  function checkCollision(player1, player2){

      return !(player1.bottom < player2.top || player1.top > player2.bottom ||
        player1.left > player2.right || player1.right <player2.left);
  }
  function checkPlatformCollision(currentPlayer){

    var found=false;
    for(var i=0;i<5;i++){
      
      if(!(currentPlayer.bottom < platforms[i].top || currentPlayer.top > platforms[i].bottom ||
    
        currentPlayer.left > platforms[i].right || currentPlayer.right < platforms[i].left)){
         

              
              /*The bottom of the player can only be 4 pixels or less from the platform*/
              if(currentPlayer.bottom > platforms[i].top + currentPlayer.height +2){
                
                currentPlayer.jumping = false;
                currentPlayer.velY =0;
                
                currentPlayer.velX*= friction/1.5;
                //currentPlayer.y = platforms[i].y-currentPlayer.height;
                currentPlayer.onplatform = true;
                found=true;
              }
            
       }
    
    }
     if(!found){
            currentPlayer.onplatform = false;
            
      }
       
  }
	function drawPlayer(currentPlayer){
      ctx.fillStyle= currentPlayer.color;
      ctx.fillRect(currentPlayer.x, currentPlayer.y,currentPlayer.width,currentPlayer.height);
     
  }
  function drawPlatforms(){
    for(var i =0; i<5;i++){
       ctx.drawImage(imagePlatform,platforms[i].x,platforms[i].y,
        platforms[i].width,platforms[i].height);
    }
   
  }
  
  function movePlayer1(currentPlayer){
      if (keys[38] ) {
           // up arrow or space
           if(!currentPlayer.jumping){
            jumpSound.play();
           }
           
          currentPlayer.jump();
          
      }
      if (keys[39]) {
             // right arrow
             currentPlayer.goRight();     
      }          
      if (keys[37]) {                 
            currentPlayer.goLeft();
      }
  }
  
  function blast(currentPlayer){
    
    var radius = 20;


  }
  function movePlayer2(currentPlayer){
  
    if (keys[87]){
      //w key
       if(!currentPlayer.jumping){
            jumpSound.play();
      }  
      currentPlayer.jump();
     
    }
    if(keys[65]){
      //a key
      currentPlayer.goLeft();
    }
    if(keys[68])
      //d key
      currentPlayer.goRight();
    if(keys[32]){
      blast(currentPlayer);
    }
  }
  function drawCoins(coins){
    
    
    for(var i=0; i<numCoins;i++){
      
      if(coins[i].stillExists){
        
        ctx.drawImage(imageCoin,coins[i].x,coins[i].y);
      }
    }

  }

  function checkCoinCollision(currentPlayer){

    
    for(var i =0; i<numCoins;i++){

      if(coins[i].stillExists){

        if(!(currentPlayer.bottom < coins[i].top || currentPlayer.top > coins[i].bottom ||
        currentPlayer.left > coins[i].right || currentPlayer.right < coins[i].left)){
          
          coins[i].stillExists = false;
          coinSound.play();
          currentPlayer.coins++;
        }

      }
    }

  }

  function checkTime(){
    
    var currentTime = new Date;

    var elapsed  = Math.floor((currentTime.valueOf() - start.valueOf()) /1000);
    ctx.fillText(30-elapsed,width/2,scoreSection);

    if(elapsed >=30){
      
      return true;
    }else{
      
      return false;
    }
  }
  function endGameScreen(){

  }
  /*Function that takes the array of players and renders them*/
		function update(playerz,coins){

      
		  for(var i=0; i<playerz.length;i++){

				var currentPlayer = playerz[i];
				if(currentPlayer.coins >=4){
          gravity = 0.1;        
        }else{
          gravity = 0.3;
        }
			   // check keys
			   var previous_x = currentPlayer.x, previous_y = currentPlayer.y;
   			
        if(currentPlayer.name=="Azam"){
          movePlayer1(currentPlayer);

        }

        if(currentPlayer.name=="Nabil"){
          movePlayer2(currentPlayer);
        }
        /*Slows down the player so they dont keep moving*/
        currentPlayer.velX *=friction;
        if(!currentPlayer.onplatform){
          currentPlayer.velY +=gravity;
        }
        

     
       			   /*Update collision locations*/
        currentPlayer.top = currentPlayer.y;
     	  currentPlayer.left = currentPlayer.x;
        currentPlayer.right = currentPlayer.x+currentPlayer.width;
        currentPlayer.bottom = currentPlayer.y+currentPlayer.height;

        if(Math.abs(currentPlayer.velY) < 0.1){
          currentPlayer.velY = 0;
        }

        if(i+1 == playerz.length && checkCollision(currentPlayer,playerz[0])){
      		/*Player 2 is going to collide with player1*/
          currentPlayer.velX = -currentPlayer.velX;
          currentPlayer.velY = -currentPlayer.velY;

          playerz[0].velY=-playerz[0].velY;
          playerz[0].velX=-playerz[0].velX;
        }
        else if(i==0 &&checkCollision(currentPlayer,playerz[1])) {
          /*Player 1 is going to collide with player2*/
          var magnTtlVelP1 = Math.sqrt()
          currentPlayer.velX = -currentPlayer.velX;
          currentPlayer.velY = -currentPlayer.velY;
          playerz[1].velY= -playerz[1].velY;
          playerz[1].velX= -playerz[1].velX;
          
        }
        
          
           /*Updates the current position of the player*/
        currentPlayer.x += currentPlayer.velX;
        currentPlayer.y += currentPlayer.velY;

        /*Checks to make sure the player hasnt hit the right and left boundaries*/
        if(currentPlayer.x >=width-currentPlayer.width){
          currentPlayer.x= width-currentPlayer.width;
        }else if(currentPlayer.x<=0){
          currentPlayer.x = 0;
        }
        /*Checks to make sure the player hasnt hit the top boundary*/

        if(currentPlayer.y>=height-currentPlayer.height){
          currentPlayer.y = height-currentPlayer.height;
          currentPlayer.jumping=false;
          currentPlayer.velY = 0;
        }

        /*Check to see if the player has collided with any of the coins*/
        checkCoinCollision(currentPlayer);
        checkPlatformCollision(currentPlayer);
        
      }
      ctx.clearRect(0,0,width,height);

      ctx.fillStyle ='#0EB7D8';
      ctx.fillRect(0,0,width,height);
     

      
      /*Call function to paint coins on*/
       drawPlatforms();
       drawCoins(coins);
       
        for(i=0;i<playerz.length;i++){
        drawPlayer(playerz[i]);
      }
      ctx.fillStyle = "#000000" 
      ctx.font="12px Source Code Pro";
      ctx.fillText("Orange score:" + playerz[0].coins,10,scoreSection);
      ctx.fillText("Purple score:" + playerz[1].coins,width-110, scoreSection);
      if(checkTime()){
        
        
        ctx.clearRect(0,0,width,height);
        ctx.fillRect(0,0,width,height);
        ctx.fillStyle="#ffffff";
        ctx.fillText("GAME OVER",width/2-30,height/2);
        if(player1.coins>player2.coins){
          ctx.fillText("Orange Wins!",width/2 -35,height/2 + 15);
        }else if(player2.coins > player1.coins){
          ctx.fillText("Purple Wins!",width/2 -35,height/2 + 15);
        }else{
          ctx.fillText("It's a Tie!",width/2 -35,height/2 + 15);

        }
        gameOver.play();
      }else{
        // run through the loop again
        requestAnimationFrame(function(){
          update(playerz,coins);

        });
      }
    	
		
    }

		
document.body.addEventListener("keydown", function(e) {

    keys[e.keyCode] = true;
   
});
 
document.body.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
    
});
 
window.addEventListener("load",function(){

    update(players,coins);

});
