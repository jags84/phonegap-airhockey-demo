enchant();
var aux = 0;
var currentPadX = 0;
var currentPadY = 0;
var startTime = 0;
var endTime = 0;
var valueX = 0;
var valueY = 0;
var moving = false;

window.onload = function(){
		var game = new Core(300, 400);
		game.fps = 40;
		game.preload("img/pad.png","img/court.png","img/court2.png");
		game.onload = function(){

			var pad = new Sprite(48, 48);
			pad.image = game.assets["img/pad.png"];
			pad.x = 0;
			pad.y = 0;
			pad.frame = 0;
			window.pad = pad;
			var court = new Sprite(120,45);
			court.image = game.assets["img/court.png"];
			court.x = 90;
			court.y = 0;
			court.frame = 5;

			game.rootScene.addChild(pad);
			game.rootScene.addChild(court);
			pad.tl.on("actionend",function(evt){
				console.debug("ENDED");
			})
			pad.addEventListener("enterframe", function(){
				if (this.x < 0){
					valueX = 1;
					this.tl.clear();
					this.x = 0;
				}
				if ((this.x+50) > game.width){
					valueX = -1
					this.tl.clear();
					this.x = game.width - 50
				}

				if (this.y < 0){
					valueY = 1;
					this.tl.clear();
					this.y = 0
				}
				if ((this.y+50) > game.height){
					valueY = -1
					this.tl.clear();
					this.y = game.height - 50
				}

				if (moving){
					this.x += valueX;
					this.y += valueY;					
				}

				if(pad.intersect(court)) {
					court.image = game.assets["img/court2.png"];
				}else{
					court.image = game.assets["img/court.png"];
				}

			});

			pad.addEventListener("touchstart", function(){
				starTime = new Date().getTime() / 1000;
				currentPadX = this.x
				currentPadY = this.y
			});

			pad.on('touchmove', function(evt){
				this.x = evt.x;
				this.y = evt.y;
			});

			pad.on('touchend', function(evt){
				endTime = new Date().getTime() / 1000;
				deltaY = this.y - currentPadY
				deltaX = this.x - currentPadX
				sp = speed(deltaX,deltaY)
				movePad(game,pad,deltaX,deltaY)
				angle = toDegrees(Math.atan2(deltaY,deltaX))
				moving = true;
			});

		};
		game.start();
};

function toDegrees (angle) {
  return angle * (180 / Math.PI);
}

function distance(x,y){
	a = x*x
	b = y*y;
	c = Math.sqrt(a+b)
	return c
}

function speed(x,y){
	time = endTime - starTime
	sp = distance(x,y)/time
	return sp;
}

function movePad(game,pad,x,y){
	cwidth = game.width;
	cheight = game.height;

	for (i=1;i<6;i++){
		pad.tl.moveBy(x,y,i*15);
		// if ((x>0) && (y>0)){
		// 	// Abajo a la derecha
		// 	pad.tl.moveBy(x,y,i*15);
		// }else if((x>0) && (y<0)){
		// 	// Arriba a la derecha
		// 	pad.tl.moveBy(x,y,i*15);
		// }else if((x<0) && (y<0)){
		// 	// Arriba a la izquierda
		// 	pad.tl.moveBy(x,y,i*15);
		// }else if((x<0) && (y>0)){
		// 	// Abajo a la izquierda
		// 	pad.tl.moveBy(x,y,i*15);
		// }
		if (i==5){
			moving=false;
		}
	}
}
