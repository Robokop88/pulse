// carusel

 const slider = tns({
  container: '.carousel__inner',
  items: 1,
  slideBy: 'page',
  autoplay: false,
  controls: false,
  responsive: {
    991: {
      items: 1
    }
  }
});

document.querySelector('.prev').addEventListener('click', function() {
  slider.goTo('prev');
});

document.querySelector('.next').addEventListener('click', function() {
  slider.goTo('next');
}); 

// Tabs

$(document).ready(function(){
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });


  function toggleSlide(item) {
    $(item).each(function(i) {
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      });
    }); 
  };
  
  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

  // Modal
   
  $('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn('slow');
  });

  $('.modal__close').on('click', function() {
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
  });

  $('.button_mini').each(function(i){
    $(this).on('click', function()  {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
    });
  });
  
  function valideForm(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
          maxlength: 30
        },
        phone: {
          required: true,
          maxlength: 18
        },
        email: {
          required: true,
          maxlength: 30,
          email: true
        }
      },
      messages: {
        name: {
          required: "Пожалуйста, введите свое имя",
          minlength: jQuery.validator.format("Минимальное количество символов = {0}"),
          maxlength: jQuery.validator.format("Максиимальное количество символов = {0}")
        },
        phone: {
          required: "Пожалуйста, введите свой номер телефона",
          maxlength: jQuery.validator.format("Максимальное количество символов = {0}")
        },
        email: {
          required: "Пожалуста введите сою почту",
          email: "Неправильно введен адрес почты",
          maxlength: jQuery.validator.format("Маскимальное количество символов = {0}")
        }
      }
    });
  };

  valideForm("#consultation-form");
  valideForm("#consultation form");
  valideForm("#order form");

  // mask decoration

  let inputs = document.querySelectorAll('input[type="tel"]');
  let Im = new Inputmask('+7 (999) 999-99-99');
  Im.mask(inputs);

  let maxLength = 30;

  // limitation

  $('input[type="text"], input[type="email"]').on('input', function(){
    console.log(this.value.length)
    if (this.value.length > maxLength){
      this.value = this.value.slice(0, maxLength);
    }
  });

   // sending

  $('form').submit(function(e) {
    e.preventDefault();
    if (!$(this).valid()) {
      return;
    }
    $.ajax({
      type: "POST",
      url: "mailer/smart.php", 
      data: $(this).serialize()
    }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');
        $('form').trigger('reset');
    });
    return false;
  });

  // Smooth scroll and pageup

  $(window).scroll(function() {
    if ($(this).scrollTop() > 1600) {
      $('.pageup').fadeIn('slow');
    } else {
      $('.pageup').fadeOut();
    }
  });
  
  $("a[href=#up]").click(function(){
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
  });
  
});
