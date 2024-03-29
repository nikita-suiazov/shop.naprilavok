const header = document.querySelector('#nav-header');

window.addEventListener('scroll', () => {
  if (document.documentElement.scrollTop > 1000) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
});

// после готовности DOM инициализация Слайдера
document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('.slider');
  for (var i = 0, len = sliders.length; i < len; i++) {
    // инициализация sliders[i] в качестве слайдера
    new ChiefSlider(sliders[i], {
      interval: 10000
    });
  };
});

$(document).ready(function () {
  // Маска ввода номера телефона:
  $('input[type="tel"]').mask("+375 (99) 999-99-99", { placeholder: " " });
  // Установка курсора в нужное место для ввода номера телефона
  $.fn.setCursorPosition = function (pos) {
    if ($(this).get(0).setSelectionRange) {
      $(this).get(0).setSelectionRange(pos, pos);
    } else if ($(this).get(0).createTextRange) {
      var range = $(this).get(0).createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  };
  $('input[type="tel"]').click(function () {
    $(this).setCursorPosition(6);  // set position number
  });

});

// Плавная прокрутка по ссылкам
const anchors = document.querySelectorAll('a._link');

anchors.forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()

    const blockID = anchor.getAttribute('href')

    document.querySelector(blockID).scrollIntoView({
      left: 0,
      behavior: 'smooth',
      block: 'start'
    });
  });
});

const lockPadding = document.querySelectorAll('.lock-padding');
const lockPosition = document.querySelector('.lock-position');
const modalLegalInfo = document.querySelector('.legal-info__modal');
const closeBtnModalLegalInfo = document.querySelector('.legal-info__close-btn');
const modalShowBtn = document.querySelector('.legal-info__btn');
const body = document.querySelector('body');

const TIMEOUT = 280;

modalShowBtn.addEventListener('click', () => {
  modalLegalInfo.classList.add('show');
  bodyLock();
});
closeBtnModalLegalInfo.addEventListener('click', () => {
  modalLegalInfo.classList.remove('show');
  bodyUnLock();
});

const modalFeedbackRequest = document.querySelector('.feedback-request__modal');
const showModalFeedbackBtns = document.querySelectorAll('.modal-feedback__btn-show');
const closeBtnModalFeedback = document.querySelector('.feedback-request__close-btn');

showModalFeedbackBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    modalFeedbackRequest.classList.add('show');
    setBodyLock();
  });
});
closeBtnModalFeedback.addEventListener('click', () => {
  modalFeedbackRequest.classList.remove('show');
  setBodyUnLock();
  setTransition();
});

const setBodyLock = () => {
  const lockPaddingValue = window.innerWidth - document.querySelector('.page').offsetWidth;


  if (lockPadding.length > 0) {
    lockPadding.forEach((element) => {
      element.style.paddingRight = `${lockPaddingValue}px`;
      element.style.transition = 'none';
    })
    lockPosition.style.right = 40 + lockPaddingValue + 'px';
    body.style.paddingRight = `${lockPaddingValue}px`;
    body.classList.add('lock');
  }
};

const setBodyUnLock = () => {
  setTimeout(() => {
    lockPadding.forEach((element) => {
      element.style.paddingRight = '0px';
      element.style.transition = 'none';
    })
    lockPosition.style.right = '40px';
    body.style.paddingRight = '0px';
    body.classList.remove('lock');
  }, TIMEOUT);
};

const setTransition = () => {
  setTimeout(() => {
    lockPadding.forEach((element) => {
      element.style.transition = 'all 280ms ease 0ms';
    })
  }, TIMEOUT + 500)
}