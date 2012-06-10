// NOTICE!! DO NOT USE ANY OF THIS JAVASCRIPT
// IT'S ALL JUST JUNK FOR OUR DOCS!
// ++++++++++++++++++++++++++++++++++++++++++

var ScrollToTop = ScrollToTop || {
    setup: function () {
        var a = $(window).height() / 2;
        $(window).scroll(function () {
            (window.innerWidth ? window.pageYOffset : document.documentElement.scrollTop) >= a ? $("#ScrollToTop").removeClass("Offscreen") : $("#ScrollToTop").addClass("Offscreen")
        });
        $("#ScrollToTop").click(function () {
            $("html, body").animate({
                scrollTop: "0px"
            }, 400);
            return false
        })
    }
}

!function ($) {
	  /*$(function(){
			var $win = $(window)
			  , $nav = $('#globalNav')
			  , navTop = $('#globalNav').length && $('#globalNav').offset().top 
			  , isFixed = 0
			processScroll()
		
			// hack sad times - holdover until rewrite for 2.1
			$nav.on('click', function () {
			  if (!isFixed) setTimeout(function () {  $win.scrollTop($win.scrollTop() - 7) }, 10)
			})
		
			$win.on('scroll', processScroll)
		
			function processScroll() {
			  var i, scrollTop = $win.scrollTop();
			  if (scrollTop >= navTop && !isFixed) {
				isFixed = 1;
				$nav.addClass('navbar-fixed');

			  } else if (scrollTop <= navTop && isFixed) {
				isFixed = 0;
				$nav.removeClass('navbar-fixed');
			  }
			}
		});*/
	  
	  
	  
    ScrollToTop.setup();
	
/*
	$('.toggleImage a, .imageSetHolder .count').click(function(){
		$(this).parents('.imageSetHolder').toggleClass('enlarge');
		return false;									  
	});*/
	
	
	
	$('.more').click(function(){
		/*$(this).parents('.teacher').toggleClass('open');
		return false;							*/
		var teacher = $(this).parents('.teacher');
		if(teacher.hasClass('open')){
			teacher.find('.detail').slideUp("fast", function () {
				teacher.removeClass('open');
			});	
			$(this).html('展开');
		}
		else{
			teacher.find('.detail').slideDown("fast", function () {
				teacher.addClass('open');
			});	
			$(this).html('收起');
		}
		return false;
	});

}(window.jQuery);




jQuery(document).ready(function() {

		jQuery('#slider').nivoSlider({
			effect: 'random',
			slices: 15,
			boxCols: 8,
			boxRows: 4,
			animSpeed: 500,
			pauseTime: 3000,
			startSlide: 0,
			directionNav: true,
			directionNavHide: false,
			controlNav: true,
			controlNavThumbs: false,
			controlNavThumbsFromRel: false,
			controlNavThumbsSearch: '.jpg',
			controlNavThumbsReplace: '_thumb.jpg',
			keyboardNav: false,
			pauseOnHover: true,
			manualAdvance: false,
			captionOpacity: 0.8,
			prevText: 'pre',
			nextText: 'next',
			randomStart: false,
			beforeChange: function(){},
			afterChange: function(){},
			slideshowEnd: function(){},
			lastSlide: function(){},
			afterLoad: function(){}
		});
		if(typeof(sessvars) != 'undefined'){
	if(sessvars['.nivo-prevNav']?sessvars['.nivo-prevNav']:'null' != 'null' || sessvars['.nivo-nextNav']?sessvars['.nivo-nextNav']:'null' != 'null' || sessvars['.nivo-directionNav a']?sessvars['.nivo-directionNav a']:'null' != 'null'){
			if(sessvars['.nivo-prevNav'] == 'none' || sessvars['.nivo-directionNav a'] == 'none'){
				//alert('other');
				//jQuery('.nivo-directionNav a').css({'background-image': sessvars['arrow_pos_abs_bkg'], 'width':sessvars['arrow_pos_abs_width'], 'height':sessvars['arrow_pos_abs_height']});
				//jQuery('.nivo-directionNav a').css('top', sessvars['arrow_pos_abs_top']);
				//jQuery('.nivo-nextNav').css({'right': sessvars['arrow_pos_abs_sides']});
				//jQuery('.nivo-prevNav').css('left', sessvars['arrow_pos_abs_sides']);
				jQuery('.print, .nivo-directionNav a').css('background-color', 'red');
			}else{
				//alert('none');
				jQuery('.nivo-nextNav').attr('style', sessvars['.nivo-nextNav']);
				jQuery('.nivo-prevNav').attr('style', sessvars['.nivo-prevNav']);
				jQuery('.nivo-directionNav a').attr('style', sessvars['.nivo-directionNav a']);
			}

		}
	}
	});


function bookmark_us(url, title){
	if (window.sidebar) // firefox
		window.sidebar.addPanel(title, url, "");
	else if(window.opera && window.print){ // opera
		var elem = document.createElement('a');
		elem.setAttribute('href',url);
		elem.setAttribute('title',title);
		elem.setAttribute('rel','sidebar');
		elem.click();
	}
	else if(document.all)// ie
		window.external.AddFavorite(url, title);
}