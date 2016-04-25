(function() {
  'use strict';

  function Slider(options) {

    /**
     * The list of options able to be set by user on slider
     * creation. If any property is left unset, it will default
     * to the option specified here.
     * @type {Object}
     */
    this.options = $.extend({
      slideContainer: '#slider',
      controlButtons: '#control-buttons',
      autoplay: true,
      duration: 5000
    }, options);

    /**
     * Slider private variables
     */
    this._items = $(this.options.slideContainer).find('.slider-wrapper > li');
    this._slideLength = this._items.length;
    this._controls = $(this.options.controlButtons);
    this._sliderInterval = null;
    this._currentSlide = 0;
    this._nextSlide = 1;

    this.init();

  }

  /**
   * Initialization function for setting up
   * and enabling the slider
   */
  Slider.prototype.init = function() {

    this._slideControls();
    this.options.autoplay && this._autoPlay();
    this._clickHandler();
    this._pauseOnHover();

  }

  /**
   * Creates the DOM elements with class names
   * for dot navigation. Sets active class to current slide and
   * appends dotNav to the slider
   */
  Slider.prototype._slideControls = function() {

    var dotNav = '';

    for (var i = 0; i < this._slideLength; i++) {
      if (i == 0) {
        dotNav += '<li class="active"></li>';
      } else {
        dotNav += '<li></li>';
      }
    }

    this._controls.html(dotNav);

  }

  /**
   * Starting autoPlay, create a new setInterval
   */
  Slider.prototype._autoPlay = function() {

    var self = this;

    this._sliderInterval = setInterval(function() {
      self._startSlider();
    }, this.options.duration);

  }

  /**
   * Finds the slide to navigate to corresponding to the
   * index number of the clicked dot.
   */
  Slider.prototype._clickHandler = function() {

    var self = this;

    this._controls.on('click', 'li', function(e) {

      var index = $(this).index();

      if (!(this._currentSlide === index)) {
        self._changeSlide(index);
      }
    });

  }

  /**
   * Stop and start autoPlay when the user's cursor enters and leaves
   * the slider image element accordingly.
   */
  Slider.prototype._pauseOnHover = function() {

    var self = this;

    $('.slider-wrapper').on('mouseenter', function(e) {
      if(self._sliderInterval) {
        clearInterval(self._sliderInterval);
      }
    });

    $('.slider-wrapper').on('mouseleave', function(e) {
      self._sliderInterval = setInterval(function() {
        self._startSlider();
      }, self.options.duration);
    });

  }

  /**
   * Actually move the slide images
   */
  Slider.prototype._startSlider = function() {

    var controls = $(this.options.controlButtons + ' li');

    if (this._nextSlide >= this._slideLength) {
      this._nextSlide = 0;
      this._currentSlide = this._slideLength - 1;
    }

    controls.removeClass('active').eq(this._nextSlide).addClass('active');
    this._items.eq(this._currentSlide).fadeOut('slow');
    this._items.eq(this._nextSlide).fadeIn('slow');

    this._currentSlide = this._nextSlide;
    this._nextSlide += 1;

  }

  /**
   * Move the slide images when the user use dot navigation
   */
  Slider.prototype._changeSlide = function(index) {

    var controls = $(this.options.controlButtons + ' li');

    clearInterval(this._sliderInterval);

    controls.removeClass('active').eq(index).addClass('active');
    this._items.eq(this._currentSlide).fadeOut('slow');
    this._items.eq(index).fadeIn('slow');

    this._currentSlide = index;
    this._nextSlide = index + 1;

    this.options.autoplay && this._autoPlay();

  }

  window.slider = new Slider();

})();