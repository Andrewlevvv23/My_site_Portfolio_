$(document).ready(function(){
	  $('.curousel_inner').slick({
      speed: 1200,
      prevArrow: '<button type="button" class="slick-prev"> <img src="../img/left.png"> </button>',
      nextArrow: '<button type="button" class="slick-next"> <img src="../img/right.png"> </button>',
      responsive: [
        {
        breakpoint: 768,
			  settings: {
				arrows: false,
				dots: true
			},
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1,
          },
        },
      ],
    });
     $('ul.catalog_tabs').on('click', 'li:not(.catalog_tab_active)', function () {
       $(this)
         .addClass('catalog_tab_active')
         .siblings()
         .removeClass('catalog_tab_active')
         .closest('div.container')
         .find('div.catalog_content')
         .removeClass('catalog_content_active')
         .eq($(this).index())
         .addClass('catalog_content_active');
     });

     $('.catalog_link').each(function(i) {
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog-item_content').eq(i).toggleClass('catalog-item_content_active');
        $('.catalog-item_list').eq(i).toggleClass('catalog-item_list_active');
      });
     });

     function toggleSlide(item) {
        $(item).each(function (i) {
          $(this).on('click', function (e) {
            e.preventDefault();
            $('.catalog-item_content').eq(i).toggleClass('catalog-item_content_active');
            $('.catalog-item_list').eq(i).toggleClass('catalog-item_list_active');
          });
        });
     }
    toggleSlide('.catalog-item_link');
    toggleSlide('.catalog-item_back');
	

	//modal

   $('[data-modal=consultation]').on('click', function() {
     $('.overlay, #consultation').fadeIn('slow');
   });
   $('.modal_close').on('click', function () {
     $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
   });
    $('.button_mini').on('click', function () {
      $('.overlay, #order').fadeIn('slow');
    });

    $('.button_mini').each(function(i) {
      $(this).on('click', function(){
        $('#order .modal_descr').text($('.catalog_subtitle').eq(i).text());
      });
    });

    
    $('form').submit(function (e) {
      e.preventDefault();
      $.ajax({
        type: 'POST',
        url: 'mailer/smart.php',
        data: $(this).serialize(),
      }).done(function () {
        $(this).find('input').val('');
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');

        $('form').trigger('reset');
      });
      return false;
    });

    //Smooth scroll

    $(window).scroll(function(){
      if ($(this).scrollTop() > 1600) {
        $('.pageup').fadeIn();
      } else {
        $('.pageup').fadeOut();
      }
    });

    $('a[href=#up]').click(function () {
      var _href = $(this).attr('href');
      $('html, body').animate({ scrollTop: $(_href).offset().top + 'px' });
      return false;
    });
    new WOW().init();
    
});  