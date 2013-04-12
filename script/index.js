



/*
* jQuery Firefly v0.1
* https://github.com/motyar/firefly

* Licensed under the MIT license.
* Copyright 2011 Dharmveer Motyar
* http://motyar.blogspot.com
*/

(function($) {

	/* Plugin defaults */
	var defaults = {
		images : [
			'http://dharmmotyar.googlecode.com/svn/trunk/images/spark.png',
			'http://dharmmotyar.googlecode.com/svn/trunk/images//spark2.png',
			'http://dharmmotyar.googlecode.com/svn/trunk/images/spark3.png',
			'http://dharmmotyar.googlecode.com/svn/trunk/images/spark4.png'],
		total : 20
	};

	$.firefly = function(settings) {
		$.firefly.settings = $.extend({}, defaults, settings);
			if($.firefly.preloadImages()){
				for (i = 0; i < $.firefly.settings.total; i++){
					$.firefly.fly($.firefly.create($.firefly.settings.images[$.firefly.random(($.firefly.settings.images).length)]));
				}
			}
		return;
	};

	/* Public Functions */
	$.firefly.create = function(img){
		spark = $('<img>').attr({'src' : img}).hide();
		$(document.body).append(spark);
			return spark.css({
				'position':'absolute',
				'z-index': $.firefly.random(1),
				top: $.firefly.random(($(window).height()-150)),	//offsets
				left: $.firefly.random(($(window).width()-150))		//offsets
				}).show();
}

$.firefly.fly = function(sp) {
	$(sp).animate({
		top: $.firefly.random(($(window).height()-150)),	//offsets
		left: $.firefly.random(($(window).width()-150))
	}, (($.firefly.random(10) + 5) * 1100),function(){ $.firefly.fly(sp) } );
};

$.firefly.preloadImages = function() {
	var preloads = new Object();
	for (i = 0; i < ($.firefly.settings.images).length; i++){
			preloads[i] = new Image(); preloads[i].src = $.firefly.settings.images[i];
		}
	return true;
}

$.firefly.random = function(max) {
	return Math.ceil(Math.random() * max) - 1;
}

})(jQuery);

// z主要的js代码

$(function(){
	// 到处乱飞的小星星
	if(screen.width > 960) {
			$.firefly({images : ['img/fly1by1.png', 'img/fly2by2.png'],total : 20});
	}
	//显示当前日期:
	(function(){
		var today = new Date();
		var m =  today.getMonth()+1;
		var d = today.getDate();

		var data = [];
		if (m<10) {
			data[0] = 0;
			data[1] = m;
		}else{
			data[0] =  Math.floor(m/10);
			data[1] = m%10;
			// alert(m);
		};
		if (d<10) {
			data[2] = 0;
			data[3] = d;
		}else{
			data[2] = Math.floor(d/10);
			data[3] = d%10;
		};
		for (var i = 0; i < data.length; i++) {
		  // alert(data[i]);
		  	var j = i+1;
		  	var k = data[i]*90;
		  	$(".date"+j+" span").css("background-position","-"+k+"px 0px");
		  	// alert($(".date"+j+" span").css("background-position"));
		};

	})()
	// 主页图片滚动
	$('#feature2').cycle({
				fx: 'scrollLeft',  
				speed:  'slow', 
				timeout: 6000,
				slideResize: true,
	            containerResize: false,
	            width: '100%',
		    	cleartypeNoBg: true,
	            fit: 1,
	            pager:'#slidenav'
	   	});//
	//获取赛事
	//回调函数
	function getComSu(data){
		if (data.state===1) {
           $.each(data.matchArray,function(i,value){
				$(".sumwrap .slide-box").append(value);
			});
			$(".sumwrap .slide-box").cycle({
				fx: 'fade',
				speed: 1000,
				timeout: 6000,
				slideResize: true,
				cleartypeNoBg: true,
				fit:1,
				next:".sumwrap .next",
				prev:".sumwrap .pre",
				pause:1
			});
		}
	}
	 $.getJSON("GetMatch.action",{"type":"active"},getComSu);
	

    function addLoading(id){
        if ($(id+'>.loading').length>0) {
            return;
        };
        var loading$ = $(id);
        var type$=null;
            if (Modernizr.csstransitions) {
                type$ = $("<div class='loading'>加载中...<div class='loadingcircle'></div><div class='loadingcircle1'></div></div>")
            }else{
                type$ = $("<div class='loading'><img src='img/gradual/loading2.gif'></div>");
        };
        loading$.append(type$);
    }
     function removeLoading(id){
    	if ($(id+'>.loading').length<=0) {
            return;
        };
        var loading$ = $(id+">.loading");
        loading$.remove();//.hidden();
    }
	// 获取全年赛事
	(function(){
		$("#getAllCom").click(function(){
				// 显示加载动画
				// var loading$= $("<div class='loading'></div>");
				// $("#comTable").append(loading$)
				 var self$ = $(this);
				addLoading("#comTable");
			   $.getJSON("GetMatch.action",{"type":"all"},function(data){
			   		self$.addClass("active").html("全年比赛");
			   		self$.unbind("click");
			   		removeLoading("#comTable");
			   		$("#comTable").append(data.match);
			   });
		});
	})()
});