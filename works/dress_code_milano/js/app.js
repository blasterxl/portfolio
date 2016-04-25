$(document).ready(function() {

	$(".toggle-mnu").click(function() {
		$(this).toggleClass("on");
		$(".main-mnu").slideToggle();
		return false;
	});

	$(".section-6 .card-item .card-content").equalHeights();

	$(".section-11 .card-item").equalHeights();

	$("#carousel").owlCarousel({
 
      navigation : true, 
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem: true,
      navigationText: ""
 
  });

  $('.image-popup-no-margins').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: false,
		fixedContentPos: true,
		mainClass: 'mfp-no-margins mfp-with-zoom', 
		image: {
			verticalFit: true
		},
		zoom: {
			enabled: true,
			duration: 300 
		}
	});

	$('.popup-youtube').magnificPopup({
		disableOn: 480,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,

		fixedContentPos: false
	});

	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("a[href='#']").click(function(e) {
    e.preventDefault();
  });

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });
	
});

