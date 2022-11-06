/* jshint esversion: 6 */
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const closeElem = document.querySelector('.menu_close');
const modal = document.querySelector('.modal');
const menuLink = document.querySelector('.menu_list');
const overlay = document.querySelector('.menu_overlay');
const btns = document.querySelector('.contacts_btn');
const go = document.querySelector('.overlay');
const close = document.querySelector('.modal_close');


hamburger.addEventListener('click', () => {
	menu.classList.add('active');
});

closeElem.addEventListener('click', () => {
  menu.classList.remove('active');
});
menuLink.addEventListener('click', () => {
  menu.classList.remove('active');
});
overlay.addEventListener('click', () => {
  menu.classList.remove('active');
});

//modal

$('form').submit(function (e) {
  btns.addEventListener('click', () => {
    if (onsubmit !== '') {
      go.classList.add('active');
    }
  });
  e.preventDefault();
});

$('.modal_close, .overlay').on('click', function () {
  $('.overlay, #thanks').fadeOut('slow');
});

//PHP

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


    