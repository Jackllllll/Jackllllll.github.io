/**
 * Created by Administrator on 2017/8/8.
 */

~(function ($) {
  var url = 'http://test.palm-h.com/main/2017/mkye/images/';
  var imagesSrc = [
    // 'index_loading_1_z.png',
    'logo.png',
    'music.png',
    'loading2.png',
    'loading.gif',
    'ending_bg.jpg',
    'index_1_z.png',
    'jie01_pic.gif',
    'arrow.png',
    'noselect.png',
    'jie02_pic.gif',
    'jie03_pic.gif',
    'jie04_pic.gif',
    'part01_bg.jpg',
    'share.png',
    'wenti_bg.png',
    'wenti_text.png',
    'wenti01.gif',
    'wenti01_pic01.gif',
    'wenti01_pic02.gif',
    'wenti01_pic03.gif',
    'wenti01_pic04.gif',
    // 'wenti01_pic01.jpg',
    // 'wenti01_pic02.jpg',
    // 'wenti01_pic03.jpg',
    // 'wenti01_pic04.jpg',
    'wenti02.gif',
    'wenti02_pic01.gif',
    'wenti02_pic02.gif',
    'wenti02_pic03.gif',
    'wenti02_pic04.gif',
    // 'wenti02_pic01.jpg',
    // 'wenti02_pic02.jpg',
    // 'wenti02_pic03.jpg',
    // 'wenti02_pic04.jpg',
    'wenti03.gif',
    'wenti03_pic01.gif',
    'wenti03_pic02.gif',
    'wenti03_pic03.gif',
    'wenti03_pic04.gif',
    // 'wenti03_pic01.jpg',
    // 'wenti03_pic02.jpg',
    // 'wenti03_pic03.jpg',
    // 'wenti03_pic04.jpg',
    'wenti04.gif',
    'wenti04_pic01.gif',
    'wenti04_pic02.gif',
    'wenti04_pic03.gif',
    'wenti04_pic04.gif'
    // 'wenti04_pic01.jpg',
    // 'wenti04_pic02.jpg',
    // 'wenti04_pic03.jpg',
    // 'wenti04_pic04.jpg'
  ];
  var danmustar;

  var swiper = new Swiper('.swiper-container', {
    speed: 300,
    direction: 'vertical',
    observer: true,
    observeParents: true,
    resistanceRatio : 0
  });

  var audioPlaying = false;
  audioPlay();
  $('.music-button').on('click', function () {
    if (audioPlaying) {
      $('#audio').get(0).pause();
      $('.music-button').removeClass('on');
      audioPlaying = false;
    } else {
      $('#audio').get(0).play();
      $('.music-button').addClass('on');
      audioPlaying = true;
    }
  });


  if (GetQueryString('end') == 0) {
    Loading();
  }
  else {
    var end = GetQueryString('end');
    var username = '小明'
    var friendusername = GetQueryString('name');
    console.log(end);
    console.log(decodeURI(friendusername));

    $('.title-text2').text(decodeURI(friendusername));
    if ( end == 1 ) {
      $('.part04 .end01').show();
      window.end = 1;
      window.sharetitle = '没想到我是这样的加班狗。。。';
      window.sharedesc = "朋友一生一起走，谁不加班谁是狗！";
    } else if ( end == 2 ) {
      $('.part04 .end02').show();
      window.end = 2;
      window.sharetitle = '没想到我是这样的加班狗。。。';
      window.sharedesc = "朋友一生一起走，谁不加班谁是狗！";
    } else if ( end == 3 ) {
      $('.part04 .end03').show();
      window.end = 3;
      window.sharetitle = '没想到我是这样的加班狗。。。';
      window.sharedesc = "朋友一生一起走，谁不加班谁是狗！";
    } else if ( end == 4 ) {
      $('.part04 .end04').show();
      window.end = 4;
      window.sharetitle = '没想到我是这样的加班狗。。。';
      window.sharedesc = "朋友一生一起走，谁不加班谁是狗！";
    }else if ( end == 5 ) {
      $('.part04 .end05').show();
      window.end = 5;
      window.sharetitle = '没想到我是这样的加班狗。。。';
      window.sharedesc = "朋友一生一起走，谁不加班谁是狗！";
    }else if ( end == 6 ) {
      $('.part04 .end06').show();
      window.end = 6;
      window.sharetitle = '没想到我是这样的加班狗。。。';
      window.sharedesc = "朋友一生一起走，谁不加班谁是狗！";
    }
    $('.loading').hide();
    $('.part01').hide();
    $('.part02').hide();
    $('.part03').hide();
    $('.part04').show();
    part04();
    setTimeout(function () {
      $('.part04 .danmu').addClass('on');
      danmustar = setInterval(function () {
        $('.part04 .danmu').removeClass('on');
        setTimeout(function () {
          $('.part04 .danmu').addClass('on');

        },1000);
      }, 38000)
    }, 1000)
  }

  // init();

  function Loading(){
    $('.loading').show();
    var img_arr = imagesSrc;
    var img_index = 0,img_length = img_arr.length;
    for(var i = 0;i < img_length;i++){
      var img = new Image();
      img.src = url+img_arr[i];
      img.onload = function(){
        img_index++;
        var parsent = parseInt(img_index/img_length*100);
        $('.loading-text').text( parsent+'%' );
        $('.progress').css('width', parsent + '%');

        if(img_index == img_length){
          $(".loading").delay(1500).fadeOut();

          setTimeout(function () {
            $('.part01').fadeIn();
            init();
          }, 1500);

        }
      }
    }
  }

  function init() {
    part01();
    part02();
    part03();
  }

  function part01() {
    $('.part01 .button').on('click', function () {
      $('.part01').hide();
      $('.part02').show();
    });
  }

  var fen = 0;
  var zfen = 0;
  function part02() {

    //提交按钮
    var $sureButton =  $('.sure-button');

    var $wenti = $('.wenti');

    // $('.gif').hide();
    $('.part-noselect .button').on('click', function () {
      $('.part-noselect').hide();
    });

    $sureButton.each(function (index) {

      $sureButton.eq(index).on('click', function () {
        //如果分数为零
        if ( fen == 0) {
          $('.part-noselect').show();//弹出提示框
        } else {
          zfen += fen;
          console.log(zfen);
          if ( index < $sureButton.length - 1 ) {
            $wenti.eq(index).hide();
            $wenti.eq(index + 1).show();
            fen = 0;
          } else {
            if ( zfen <= 13 ) {
              $('.part03 .end01').show();
              window.end = 1;
              window.sharetitle = '没想到我是这样的加班狗。。。';
              window.sharedesc = "朋友一生一起走，谁不加班谁是狗！";
            } else if ( 14 <= zfen && zfen <= 15 ) {
              $('.part03 .end02').show();
              window.end = 2;
              window.sharetitle = '没想到我是这样的加班狗。。。';
              window.sharedesc = "朋友一生一起走，谁不加班谁是狗！";

            } else if ( 16 <= zfen && zfen <= 17 ) {
              $('.part03 .end03').show();
              window.end = 3;
              window.sharetitle = '没想到我是这样的加班狗。。。';
              window.sharedesc = "朋友一生一起走，谁不加班谁是狗！";
            } else if ( 18 <= zfen && zfen <= 19 ) {
              $('.part03 .end04').show();
              window.end = 4;
              window.sharetitle = '没想到我是这样的加班狗。。。';
              window.sharedesc = "朋友一生一起走，谁不加班谁是狗！";

            }else if ( 20 <= zfen && zfen <= 21 ) {
              $('.part03 .end05').show();
              window.end = 5;
              window.sharetitle = '没想到我是这样的加班狗。。。';
              window.sharedesc = "朋友一生一起走，谁不加班谁是狗！";

            }else if ( 22 <= zfen && zfen <= 30 ) {
              $('.part03 .end06').show();
              window.end = 6;
              window.sharetitle = '没想到我是这样的加班狗。。。';
              window.sharedesc = "朋友一生一起走，谁不加班谁是狗！";

            }
            weixin.share();

            $('.part02').hide();
            $('.part03').show();
            setTimeout(function () {
              $('.part03 .danmu').addClass('on');
              danmustar = setInterval(function () {
                $('.part03 .danmu').removeClass('on');
                setTimeout(function () {
                  $('.part03 .danmu').addClass('on');

                },1000);
              }, 38000)
            }, 500)
          }
        }
      })

    });

    $wenti.each(function (wenti_index) {
      var $select = $wenti.eq(wenti_index).find('.select');

      $select.each(function (index) {
        $select.eq(index).on('click', function () {
          // $wenti.eq(wenti_index).find('.jpg').show();
          // $wenti.eq(wenti_index).find('.gif').hide();
          $wenti.eq(wenti_index).find('.select').removeClass('on');
          $(this).addClass('on');
          // $(this).find('.jpg').hide();
          // $(this).find('.gif').show();
          fen = $(this).data('fen');
        })
      });
    });

  }

  function part03() {
    $('.title-text').text(window.username);

    $('.link').on('click', function () {
      $('.part-tankuang').show();
    });

    $('.part-tankuang .close').on('click', function () {
      $('.part-tankuang').hide();
    });

    $('.part-tankuang .button').on('click', function () {
      TDAPP.onEvent('跳转链接');
    });

    $('.share').on('click', function () {
      $('.part-share').show();
    });

    $('.part-share').on('click', function () {
      $('.part-share').hide();
    });

    $('.again').on('click', function () {
      clearInterval(danmustar);
      fen = 0;
      zfen = 0;
      window.end = 0;
      window.sharetitle = '快来测测你是哪种加班狗！';
      window.sharedesc = "加了那么多班！竟还不知道你是哪种加班狗？";
      // $('.jpg').show();
      // $('.gif').hide();
      $('.end').hide();
      $('.wenti').hide();
      $('.wenti01').show();
      $('.part03').hide();
      $('.part02').show();
      $('.danmu').removeClass('on');
      $('.select').removeClass('on');
      TDAPP.onEvent('在玩一次');
      for(var i =0; i < swiper.length; i++) {
        swiper[i].activeIndex = 0;
      }
    });
  }

  function part04() {
    var title="快来测测你是哪种加班狗！";
    var link="http://test.palm-h.com/main/2017/mkye2/index.html?end=0&name="+encodeURI(window.username);
    var imgUrl="http://test.palm-h.com/main/2017/mkye2/jssdk/logo.jpg";
    var desc="加了那么多班！竟还不知道你是哪种加班狗？";
    wx.ready(function(){
      console.log();
      weixin.share(title,link,imgUrl,desc);
    });

    $('.metoo').on('click', function () {
      clearInterval(danmustar);
      $('.part04').hide();
      // $('.loading').show();
      TDAPP.onEvent('我也要玩');
      // window.end = 0;
      // window.sharetitle = '';
      // window.sharedesc = "";
      Loading();

    });
  }


  function audioPlay(){
    $('#audio').get(0).play();
    if(window.WeixinJSBridge){
      WeixinJSBridge.invoke('getNetworkType', {}, function(e) {

        $('#audio').get(0).play();
      }, false);
    }else{
      document.addEventListener("WeixinJSBridgeReady", function() {
        WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
          $('#audio').get(0).play();
        });
      }, false);
    }
    $('.music-button').addClass('on');
    audioPlaying = true;
  }

  function GetQueryString(sProp) {

    var re = new RegExp("[&,?]"+sProp + "=([^\\&]*)", "i");

    var a = re.exec(document.location.search);

    if (a == null)

      return 0;

    return a[1];
  }


})(jQuery);



