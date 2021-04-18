var mySwiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    direction: 'vertical',
    onSlideChangeStart: function (swiper) {
        if (swiper.activeIndex == 2) {
            // alert(2);
            $('.part1 .com').show();
            slidTwo = true;
            // $('.swiper-container').hide();
        }
    }
});

var sTop = 0, qc = 0;
var boxD = document.querySelector('#box');
var part = {
    // part1:['.part1 .plane','.part1 .test','.part1 .btn'],
    part2: ['.part2 .test'],
    // part3: ['.part3 .btn'],
    // part4: ['.part4 .btn'],
    part5: ['.part5 .con1', '.part5 .con2', '.part5 .con3'],
    // part6: ['.part6 .btn'],
}
function hide(part) {
    for (var key in part) {
        if (part.hasOwnProperty(key)) {
            for (var i = 0; i < part[key].length; i++) {
                $(part[key][i]).hide();
            }
        }
    }
}
hide(part);
function showc3(array) {
    for (var i = 0; i < array.length; i++) {
        $(array[i]).show();
    }
}
function aniS(obj, sT, next, prev) {
    var opPersent = ((sT - prev) / (next - prev));
    var addS = 0.4 * opPersent;   //需要加深0.6 *滚动完成百分比
    var xj = 0.6 + addS;
    console.log(obj, xj, opPersent)
    $(obj).css({ "opacity": xj });

}
function init() {
    var longD = document.querySelector('#long');
    var part6 = document.getElementsByClassName('part6')[0];
    var music = document.querySelector('#music');
    var paroT = [];

    for (var i = 2; i < 7; i++) {
        paroT[i - 2] = $('.part' + i)[0].offsetTop - 100;
    }

    var paroT5 = paroT[4] + paroT[0];  //为最后一页渐变特殊使用

    console.log(paroT);

    var musicing = true;      //音乐是否在播放
    //  解决ISO微信不能自动播放音乐
    document.addEventListener("WeixinJSBridgeReady", function () {
        music.play();
    }, false);
    document.addEventListener('YixinJSBridgeReady', function () {
        music.play();
    }, false);
    // 
    $('#musc').click(function () {
        $(this).toggleClass('mus-play');
        if (musicing) {
            music.pause();
        } else {
            music.play();
        }
        musicing = !musicing;
    });
    boxD.onscroll = function (e) {
        sTop = $(this)[0].scrollTop;
        console.log(sTop);
        if (sTop > 0 && sTop < paroT[0]) {

            aniS('.part2', sTop, paroT[0], 0);//调用渐变方法

        } else if (sTop > paroT[0] && sTop < paroT[1]) {

            showc3(part.part2);

            aniS('.part3', sTop, paroT[1], paroT[0]);  //调用渐变方法

        } else if (sTop > paroT[1] && sTop < paroT[2]) {
            // showc3(part.part3);

            aniS('.part4', sTop, paroT[2], paroT[1]);  //调用渐变方法

        } else if (sTop > paroT[2] && sTop < paroT[3]) {
            // showc3(part.part4);

            aniS('.part5', sTop, paroT[3], paroT[2]);  //调用渐变方法

        } else if (sTop > paroT[3] && sTop < paroT[4]) {
            showc3(part.part5);

            aniS('.part6', sTop, paroT[4], paroT[3]);  //调用渐变方法

        } else if (sTop > paroT[4]) {

            // showc3(part.part6);

            // aniS('.part6', sTop, paroT5,paroT[4]);  //调用渐变方法

        }


        var longDH = longD.offsetHeight;
        qc = longDH - sTop;




    }
    // console.log(longD);
}
//注册长图按钮事件
swip('#box');
var partH;
function btn() {
    $('.long .btn').click(function (e) {
        var i = $(this).data('index');
        var part = '.part' + (i + 1);
        console.log(i);
        $('.two').eq(i).show();
        // if( part !='.part6'){
        //     $(part).hide(); //隐藏part
        // }
        // partH = $(part); //保存part
        $('.box').css({ "overflow-y": "hidden" });

        $('#musc').hide();  //hide 背景音乐按钮
    });

    $('.c-btn').click(function (e) {
        // if(part !='.part6'){
        //     partH.show();
        // }
        $('.box').css({ "overflow-y": "scroll" });
        e.preventDefault();
        $(this).parent().hide();

        $('#musc').show();  //show 背景音乐按钮
    });
}
function part3() {

    $('.part3 .con').click(function () {
        var i = $(this).index();
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $('.part3 .con').removeClass('active');
            $(this).addClass('active');
            $('.part3 .text').css({ "background-position-y": -i * 1.74 + 'rem' })
        }
    })
}
function part4() {
    $('.part4 .init .con').click(function () {
        var i = $(this).index();

        var $initO = $('.part4 .init1 .ii-com').eq(i);


        $('.part4 .init1 .ii-com').removeClass('ii-active');
        $initO.addClass('ii-active');
        $('.part4 .text .t-com').removeClass('text-acitve');
        $('.part4 .text .t-com').eq(i).addClass('text-acitve');

    })
}

$(function () {
    init();
    btn();
    part3();
    part4();
})
