				///****     Created by Bin on 2017/08/22     ****///

window.onload = function(){	
///////////////////////////////////  函数封装  ///////////////////////////////////

	// 声明
		// 问题
		// var question_arr = [
		// 	[   
		// 		// girl: 
		// 		{ img: "images/girl/q1.png", answer: ["18岁以下","19-25岁","26-35岁","35岁以上"] },
		// 		{ img: "images/girl/q2.png", answer: ["老公","两个人都不做"] },
		// 		{ img: "images/girl/q3.png", answer: ["不会","会"] },
		// 		{ img: "images/girl/q4.png", answer: ["会，洗干净还要消毒除菌才行","不会，随便擦擦就行了"] },
		// 		{ img: "images/girl/q5.png", answer: ["不是，是女仆","当然是","一般般"] },
		// 		{ img: "images/girl/q6.png", answer: ["有！当我生气/大姨妈才会","有！他是真的心疼我"] },
		// 		{ img: "images/girl/q7.png", answer: ["差遣老公去","在床上静静","立马就去做"] },
		// 		{ img: "images/girl/q8.png", answer: ["我","老公","吃完就扔掉碗筷和厨房"] },
		// 		{ img: "images/girl/q9.png", answer: ["讲道理","撒娇卖萌","算了这种操作是不存在的"] }
		// 	],[   
		// 		// boy: 
		// 		{ img: "images/boy/q1.png", answer: ["18岁以下","19-25岁","26-35岁","35岁以上"] },
		// 		{ img: "images/boy/q2.png", answer: ["经常，每顿都是我做","不做，等老婆来做","偶尔，叫外卖比较多"] },
		// 		{ img: "images/boy/q3.png", answer: ["我","老婆"] },
		// 		{ img: "images/boy/q4.png", answer: ["让我躺在床上先冷静冷静一下","内心很拒绝，但身体很诚实","跟老婆谈判，大家一起做"] },
		// 		{ img: "images/boy/q5.png", answer: ["擦椅子桌子","洗厨房洗厕所","拖地扫地"] },
		// 		{ img: "images/boy/q6.png", answer: ["会，洗干净还要消毒除菌才行","不会，随便擦擦就行了没灰尘就好"] },
		// 		{ img: "images/boy/q7.png", answer: ["是","不是"] },
		// 		{ img: "images/boy/q8.png", answer: ["我，老婆，汪星人/熊孩子","老婆，孩子/汪星人，我","老婆，老婆，老婆"] },
		// 		{ img: "images/boy/q9.png", answer: ["老婆","我","各用各的"] }
		// 	]
		// ],
		// // 代表人物
		// representative_arr = [
		// 	[   
		// 		// girl: 
		// 		{ name: "lzj", text: "你的代表人物是：《我的前半生》里的罗子君，愿意为长久维持现有的生活付出一切的努力，极具韧性和耐力，因此能强力去除顽固重油污渍的威王厨房清洁剂最适合你，然而一个人付出努力是不够的，家庭生活还需要另一半跟你一起承担呢。更多提升王值的技巧请<span>关注威王公众号</span>让苏芩教你做女王。" },
		// 		{ name: "zjmj", text: "你代表人物是：《伪装者》里的长姐明镜，独立包容，温柔贤良，家居旅行必备的好妻子。勤俭持家的你十分精明，而高效除菌洗净能当抹布的威王植物厨房湿巾是你的不二之选。更多提升王值的技巧请<span>关注威王公众号</span>让苏芩教你做女王。" },
		// 		{ name: "qxx", text: "你代表人物是：《欢乐颂》里的曲筱绡，口齿伶俐，说起道理来头头是道，里子面子都从不嘴上伤人，所以不伤槽内的威王洗衣机槽清洁剂是你明智之选。内外体面不容易，更多提升王值的技巧请<span>关注威王公众号</span>让苏芩教你做女王。" },
		// 		{ name: "zh", text: "你的代表人物是：《甄嬛传》里的甄嬛，盘亮条顺，虽然家务技能满点一条龙，但是心思玲珑剔透，深谙驭夫术的你可是会拿着人性化设计省时省力的威王洁厕净跟老公谈判呢。更多的提升王值技巧请<span>关注威王公众号</span>让苏芩教你做女王" },
		// 		{ name: "cq", text: "你的代表人物是：《楚乔传》里的楚乔，你指挥老公做起家务来立马展现将军杀伐果断的一面，斩草除根都不如除垢又除菌。实际无毒却又杀菌强劲的威王消毒液最适合你了。更多驭夫的技巧请<span>关注威王公众号</span>让苏芩教你做女王。" }
		// 	],[   
		// 		// boy: 
		// 		{ name: "zzm", text: "代表人物：《春娇救志明》的张志明，永远长不大的你依然喜欢在马桶玩泡泡，但是估计你拿着威王的刷马桶的侧脸可能更帅气喔，再也不用担心老婆说你幼稚了！<span>关注威王公众号</span>，有更多你想知道的王之技巧。" },
		// 		{ name: "wj", text: "代表人物是：《战狼》的吴京，铁血硬汉，侠骨柔情，有大男人主义的你当老婆要求你做家务活可能心里就爆炸，习惯了直接迅速节奏的你就该用威王强效管道通，闪电般的速度把下水道里隐藏垢渍全排走那叫一个爽，让你从此喜欢上做家务！<span>关注威王公众号</span>，有更多你想知道的王之技巧。" },
		// 		{ name: "ywy", text: "代表人物是：《楚乔传》的宇文玥，外冷内热可是会偷偷帮着老婆打理家务，心思细腻的你干起家务来连一丁点的细节位置也不放过，威王重油渍全方位去除厨房顽垢污渍专治重度洁癖患者，13亿少女的梦做起家务来也如此销魂！<span>关注威王公众号</span>，有更多你想知道的王之技巧。" },
		// 		{ name: "ldw", text: "代表人物是：《太阳的后裔》的柳大尉！身手敏捷，才思聪颖，帅气逼人，更厉害的是，对家中的女王大人保持着绝对的“忠诚”，做起家务绝不含糊。拿起威王洁厕块，厕所卫生全搞定。国民老公不容易，威王给你加把劲。<span>关注威王公众号</span>，有更多你想知道的王之技巧。" },
		// 		{ name: "smy", text: "还用说什么....24孝老公是你吧？你的代表人物是：《军事联盟》的司马懿！功过两奇伟，智谋冠天下。外可御敌，内可齐家。出手没有必胜把握，也必有99.99%的底气，就像威王的除菌效果一样。看得见的看不见的，都考虑在内，一定让家里的大王放心！<span>关注威王公众号</span>，有更多你想知道的王之技巧。" }
		// 	]
		// ],
		// // 匹配度
		// match_arr = [
		// 	"同居烦恼多，还是多协作。立马行动买瓶除垢更除菌的威王，大家一起齐心协力做家务为家庭付出会更棒呢！",
		// 	"哎呦，在做家务活这个事上可是还得加把劲呢！要不然让威王帮帮你？",
		// 	"你们是蛮和谐的一对,看来平时除垢又除菌的威王帮你们不少忙呢！",
		// 	"天造地设的如此完美。因为你，我愿意成为一个更好的人。更好的生活，从买下一打威王开始。",
		// 	"你们真的是天生一对！恭喜你们都找到适合彼此的另一半！感情是家里放着威王的全家福。"
		// ];


	// 声明
	var pu = "http://test.palm-h.com/main/2017/lbww",   // 授权接口
		sex = true,                                     // 性别 true = "男",false = "女"
		q_arr = [],                                     // 问题
		answer = [],                                    // 答案
		question = [],                                  // 哪五题
		a_num = 1;                                      // 答了第几题




	// 初始化swiper
	function initSwiper(){
		var mySwiper = new Swiper('.swiper-container', {
			initialSlide : 1,                                  // 初始化第二个slide元素
			onSlideChangeEnd: function(swiper){
				if(swiper.activeIndex != 1){
					var timer = setTimeout(function(){
						mySwiper.destroy();
						clearTimeout(timer);
						swiper.activeIndex == 0 ? sex = false : sex = true;
						// getQuestion();
					},10);
				}
			}
		});
	}

	// 获取题目
	function getQuestion(){
		$.ajax({
			url: pu + '/index.php/home/QuestionApi/getQuestion',
			type: 'GET',
			dataType: 'json',
			data: { type: sex ? 1 : 2 },
			success: function(date){
				if(date.code == 1){
					q_arr = date.data;
					for (var i = 0; i < q_arr.length; i++) {
						question.push(q_arr[i].id);
					};
					console.log(q_arr,question);
				}else{
					alert(date.mg);
				}
				
			}
		})
		
	}

	// 展示题目
	function showQuestion(){
		if(a_num >= 5){
			$(".sex").hide();
			if(!sex){
				$(".share1").show();
			}else{
				$(".share2").show();
			}
		}
		a_num++;
		$(".question img").attr("src", "images/girl/q" + q_arr[a_num-1].id + ".png");
		var str = "";
		for (var i = 0; i < q_arr[a_num-1].answer.length; i++) {
			str += "<li><label>" +  q_arr[a_num-1].answer[i].option_answer + "</label></li>";
		};
		$(".answer").html();
	}

////////////////////////////////////  加载页  ////////////////////////////////////
	function Loading(){
		$(".loading").show();
		var img_arr = [
			"a.png","b.png","b_bottom.png","c.png","d.png","end.png","end_bottom.png","e_bottom.png",
			"loading.png","logo.png","match_num.png","match_value.png","m_bottom.png","m_hand.png",
			"m_lead.png","m_people.png","m_test.png","m_text.png","m_video.png","pipei.png","problem_box.png",
			"share_btn.png","s_bottom.png","s_people.jpg","s_select.png","s_text.png","test.png","tiger.png",
			"t_bottom.png","t_btn.png","vewin.png","who.png","wz.png","w_bottom.png","girl/buy.png","girl/cq.png",
			"girl/girl.png","girl/img_cq.png","girl/img_lzj.png","girl/img_qxx.png","girl/img_zh.png",
			"girl/img_zjmj.png","girl/lzj.png","girl/q1.png","girl/q2.png","girl/q3.png","girl/q4.png",
			"girl/q5.png","girl/q6.png","girl/q7.png","girl/q8.png","girl/q9.png","girl/qxx.png","girl/you.png",
			"girl/zh.png","girl/zjmj.png","boy/boy.png","boy/buy.png","boy/img_ldw.png","boy/img_lf.png",
			"boy/img_smy.png","boy/img_ywy.png","boy/img_zzm.png","boy/ldw.png","boy/lf.png","boy/q1.png",
			"boy/q2.png","boy/q3.png","boy/q4.png","boy/q5.png","boy/q6.png","boy/q7.png","boy/q8.png",
			"boy/q9.png","boy/smy.png","boy/you.png","boy/ywy.png","boy/zzm.png",
			
		];
		var img_index = 0,img_length = img_arr.length;
		for(var i = 0;i < img_length;i++){
			var img = new Image();
			img.src = "images/" + img_arr[i];
			img.onload = function(){
				img_index++;
				var parsent = parseInt(img_index/img_length*100);
				$(".tiger").css("left",parsent+"%");
				$(".bar_after").css({
					"transform": "translateX(" + -(100-parsent) + "%)",
					"-o-transform": "translateX(" + -(100-parsent) + "%)",
					"-ms-transform": "translateX(" + -(100-parsent) + "%)",
					"-moz-transform": "translateX(" + -(100-parsent) + "%)",
					"-webkit-transform": "translateX(" + -(100-parsent) + "%)"
				})
				if(img_index == img_length){
					$(".loading").delay(1000).fadeOut(function(){
						$(".main").fadeIn();
					});
					
				}
			}
		}
	}

/////////////////////////////////////  主页  /////////////////////////////////////

	// 加载页
	Loading();

	// 测王值
	$(".m_test").click(function(){
		$(".main").hide();
		$(".sex").show();
		// 初始化swiper
		initSwiper();
	})

	// 选择答案
	$(".answer").on("click","li",function () {
		// answer_arr.push({ question: random_arr[random], answer: $(this).index() == 0 ? "A" : $(this).index() == 1 ? "B" : $(this).index() == 2 ? "C" : "D" });
		// random_arr.splice(random,1);
		// random = parseInt(Math.random()*random_arr.length);
		// $(".question img").attr("src",question_arr[random_arr[random]-1].img);
		// var str = "";
		// for(var x = 0;x < question_arr[random_arr[random]-1].answer.length;x++){
		// 	str += "<li><label>" + question_arr[random_arr[random]-1].answer[x] + "</label></li>"
		// }
		// $(".answer").html(str);
		// num++;
		// if(num > 5){
		// 	console.log(answer_arr);
		// 	$(".sex").hide();
		// 	if(sex){
		// 		$(".share1").show();
		// 	}else{
		// 		$(".share2").show();
		// 	}
		// }
	});

	// 跳转扫一扫页
	$(".test").click(function(){
		$(".share").hide();
		$(".end").show();
	})

	// 视频播放
	$(".m_video").click(function(){
		$(".video").show();
		$("#video")[0].load();
		$("#video")[0].play();
	});

	// 点击关闭视频
	$(".video").click(function () {	
		$(".video").hide();
		$("#video")[0].pause();
	});
	
	// 视频播放结束
	$("#video").bind('ended',function () {
		$(".video").hide();
	});

	// 分享
	$(".share_btn").click(function(event) {
		$(".s_share").show();
	});
	$(".s_share").click(function(event) {
		$(".s_share").hide();
	});
}