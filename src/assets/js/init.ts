declare function Swiper(): any;

declare function PerfectScrollbar(): any;

declare var mojs;

declare var PhotoSwipeUI_Default;

declare function PhotoSwipe(): any;


declare var $: any;

var $body = $('body');

export class Init {

  constructor() {

  }

  static first() {

    console.log('first');

    $.Scrollax();
    $.scrollUp({
      scrollText: '<i class="fal fa-long-arrow-up"></i>',
    });

    $('.customScroll').perfectScrollbar({
      suppressScrollX: !0
    });

    $('[data-bg-image]').each(function() {
      var $this = $(this),
        $image = $this.data('bg-image');
      $this.css('background-image', 'url(' + $image + ')');
    });

    $('[data-bg-color]').each(function() {
      var $this = $(this),
        $color = $this.data('bg-color');
      $this.css('background-color', $color);
    });

    /*   // Basic
       $('.select2-basic').select2();
       // No Search Field
       $('.select2-noSearch').select2({
         minimumResultsForSearch: Infinity
       });

       // Custom Scrollbar For Select2 Result
       $('.select2-basic, .select2-noSearch').on('select2:open', function () {
         $('.select2-results__options').each(function () {
           // @ts-ignore
           var ps = new PerfectScrollbar($(this)[0], {
             suppressScrollX: true
           });
         });
       });

       /!*--
           Nice Select
       -----------------------------------*!/
       $('.nice-select').niceSelect();

       /!*--
           Match Height
       -----------------------------------*!/
       $('.isotope-grid .product').matchHeight();

       /!*--
           ion Range Slider
       -----------------------------------*!/
       $(".range-slider").ionRangeSlider({
         skin: "learts",
         hide_min_max: true,
         type: 'double',
         prefix: "$",
       });*/

  }

  static select2() {
    $('.select2-basic').select2();
    // No Search Field
    $('.select2-noSearch').select2({
      minimumResultsForSearch: Infinity
    });

    // Custom Scrollbar For Select2 Result
    $('.select2-basic, .select2-noSearch').on('select2:open', function() {
      $('.select2-results__options').each(function() {
        // @ts-ignore
        var ps = new PerfectScrollbar($(this)[0], {
          suppressScrollX: true
        });
      });
    });
  }

  static slider() {

    console.log('slider');
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
    console.log('moblieMenu');

    var $offCanvasNav = $('.offcanvas-menu, .overlay-menu'),
      $offCanvasNavSubMenu = $offCanvasNav.find('.sub-menu');

    /*Add Toggle Button With Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.parent().prepend('<span class="menu-expand"></span>');

    /*Category Sub Menu Toggle*/
    $offCanvasNav.off();
    $offCanvasNav.on('click', 'li a, .menu-expand', function(e) {
      var $this = $(this);
      if ($this.attr('href') === '#' || $this.hasClass('menu-expand')) {
        e.preventDefault();
        if ($this.siblings('ul:visible').length) {
          $this.parent('li').removeClass('active');
          $this.siblings('ul').slideUp();
          $this.parent('li').find('li').removeClass('active');
          $this.parent('li').find('ul:visible').slideUp();
        }
        else {
          $this.parent('li').addClass('active');
          $this.closest('li').siblings('li').removeClass('active').find('li').removeClass('active');
          $this.closest('li').siblings('li').find('ul:visible').slideUp();
          $this.siblings('ul').slideDown();
        }
      }
    });

  }

  static offcanvasToggle() {

    console.log('offcanvasToggle');

    var $offCanvasToggle = $('.offcanvas-toggle'),
      $offCanvas = $('.offcanvas'),
      $offCanvasOverlay = $('.offcanvas-overlay'),
      $mobileMenuToggle = $('.mobile-menu-toggle');

    $offCanvasToggle.on('click', function(e) {
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

    $('.offcanvas-close, .offcanvas-overlay').on('click', function(e) {
      e.preventDefault();
      $body.removeClass('offcanvas-open');
      $offCanvas.removeClass('offcanvas-open');
      $offCanvasOverlay.fadeOut();
      $mobileMenuToggle.find('a').removeClass('close');
    });
  }

  static offcanvasOpen() {
    console.log('offcanvasOpen');
    var $offCanvasToggle = $('.offcanvas-toggle[href=#offcanvas-cart]');
    $offCanvasToggle.click();
  }


  static offcanvasOpenWishlist() {
    console.log('offcanvasOpen');
    var $offCanvasToggle = $('.offcanvas-toggle[href=#offcanvas-wishlist]');
    $offCanvasToggle.click();
  }


  static banner() {
    console.log('banner');
    $('.category-banner1-carousel').not('.slick-initialized').slick({
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


  static isotopeGrid(): void {
    const $isotopeGrid = $('.isotope-grid');
    $isotopeGrid.imagesLoaded((e) => {
      $isotopeGrid.isotope({
        itemSelector: '.grid-item',
        masonry: {
          columnWidth: '.grid-sizer'
        }
      });
    });
    $('.isotope-grid .product').matchHeight();
  }

  static isotopeFilter() {
    console.log('isotopeFilter');
    /*--
        Isotpe
    -----------------------------------*/
    var $isotopeFilter = $('.isotope-filter');
    $isotopeFilter.on('click', 'button', function() {
      var $this = $(this),
        $filterValue = $this.attr('data-filter'),
        $targetIsotop = $this.parent().data('target');
      $this.addClass('active').siblings().removeClass('active');
      $($targetIsotop).isotope({
        filter: $filterValue
      });
    });
  }

  static filterToggle() {
    console.log('filterToggle');
    // Filter Toggle
    $('.product-filter-toggle').off().on('click', function(e) {
      e.preventDefault();
      var $this = $(this),
        $target = $this.attr('href');
      $this.toggleClass('active');
      $($target).slideToggle();
      $('.customScroll').perfectScrollbar('update');
    });
  }


  static columnToggle() {
    console.log('columnToggle');
    // Column Toggle
    $('.product-column-toggle').off().on('click', '.toggle', function(e) {
      e.preventDefault();
      let $this = $(this),
        $column = $this.data('column'),
        $prevColumn = $this.siblings('.active').data('column');
      $this.toggleClass('active').siblings().removeClass('active');
      $('.products').removeClass('row-cols-xl-' + $prevColumn).addClass('row-cols-xl-' + $column);
      $.fn.matchHeight._update();
      $('.isotope-grid').isotope('layout');
    });
  }

  static addWishList() {
    console.log('addWishList');
    /*--
      Add To Wishlist
  -----------------------------------*/
    if (typeof mojs == 'undefined') {
      return;
    }
    var burst = new mojs.Burst({
      left: 0,
      top: 0,
      radius: {
        4: 32
      },
      angle: 45,
      count: 14,
      children: {
        radius: 2.5,
        fill: ['#F8796C'],
        scale: {
          1: 0,
          easing: 'quad.in'
        },
        pathScale: [.8, null],
        degreeShift: [13, null],
        duration: [500, 700],
        easing: 'quint.out'
      }
    });
    $('.add-to-wishlist').off().on('click', function(e) {
      var $this = $(this),
        offset = $this.offset(),
        width = $this.width(),
        height = $this.height(),
        coords = {
          x: offset.left + width / 2,
          y: offset.top + height / 2
        };
      if (!$this.hasClass('wishlist-added')) {
        e.preventDefault();
        $this.addClass('wishlist-added').find('i').removeClass('far').addClass('fas');
        burst.tune(coords).replay();
      }
    });

  }


  static qtyBtn() {

    console.log('qtyBtn');
    /*--
      Product Quantity
  -----------------------------------*/

    $('.qty-btn').off().on('click', function() {
      var $this = $(this);
      var oldValue = $this.siblings('input').val();
      if ($this.hasClass('plus')) {
        var newVal = parseFloat(oldValue) + 1;
      }
      else {
        // Don't allow decrementing below zero
        if (oldValue > 1) {
          var newVal = parseFloat(oldValue) - 1;
        }
        else {
          newVal = 1;
        }
      }
      $this.siblings('input').val(newVal);
    });

  }

  static productGallerySlider() {
    $('.product-gallery-slider').not('.slick-initialized').slick({
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      asNavFor: '.product-thumb-slider, .product-thumb-slider-vertical',
      prevArrow: '<button class="slick-prev"><i class="ti-angle-left"></i></button>',
      nextArrow: '<button class="slick-next"><i class="ti-angle-right"></i></button>'
    });

    $('.product-thumb-slider').not('.slick-initialized').slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      focusOnSelect: true,
      asNavFor: '.product-gallery-slider',
      prevArrow: '<button class="slick-prev"><i class="ti-angle-left"></i></button>',
      nextArrow: '<button class="slick-next"><i class="ti-angle-right"></i></button>'
    });

    $('.product-thumb-slider-vertical').not('.slick-initialized').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      vertical: true,
      focusOnSelect: true,
      asNavFor: '.product-gallery-slider',
      prevArrow: '<button class="slick-prev"><i class="ti-angle-up"></i></button>',
      nextArrow: '<button class="slick-next"><i class="ti-angle-down"></i></button>'
    });

  }


  // tslint:disable-next-line:typedef
  static galleryPopup(imgs) {
    console.log('galleryPopup');
    var $productPopupGalleryBtn = $('.product-gallery-popup'),
      $productPopupGallery = imgs,
      $openPhotoSwipe = function() {
        var pswpElement = $('.pswp')[0],
          items = $productPopupGallery,
          options = {
            history: false,
            focus: false,
            closeOnScroll: false,
            showAnimationDuration: 0,
            hideAnimationDuration: 0
          };
        // @ts-ignore
        new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options).init();
      };
    $productPopupGalleryBtn.off().on('click', $openPhotoSwipe);
  }

  static productZoom(images: any[]): void {
    $('.product-zoom').each((index, e) => {
      const $this = $($('.product-zoom').get(index));
      const $image = images[index];
      $this.zoom({
        url: $image?.src
      });
    });
  }


  static quickViewModal(): void {
    $('#quickViewModal').on('shown.bs.modal', e => {
      const $e = $('.product-gallery-slider-quickview');
      $e.not('.slick-initialized').slick({
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        lazyLoad: 'anticipated',
        prevArrow: '<button class="slick-prev"><i class="ti-angle-left"></i></button>',
        nextArrow: '<button class="slick-next"><i class="ti-angle-right"></i></button>'
      });
    }).on('hidden.bs.modal', e => {
      $('.qty-btn').unbind().off();
      $(e.currentTarget).data('bs.modal', null);
    });
  }

}
