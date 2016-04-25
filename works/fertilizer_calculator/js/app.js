$(document).ready(function() {

	$('.main-head').vegas({
  overlay: false,
  transition: 'fade',
  transitionDuration: 4000,
  delay: 10000,
  animationDuration: 20000,
  timer: false,
  slides: [
    { src: 'img/header-bg.jpg' },
    { src: 'img/header-bg-slide.jpg' },
  ]
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
