document.addEventListener('DOMContentLoaded', () => {

  
  const rangeInput = document.querySelectorAll('.range-input input');
  const priceInput = document.querySelectorAll('.slider__box input');
  const progress = document.querySelector('.double-slider__progress');

  let priceGap = 150; // Расстояние между минимальным и максимальным значениями
  
  rangeInput.forEach(input => {
    const dataMin = input.getAttribute('data-min');
    const dataMax = input.getAttribute('data-max');
    
    if (dataMin !== null && dataMax !== null) {
      input.setAttribute('min', dataMin);
      input.setAttribute('max', dataMax);
    }
  });
  
  priceInput.forEach(input => {
    const dataMin = input.getAttribute('data-min');
    const dataMax = input.getAttribute('data-max');
    
    if (dataMin !== null && dataMax !== null) {
      input.setAttribute('min', dataMin);
      input.setAttribute('max', dataMax);
    }
  });

  document.querySelector('.range-max').value = 900;
  document.querySelector('.range-min').value = 100;
  
  rangeInput.forEach(input => {
    
    input.addEventListener('input', (e) => {
      // Парсим value из двух рейндж слайдеров
      let minValue = parseInt(rangeInput[0].value);
      let maxValue = parseInt(rangeInput[1].value);
      
      if (maxValue - minValue < priceGap) {
        if (e.target.className === 'range-min') { // Если активен слайдер, отвечающий за минимум
          rangeInput[0].value = maxValue - priceGap;
        } else {
          rangeInput[1].value = minValue + priceGap;
        }
      } else {
        priceInput[0].value = minValue;
        priceInput[1].value = maxValue;

        progress.style.left = (minValue / rangeInput[0].dataset.max) * 100 + '%';
        progress.style.right = 100 - (maxValue / rangeInput[1].dataset.max) * 100 + '%';
      }
    })
  })

  priceInput.forEach(input => {

    input.addEventListener('input', (e) => {
      let minValue = parseInt(priceInput[0].value);
      let maxValue = parseInt(priceInput[1].value);

      if ((maxValue - minValue >= priceGap) && maxValue <= rangeInput[0].max && minValue >= rangeInput[0].min) {
        if (e.target.className === 'input-min') { // Если активен инпут, отвечающий за минимум
          rangeInput[0].value = minValue;
          progress.style.left = (minValue / rangeInput[0].max) * 100 + '%';
        } else {
          rangeInput[1].value = maxValue;
          progress.style.right = 100 - (maxValue / rangeInput[1].max) * 100 + '%';
        }
      }
    })

    input.addEventListener('blur', (e) => {
      if (
        e.target.className === 'input-min' &&
        (e.target.value >= 1000 || e.target.value <= 0) // Значения больше или меньше допустимого
      ) {
        e.target.value = 0;
        progress.style.left = 0;
        rangeInput[0].value = 0;
      }

      if (
        e.target.className === 'input-max' &&
        (e.target.value >= 1000 || e.target.value <= 0)
      ) {
        e.target.value = 1000;
        progress.style.right = 0;
        rangeInput[1].value = 1000;
      }

    })
  })
})