//= require ../lib/_jquery_ui
//= require ../lib/_jquery.tocify
(function (global) {
  'use strict';

  var closeToc = function() {
    $(".tocify-wrapper").removeClass('open');
    $("#nav-button").removeClass('open');
  };

  var makeToc = function() {
    global.toc = $("#toc").tocify({
      selectors: 'h1, h2',
      extendPage: false,
      theme: 'none',
      smoothScroll: false,
      showEffectSpeed: 0,
      hideEffectSpeed: 180,
      ignoreSelector: '.toc-ignore',
      highlightOffset: 60,
      scrollTo: -1,
      scrollHistory: true,
      hashGenerator: function (text, element) {
        return element.prop('id');
      }
    }).data('toc-tocify');

    $("#nav-button").click(function() {
      $(".tocify-wrapper").toggleClass('open');
      $("#nav-button").toggleClass('open');
      return false;
    });

    $(".page-wrapper").click(closeToc);
    $(".tocify-item").click(closeToc);
  };

  // Hack to make already open sections to start opened,
  // instead of displaying an ugly animation
  var HEADER_HEIGHT = 143;
  var TOP_POS_DETECT_PADDING = 30;

  function animate () {
    setTimeout(function() {
      toc.setOption('showEffectSpeed', 180);
    }, 50);
  }

  // Handels gap of header
  function updateTocPos () {
    var topPos = HEADER_HEIGHT - $(window).scrollTop(),
      wrapper = $('.tocify-wrapper');

    if((topPos - TOP_POS_DETECT_PADDING) < 0) {
      wrapper.removeAttr('style');
      wrapper.removeClass('no-transition');
    }else {
      wrapper.css('height', $(window).height() - topPos);
      wrapper.css('top', topPos);
      wrapper.addClass('no-transition');
    }

    //Adjust for sticky 2nd nav
    if ($('.js-two-col-header-secondary').hasClass('showing')) {
      wrapper.addClass('sticky-nav-active');
    } else {
      wrapper.removeClass('sticky-nav-active');
    }
  }

  function addListeners () {
    $(window).on('scroll', updateTocPos);
    $(window).on('resize', updateTocPos);
  }

  $(makeToc);
  $(animate);
  $(updateTocPos);
  $(addListeners);

})(window);

