(function() {

  var radius = 50,
    circumference = 2 * radius * Math.PI,
    deadline = new Date(2017, 0, 1);

  function getTimeRemaining(time) {
    var t = Date.parse(time) - Date.parse(new Date),
      seconds = Math.floor(t / 1000 % 60),
      minutes = Math.floor(t / (1000 * 60) % 60),
      hours = Math.floor(t / (1000 * 60 * 60) % 24),
      days = Math.floor(t / (1000 * 60 * 60 * 24));

    return {
      'total': t,
      'seconds': seconds,
      'minutes': minutes,
      'hours': hours,
      'days': days
    };
  }

  function initClock(id, endtime) {
    var dElem = document.querySelector(".days .number"),
      hElem = document.querySelector(".hours .number"),
      mElem = document.querySelector(".minutes .number"),
      sElem = document.querySelector(".seconds .number"),

      dDescr = document.querySelector(".days .descr"),
      hDescr = document.querySelector(".hours .descr"),
      mDescr = document.querySelector(".minutes .descr"),
      sDescr = document.querySelector(".seconds .descr");

    function updateClock() {
      var t = getTimeRemaining(endtime);

      var svgElem = document.querySelectorAll("svg #bar"),
        percDay = (365 - t.days) / 365 * circumference,
        percHour = (24 - t.hours) / 24 * circumference,
        percMinute = (60 - t.minutes) / 60 * circumference,
        percSecond = (60 - t.seconds) / 60 * circumference;

      dElem.innerHTML = t.days;
      hElem.innerHTML = ("0" + t.hours).slice(-2);
      mElem.innerHTML = ("0" + t.minutes).slice(-2);
      sElem.innerHTML = ("0" + t.seconds).slice(-2);

      dDescr.innerHTML = pluralize(t.days, "day");
      hDescr.innerHTML = pluralize(t.hours, "hour");
      mDescr.innerHTML = pluralize(t.minutes, "minute");
      sDescr.innerHTML = pluralize(t.seconds, "second");

      svgElem[0].setAttribute("stroke-dashoffset", percDay);
      svgElem[1].setAttribute("stroke-dashoffset", percHour);
      svgElem[2].setAttribute("stroke-dashoffset", percMinute);
      svgElem[3].setAttribute("stroke-dashoffset", percSecond);

      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);

  }

  function createCircles(radius) {
    var circle = document.querySelectorAll("circle");
    [].forEach.call(circle, function(el) {
      el.setAttribute("stroke-dasharray", circumference);
      el.setAttribute("r", radius);
    });
  }

  function pluralize(number, text) {
    if (number === 1 || number === 00) {
      return text;
    } else {
      return text + 's'
    }
  }

  createCircles(radius);
  initClock("clock", deadline);

})();
