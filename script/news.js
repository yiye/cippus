// 新闻页面的动态数据加载
// author yiye@sunlightaustrila.com  2012年冬
// 导航栏 显示新闻
 $(function(){
 	$("#nav ul .news").css('background-position','50% -80px');
 })
// 动态加载新闻
$(function(){
	var landCount=1;//加载次数 每次加载就 4条新闻
	var windowHeight = $(window).height(); // 窗口大小
	// alert(typeof windowHeight);
	var container$ =$("#news");
	container$.imagesLoaded( function(){
      container$.masonry({
    		itemSelector: '.box',
    		columnWidth : 2,
    		animationOptions: {
    			duration: 2000
  			}
    	});
    });
    // 为遮罩的关闭按钮添加关闭事件
    $("#olClose").click(function(){
        hideOverlay();
        removeLoading("olContent");
        
    });
	// 数据加载函数,调用ajax
    function loadNews(t){
    	
        addLoading('#body');
        $.getJSON("GetNews.action",{"start":landCount,"number":t},getSu);
        landCount+=t;
    	return true;
    }
    //ajax 回调函数.分析数据,调用addNews
    function getSu(data){
        if (data.state===1) {
        	removeLoading("#body");
           $.each(data.newsArray,function(i,value){
				addNews(value);
			});
		}else if(data.state==2){
			$.each(data.newsArray,function(i,value){
				addNews(value);
			});
			$("#body>.loading").html("<p style='font-size:2em;color:black'>没有更多新闻</p>");
			setTimeout(function(){removeLoading("#body")},3000);
		}else if(data.state===3){
			$("#body>.loading").html("<p style='font-size:2em;color:black'>没有更多新闻</p>");
			setTimeout(function(){removeLoading("#body")},3000);
		}else{
			$("#body>.loading").html("<p style='font-size:2em;color:black'>哦，出错了</p>");
			setTimeout(function(){removeLoading("#body")},3000);
		}
		
    }
    // 加载详细新闻页面
    function loadDetail(id){

        //显示遮罩
        showOverlay();
        //显示加载动画
        addLoading("#olContent");
        //  清空新闻数据
        if ($("#newsDetail").length>0) {
            $("#newsDetail").remove();
        };
//        alert(id);
        // 加载数据
        $.getJSON("GetNewsDetail.action",
		{"id":id},
		function(data){
			removeLoading("#olContent");
//			$("#detail").html(data.state);
//			console.log(data);
			$("#olContent").append(data.detail);
		});

    }
    // 显示遮罩
    function showOverlay(){
        $("#overlay").show();
        $("#olContent").show("slow");
        // 禁止body的滚动条
        $(document.body).css("overflow","hidden");
        $("html").css("overflow","hidden");
    }
    //显示加载动画
    function addLoading(id){
        if ($(id+'>.loading').length>0) {
            return;
        };
        var loading$ = $(id);
        var type$=null;
            if (Modernizr.csstransitions) {
                type$ = $("<div class='loading'>加载中...<div class='loadingcircle'></div><div class='loadingcircle1'></div></div>")
            }else{
                type$ = $("<div class='loading'><img src='img/gradual/loading.gif'></div>");
        };
        loading$.append(type$);
    }

    // 隐藏遮罩
    function hideOverlay(){
        $("#olContent").hide("slow");
        $("#overlay").hide();
        $(document.body).css("overflow","auto");
        $("html").css("overflow","auto");
    }
    // 去除加载动画
    function removeLoading(id){
    	if ($(id+'>.loading').length<=0) {
            return;
        };
        var loading$ = $(id+">.loading");
        loading$.remove();//.hidden();
    }
    // 添加内容到页面
    function addNews(doc){
    	var box$ = $(doc);
        // 添加点击事件 
        box$.click(function(){
            var id=$(this).attr("id");
            loadDetail(id);
        });
//        修改图片大小
        var img$ = box$.find(".summary .img img");
        if(img$.length>0){
        	  var w =  img$.css("width").replace(/[^0-9]/ig,"");
        	  var h = img$.css("height").replace(/[^0-9]/ig,"");
        	  var h = (190/w)*h;
        	  img$.css("width","190px");
        	  img$.css("height",h+"px");
        }
      
        
    	container$.append(box$).masonry('appended',box$);
    }
    // 预先加载大于窗口高度的数据块
    function loadFirst(){
    	var number = Math.ceil(windowHeight/210);
    	// alert(number);
//    	landCount+=number;
    	loadNews(4*number);
    }

    loadFirst();
	// 滚动加载
	$(window).bind('scroll',function(event){
		//回到顶部图标出现
		 $("#returnTop").css("opacity","1");
	  	 $("#returnTop").css("bottom","200px");
		var top = document.documentElement.scrollTop + document.body.scrollTop;
		if ($(document).height()-top-windowHeight<=100) {
            // 添加加载动画
            // addLoading("news");
			// console.log($(document).height()-top-windowHeight);
			 if(!loadNews(4))return;
		};
	});




});
// end 新闻动态加载
// 回到浏览器顶部
$(function(){
	$("#returnTop").click(function(){
			$("html,body").animate({scrollTop:0},'slow');
			// $(this).css("background-position","50% 0px")
			var top=$(window).height()+100;
			setTimeout(function(){$('#returnTop').animate({bottom:top},'slow');},1);
			
	});
})

//  新闻详细页面的实现
