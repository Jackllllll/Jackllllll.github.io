(function(w){
	var FRAME_RATE = 5,	//精灵表播放速度
		COUNT = 7,		//序列帧单行图片数
		ITEM_SCALE = 0.2;	//缩放比例

	var ITEM = function(x,y,px,img){
		this.sigleX = img.width/COUNT;
		this.sigleY = img.height;
		this.x = x + 10 + Math.random()*(px-20-this.sigleX*ITEM_SCALE);
		this.y = y - this.sigleY*ITEM_SCALE;
		this.state = "normal";
		this.init(img);
	}

	ITEM.prototype = {
		init:function(img){
			//动作序列设置
			var spriteSheet = new createjs.SpriteSheet({
				"images":[img],
				"frames":{"regX":0,"regY":1,"width":this.sigleX,"height":this.sigleY,"count":COUNT},
				"animations":{
					"normal":{
						frames:[0]
					},
					"get":{
						frames:[1,2,3,4,5,6],
						next:"end"
					},
					"end":{
						frames:[6]
					}
				}
			});
			this.sprite = new createjs.Sprite(spriteSheet , this.state);
			this.sprite.framerate = FRAME_RATE;
			this.sprite.setTransform(this.x, this.y, ITEM_SCALE, ITEM_SCALE);
			this.child = stage.addChild(this.sprite);
			
		},

		update:function(){
			this.sprite.y += platformS;
		},

		// changeVisible:function(){
		// 	if(this.sprite.y>C_H*1.5&&this.sprite.visible){
		// 		this.sprite.visible = false;
		// 	}else{
		// 		if(platformS>0&&!this.sprite.visible){
		// 			this.sprite.visible = true;
		// 		}
		// 	}
		// },

		picsize:function(){
			return {
				w:this.sigleX*ITEM_SCALE,
				h:this.sigleY*ITEM_SCALE
			}
		}
	}

	w.createDrip = function(x,y,pw,img){
		return new ITEM(x,y,pw,img)
	};
})(window)