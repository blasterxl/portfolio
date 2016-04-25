$(document).ready(function() {

	$.stellar({
		responsive: true,
		horizontalOffset: 60
	});

	$("#carousel").owlCarousel({
 
      navigation : true, 
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem: true,
      navigationText: ""
  });

  $(".header-menu-area").sticky({topSpacing:0});

  $(".navbar-collapse ul a").mPageScroll2id({
  	offset: 64,
  	scrollSpeed: 1000
  });

  $("body").scrollspy({
  	target: ".navbar-collapse",
  	offset: 95
  });

  $(".navbar-collapse li a").click(function(){
  	$(".navbar-collapse").removeClass("in");
  });


	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });
	
});
