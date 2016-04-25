$(window).scroll(function () {

  if ($("body").scrollTop() > 400) {
    $(".top").fadeIn(500);
  } else {
    $(".top").fadeOut(500);
  }

});

$(".top").click(function () {

  $("html, body").animate({
    scrollTop: 0
  }, 800);

});

$(window).load(function() {

  $(".loader_inner").fadeOut();
  $(".loader").delay(1000).fadeOut("slow");

});