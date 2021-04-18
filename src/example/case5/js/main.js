var pageO = {
    page1: [],
    page2: ['.com3'],
    page3: ['.sp', '.kj', '.t1', '.t2'],
    page4: ['.sz', '.kj', '.t1', '.t2'],
    page5: ['.s']
}
loading()
function loading() {
    var image = document.images;  //获得所有图片对象
    var index = 0;            //已加载图片数
    function setPersent() {
        index++;
        $('.tiao div').css({ 'width': parseInt(index / image.length * 100) + '%' })
        $('.loading .text').html(parseInt(index / image.length * 100) + '%')
        if (index == image.length) {
            $('.loading').fadeOut();
            $('.swiper-container').show();
            inputOn();
        }
    }
    for (var i = 0; i < image.length; i++) {
        if (image[i].complete) {
            setPersent()
        } else {
            image[i].onload = function () {
                setPersent()
            }
        }
    }
}
function inputOn() {

    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        direction: 'vertical',
        onInit: function (swiper) { //Swiper2.x的初始化是onFirstInit
            swiperAnimateCache(swiper); //隐藏动画元素 
            console.log(swiper)
            // swiperAnimate(swiper); //初始化完成开始动画
        },
        onSlideChangeEnd: function (swiper) {
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
        },
        onSlideChangeStart: function (swiper) {
            // alert(swiper.activeIndex);
            switch (swiper.activeIndex) {
                case 0:

                    break;
                case 1:
                    pageO.page2.forEach(function (item) {
                        $('.page2 ' + item).show();
                    })
                    break;
                case 2:
                    pageO.page3.forEach(function (item) {
                        $('.page3 ' + item).show();
                    })
                    break;
                case 3:
                    pageO.page4.forEach(function (item) {

                        $('.page4 ' + item).show();

                    })
                    break;
                case 4:
                    pageO.page5.forEach(function (item) {
                        $('.page5 ' + item).show();
                        $('.page5 ' + item)[0].addEventListener('animationend', function () {
                            $(this).hide();
                        })
                    })
                    break;
                case 5:

                    break;

            }
        }
    });

    // 背景音乐播放
    var flag = true,
        audio = document.querySelector('audio');

    document.addEventListener("WeixinJSBridgeReady", function () {
        audio.play();
    }, false);
    document.addEventListener('YixinJSBridgeReady', function () {
        audio.play();
    }, false);
    function muSlider() {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    }
    audio.play();
    $('#musc').on('click', function () {
        $(this).toggleClass('on');
        muSlider();
    });

    var nq = document.querySelector('.nq'),
        wq = document.querySelector('.wq');
    var page1endO = document.querySelector('.page1 .t5'),
        page2endO = document.querySelector('.page2 .com3:nth-child(3) .txt'),
        page3endO = document.querySelector('.page3 .t2'),
        page4endO = document.querySelector('.page4 .t2 div:last-child');



    var endArray = [page1endO, page2endO, page3endO, page4endO];
    endArray.forEach(function (item) {
        item.addEventListener('animationend', function () {
            var that = this;
            if ($(this).siblings(".xl").length) {
                setTimeout(function () {
                    $(that).siblings(".xl").show()
                }, 300)
            }else {
                setTimeout(function () {
                    $(that).parent().siblings(".xl").show()
                }, 300)
            }
        })
    })
    var pageA = {
        nq: true,
        wq: true
    }                //记录page1的内圈外全动画 是第一次播放
    nq.addEventListener('animationend', function () {
        if (pageA.nq) {
            this.classList.add("rot-One");  //内圈切换新动画
            pageA.nq = false;
        }
    })
    wq.addEventListener('animationend', function () {
        if (pageA.wq) {
            this.classList.add("rot-Two");  //内圈切换新动画
            pageA.wq = false;
        }
    })
};