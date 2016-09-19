$(document).ready(function () {

  // responsive button

  $('#btn-mob').click(function(e){
    e.preventDefault();
    $(this).toggleClass('active');
    $('.header__nav-list').toggleClass('active');
  });

  // hidding navigation

  $(document).on('click',function(e){
    if(!$(e.target).closest('#btn-mob, .header__nav-list').length){
      $('#btn-mob').removeClass('active');
      $('.header__nav-list').removeClass('active');
    }
  });

  // initial animate link scroll

  $("a.anchorLink").anchorAnimate();

  // main slider with progress bar

  var time = 10;
  var $bar,
      $slick,
      isPause,
      tick,
      percentTime;

  $slick = $('.main-slider');
  $slick.slick({
    fade: true,
    autoplay:false,
    autoplaySpeed: 10000,
    speed: 4000,
    draggable: true,
    adaptiveHeight: false,
    mobileFirst: true,
    arrows: false,
    pauseOnDotsHover: true,
  });

  $bar = $('.slider-progress .progress-line');

  $('.main-slider-wrap').on({
    mouseenter: function() {
      isPause = true;
    },
    mouseleave: function() {
      isPause = false;
    }
  })

  function startProgressbar() {
    resetProgressbar();
    percentTime = 0;
    isPause = false;
    tick = setInterval(interval, 10);
  }

  function interval() {
    if(isPause === false) {
      percentTime += 1 / (time+0.1);
      $bar.css({
        width: percentTime+"%"
      });

      if(percentTime >= 100)
        {
          $slick.slick('slickNext');
          startProgressbar();
        }
    }
  }

  function resetProgressbar() {
    $bar.css({
     width: 0+'%'
    });
    clearTimeout(tick);
  }

  startProgressbar();

  // product slider

  $('.product__slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.product__slider-nav',

  });

  $('.product__slider-nav').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.product__slider',
    focusOnSelect: true,
    vertical: true,
    centerMode: false,
    verticalSwiping: true,
    prevArrow: '<button type="button" class="slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-next"></button>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          vertical: false,
          verticalSwiping: false,
        }
      },
      {
        breakpoint: 568,
        settings: {
          vertical: false,
          verticalSwiping: false,
          slidesToShow: 3,
        }
      },
    ]

  });

  // styling input fields

  $('input, select').styler();

  // order popup

  $('.call-measurer-popup').fancybox({
      helpers: {
        overlay: {
          locked: false
        }
      },
      wrapCSS:'popup-wrap',
      padding:0
  });

  $('.cost-calculation-popup').fancybox({
      helpers: {
        overlay: {
          locked: false
        }
      },
      wrapCSS:'popup-wrap',
      padding:0
  });

  $(".tab_item").not(":first").hide();

  $(".contacts__map .tab").click(function() {
    $(".contacts__map .tab").removeClass("active").eq($(this).index()).addClass("active");
    $(".tab_item").hide().eq($(this).index()).fadeIn()
  }).eq(0).addClass("active");

});


// animate links scrolling

jQuery.fn.anchorAnimate = function(settings) {
  settings = jQuery.extend({
    speed : 1100
  }, settings);

  return this.each(function(){
    var caller = this
    $(caller).click(function (event) {
    event.preventDefault()
    var locationHref = window.location.href
    var elementClick = $(caller).attr("href")

    var destination = $(elementClick).offset().top - parseInt(50);
    $("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination}, settings.speed, function() {
    window.location.hash = elementClick
    });

    return false;
    })
  })
}


