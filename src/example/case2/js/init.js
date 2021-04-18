var allowSound = false;
$(function () {
    //初始化
    (function () {


        // var noSleep = new NoSleep();
        // noSleep.enable();

        var data = [      //高手
            { "nickname": "ASDF", "score": "100" },
            { "nickname": "\u6d4b\u8bd5", "score": "70" },
            { "nickname": "4678", "score": "80" }
        ];
        var data1 = [    //红人
            { "nickname": "chely", "count": "2" },
            { "nickname": "chely", "count": "5" },
            { "nickname": "Lost", "count": "2" }
        ];


        //根据数据key值进行排序初始化
        function setHtml(data, key, obj) {
            var data = data;
            var str = '';
            //按照key进行重新排序
            data.sort(function (a, b) {
                return b[key] - a[key]
            });
            for (var i = 0; i < data.length; i++) {
                str += '<div class="list">';
                str += '<div class="ph">' + '0' + (i + 1) + '</div>';
                str += '<div class="user">' + data[i]['nickname'] + '</div>';
                str += '<div class="fs">' + data[i][key] + '</div>';
                str += '</div>';
            }
            $(obj).html(str);
        }
        setHtml(data, 'score', '.gs-person');
        setHtml(data1, 'count', '.red-person');

        // $.ajax({
        //     type: "GET",
        //     url: '',
        //     data: '',
        //     dataType: "json",
        //     success: function (response) {
        //         // console.log(response);


        // });


        //文字复制功能
        var clipboard = new Clipboard('.btn');
        //

        part1();
        part2();
        part3();
        part4();
        game();
    })()


    function part1() {
        $('.begin').click(function (e) {
            e.preventDefault();
            $('.part2').addClass('active');
            $('.part1').removeClass('active');
        });
    }
    function part2() {
        $('.read-rule').click(function (e) {
            e.preventDefault();
            $('.game').addClass('active');
            canPlay = true;
            $('.part2').removeClass('active');
        });
    }
    function part3() {
        $('.rank').click(function (e) {
            e.preventDefault();
            $('.part3').removeClass('active');
            $('.part5').addClass('active');
        });
        $('.hui').click(function (e) {
            e.preventDefault();
            $('.y-hui').hide();
        });
        $('.share').click(function (e) {
            e.preventDefault();
            $('.share-zs').show();
        });
        $('.part3 .get').click(function (e) {
            e.preventDefault();
            $('.y-hui').show();
        });
        $('.share-zs').click(function (e) {
            $(this).hide();
        });
        $('.play-again').click(function (e) {
            $('.game').addClass('active');
            $('.part3').removeClass('active');
            playAgain();
            if (allowSound) {
                plauM(bgM); //播放背景音乐
            }
        })
    }
    function part4() {
        //点击红人榜
        $('.btn-zh .red').click(function (e) {
            e.preventDefault();
            $('.gs-person').hide();
            $('.red-person').show();
            $('.data-box').css({ "border-color": '#ff6966' });
        });
        //点击高手榜
        $('.btn-zh .gs').click(function (e) {
            e.preventDefault();
            $('.gs-person').show();
            $('.red-person').hide();
            $('.data-box').css({ "border-color": '#3799da' });
        });
        $('.p-again').click(function (e) {
            e.preventDefault();
            $('.game').addClass('active');
            $('.part3').removeClass('active');
            playAgain();
            if (allowSound) {
                plauM(bgM); //播放背景音乐
            }
            // plauM(bgM); //播放背景音乐

        });

        $('.want-play').click(function () {
            $('.part1').addClass('active');
            $('.part4').removeClass('active');
        })
    }
    function game() {
        $('.play-slider').click(function () {
            $(this).toggleClass('stop');

            if (canPlay) {
                canPlay = false;
                stopMusic(bgM); //暂停背景音乐  
            } else {
                canPlay = true;
                console.log(allowSound)
                if (allowSound == true) {
                    plauM(bgM); //播放背景音乐
                }
            }

        });
        $('.sound-btn').click(function (e) {
            $(this).toggleClass('on');

            if ($(this).hasClass('on')) {
                allowSound = false;
                stopMusic(bgM);

            } else {
                allowSound = true;
                plauM(bgM); //播放背景音乐
            }
        });
    }

})