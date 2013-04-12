$(function(){
	// 导航栏
	(function(){
 	$("#nav ul .works").css('background-position','50% -80px');
 	})()
 	// 获取窗口大小
 	var winWidth = 0;
 	var winHeight = 0;
 	function getWindow(){
 		  //获取窗口宽度
           if (window.innerWidth)
                 winWidth = window.innerWidth;
           else if ((document.body) && (document.body.clientWidth))
                 winWidth = document.body.clientWidth;
           //获取窗口高度
           if (window.innerHeight)
                 winHeight = window.innerHeight;
           else if ((document.body) && (document.body.clientHeight))
                  winHeight = document.body.clientHeight;

 	}
 	// alert(""+winHeight+":"+winWidth);
	// 显示遮罩
	function showOverlay(){

        // 禁止body的滚动条
        $(document.body).css("overflow","hidden");
        $("html").css("overflow","hidden");
        $("#overlay").show();
        $("#olContent").show();
        // $("#olContent img").fadeIn(5000);
    }
    // 隐藏遮罩
    $("#overlay").click(function(){
    	$("#olContent").hide();
        $("#overlay").hide();
        $(document.body).css("overflow","auto");
        $("html").css("overflow","auto");
    });
    function showImg(img$){
    	img$.click(function(){
    		
    		getWindow();
    		var OriginImage=new Image();
    		if(OriginImage.src!==img$[0].src)OriginImage.src=img$[0].src;
 			var imgw = OriginImage.width;
 			var imgh = OriginImage.height;
 			if (imgw>imgh) {
 				 var newImgw = winWidth*0.7;
 				 if (newImgw>imgw) {
 				 	newImgw = imgw;
 				 };
 				 var newImgh = imgh*(newImgw/imgw);

 			}else{
 				 var newImgh = winHeight*0.8;
 				 if (newImgh>imgh) {
 				 	newImgh = imgh;
 				 };
 				 var newImgw = imgw*(newImgh/imgh);
 			};
 			$("#olContent").css({
 				"width": newImgw+"px",
 				"height": newImgh+"px",
 				"left":    (winWidth - newImgw)/2 + "px",
 				"top":   (winHeight - newImgh)/2 + "px"
 			});
 			$("#olContent img").css({"width":newImgw+"px","height": newImgh+"px"}).attr("src",img$[0].src);
 			showOverlay();
 			// alert(""+newImgw+":"+newImgh);
 			// alert(img$[0].width);
    	});
    }
    var endNunber = 0;
    var domCount=0;
    var last = 0;//1代表向左,0代表向右
    function loadMore(start){
    	var contenter$ = $("#main");//liduo加的代码
    	// endNunber = start + 10;
    	var load$ = $("#load-more");
    	load$.attr("class","loading");
    	$.getJSON("GetPrize.action",{"start":start,"number":10},function(data){
    		// 正常
    		if (data.state===1) {
    			endNunber+=10;
    			domCount +=10;
    			// load$.className = 'icon load-more';
    			load$.attr("class","icon load-more");
    			
    			$.each(data.prizeArray,function(i,value){
						var newDom = $(value);
						// 向右显示
						if (last==1) {
							newDom.removeClass("fruit-left");
							newDom.addClass("fruit-right");
							last = 0;
						}else{	
							last = 1;
						} ;
						showImg(newDom.find("img"));
						contenter$.append(newDom);		
				});	
    		} else if (data.state===2) {
    			// load$.className = 'nopages';
    			load$.attr("class","nopages").html("Warting for your pages").unbind("click");;

    			$.each(data.prizeArray,function(i,value){
    					endNunber++;
    					domCount++;
						var newDom = $(value);
						if (last==1) {
							newDom.removeClass("fruit-left");
							newDom.addClass("fruit-right");
							last = 0;
						}else{	
							last = 1;
						} ;						
						showImg(newDom.find("img"));
						contenter$.append(newDom);		
				});	
    		}else{
    			 load$.attr("class","nopages").html("Wating for your pages").unbind("click");
    		};
    	});

    }
    // 预加载
    loadMore(endNunber+1);
    // end load mere
    // showImg($("#123").find("img"));
   	$('#load-more').click(function(){
   		    // 清除前边的100个
    		// 正常
   		   var contenter$ = $("#main");
    		if (domCount>100) {
    			$("html,body").animate({scrollTop:0},'slow');
    			contenter$.html("");
    			domCount = 0;
    		};
   		loadMore(endNunber+1);
   	});
   	// goto 
   	$('.search').hover(function () {
	$('.search .ipt-txt').stop().animate({width:140});
		},function () {
			if ($('.search .ipt-txt:focus').length==0) {
			$('.search .ipt-txt').stop().animate({width:1});
			}
	});
	$('.search .ipt-txt').blur(function () {
		$('.search .ipt-txt').stop().animate({width:1});
	});
	$("#goto").click(function(){
		var txt$ = $('.search .ipt-txt');
		var gotoNumber = txt$.val();
		 // alert(Number(gotoNumber)==="NaN")
		if(isNaN(gotoNumber)){
			$('.search .ipt-txt').stop().val("I need a number");;
		}else{
			var contenter$ = $("#main");
    			$("html,body").animate({scrollTop:0},'slow');
    			contenter$.html("");
    			domCount = 0;
    		gotoNumber = Number(gotoNumber);
    		endNunber = gotoNumber;
    		loadMore(endNunber+1);
		};
	});
});