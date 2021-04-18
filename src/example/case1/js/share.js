/**
 * Created by Administrator on 2017/11/17.
 */
~(function ($) {
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

  $('.button-play').on('click', function () {
    $('#audio').get(0).pause();
    $('.music-button').removeClass('on');
    audioPlaying = false;
  });

  $('.button-hui').on('click', function () {
    location.href = "index.html"
  });
  
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