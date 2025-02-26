

/* 
Появление шапки
*/
function checkScroll() {
  const scrollThreshold = 400;
  const element = document.getElementById('header');

  if (window.scrollY >= scrollThreshold) {
    element.style.height = '90px';
  } else {
    element.style.height = '0';
  }
}

if (window.innerWidth > 992) {
  window.addEventListener('scroll', checkScroll);
}

/* 
Функциональность мобильного меню
*/
let btnBurger = document.querySelector('.header__burger');
let menu = document.querySelector('.header__inner')
btnBurger.addEventListener('click', () => {
  menu.classList.toggle('active')
});

/* 
Анимиация появления элементов
*/
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.box').forEach(box => {
  observer.observe(box);
});
// 
document.addEventListener('DOMContentLoaded', () => {
  const leftArrow = document.querySelector('.slider-arrow-process.left');
  const rightArrow = document.querySelector('.slider-arrow-process.right');
  const slider = document.querySelector('.process__items');

  // Функция для прокрутки влево
  leftArrow.addEventListener('click', () => {
    slider.scrollBy({
      left: -slider.offsetWidth, // Прокрутка на ширину контейнера
      behavior: 'smooth',
    });
  });

  // Функция для прокрутки вправо
  rightArrow.addEventListener('click', () => {
    slider.scrollBy({
      left: slider.offsetWidth, // Прокрутка на ширину контейнера
      behavior: 'smooth',
    });
  });
});




document.addEventListener("DOMContentLoaded", function () {

  const leftArrow = document.querySelector('.arrow-left-rooms-number');
  const rightArrow = document.querySelector('.arrow-right-rooms-number');
  const slider = document.querySelector('.columns');
  // Функция для прокрутки влево
  leftArrow.addEventListener('click', () => {
    console.log("sa")
    slider.scrollBy({
      left: -slider.offsetWidth, // Прокрутка на ширину контейнера
      behavior: 'smooth',
    });
  });

  // Функция для прокрутки вправо
  rightArrow.addEventListener('click', () => {
    slider.scrollBy({
      left: slider.offsetWidth, // Прокрутка на ширину контейнера
      behavior: 'smooth',
    });
  });




});


document.addEventListener("DOMContentLoaded", function () {

  const leftArrow = document.querySelector('.arrow-left-price-number');
  const rightArrow = document.querySelector('.arrow-right-price-number');
  const slider = document.querySelector('.columns-price');
  // Функция для прокрутки влево
  leftArrow.addEventListener('click', () => {
    console.log("sa")
    slider.scrollBy({
      left: -slider.offsetWidth, // Прокрутка на ширину контейнера
      behavior: 'smooth',
    });
  });

  // Функция для прокрутки вправо
  rightArrow.addEventListener('click', () => {
    slider.scrollBy({
      left: slider.offsetWidth, // Прокрутка на ширину контейнера
      behavior: 'smooth',
    });
  });




});
// 


/* 
Обновления для формы ремонта
*/
document.addEventListener('DOMContentLoaded', function () {
  const nextButtons = document.querySelectorAll('.calc__btn-next');
  const steps = document.querySelectorAll('.calc__step');
  const progressBarFill = document.querySelector('.calc__progress-bar-fill');
  let currentStep = 0;
  const totalSteps = steps.length;

  showStep(currentStep);
  updateProgressBar();

  nextButtons.forEach(button => {
    button.addEventListener('click', function () {
      const nextStep = button.getAttribute('data-next');
      currentStep = parseInt(nextStep) - 1;
      showStep(currentStep);
      updateProgressBar();
    });
  });

  function showStep(stepIndex) {
    steps.forEach((step, index) => {
      step.style.display = (index === stepIndex) ? 'flex' : 'none';
    });
  }

  function updateProgressBar() {
    const progress = (currentStep / (totalSteps - 1)) * 100;
    progressBarFill.style.width = progress + '%';
  }

  /* const form = document.getElementById('calcForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let formData = new FormData(form);
    let data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    alert('Ваша заявка:\n' + JSON.stringify(data, null, 2));
  }); */
});

document.addEventListener('DOMContentLoaded', function () {
  const steps = document.querySelectorAll('.calc__step');
  const nextButtons = document.querySelectorAll('.calc__btn-next');
  const prevButtons = document.querySelectorAll('.calc__btn-prev');
  let currentStep = 0;

  let squareMeters = 75; // Значение по умолчанию
  let repairTypeCost = 0; // Стоимость ремонта

  function showStep(stepIndex) {
    steps.forEach((step, index) => {
      step.style.display = index === stepIndex ? 'flex' : 'none';
    });
  }

  function calculateRepairCost() {


    const totalCost = squareMeters * repairTypeCost;
    const repairCostValue = document.getElementById('repair-cost-value');
    const repairCostValueP = document.getElementById('repair-cost-value-p');
    if (totalCost == 0 || totalCost == "") {
      repairCostValueP.innerHTML = `  Ориентировочная стоимость ремонта:<span id="repair-cost-value">Не бывает</span>`

    } else {
      repairCostValue.textContent = totalCost.toLocaleString(); // Разделители тысяч

    }
  }

  let selectedPropertyType = "";
  nextButtons.forEach(button => {
    button.addEventListener('click', function () {
      window.location.href = "#calc";

      const nextStep = parseInt(button.getAttribute('data-next'), 10) - 1;
      console.log(currentStep)
      if (currentStep === 0) {
        selectedPropertyType = document.querySelector('input[name="property_type"]:checked').value;
        console.log(selectedPropertyType)
      }

      if (currentStep === 1) {

        const areaRange = document.getElementById('areaRange');
        squareMeters = parseInt(areaRange.value, 10) || 0;
      }

      if (currentStep === 2) {
        const selectedRepairType = document.querySelector('input[name="repair_type"]:checked');
        console.log(selectedPropertyType)
        if (selectedPropertyType == "new_building") {
          if (selectedRepairType) {
            console.log(selectedPropertyType + selectedRepairType)
            repairTypeCost = {


              designer: 15000,
              capital: 20000,
              white_box: 0,
            }[selectedRepairType.value] || 0;
          }
        } else if (selectedPropertyType == "secondary") {
          if (selectedRepairType) {
            repairTypeCost = {


              designer: 15000,
              capital: 20000,
              white_box: 7000,
            }[selectedRepairType.value] || 0;
          }
        } else if (selectedPropertyType == "white_box") {
          if (selectedRepairType) {
            repairTypeCost = {


              designer: 10000,
              capital: 17000,
              white_box: 5000,
            }[selectedRepairType.value] || 0;
          }
        }

      }

      if (nextStep === 3) {
        calculateRepairCost();
      }

      if (nextStep === 4) {
        document.querySelector('.calc__title').textContent = 'Спасибо за использование нашего сервиса!';
        document.querySelector('.calc__progress-bar').style.display = 'none';
        return;
      }

      currentStep = nextStep;
      showStep(currentStep);
    });
  });

  prevButtons.forEach(button => {
    button.addEventListener('click', function () {
      const prevStep = parseInt(button.getAttribute('data-prev'), 10) - 1;
      currentStep = prevStep;
      showStep(currentStep);
    });
  });

  showStep(currentStep); // Показываем начальный шаг
});

/* 
FAQ
*/
document.querySelectorAll('.faq__question').forEach(item => {
  item.addEventListener('click', function () {
    const answer = item.nextElementSibling;
    const icon = item.querySelector('.faq__icon');
    answer.style.display = (answer.style.display === 'block') ? 'none' : 'block';
    icon.style.transform = (icon.style.transform === 'rotate(-90deg)') ? 'rotate(0deg)' : 'rotate(-90deg)';
  });
});

/* 
Слайдер команды
*/
const swiper = new Swiper('.js-teamSlider', {
  direction: 'horizontal',
  loop: true,

  pagination: {
    el: '.team__pagination',
  },

  navigation: {
    nextEl: '.team__btn-next',
    prevEl: '.team__btn-prev',
  },
});

/* 
Валидация форм
*/
let inputsTel = document.querySelectorAll('.js-inputTel');
inputsTel.forEach(inputTel => {
  inputTel.addEventListener('input', function (event) {
    let input = event.target;
    let value = input.value.replace(/\D/g, ''); // Убираем все нечисловые символы
    if (value.startsWith('7') || value.startsWith('8')) {
      value = '7' + value.substring(1); // Заменяем первую цифру на 7
    } else {
      value = '7' + value; // Добавляем +7, если пользователь начал ввод с другой цифры
    }

    // Применяем маску
    let formattedValue = '+7';
    if (value.length > 1) formattedValue += ' (' + value.substring(1, 4);
    if (value.length > 4) formattedValue += ') ' + value.substring(4, 7);
    if (value.length > 7) formattedValue += '-' + value.substring(7, 9);
    if (value.length > 9) formattedValue += '-' + value.substring(9, 11);

    input.value = formattedValue;
  });
});

/* 
Открытие модального окна
*/
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modal");
  const callBtn = document.querySelector(".call-btn");
  const closeBtn = document.querySelector(".modal__close-btn");

  callBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});

window.href="/"