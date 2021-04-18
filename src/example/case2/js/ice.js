(function(w){
	var FRAME_RATE = 9,	//精灵表播放速度
		COUNT = 10,		//序列帧单行图片数
		ITEM_SCALE = 0.5;	//缩放比例

	var ITEM = function(y,img){
		this.sigleX = img.width/COUNT;
		this.sigleY = img.height;
		this.x = Math.random()*(C_W-this.sigleX*ITEM_SCALE);
		this.y = y-Math.random()*30-50;
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
					"broken":{
						frames:[1,2,3,4,5,6,7,8,9],
						next:"end"
					},
					"end":{
						frames:[9]
					}
				}
			});
			this.sprite = new createjs.Sprite(spriteSheet , this.state);
			this.sprite.framerate = FRAME_RATE;
			this.sprite.setTransform(this.x, this.y, ITEM_SCALE, ITEM_SCALE);
			this.child = stage.addChild(this.sprite);

			if(this.y<0 || this.y>C_H*1.5){
				this.sprite.visible = false;
			}else{
				this.sprite.visible = true;
			}
			
		},

		update:function(){
			this.sprite.y += platformS;
		},

		changeVisible:function(){
			if(this.sprite.y>C_H*1.5&&this.sprite.visible){
				this.sprite.visible = false;
				this.sprite.x = Math.random()*(C_W-this.sigleX*ITEM_SCALE);
				this.sprite.y = platformY-Math.random()*30-50;
			}else if(platformS>0&&!this.sprite.visible){
				this.sprite.visible = true;
			}
		},

		picsize:function(){
			return {
				w:this.sigleX*ITEM_SCALE,
				h:this.sigleY*ITEM_SCALE
			}
		}
	}

	w.createIce = function(y,img){
		return new ITEM(y,img)
	};
})(window)