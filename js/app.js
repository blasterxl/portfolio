$(document).ready(function() {

  $(".button").click(function() {
    $(this).toggleClass("clicked");
    $(".fullpage").toggleClass("clicked");
  });

  $(window).scroll(function() {
    if ($(".fullpage").hasClass("clicked")) {
      window.scrollTop = 0;
    } else {
      window.scrollTo(0, 0);
    }
  });

  $("#portfolio_grid").mixItUp();

	$(".gallery li").click(function() {
		$(".gallery li").removeClass("active");
		$(this).addClass("active");
	});

  try {
    $.browserSelector();
    if ($("html").hasClass("chrome")) {
      $.smoothScroll();
    }
  } catch (err) {

  };

  $("a[href='#']").click(function(e) {
    e.preventDefault();
  });

});