(function(w){
	var ITEM_SCALE = 0.5;	//缩放比例

	var ITEM = function(isFirst,y,img){
		this.sigleX = img.width;
		this.sigleY = img.height;
		if(isFirst){
			this.x = (C_W-this.sigleX*ITEM_SCALE)/2;
		}else{
			this.x = Math.random()*(C_W-this.sigleX*ITEM_SCALE);
		}
		this.y = y;
		this.init(img);
	}

	ITEM.prototype = {
		init:function(img){
			this.shape = new createjs.Shape();
			this.shape.graphics.beginBitmapFill(img).drawRect(0, 0, this.sigleX, this.sigleY);
			this.shape.setTransform(this.x, this.y, ITEM_SCALE, ITEM_SCALE);
			this.child = stage.addChild(this.shape);

			if(this.y<0 || this.y>C_H*1.5){
				this.shape.visible = false;
			}else{
				this.shape.visible = true;
			}
			
		},

		update:function(){
			this.shape.y += platformS;
		},

		changeVisible:function(){
			if(this.shape.y>C_H*1.5&&this.shape.visible){
				this.shape.visible = false;
				var oldX = this.shape.x;
				this.shape.x = Math.random()*(C_W-this.sigleX*ITEM_SCALE);
				changeX = this.shape.x - oldX
				this.shape.y = platformY;
				if(!(typeof(this.drip) == "undefined")){
					dripArr[this.drip].state = "normal";
					dripArr[this.drip].sprite.gotoAndPlay("normal");
					dripArr[this.drip].sprite.x += changeX;
					dripArr[this.drip].sprite.y = this.shape.y - dripArr[this.drip].picsize().h - platformS;
				}
				platformY -= Math.random()*60+140;
				mark += 10;
				console.log(mark)
				$('.game-fen').text(mark)
			}else if(platformS>0&&!this.shape.visible){
				this.shape.visible = true;
			}
		},

		picsize:function(){
			return {
				w:this.sigleX*ITEM_SCALE,
				h:this.sigleY*ITEM_SCALE
			}
		}
	}

	w.createPlatform = function(isFirst,y,img){
		return new ITEM(isFirst,y,img)
	};
})(window)