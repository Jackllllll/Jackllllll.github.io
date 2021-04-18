
function GetSlideAngle(dx, dy) {
    return Math.atan2(dy, dx) * 180 / Math.PI;
}
function GetSlideDirection(startX, startY, endX, endY) {
    var dy = startY - endY;
    var dx = endX - startX;
    var result = 0;

    //如果滑动距离太短  
    if (Math.abs(dx) < 50 && Math.abs(dy) < 50) {
        return result;
    }

    if (dy > 50) {
        result = 1;
    } else if (dy < -50) {
        result = 2;
    }
    // var angle = GetSlideAngle(dx, dy);
    // if (angle >= -45 && angle < 45) {
    //     result = 4;
    // } else if (angle >= 45 && angle < 135) {
    //     result = 1;
    // } else if (angle >= -135 && angle < -45) {
    //     result = 2;
    // }
    // else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
    //     result = 3;
    // }
    return result;
}
var startX, startY;
function start(ev) {
    // ev.preventDefault(); 
    startX = ev.touches[0].pageX;
    startY = ev.touches[0].pageY;
}
function end(ev) {
    var endX, endY;
    // ev.preventDefault(); 
    endX = ev.changedTouches[0].pageX;
    endY = ev.changedTouches[0].pageY;
    var direction = GetSlideDirection(startX, startY, endX, endY);
    // alert('触发滑动end');
    switch (direction) {
        case 0:
            // alert("没滑动");  
            break;
        case 1:
            // console.log($('.part6')[0].offsetTop);
            if (qc < document.body.clientHeight + 1) {
                mySwiper.slideTo(3, 1000, false);//切换到第一个slide，速度为1秒;

            }
            break;
        case 2: //事件注销
            // alert('向上滑');
            if (sTop <= 0) {
                mySwiper.slideTo(1, 1000, false);
            }
            break;
        case 3:
            // alert("向左");
            break;
        case 4:
            // alert("向右");
            break;
        default:
    }
}
function swip(seletor) {
    var obj = document.querySelector(seletor);
    obj.addEventListener('touchstart', start, false);
    obj.addEventListener('touchend', end, false);
    var starY, endy;
    $(document).on("touchstart ", function (event) {
        starY = event.touches[0].clientY;
        console.log(starY);

        // var tag = $(event.target).parents()[0].tagName; 
        // var obj =$(event.target);
        // var thistag = event.target.tagName; 
        // console.log(11);
        // if ( !obj.hasClass('can') && tag != "A" && tag != "INPUT" && tag != "TEXTAREA" && tag != "SELECT" && thistag != "A" && thistag != "INPUT" && thistag != "TEXTAREA" && thistag != "SELECT" ) 
        // { 
        // event.preventDefault(); 
        // } 
    })
     var slidTwo = true;  //允许切换到第二页标识符  解决andiod wechat document触摸默认事件
    $(document).on('touchend', function (event) {
        endY = event.changedTouches[0].clientY;
        console.log(endY)
        if ( slidTwo && endY - starY > 50 && sTop <= 0) {
            mySwiper.slideTo(1, 1000, false);
            slidTwo = false;
        }
    })
}

