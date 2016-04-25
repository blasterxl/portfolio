$(document).ready(function() {

	function initSize() {
		$(".box_mnu .panel-heading").each(function() {
			var ph = $(this).height() + 3;
			var pdt = $(this).find(".dropdown-toggle");
			pdt.height(ph);
		});

		$(".till_item .tc").each(function() {
			var parh = $(this).parent().height();
			$(this).height(parh);
		});
	};

	initSize();

	$(window).resize(function() {
		initSize();
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

	$("a[href='#']").click(function(e) {
    e.preventDefault();
  });

});
