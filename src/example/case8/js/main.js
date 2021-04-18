$(function(){
    //------------------------------------------------------
    // 获取元素
    //------------------------------------------------------
    var $p1 = $('.p1');
    var $p2 = $('.p2');
    var $p3 = $('.p3');
    var $p3Btn = $('.p3_btn');
    var $p4 = $('.p4');
    var $p5 = $('.p5');
    var $p6 = $('.p6');
    var $p7 = $('.p7');
    var $p8 = $('.p8');
    var $p7_error = $('.p7_error_con');
    var $p9 = $('.p9');
    var $p10 = $('.p10');
    var $p11 = $('.p11');
    var $video = $('.video');
    var bol1 = true;
    var bol2 = true;
    var bgMusic = $('#audio').attr('bg-src');   //背景音乐
    var bzMusic = $('#audio').attr('bz-src');   //爆炸
    var bjMusic = $('#audio').attr('bj-src');   //报警
    var hjMusic = $('#audio').attr('hj-src');   //飞船
    var viMusic = $('#audio').attr('vi-src');   //接视频
    var endMusic = $('#audio').attr('end-src'); //视频结束
    var jsMusic = $('#audio').attr('js-src');   //接信息
    var dzMusic = $('#audio').attr('dz-src');   //打字
    var $i = 0;             //记录第几个明星
    var step = 0;           //记录加载到第几张图
    var starName = ['薛之谦','王祖蓝','蔡依林','沈梦辰','刘维'];
    var craftStar = ['p6_head01.png','p6_head03.png','p6_head02.png','p6_head04.png','p6_head05.png'];      //飞船头像
    var musicArr = ['music/boy.mp3','music/boy.mp3','music/girl.mp3','music/girl.mp3','music/boy.mp3'];
    var starHead = ['p4_people01.jpg','p4_people03.jpg','p4_people02.jpg','p4_people04.jpg','p4_people05.jpg'];
    var starMusicArr = ['m1.mp3','m3.mp3','m2.mp3','m4.mp3','m5.mp3'];
    var imgSrc = [["images/xzq/",72,'06'],["images/wzl/",96,'08'],["images/cyl/",96,'08'],["images/smc/",96,'08'],["images/lw/",108,'09']];
    var bgImg = ['p9_bg1.jpg','p9_bg3.jpg','p9_bg2.jpg','p9_bg4.jpg','p9_bg5.jpg']
    var wordArr = [['谦','5','175','谦,','5','175'],['祖','101','360','蓝,','552','267'],['Jolin','423','267',',','0','700'],['辰','230','360','辰,','230','360'],['维','70','175','维,','70','175']]
    var wordName = ['谦谦,','祖蓝,','Jolin,','辰辰,','维维,'];
    var txt8 = ['报','告','!','报','告','!','有','信','号','!','经','分','析','信','号','源','来','自','薛','之','谦','!','!'];
    var txtName = [['<i>薛</i>','<i>之</i>','<i>谦</i>'],['<i>王</i>','<i>祖</i>','<i>蓝</i>'],['<i>蔡</i>','<i>依</i>','<i>林</i>'],['<i>沈</i>','<i>梦</i>','<i>辰</i>'],['<i>刘</i>','<i>维</i>','<i></i>']]
    var tallText = [['情势紧急,为了世界和平,这次必须拼了!','快跟我来!'],['事态紧急,我要去化解这次危机!','没时间解释了,快上船!!'],['情势危急,看我72变,变!','没时间解释了,快上船!!'],['情势危急,跟我一起加入战斗吧!','赶紧上船!'],['据情报局分析,情势很严峻,只能拿出杀手锏了!','先上船再说']]
    //------------------------------------------------------
    // 流星坠落参数
    //------------------------------------------------------
    var config = {};
    config.rate = 12/37 //流星长宽比例
    config.areaW = 640; //流星下落范围
    config.areaH = $('body').height(); //屏幕高度
    config.areaL = parseInt(config.rate*config.areaH);  //开始下落偏离最左边的距离
    config.roundX = 320;    //碰撞圆心x轴坐标
    config.roundY = -160;    //碰撞圆心y轴坐标
    config.roundR = 250;    //碰撞圆半径
    // 创建流星对象
    function Star(par,bol){
        this.y = config.areaH;
        this.x = Math.random()*config.areaW+config.areaL;
        this.w = Math.random()*100+200;
        this.e = $('<img src="images/p1_star.png" />');
        this.p = par;
        this.p.append(this.e);
        this.e.css({
            'width':this.w,
            'position':'absolute',
            'left':0,
            'bottom':0,
            '-webkit-transform':'translate(' + this.x + 'px,' + -this.y + 'px)',
            'z-index':2
        });
        this.b = bol;
    }
    // 流星坠落
    Star.prototype.move = function(){
        var _this = this;
        var offsetX = this.x;
        var offsetY = this.y;
        var disY = 20;
        var disX = (config.areaW-config.areaL)*disY/this.y;
        _this.timer = setInterval(function(){
            offsetY -= disY;
            offsetX -= disX;
            _this.e.css({
                '-webkit-transform':'translate(' + offsetX + 'px,' + -offsetY + 'px)'
            })
            if (_this.b) {
                if ((offsetY-config.roundY)*(offsetY-config.roundY)+(offsetX-config.roundX)*(offsetX-config.roundX) <= config.roundR*config.roundR || offsetY <= 0) {
                    clearInterval(_this.timer);
                    if ((offsetY-config.roundY)*(offsetY-config.roundY)+(offsetX-config.roundX)*(offsetX-config.roundX) <= config.roundR*config.roundR) {
                        _this.waves = $('<div class="p1_waves"></div>');
                        _this.p.append(_this.waves);
                        _this.waves.css({
                            'left': offsetX-46,
                            'bottom': offsetY-46
                        });
                        setTimeout(function(){
                            _this.e.remove();
                            _this.waves.remove();
                        },800)
                    }else{
                        setTimeout(function(){
                            clearInterval(_this.timer);
                            _this.e.remove();
                        },300)
                    }
                    _this.e.fadeOut(1000);
                };
            }else if(!_this.b){
                setTimeout(function(){
                    clearInterval(_this.timer);
                    _this.e.remove();
                },1000)
            }
        },10)
    }
    //------------------------------------------------------
    // p1
    //------------------------------------------------------
    drop();
    // 执行流星函数
    function drop(){
        setTimeout(function(){
            for (var i = 0; i < 1; i++) {
                var star = new Star($p1,true);
                star.move();
            };
            if (bol1) {
                drop();
            };
        },300)
    }
    //------------------------------------------------------
    // loading
    //------------------------------------------------------ 
    var limg=["p1_b.jpg","p1_bg.jpg","p1_star.png","p1_t.jpg","p1_waves.png"];
    var imgs=["star_p2.jpg","p2_bg.jpg","p2_con.png","p3_btn.png","p4_nav.jpg","p4_people01.jpg","p4_people02.jpg","p4_people03.jpg","p4_people04.jpg","p4_people05.jpg","p4_tips.png","p4_hand.png","p5_click.png","p5_btn_bg.jpg","p5_btn_pic.png","p5_btn_use.png","p5_star.jpg","p5_star_bg.jpg","p5_use.jpg","p5_use_bg.jpg","p6_craft01.png","p6_craft02.png","p6_head01.png","p6_head02.png","p6_head03.png","p6_head04.png","p6_head05.png","p6_use.png","p6_error.png","p9_btn01.png","p9_btn02.png","p11_bg.jpg","jianpan.jpg","shuru.jpg","p10_hand.png","p9_bg1.jpg","p9_bg2.jpg","p9_bg3.jpg","p9_bg4.jpg","p9_bg5.jpg","p6_bg.jpg","p9_tc.png","p10_btn_bg.jpg","p10_bw.png","p9_bp.png"];
    var ind = 0;
    for (var j = 0; j < limg.length; j++) {
        var img = new Image();
        img.src = "images/"+limg[j];
        img.onload = function  () {
            ind++;
            if (ind==limg.length) {
                loading(imgs,function(){
                    setTimeout(function(){
                        toP2();
                    },3000)
                    setTimeout(function(){
                        $('#audio').attr('src','');
                        $('#audio').get(0).pause();
                        $('#audio3').get(0).play();
                        $('#audio3').attr('loop','loop');
                    },2000)     
                })
            };
        }
    };
    function loading(aimg,fn) {
        var index = 0;
        for (var i = 0; i < aimg.length; i++) {
            var img = new Image();
            img.src = "images/"+aimg[i];
            img.onload = function (){
                index++;
                if (index==aimg.length) {
                    fn && fn();   
                };
            }
        };
    }
    // ------------------------------------------------------
    // 第一页缩小到第二页
    // ------------------------------------------------------
    function toP2(){
        Audio('audio3');
        $p1.remove();
        $('.star-p2').show();
        $('.star-p2').addClass('running');
        $p2.show();
        setTimeout(function(){
            $('.star-p2').hide();  
            bol1 = false;
        },1000);
        setTimeout(function(){
            paperfocus();
        },500)
    }
    // 报纸对焦
    function paperfocus(){
        // 报纸对焦特写;
        var a = 0; 
        var timer2 = setInterval(function(){
            if (a == 0) {
                $p2.addClass('running');
                $('.p2_con').css('background-position','0 -1005px');
            }
            if (a<3) {
                $('.p2_con span').hide();
                $('.p2_con span').eq(a).show(0);
            };
            if (a<4) {
                $p2.addClass('ani'+a);
            };
            if (a == 3) {
                $('.p2_con').css('background-position','0px 0px');
            };
            if (a>=4) {
                page3($p3);
                clearInterval(timer2);
            };
            a++;
        },2000)
    }
    // ------------------------------------------------------
    // 第三页出现
    // ------------------------------------------------------
    function page3(e){
        e.fadeIn(300);
        page4();
    }
    // -------------------------------------------------------
    // 点击“联系明星特工”进入下一页面
    // -------------------------------------------------------
    
    function page4(){
        $p3Btn.on('touchend',function(){
            $p2.hide();
            $p3.hide();
            $p4.show();
            $('#audio3').get(0).pause();
            $('#audio3').remove();
        })
    }
    // -------------------------------------------------------
    // p4
    // -------------------------------------------------------
    $('.choose li').on('touchend',function(){
        $i = $(this).index();
        $p4.hide();
        $p5.show();
        $('.star .head img').attr('src','images/'+starHead[$i]);
        // $p7.attr('data-txt','24小时之后，'+starName[$i]+'请求与你连线!这次他有个重大的秘密计划邀你加入…');
        // $p8.attr('data-txt','报告!报告!有信号!经分析信号源来自'+starName[$i]+'!!');
        txt8[18] = txtName[$i][0];
        txt8[19] = txtName[$i][1];
        txt8[20] = txtName[$i][2];
        $('.p6_craft01 img').attr('src','images/'+craftStar[$i]);
        $('.p9_img img').attr('src','images/'+starHead[$i]);
        $('.p9_infor span').text(starName[$i]);
        $('.p6_mask span').text(starName[$i]);
        $p9.css({'background-image':'url(images/'+bgImg[$i]+')'});
        autoPop();
        // 音乐、图片预加载
        Variant.video_max_num = imgSrc[$i][1];
        $('.time').text(imgSrc[$i][2]);
        $('#audio2').attr('src','music/'+starMusicArr[$i]);
        load_img_car();

        // 
        $('.name_word li').eq(0).attr('data-word',wordArr[$i][0]);
        $('.name1').css({'left':wordArr[$i][1]+'px','top':wordArr[$i][2]+'px'});
        $('.name_word li').eq(1).attr('data-word',wordArr[$i][3]);
        $('.name2').css({'left':wordArr[$i][4]+'px','top':wordArr[$i][5]+'px'});
        $('.p5_tall_p').text(wordName[$i]);
        // 对话
        $('.p5_tall li').eq('1').find('p').text(tallText[$i][0]);
        $('.p5_tall li').eq('4').find('p').text(tallText[$i][1]);
    })
    // -------------------------------------------------------
    // p5
    // -------------------------------------------------------
    // 对话自动弹出
    function autoPop(){
        var $par = $('.p5_tall');
        var i = 0;
        wShow($('.tall_word',$p5).eq(0),function(){
            $('.p5_tall li').eq(0).show();
            $('.tall_word',$p5).eq(0).hide();
            $('.tall_jp',$p5).hide();
            setTimeout(function(){
                $('#audio').attr({'src':jsMusic});
                $('#audio').removeAttr('loop');
                $("#audio").get(0).play();
                $('.p5_tall li').eq(1).show();
                setTimeout(function(){
                    $('#audio').attr({'src':jsMusic});
                    $('#audio').removeAttr('loop');
                    $('.p5_tall li').eq(2).show();
                    setTimeout(function(){
                        $('.tall_jp',$p5).show();
                        $('#audio').attr({'src':''});
                        wShow($('.tall_word',$p5).eq(1),function(){
                            $('.p5_tall li').eq(3).show();
                            $('.tall_word',$p5).eq(1).hide();
                            $('.tall_jp',$p5).hide();
                            setTimeout(function(){
                                $('#audio').removeAttr('loop');
                                $('#audio').attr({'src':jsMusic});
                                $("#audio").get(0).play();
                                $('.p5_tall li').eq(4).show();
                                setTimeout(function(){
                                    $('.p5_mask').show();
                                    $('.p5_hand').show();
                                    clickShip();
                                },1500)
                            },1500)
                        })
                    },1500)
                },1500)
            },1500)
        });
        // var popTimer = setInterval(function(){
        //     i++;
        //     if (i>=6) {
        //         clearInterval(popTimer);
        //     };
        //     if (i<=4) {
        //         $('li',$par).eq(i).show();
        //     };
        //     if (i == 6) {
        //         // $('.p5_mask').show();
        //         // $('.p5_hand').show();
        //         // clickShip();
        //         // drop6();
        //     };
        // },800)
    }
    // 字出现
    function wShow(e,fn){
        $('.p10_btn').css('background-image','url()');
        e.show();
        $('.tall_p').text('');
        var $txt = '';
        var $t = $('li',e).size();
        var $wI = 0;
        var wShowTime = setInterval(function(){
            if ($wI==$t-1) {
                $('.p10_btn').css('background-image','url(images/p10_btn_bg.jpg)');
            };
            if ($wI>=$t-1) {
                $("#audio").get(0).pause();
                clearInterval(wShowTime);
                setTimeout(function(){
                    $('#audio').attr({'src':jsMusic});
                    $('#audio').removeAttr('loop');
                    $("#audio").get(0).play();
                    fn&&fn();
                },300)
            };
            $txt+=$('li',e).eq($wI).attr('data-word');
            $('li',e).hide();
            $('li',e).eq($wI).show();
            $('.tall_p').text($txt);
            $wI++;
        },300)
    }
    // 点击飞船跳转下一页
    function clickShip(){
        $('.p5_btn').on('touchstart',function(){
            $p5.hide();
            $p6.show();
            p6();
            $('#audio').attr({'src':hjMusic,'loop':'loop'});
            $("#audio").get(0).play();
        })
    }
    // -------------------------------------------------------
    // 第六页
    // -------------------------------------------------------
    function p6(){
        drop6();
        $p6.addClass('running');
        $('.p6_star').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
            $('#audio').attr('src',bzMusic);
            $('#audio').removeAttr('loop');
            $('.p6_waves').show();
            $('.p6_star').fadeOut(300);
            $('.p6_waves').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
                $('#audio').attr('src',musicArr[$i]);
                // $('.p6_craft01').css({'-webkit-transform':'rotateX(150deg)'});
                $('.p6_craft01').addClass('p6_rotate');
                $('.p6_craft01').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
                    $('#audio').attr({'src':bjMusic});
                    $("#audio").get(0).pause();
                    $('.p6_craft02').addClass('p6_flyOut');
                    // $p6.css({'-webkit-animation-name':'bg_move2'});
                    $('.p6_craft02').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
                        $("#audio").get(0).play();
                        $('.p6_mask').fadeIn(300);
                        
                        setTimeout(function(){
                            bol2 = false;
                            $p6.hide();
                            $p7.show();
                            p7();
                        },5000)
                    })
                }) 
            })
        })
    }
    function drop6(){
        setTimeout(function(){
            for (var i = 0; i < 1; i++) {
                var star = new Star($p6,false);
                star.move();
            };
            if (bol2) {
                drop6();
            };
        },200)
    }


    // -------------------------------------------------------
    // p7
    // -------------------------------------------------------
    // p7弹出警告
    function popup(){
        setTimeout(function(){
            $p7_error.show();
            $('#audio').attr('src',bjMusic);
            $('p',$p7_error).text(starName[$i]);
            p8();
        },3000);
    }
    function p7(){
        $('#audio').get(0).pause();
        setTimeout(function(){
            $p7.hide();
            $p8.show();
            p8();
        },2000) 
    }
    // -------------------------------------------------------
    // p8
    // ------------------------------------------------------- 
    function p8(){
        $('#audio').attr({'src':dzMusic,'loop':'loop'});
        $('#audio').get(0).play();
        var t = 0;
        var pTxt1 = "";
        var pTxt2 = "";
        var txtAdd2 = setInterval(function(){
            if (t<10) {
                pTxt1 += txt8[t]
                $('p',$p8).eq(0).html(pTxt1);
            }
            if (t>=10&&t<23) {
                pTxt2+=txt8[t]
                $('p',$p8).eq(1).html(pTxt2);
            };
            if (t>=23) {
                clearInterval(txtAdd2);
                $('#audio').get(0).pause();
                setTimeout(function(){
                    $p8.hide();
                    $p9.show();
                    $('#audio').attr({'src':viMusic,'loop':'loop'});
                    $("#audio").get(0).play();
                },1000)
            };
            t++;
        },200)
    }
    // -------------------------------------------------------
    // p9
    // -------------------------------------------------------
    var sBol = false;
    $('.sl',$p9).on('touchend',function(){
        $('.p9_bp').show();
    })
    $('.p9_tc').on('touchend',function(){
        $('.p9_tc').hide();
        sBol = false;
    })
    $('.sr',$p9).on('touchend',function(){
            $p9.hide();
            $('#audio').attr('src',endMusic);
            $('#audio').removeAttr('loop');
            $("#audio").get(0).pause();
            $('#video_box').show(0);
            // 播放视频
            init_page();
            audio_paly(step);
    })
    // -------------------------------------------------------
    // p10
    // -------------------------------------------------------
    // 对话自动弹出
    function autoPop10(){
        $('.video').hide();
        var $par = $('.p10_tall');
        var i = 0;
        var popTimer10 = setInterval(function(){
            if (i>1) {
                autoHb();
                clearInterval(popTimer10);
            };
            if (i<=1) {
                $('#audio').attr({'src':jsMusic});
                $('#audio').removeAttr('loop');
                $("#audio").get(0).play();
                $('li',$par).eq(i).show();
            };
            i++;
            // if (i==4) {
            //     $('.tall_jp',$p10).show();
            //     $('.p10_tall').css({'-webkit-transform':'translateY(-370px)'});
            //     wShow($('.tall_word',$p10).eq(0),function(){
            //         $("#audio").attr('src','');
            //         $("#audio").get(0).pause();
            //         $("#audio").remove();
            //         $('.p10_btn').css('background-image','url(images/p10_btn_bg.jpg)');
            //         $('.p10_hand').show();
            //         $('.tall_word li',$p10).hide();
            //         $('.p10_tall').on('touchend',function(){
            //             $('.tall_jp',$p10).hide();
            //             $('.p10_tall').css({'-webkit-transform':'translateY(0px)'});
            //         })
            //         $('.p10_tall_sr').on('touchend',function(){
            //             $('.tall_jp',$p10).show();
            //             $('.p10_tall').css({'-webkit-transform':'translateY(-370px)'});
            //         })
            //         $('.p10_btn,p10_hand',$p10).on('touchend',function(){
            //             $('.p10_tall').css({'-webkit-transform':'translateY(0px)'});
            //             $('.p10_tall li').eq(3).show();
            //             $('.tall_jp',$p10).hide();
            //             $('.tall_word',$p10).eq(0).hide();
            //             hb();
            //         })
            //     })
            // };
        },1500);
        setTimeout(function(){
            $('#audio').attr({'src':jsMusic});
            $('#audio').removeAttr('loop');
            $("#audio").get(0).play();
             $('li',$par).eq(2).show();
        }, 5500)
    }
    var boll = true;
    $('.p10_hb').on('touchend',function(){
        boll = false;
        // $p10.hide();
        $('.p10_bw').hide();
        $p11.show();
        setTimeout(function(){
            $p10.hide();
            window.location.href ="http://mfanxing.kugou.com/staticPub/mobile/2016FestivalSub/views/index.html?channel=18";
        },500)
    })

    // 自动跳转
    function autoHb(){
        setTimeout(function(){
            if (boll) {
                $('.p10_hb').off('touchend');
                // $p10.hide();
                $('.p10_bw').hide()
                $p11.show();
                setTimeout(function(){
                    $p10.hide();
                    window.location.href ="http://mfanxing.kugou.com/staticPub/mobile/2016FestivalSub/views/index.html?channel=18";
                },500)
            };
        },5000)
    }
    $('.p11_btn').on('touchend',function(){
        window.location.href ="http://mfanxing.kugou.com/staticPub/mobile/2016FestivalSub/views/index.html?channel=13";
    })
    // --------------------------------------------------------
    // 音效
    // --------------------------------------------------------
    var imgM = new Image();
    imgM.src = "images/p1_star.png";
    imgM.onload = function  () {
        if ($("#audio").get(0).pause) {
            $("#audio").get(0).play();
            $("#audio").attr('data','open');
        };

    }
    Audio("audio");
    function Audio(el){
        if(window.WeixinJSBridge){
            WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
                document.getElementById(el).play();
            }, false);
        }else{
            document.addEventListener("WeixinJSBridgeReady", function() {
                WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
                    document.getElementById(el).play();
                });
            }, false);
        }
    }
    // 视频
    config.game_s_frame      = 12;//视频理想使用帧数---
    config.game_e_frame      = 1000/config.game_s_frame;//视频实际刷新频率
    config.game_step         = 0;//视频实际进度
    config.load_img_arr      = []
    config.game_start_time   = 0

    var Ele = {
        video_canvas: document.getElementById("video_canvas"),
        ani_music       : document.getElementById("audio2")
    }
    var Variant = {
        video_ctx       : Ele.video_canvas.getContext("2d"),
        video_max_num   : 0,
        can_ani_play    : true
    }
    var Dom = {
        video_box      : $("#video_box")//视频页
    }
    
    //------------------------------------------------------
    //init_canvas
    //------------------------------------------------------
    function init_page(){
        init_canvas();
        Audio('audio2');
    }
    //------------------------------------------------------
    //init_canvas
    //------------------------------------------------------
    function init_canvas(){
        Ele.video_canvas.width = $(window).width();
        Ele.video_canvas.height = $(window).height();
    }
    //------------------------------------------------------
    //加载video图片
    //------------------------------------------------------
    function load_img_car(){
        var src_s   = imgSrc[$i][0];
        var src_e    = ".jpg";
        for (var i = 0; i < Variant.video_max_num; i++) {
            config.load_img_arr[i] = new Image();
            config.load_img_arr[i].src = src_s + i + src_e;
            config.load_img_arr[i].onload = function(){
                ++step;
            }
        };
    }
    //------------------------------------------------------
    //播放音频
    //------------------------------------------------------
    function audio_paly(num){
        if(Variant.can_ani_play){
            Variant.can_ani_play = false;
            $('#audio2').get(0).play();
            setTimeout(function(){
                config.game_start_time = Date.now();
                Variant.aniTimer = requestAnimationFrame(play_video);
            },900); 
        }
    }
    function drawVideo(){ 
        Variant.video_ctx.clearRect(0, 0, Ele.video_canvas.width, Ele.video_canvas.height);
        var oImg = config.load_img_arr[config.game_step]
        Variant.video_ctx.drawImage(oImg, 0, 0, 640,1200); 
    }
    function play_video(){
        var cur_time        = Date.now();
        var sur_time        = cur_time - config.game_start_time;
        config.game_step    = parseInt(sur_time/config.game_e_frame);
        if(config.game_step == Variant.video_max_num){
            //视频播放结束;     
            window.cancelAnimationFrame(Variant.aniTimer);
            Dom.video_box.hide();
            $('#audio2').get(0).pause();
            $("#audio").get(0).play();
            setTimeout(function(){
                $p10.show();
                autoPop10();
            },500)
            return;
        }else{
            drawVideo();
        }
        Variant.aniTimer = requestAnimationFrame(play_video);
    }
    
    // // 检测视频是否结束
    // function checkVideoEnd(){
    //     var _video = document.getElementById('video');
    //     var _p10 = document.getElementById('p10');
    //     var _videoImg = document.getElementById('video_img');
    //     //必须在微信Weixin JSAPI的WeixinJSBridgeReady才能生效 
    //     document.addEventListener("WeixinJSBridgeReady", function () { 
    //         document.getElementById('video').play();
    //     }, false); 
    //     // screen.orientation.lock('landscape');
    //     var videoTimer = setInterval(function(){
    //         if (_video.ended) {
    //             clearInterval(videoTimer);
    //             _video.style.display = 'none';
    //             _p10.style.display = 'block';
    //             autoPop10();
    //         };
    //     },100)
    // }
    
})