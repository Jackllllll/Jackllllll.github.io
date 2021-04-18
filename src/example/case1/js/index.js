/**
 * Created by Administrator on 2017/10/17.
 */

~(function ($) {
  var url = 'http://test.palm-h.com/main/2017/sfmy/images/';
  var imagesSrc = [
    'loading_bg.jpg',
    'loading01.png',
    'loading02.png',
    'music.png',
    'bg.jpg',
    'index_1_z.png',
    'part01_bg.jpg',
    'part01_select_bg01.jpg',
    'part01_select_bg01_on.jpg',
    'part01_select_bg02.jpg',
    'part01_select_bg02_on.jpg',
    'part01_select_bg03.jpg',
    'part01_select_bg03_on.jpg',
    'part01_select01.png',
    'part01_select02.png',
    'part01_select03.png',
    'part02_arrow.png',
    'part02_bg.png',
    'part02_bg_chi.png',
    'part02_bg_ji.png',
    'part02_img01.png',
    'part02_img02.png',
    'part02_img01_chi.png',
    'part02_img02_chi.png',
    'part02_img01_ji.png',
    'part02_img02_ji.png',
    'part03_chi_img01.png',
    'part03_chi_img02.png',
    'part03_chi_img03.png',
    'part03_chi_img04.png',
    'part03_chi_img05.png',
    'part03_chi_img06.png',
    'part03_ji_img01.png',
    'part03_ji_img02.png',
    'part03_ji_img03.png',
    'part03_ji_img04.png',
    'part03_ji_img05.png',
    'part03_ji_img06.png',
    'part03_shou_img01.png',
    'part03_shou_img02.png',
    'part03_shou_img03.png',
    'part03_shou_img04.png',
    'part03_shou_img05.png',
    'part03_shou_img06.png',
    'part04_chi_img01.png',
    'part04_chi_img02.png',
    'part04_chi_img03.png',
    'part04_chi_star01.png',
    'part04_chi_star02.png',
    'part04_chi_star03.png',
    'part04_ji_img01.png',
    'part04_ji_img02.png',
    'part04_ji_img03.png',
    'part04_ji_star01.png',
    'part04_ji_star02.png',
    'part04_ji_star03.png',
    'part04_shou_img01.png',
    'part04_shou_img02.png',
    'part04_shou_img03.png',
    'part04_shou_star01.png',
    'part04_shou_star02.png',
    'part04_shou_star03.png',
    'part04_tankuang.png',
    'part05_chi_img.gif',
    'part05_ji_img.gif',
    'part05_shou_img.gif',
    'part06_bg.jpg',
    'part07_chi_img01.png',
    'part07_chi_img02.png',
    'part07_chi_img03.png',
    'part07_ji_img01.png',
    'part07_ji_img02.png',
    'part07_ji_img03.png',
    'part07_ji_star02.png',
    'part07_shou_img01.png',
    'part07_shou_img02.png',
    'part07_shou_img03.png',
    'part07_shou_star02.png',
    'share.png',
    'bianyin.png',
    'shibie.png'
  ];

  Loading();
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

        if(img_index == img_length){
          //loading页过后的页面跳转操作

          $('.loading').fadeOut();

          //正常流程执行
          $('.part01').fadeIn();

          //分享进入流程执行
          // shareJion();
        }
      }
    }
  }

  //阻止微信上下滑动
  // $(document).on("touchstart touchmove mousedown mousemove",function(event){
  //   var tag = $(event.target).parents()[0].tagName;
  //   var obj =$(event.target);
  //   var thistag = event.target.tagName;
  //   if ( !obj.hasClass('can') && tag != "A" && tag != "INPUT" && tag != "TEXTAREA" && tag != "SELECT" && thistag != "A" && thistag != "INPUT" && thistag != "TEXTAREA" && thistag != "SELECT" )
  //   {
  //     event.preventDefault();
  //   }
  // });

  // 音乐按钮
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


  var playerMod = 0;//游戏角色 1：寄件人；2，收件人；3，吃瓜群众
  var volMod = 0;//输入的声音
  var makeMod = 0;//变音模式
  var $shou = $('.shou');
  var $ji = $('.ji');
  var $chi = $('.chi');


  part01();
  part02();
  part04();
  part05();
  part06();
  part07();

  function part01() {
    var $part01 = $('.part01');
    var $select = $part01.find('.select');
    var $part01Button = $part01.find('.button');

    $select.each(function (index) {
      $select.eq(index).on('click', function () {
        $select.removeClass('on');
        $select.eq(index).addClass('on');
        playerMod = index + 1;
        console.log(playerMod);
      })
    });

    $part01Button.on('click', function () {

      if(playerMod == 0) {
        alert('请选择一个角色')
      } else {
        $part01.hide();

        if (playerMod == 1) {
          $('.part02 .shou').hide();
          $('.part02 .chi').hide();

          setTimeout(function () {
            $shou.remove();
            $chi.remove();
          },500)
        } else if (playerMod == 2) {
          $('.part02 .ji').hide();
          $('.part02 .chi').hide();
          setTimeout(function () {
            $ji.remove();
            $chi.remove();
          },500)
        } else if (playerMod == 3) {
          $('.part02 .ji').hide();
          $('.part02 .shou').hide();
          setTimeout(function () {
            $ji.remove();
            $shou.remove();
          },500)
        }

        $('.part02').show();
      }


    })
  }

  function part02() {
    var swiper = new Swiper('.moyin-select-container', {
      speed: 300,
      direction: 'vertical',
      observer: true,
      observeParents: true,
      noSwiping : true,
      resistanceRatio : 0
    });
    var swiper02 = new Swiper('.moyin-container', {
      speed: 300,
      direction: 'horizontal',
      prevButton:'.arrow-left',
      nextButton:'.arrow-right',
      observer: true,
      observeParents: true,
      // noSwiping : true,
      resistanceRatio : 0,
      loop:true
    });
    var $part02 = $('.part02');
    var $part02moyin = $part02.find('.moyin');
    var $part02ButtonSure = $part02.find('.button-sure');
    var $part02ButtonMe = $part02.find('.button-me');
    var $part02Tankuang = $part02.find('.tankuang');
    var $part02TankuangButton = $part02.find('.tankuang_button');

    $part02moyin.each(function (index) {
      $part02moyin.eq(index).on('click', function () {
        $part02moyin.removeClass('on');
        $part02moyin.eq(index).addClass('on');
        volMod = $part02moyin.eq(index).data('vol');
      })
    });

    $part02ButtonSure.on('click', function () {
      if(volMod == 0) {
        alert('请选择一段话')
      } else {
        $part02.hide();
        $('.part05').show();
      }
    });

    $part02ButtonMe.on('click', function () {
      $part02Tankuang.show();
    });
    $part02TankuangButton.on('click', function () {
      $part02.hide();
      $('.part04').show();
      $part02Tankuang.hide();
    });

  }

  function part04() {
    var $part04 = $('.part04');
    var $part04StartButton = $part04.find('.start_button');
    var $part04imgWrap = $part04.find('.img-wrap');

    $part04StartButton.on('touchstart', function (e) {
      console.log('start');
      e.preventDefault();
      $('#audio').get(0).pause();
      $('.music-button').removeClass('on');
      audioPlaying = false;
      $part04imgWrap.show();
      $part04StartButton.addClass('on');
    });

    $part04StartButton.on('touchend', function () {
      $part04StartButton.removeClass('on');
      $part04.hide();
      setTimeout(function () {
        $('.part05').show();
        $part04imgWrap.hide();
        audioPlay();
      },100);

    })
  }

  function part05() {
    var $part05 = $('.part05');
    var $part05buttonListen = $part05.find('.button-listen');
    var $part05buttonOther = $part05.find('.button-other');
    var $part05buttonMake = $part05.find('.button-make');

    $part05buttonListen.on('click', function () {
      //听听看按钮点击事件
      $('#audio').get(0).pause();
      $('.music-button').removeClass('on');
      audioPlaying = false;
    });

    $part05buttonOther.on('click', function () {
      $part05.hide();
      $('.part02').show();

      if (!audioPlaying) {
        $('#audio').get(0).play();
        $('.music-button').addClass('on');
        audioPlaying = true;
      }
    });

    $part05buttonMake.on('click', function () {
      $part05.hide();
      $('.part06').show();
      $('#audio').get(0).pause();
      $('.music-button').removeClass('on');
      audioPlaying = false;

    })
  }

  function part06() {
    var $part06 = $('.part06');
    var $part06select = $part06.find('.select');
    var $part06buttonUp = $part06.find('.button-up');


    $part06select.each(function (index) {
      $part06select.eq(index).on('click', function () {
        $part06select.removeClass('on');
        $(this).addClass('on');
        makeMod = index + 1;
        console.log(makeMod);
      })
    });

    //上传录音点击事件
    $part06buttonUp.on('click', function () {

      if (makeMod == 0) {
        alert('请选择一个效果');
      } else {
        $part06.hide();
        $('.part07').show();

        if (!audioPlaying) {
          $('#audio').get(0).play();
          $('.music-button').addClass('on');
          audioPlaying = true;
        }
      }

    })
  }

  function part07() {
    $('.button-share').on('click', function () {
      $('.share').show();
    });
    $('.share').on('click', function () {
      $('.share').hide();
    })
  }


  function shareJion() {
    playerMod = 2;
    $('.part02 .ji').hide();
    $('.part02 .chi').hide();
    setTimeout(function () {
      $ji.remove();
      $chi.remove();
    },500);
    $('.part02').show();

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

})(jQuery);

