$(function(){
 	$("#nav ul .models").css('background-position','50% -80px');
 })


$(window).load(function(){
	var	$iw_thumbs			= $('#iw_thumbs'),
		$iw_ribbon			= $('#iw_ribbon'),
		$iw_ribbon_close	= $iw_ribbon.children('span.iw_close'),
		$iw_ribbon_zoom		= $iw_ribbon.children('span.iw_zoom');
	var loadCount = 0 ,isEnd = false, loadNumber = 40;
		
		ImageWall	= (function() {
				// window width and height
			var w_dim,
			    // index of current image
				current				= -1,
				isRibbonShown		= false,
				isFullMode			= false,
				// ribbon / images animation settings
				ribbonAnim			= {speed : 500, easing : 'easeOutExpo'},
				imgAnim				= {speed : 400, easing : 'jswing'},
				// init function : call masonry, calculate window dimentions, initialize some events
				init				= function() {
					$iw_thumbs.imagesLoaded(function(){
						// 首次加载
						loadItem();
						$iw_thumbs.masonry({
							isAnimated	: true
						});
					});
					getWindowsDim();
					initEventsHandler();
				},
				// calculate window dimentions
				getWindowsDim		= function() {
					w_dim = {
						width	: $(window).width(),
						height	: $(window).height()
					};
				},
				// initialize some events
				initEventsHandler	= function() {
					// loading next page
					$("#footer .next").click(loadItem);
					// click on a image
					$iw_thumbs.delegate('li', 'click', function() {
						if($iw_ribbon.is(':animated')) return false;
						
						var $el = $(this);
						
						if($el.data('ribbon')) {
							showDetail($el);
						}
						else if(!isRibbonShown) {
							isRibbonShown = true;
							
							$el.data('ribbon',true);
							
							// set the current
							current = $el.index();
						
							showRibbon($el);
						}
					});
					
					// click ribbon close
					$iw_ribbon_close.bind('click', closeRibbon);
					
					// on window resize we need to recalculate the window dimentions
					$(window).bind('resize', function() {
								getWindowsDim();
								if($iw_ribbon.is(':animated'))
									return false;
								closeRibbon();
							 })
					         .bind('scroll', function() {
								if($iw_ribbon.is(':animated'))
									return false;
								closeRibbon();
							 });
					
				},
				showRibbon			= function($el) {
					var	$img	= $el.children('img'),
						$descrp	= $img.next();
					
					// fadeOut all the other images
					$iw_thumbs.children('li').not($el).animate({opacity : 0.2}, imgAnim.speed);
					
					// increase the image z-index, and set the height to 100px (default height)
					$img.css('z-index', 100)
						.data('originalHeight',$img.height())
						.stop()
						.animate({
							height 		: '100px'
						}, imgAnim.speed, imgAnim.easing);
					
					// the ribbon will animate from the left or right
					// depending on the position of the image
					var ribbonCssParam 		= {
							top	: $el.offset().top - $(window).scrollTop() - 6 + 'px'
						},
						descriptionCssParam,
						dir;
					
					if( $el.offset().left < (w_dim.width / 2) ) {
						dir = 'left';
						ribbonCssParam.left 	= 0;
						ribbonCssParam.right 	= 'auto';
					}
					else {
						dir = 'right';
						ribbonCssParam.right 	= 0;
						ribbonCssParam.left 	= 'auto';
					}
					
					$iw_ribbon.css(ribbonCssParam)
					          .show()
							  .stop()
							  .animate({width : '100%'}, ribbonAnim.speed, ribbonAnim.easing, function() {
									switch(dir) {
										case 'left' :
											descriptionCssParam		= {
												'left' 			: $img.outerWidth(true) + 'px',
												'text-align' 	: 'left'
											};
											break;
										case 'right' :	
											descriptionCssParam		= {
												'left' 			: '-200px',
												'text-align' 	: 'right'
											};
											break;
									};
									$descrp.css(descriptionCssParam).fadeIn();
									// show close button and zoom
									$iw_ribbon_close.show();
									$iw_ribbon_zoom.show();
							  });
					
				},
				// close the ribbon
				// when in full mode slides in the middle of the page
				// when not slides left
				closeRibbon			= function() {
					isRibbonShown 	= false
					
					$iw_ribbon_close.hide();
					$iw_ribbon_zoom.hide();
					
					if(!isFullMode) {
					
						// current wall image
						var $el	 		= $iw_thumbs.children('li').eq(current);
						
						resetWall($el);
						
						// slide out ribbon
						$iw_ribbon.stop()
								  .animate({width : '0%'}, ribbonAnim.speed, ribbonAnim.easing); 
							  
					}
					else {
						$iw_ribbon.stop().animate({
							opacity		: 0.6,
							height 		: '0px',
							marginTop	: w_dim.height/2 + 'px' // half of window height
						}, ribbonAnim.speed, function() {
							$iw_ribbon.css({
								'width'		: '0%',
								'height'	: '126px',
								'margin-top': '0px',
								'background': '#000',
								// 'zIndex'	:  1
							}).children('.detail').remove();
						});
						
						isFullMode	= false;
					}
				},
				resetWall			= function($el) {
					var $img		= $el.children('img'),
						$descrp		= $img.next();
						
					$el.data('ribbon',false);
					
					// reset the image z-index and height
					$img.css('z-index',1).stop().animate({
						height 		: $img.data('originalHeight')
					}, imgAnim.speed,imgAnim.easing);
					
					// fadeOut the description
					$descrp.fadeOut();					// fadeIn all the other images
					$iw_thumbs.children('li').not($el).animate({opacity : 1}, imgAnim.speed);								
				},
				showDetail = function($el) {
					isFullMode	= true;
					
					$iw_ribbon_close.hide();
					
					var	$img	= $el.children('img'),
						id	= $img.attr('id');
						// alert(id);
						// add a loading image on top of the image
						$loading = $('<span class="iw_loading"></span>');
					
					$el.append($loading);
					// $ajax loading
					$.getJSON("",{
						"type": "detail",
						"id": id
					},function(data){
						$loading.remove();
						if (data.state===1) {
							$iw_ribbon_zoom.hide();
							resetWall($el);
							$iw_ribbon.stop().animate({
								opacity		: 1,
								height 		: '0px',
								marginTop	: '63px' // half of ribbons height
							}, ribbonAnim.speed, function() {
							// add the deltail to the DOM
								$deltail = data.msg;
								$iw_ribbon.prepend($deltail);
							
								$iw_ribbon_close.show();
							
								$iw_ribbon.css("background","rgba(0,0,0,.6)").animate({
									height 		: '100%',
									marginTop	: '0px',
									top			: '75px',
								// zIndex      : 20000
								}, ribbonAnim.speed);
							});
						}else{

							closeRibbon();
						};
					});
					// test method
					// clearWall();
					//test
					// setTimeout(function(data){
					// 	$loading.remove();
					// 	$iw_ribbon_zoom.hide();
					// 	resetWall($el);
					// 	$iw_ribbon.stop().animate({
					// 		opacity		: 1,
					// 		height 		: '0px',
					// 		marginTop	: '63px' // half of ribbons height
					// 	}, ribbonAnim.speed, function() {
					// 		// add the deltail to the DOM
					// 		$deltail = $("<div class='detail'>炯，在校期间是大连理工大学软件学院创新实践中心第一批成员，创新实践中心副主任，软件组组长；大连理工大学软件学院ACM第一批队员，东北赛区一等奖；曾获得多项国内外大奖；后因成绩优异被保送北航攻读研究生；在校期间便已在微软亚洲研究院、迅雷、百度等知名企业实习，并持有九项国家专利，研究生毕业后转战淘宝，两年便已升至阿里巴巴产品经理的席位刘炯学长以“互联网改变世界，我们改变互联网”为主题的讲座从四方面着眼，循序渐进，生动合理。一开篇的个人求学及工作经历便已引得台下掌声不断。刘炯学长幽默的讲解更是引得台下笑声连连，轻松愉悦的提问环节也极大地调动了听众的积极性，提问者此起彼伏，络绎不绝，但刘炯学长丝毫没有半点不耐神色，周到细致的讲解令每一个提问者获得满意的答复。长达两个小时的讲座始终沉浸在这种轻松而和谐的氛围中，令人感觉如春风拂面般舒爽宜人。继之，他向在座同学介绍了“阿里产品经理”的概念，本来对很多人而言似懂非懂，模棱两可的名词，在刘炯学长的讲解下逐渐形象清晰明朗起来。言者妙语连珠，听者全神贯注。紧接着他又讲了一下自己求学时的一些经验，并对同学赠与几点最真诚的建议，“知其然，知其所以然”“纵长于深”等诸多宝贵经验的传递，赢得在场同学阵阵雷鸣般的掌声.</div>");
					// 		$iw_ribbon.prepend($deltail);
							
					// 		$iw_ribbon_close.show();
							
					// 		$iw_ribbon.css("background","rgba(0,0,0,.6)").animate({
					// 			height 		: '100%',
					// 			marginTop	: '0px',
					// 			top			: '75px',
					// 			// zIndex      : 20000
					// 		}, ribbonAnim.speed);
					// 	});
					// },1000);
					// end test
				},
				loadItem = function(){
					if (isEnd) {
						alert("没有了,O(∩_∩)O~");
						return;
					};
					var $load = $("#footer .next");
					// show loading gif
					     $load.attr("class","loading");
					$.getJSON("",{
						"type" 	: "models",
						"start"	: loadCount*loadNumber+1,
						"number": loadNumber
					},function(data){
						loadCount++;
						// hide loading gif
						$load.attr("class","next");
						if (data.state===1||data.state===2) {
							 clearWall();
							 $.each(data.prizeArray,function(i,value){
							 	$newItem = $(value);
							 	$iw_thumbs.append($newItem);
							 });
							 if(data.state===2){
							 	isEnd = true;
							 }
						}else{
							alert("发生了一些未知的错误,%>_<%");
						};
					});
				},
				clearWall = function(){
					var $odlItems = $iw_thumbs.find("li");
						$odlItems.fadeOut("slow",function(){
							$(this).remove();
						});
				};
				//var  resizeImage			= function($image) {
				// 	var widthMargin		= 100,
				// 		heightMargin 	= 100,
					
				// 		windowH      	= w_dim.height - heightMargin,
				// 		windowW      	= w_dim.width - widthMargin,
				// 		theImage     	= new Image();
						
				// 	theImage.src     	= $image.attr("src");
					
				// 	var imgwidth     	= theImage.width,
				// 		imgheight    	= theImage.height;					
				// 		if((imgwidth > windowW) || (imgheight > windowH)) {
				// 		if(imgwidth > imgheight) {
				// 			var newwidth 	= windowW,
				// 				ratio 		= imgwidth / windowW,
				// 				newheight 	= imgheight / ratio;
								
				// 			theImage.height = newheight;
				// 			theImage.width	= newwidth;
							
				// 			if(newheight > windowH) {
				// 				var newnewheight 	= windowH,
				// 					newratio 		= newheight/windowH,
				// 					newnewwidth 	= newwidth/newratio;
							
				// 				theImage.width 		= newnewwidth;
				// 				theImage.height		= newnewheight;
				// 			}
				// 		}
				// 		else {
				// 			var newheight 	= windowH,
				// 				ratio 		= imgheight / windowH,
				// 				newwidth 	= imgwidth / ratio;
							
				// 			theImage.height = newheight;
				// 			theImage.width	= newwidth;
							
				// 			if(newwidth > windowW) {
				// 				var newnewwidth 	= windowW,
				// 				    newratio 		= newwidth/windowW,
				// 					newnewheight 	= newheight/newratio;
						
				// 				theImage.height 	= newnewheight;
				// 				theImage.width		= newnewwidth;
				// 			}
				// 		}
				// 	}
						
				// 	$image.css({
				// 		'width'			: theImage.width + 'px',
				// 		'height'		: theImage.height + 'px',
				// 		'margin-left'	: -theImage.width / 2 + 'px',
				// 		'margin-top'	: -theImage.height / 2 + 'px'
				// 	});							
				// };
			
				
			return {init : init};	
		})();
	
	ImageWall.init();
});