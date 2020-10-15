declare function Swiper(): any;

declare var $: any;

var $body = $('body');

export class Init {

  static first(){
    $('[data-bg-image]').each(function () {
      var $this = $(this),
        $image = $this.data('bg-image');
      $this.css('background-image', 'url(' + $image + ')');
    });
    $('[data-bg-color]').each(function () {
      var $this = $(this),
        $color = $this.data('bg-color');
      $this.css('background-color', $color);
    });
  }

  static slider() {
    // Home 1 Slider
    // @ts-ignore
    var $home1Slider = new Swiper('.home1-slider', {
      loop: true,
      speed: 750,
      effect: 'fade',
      navigation: {
        nextEl: '.home1-slider-next',
        prevEl: '.home1-slider-prev',
      },
      autoplay: {},
    });
  }

  static moblieMenu() {

    var $offCanvasNav = $('.offcanvas-menu, .overlay-menu'),
      $offCanvasNavSubMenu = $offCanvasNav.find('.sub-menu');

    /*Add Toggle Button With Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.parent().prepend('<span class="menu-expand"></span>');

    /*Category Sub Menu Toggle*/
    $offCanvasNav.on('click', 'li a, .menu-expand', function (e) {
      var $this = $(this);
      if ($this.attr('href') === '#' || $this.hasClass('menu-expand')) {
        e.preventDefault();
        if ($this.siblings('ul:visible').length) {
          $this.parent('li').removeClass('active');
          $this.siblings('ul').slideUp();
          $this.parent('li').find('li').removeClass('active');
          $this.parent('li').find('ul:visible').slideUp();
        } else {
          $this.parent('li').addClass('active');
          $this.closest('li').siblings('li').removeClass('active').find('li').removeClass('active');
          $this.closest('li').siblings('li').find('ul:visible').slideUp();
          $this.siblings('ul').slideDown();
        }
      }
    });

  }

  static offcanvasToggle() {

    var $offCanvasToggle = $('.offcanvas-toggle'),
      $offCanvas = $('.offcanvas'),
      $offCanvasOverlay = $('.offcanvas-overlay'),
      $mobileMenuToggle = $('.mobile-menu-toggle');
    $offCanvasToggle.on('click', function (e) {
      e.preventDefault();
      var $this = $(this),
        $target = $this.attr('href');
      $body.addClass('offcanvas-open');
      $($target).addClass('offcanvas-open');
      $offCanvasOverlay.fadeIn();
      if ($this.parent().hasClass('mobile-menu-toggle')) {
        $this.addClass('close');
      }
    });

    $('.offcanvas-close, .offcanvas-overlay').on('click', function (e) {
      e.preventDefault();
      $body.removeClass('offcanvas-open');
      $offCanvas.removeClass('offcanvas-open');
      $offCanvasOverlay.fadeOut();
      $mobileMenuToggle.find('a').removeClass('close');
    });
  }

  static banner(){
    $('.category-banner1-carousel').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      prevArrow: '<button class="slick-prev"><i class="fal fa-long-arrow-left"></i></button>',
      nextArrow: '<button class="slick-next"><i class="fal fa-long-arrow-right"></i></button>',
      responsive: [{
        breakpoint: 991,
        settings: {
          slidesToShow: 2
        }
      },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    });
  }
}
