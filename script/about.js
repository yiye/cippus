"@author yiye";
// 导航栏
$(function(){
 	$("#nav ul .about").css('background-position','50% -80px');
 });
// 滚动效果
$(function(){
	
	function runNum(time,id){
		var now = 0;
		var dom = document.getElementById(id);
		if (Number(dom.innerHTML) === time) {
			return;
		};
		var timer = setInterval(function(){
			now++;
			dom.innerHTML = now;
			if(now == time){
				clearInterval(timer)
			}
		},30)
	} 
	// runNum(53,"guoji");
	//初始化滚动快
	var scrollorama = $.scrollorama({
        blocks:'.scrollBlock'
    });
/*    var run = function(time,now,ele){
						if (now !== time) {
							ele.innerHTML=now;
							now++;
							// alert(now);
							setTimeout(run(time,now,ele),9000);

						};
					}
					run(51,0,document.getElementById("guoji"));*/
	

					
    scrollorama.onBlockChange(function() {
				var i = scrollorama.blockIndex;

				/*switch(i){

					case 0:{}break;
					case 1:{}break;
					case 2:{
						$("#intro .introduce .pop").animate({
								"margin-top": "500px",
								"marging-right": "400"
						},1500);
					}break;
					case 3:{}break;
					case 4:{}break;
					case 5:{}break;
					case 6:{}break;
					case 7:{}break;


				}*/
				// if (i===0||i===1) {
				// 	$('.cycle-slideshow').cycle('resume');
				// }else{
				// 	$('.cycle-slideshow').cycle('pause');
				// };
				if (i===3) {
					runNum(51,"guoji");
					runNum(93,"guonei")
				};
			});
    //intro
    scrollorama.animate('#intro .about .dot',{ duration: 400, property:'rotate', end: 720 });
    scrollorama.animate('#intro .introduce .descript p',{ duration: 400, property:'opacity',start: 1, end: 0 });

	scrollorama.animate('#intro .introduce .descript h1',
		{ duration:600, property:'margin-top', end:780 ,easing:'easeOutBounce' },
		{ delay:600 ,duration: 400, property:'opacity', end:0 });
	scrollorama.animate('#intro .introduce .pop',
		{ duration: 400, property:'rotate', end: 720 },
		{ duration: 400, property:'margin-top', end: 300 },
		{ duration: 400, property:'margin-right', end: 600,easing:'easeOutBounce'});
	 scrollorama.animate('#photo .albumborder',
	 	// { delay:250,duration: 600, property:'margin-right',start:-1000, end:-450},
	 	{ delay:800,duration: 400, property:'opacity', end:0 }
	 	);
	 //principle#principle .slogan
	 // scrollorama.animate('#principle .princ',{duration:5000, property:'margin-top', start:314, pin:true });
	 // scrollorama.animate('#principle .princ h2',{duration:200, property:'margin-top', start:600, pin:true });
	 $('#principle .princ p').each(function(indx,el){
	 	scrollorama.animate($(this),
	 		{ delay: 200*indx, duration: 100, property:'margin-left', start:-580,end:0 ,pin:true},
	 		{ delay:800 ,duration: 100, property:'opacity', end:0 });
	 });
	 $('#principle .slogan p').each(function(indx,el){
	 	scrollorama.animate($(this),{ delay: 200*indx, duration: 300, property:'margin-left', start:580 ,end:0 ,pin:true},
	 		{ delay:800 ,duration: 100, property:'opacity', end:0 });
	 });
	 // #develope
	  scrollorama.animate('#develope .develope',//{ delay: 900, duration: 200, property:'zoom', end:8 },
	 											{ delay: 800, duration: 200, property:'opacity', end:0 });
	  // achive
	  scrollorama.animate('.achive h2',{ delay: 200, duration: 500, property:'letter-spacing', start:126 });
	  scrollorama.animate('.achive',{ delay: 700, duration: 200, property:'opacity', end:0 });
	  // activity
	  scrollorama.animate('.activity h2',
	  						{ delay:0, duration: 600, property:'letter-spacing',start:-44,end:0 });
	  scrollorama.animate('.activity h2 span',
	  						{ delay: 0, duration: 600, property:'rotate', end:720 },
	  						{ delay: 0, duration: 600, property:'left',start: 0, end:225});
	  scrollorama.animate('.activity p',
	  						{ delay: 0, duration: 600, property:'width',start: 0,end:640 },
	  						{ delay: 700, duration: 600, property:'opacity', end:0});
	//org
		var	easing_array = [	'easeOutBounce',
								'easeOutQuad',
								'easeOutCubic',
								'easeOutQuart',
								'easeOutQuint', 
								'easeOutExpo' 		];
		$('.org h2').find('span').each(function(idx,el){
					scrollorama.animate( $(this), {	delay:0, duration: 600, 
													property:'top',start:-300, end: 0,
													easing: easing_array[idx] });
		});
	scrollorama.animate('.org .struct',
	  						{ delay: 800, duration: 400, property:'opacity',start: 1,end:0});
   //summery
   scrollorama.animate('.summarize h2',
	  						{ delay: 0, duration: 400, property:'rotate',start:180,end:0},
	  						{ delay: 0, duration: 400, property:'opacity',start:0,end:1});
   //
   scrollorama.animate('#goback .goback',
	  						{ delay: 0, duration: 400, property:'rotate', start:180,end:0 });

   //照片墙
   // $('.cycle-slideshow').cycle('pause');
   	$('#circle').cycle({
				fx:     'shuffle', 
    			easing: 'easeOutBack',  
				speed:  'slow', 
				timeout: 4000,
				slideResize: true,
	            containerResize: false,
		    	cleartypeNoBg: true,
	            fit: 1,
	            pager:'.cycle-pager',
	            // easing:  'easeInOutBack'
	   	});//
   	// 回到顶部:
   	$("#goback .goback").click(function(){
   		var $paneTarget = $('body');
   		$paneTarget.stop().scrollTo( 0, 3000,{easing:'easeOutBounce'});
   		   	});
});