$(document).ready(function() {

	$(".mobile_nav").click(function() {
		$(this).next().children("ul").slideToggle();
	});

	$(".services_mnu").click(function() {
		$(".main_cats").slideToggle();
	});

	$(".mc_item_wrap ul").each(function() {
		$(this).after("<div class='mc_item_wrap_af'></div>");
	});


	$(".mc_toggle").click(function() {
		if($(this).parent().parent().children("ul").is(":visible")) {
			$(this).parent().parent().children("ul").slideUp();
			$(this).parent().parent().children(".mc_item_wrap_af").hide();
		} else {
			$("body .mc_wrap .mc_item_wrap > ul, .mc_item_wrap_af").hide();
			$(".mc_item_wrap").removeClass("active");
			$(this).parent().parent().addClass("active");
			$(this).parent().parent().children("ul").slideDown();
			$(this).parent().parent().children(".mc_item_wrap_af").show();
		}
		
	});

	$(".fancybox").fancybox();

	var eqElement = ".hi_item, .sb_content > div"
	$(window).load(function(){equalheight(eqElement);}).resize(function(){equalheight(eqElement);});

	$("a[href='#']").click(function(e) {
    e.preventDefault();
  });

});

$(window).load(function() { 
	$(".loader_inner").fadeOut();
	$(".loader").delay(400).fadeOut("slow"); 
});	

