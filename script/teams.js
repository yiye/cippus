$(function(){
 	$("#nav ul .teams").css('background-position','50% -80px');
 });
(function($){
	$.fn.sixBorder = function(options){
		var defaults={
			post:'hex',
			margin: 5 ,
		}
		var options=$.extend(defaults,options);
		var wrapWidth=$(this)[0].offsetWidth,
			postWidth=$("."+options.post)[0].offsetWidth,
			offset = postWidth/2+defaults.margin*2,
			lineNum=Math.floor(wrapWidth/(postWidth+defaults.margin*2)),
			lineLimit=Math.floor((wrapWidth-offset)/(postWidth+defaults.margin*2));

			console.log(wrapWidth+":"+postWidth+":"+lineNum+":"+lineLimit);
		$("."+options.post).each(function(index){
			var _this = $(this);
			_this.css({'margin-left': defaults.margin+'px'});
			if(lineLimit == lineNum){
				var numPer=index%lineNum;
				if(numPer == 0){
					var linePer=Math.floor(index/lineNum)%2;
					if(linePer == 1){
						_this.css({'margin-left': offset+'px'});
					}
				}
			}else{
				var numPer=(index+lineLimit)%(lineLimit+lineNum);
				if(numPer == 0){
						_this.css({'margin-left': offset+'px'});
				}
			};
		});
	}
})(jQuery);
$(function(){
	//请求团队logo和 简介
	$.getJSON("",{"type":"teams"},function(data){
		if (data.state !==1) {return};
		var $hexs = $(".hex");

		var teams = data.msg;
		//  当节点不够时复制节点
		if (teams.length>$hexs.length) {
			var hexCount = teams.length - hexs.length;
				hexCount = hexCount +(7 - hexCount%7);//保证 每行的个数是 4 或者 3
			for (var i = 0; i < hexCount; i++) {
				$hexs.eq(0).clone(true).appendTo(".hexBox");//
			};
		};
		// 换上每组的logo 介绍
		for (var index = 0; index < teams.length; index++) {
 			$hexs.eq(index)
 				.find("a").css("background-image","url('"+teams[index].logo+"')").attr("href",teams[index].href)
 				.find("h2").html(teams[index].name).end()
 				.find(".cover>div").html(teams[index].des);

   		};
   		$(".hexBox").sixBorder();
	});

// test part
 //   var teams = [{
 //   	"logo":"img-test/q.jpg",
 //   	"name":"girl",
 //   	"des" :"i love beatiful girl",
 //   	"href":"http://www.baidu.com"
 //   },{
 //   	"logo":"img-test/t.jpg",
 //   	"name":"not konw",
 //   	"des" :"where are you from ,i do not think you are good!",
 //   	"href":"http://www.fuckci.com"
 //   }]
	// var $hexs = $(".hex");
	// // console.log($hexs.eq(0).find('a').css("background-image","url('"+teams[0].logo+"')").find("h2"));
 
 //   for (var index = 0; index < teams.length; index++) {
 // 			$hexs.eq(index)
 // 			.find("a").css("background-image","url('"+teams[index].logo+"')").attr("href",teams[index].href)
 // 			.find("h2").html(teams[index].name).end()
 // 			.find(".cover>div").html(teams[index].des);

 //   };
// end test
	 $(".hexBox").sixBorder();
	// $(window).resize(function(){
	// 	 $(".hexBox").sixBorder();
 // 	});
});
