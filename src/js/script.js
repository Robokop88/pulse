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
          maxlength: 25
        },
        phone: {
          required: true,
          phone: true,
          maxlength: 18
        },
        email: {
          required: true,
          maxlength: 40,
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
          minlength: jQuery.validator.format("Минимальное количество символов = {0}"),
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

  $('input[name=phone]').mask('+7 ');

});
