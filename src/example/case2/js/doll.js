(function(w){
	var FRAME_RATE = 13,	//精灵表播放速度
		PICWIDTH = 140,		//序列帧每张的宽
		PICHEIGHT = 147,	//序列帧每张的高
		ITEM_SCALE = 0.4;	//缩放比例

	var ITEM = function(img){
		this.x = (C_W-PICWIDTH*ITEM_SCALE)/2;
		this.y = C_H-PICHEIGHT*ITEM_SCALE-70;
		this.state = "normal";
		this.init(img);
	}

	ITEM.prototype = {
		init:function(img){
			//动作序列设置
			var spriteSheet = new createjs.SpriteSheet({
				"images":[img],
				"frames":{"regX":0,"regY":1,"width":PICWIDTH,"height":PICHEIGHT,"count":1},
				"animations":{
					"normal":{
						frames:[0]
					}
				}
			});
			this.sprite = new createjs.Sprite(spriteSheet , this.state);
			this.sprite.framerate = FRAME_RATE;
			this.sprite.setTransform(this.x, this.y, ITEM_SCALE, ITEM_SCALE);
			this.child = stage.addChild(this.sprite);
		},

		update:function(g){
			if(g>2){
				this.sprite.x += 2.4 + 0.02*g;
				if(this.sprite.x>=C_W-PICWIDTH*ITEM_SCALE){
					this.sprite.x = C_W-PICWIDTH*ITEM_SCALE;
				}
			}else if(g<-2){
				this.sprite.x += -2.4 - 0.02*g;
				if(this.sprite.x<=0){
					this.sprite.x = 0;
				}
			}
		},

		fall:function(){
			this.sprite.y -= platformS;
			if(this.sprite.y>C_H){
				console.log("end");
				// createjs.Ticker.reset();
				canPlay = false;
				endFun()
				// playAgain()
			}
		},

		picsize:function(){
			return {
				w:PICWIDTH*ITEM_SCALE,
				h:PICHEIGHT*ITEM_SCALE
			}
		}
	}

	w.createDoll = function(img){
		return new ITEM(img)
	};
})(window)