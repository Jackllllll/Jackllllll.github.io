var stage, loader;
var doll, platform, platformY, platformS, ice, drip, gravity, gamma, changeX, startPlatformY, mark = 0, canPlay = false;//初始游戏禁止
var C_W, C_H;
var platformArr = [], iceArr = [], dripArr = [];
var myCanvas = document.getElementById("myCanvas");
var jump = document.getElementById("jump");  //踩木板
var boli = document.getElementById("boli"); //踩碎玻璃
var shui = document.getElementById("shui"); //水滴
var bgM = document.getElementById("bgM"); //背景
function Audio(dem) {
    if (window.WeixinJSBridge) {
        WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
            if (dem.paused) {
                dem.play();
                dem.pause();
            }
        }, false);
    } else {
        document.addEventListener("WeixinJSBridgeReady", function () {
            WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
                if (dem.paused) {
                    dem.play();
                    dem.pause();
                }
            });
        }, false);
    }
}
function init() {
    stage = new createjs.Stage("myCanvas");
    stage.canvas.width = document.body.clientWidth;
    stage.canvas.height = document.body.clientHeight;
    C_W = stage.canvas.width;
    C_H = stage.canvas.height;

    var manifest = [
        { src: "img/doll.png", id: "doll" },
        { src: "img/drip.png", id: "drip" },
        { src: "img/ice.png", id: "ice" },
        { src: "img/platform.png", id: "platform" }
    ]

    loader = new createjs.LoadQueue(false);
    loader.addEventListener("complete", handleComplete);
    loader.loadManifest(manifest);
}

function handleComplete() {

    var dollImage = loader.getResult("doll");
    var dripImage = loader.getResult("drip");
    var iceImage = loader.getResult("ice");
    var platformImage = loader.getResult("platform");

    // sky = new createjs.Shape();
    // sky.graphics.bf(bgImage).drawRect(0,0,C_W,C_H);
    // stage.addChild(sky);

    platformY = C_H - 50;

    platformS = 0;

    gravity = 0.06;

    for (var i = 0; i < 20; i++) {

        if (i == 0) {
            platform = createPlatform(true, platformY, platformImage);
        } else {
            platform = createPlatform(false, platformY, platformImage);
            if (i % 4 == 0) {
                ice = createIce(platformY, iceImage);
                iceArr.push(ice);
            }
            if (i % 8 == 0) {
                drip = createDrip(platform.shape.x, platform.shape.y, platform.picsize().w, dripImage);
                dripArr.push(drip);
                platform.drip = dripArr.length - 1;
            }
        }

        platformArr.push(platform);
        platformY -= Math.random() * 60 + 140;
        startPlatformY = platformY;
    }

    doll = createDoll(dollImage);

    window.addEventListener("deviceorientation", changeGamma, true);

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", handleTick);

}

function handleTick() {
    if (canPlay) {
        //人物更新
        doll.update(gamma)

        //平台相关
        platformS -= 0.15;
        platformY += platformS;
        var hasStand = false;
        var hasGetDrip = false;
        var dmpX = doll.sprite.x + doll.picsize().w / 2;
        var dmpY = doll.sprite.y + doll.picsize().h / 2;
        if (platformS > -15) {
            platformArr.forEach(function (i) {
                // platformMidPoint,dollMidPoint 中心点
                var pmpX = i.shape.x + i.picsize().w / 2;
                var d = i.shape.y - doll.sprite.y - doll.picsize().h;
                if (platformS < 0 && i.shape.visible && Math.abs(pmpX - dmpX) <= i.picsize().w / 2 && d >= -2 && d < 10) {
                    hasStand = true;
                }
                i.update();
                i.changeVisible();
            });

            iceArr.forEach(function (i) {
                // iceMidPoint
                var impX = i.sprite.x + i.picsize().w / 2;
                var d = i.sprite.y - doll.sprite.y - doll.picsize().h;
                if (platformS < 0 && i.sprite.visible && i.state == "normal" && Math.abs(impX - dmpX) <= i.picsize().w / 2 && d >= -2 && d < 10) {
                    i.state = "broken";
                    i.sprite.gotoAndPlay("broken")
                    //踩碎冰声音
                    if (allowSound) {
                        playMusic(boli);
                        Audio(boli);
                    }
                }
                i.update();
                i.changeVisible();
            });

            dripArr.forEach(function (i) {
                // dripMidPoint
                var drmpX = i.sprite.x + i.picsize().w / 2;
                var drmpY = i.sprite.y + i.picsize().h / 2;
                if (i.state == "normal" && Math.abs(drmpX - dmpX) <= i.picsize().w / 2 + doll.picsize().w / 2 && Math.abs(drmpY - dmpY) <= i.picsize().h / 2 + doll.picsize().h / 2) {
                    i.state = "get";
                    i.sprite.gotoAndPlay("get")
                    //减水滴声音
                    if (allowSound) {
                        playMusic(shui);
                        Audio(shui);
                    }
                    hasGetDrip = true;
                }
                i.update();
            });
        } else {
            doll.fall();
        }

        if (hasStand) {
            platformS = 8;
            //踩到平台声音
            if (allowSound) {
                playMusic(jump);
                Audio(jump);
            }
            hasStand = false
        }

        if (hasGetDrip) {
            platformS = 13;
            hasGetDrip = false
        }

        stage.update();
    }
}

function changeGamma(e) {
    gamma = e.gamma;
}

//暂停
function pauseGame() {
    // createjs.Ticker.reset();
    canPlay = false;
}

//继续
function goOnGame() {
    // createjs.Ticker.init();
    canPlay = true
}

//重新玩
function playAgain() {
    mark = 0;
    platformS = 0;
    platformY = startPlatformY;

    doll.sprite.x = doll.x;
    doll.sprite.y = doll.y;

    platformArr.forEach(function (i) {
        i.shape.x = i.x;
        i.shape.y = i.y;
    })

    iceArr.forEach(function (i) {
        i.sprite.x = i.x;
        i.sprite.y = i.y;
        i.state = "normal";
        i.sprite.gotoAndPlay("normal")
    })

    dripArr.forEach(function (i) {
        i.sprite.x = i.x;
        i.sprite.y = i.y;
        i.state = "normal";
        i.sprite.gotoAndPlay("normal")
    })

    // createjs.Ticker.init();
    canPlay = true;

    $('.part5').removeClass('active');
}

//重新播放音乐
function playMusic(ele) {
    if (!ele.paused) {
        ele.currentTime = 0;
    } else {
        ele.play();
    }
}
function plauM(ele) {
    ele.play();
}
function stopMusic(ele) {
    ele.pause();
}

function endFun() {
    $('.part3').addClass('active');
    $('.y-hui').show();
    $('.game').removeClass('active');
    $('.fen1').text(mark);
    stopMusic(bgM); //暂停背景音乐
}
$('.sure').click(function (e) {
    e.preventDefault();
    $('.mc').hide();
    init();
    allowSound = true;
    plauM(bgM); //播放背景音乐

});
$('.cancel').click(function (e) {
    e.preventDefault();
    $('.mc').hide();
    init();
    allowSound = false;
    stopMusic(bgM); //暂停背景音乐
    $('.sound-btn').addClass('on');
});



