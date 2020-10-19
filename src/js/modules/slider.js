function slider({slide, nextArrow, prevArrow, wrapper, field}) {

    const slides = document.querySelectorAll(slide),
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field);         
    
    const currentWidth = document.documentElement.clientWidth;                              // получаем текущию ширину экрана (для адаптации слайдера под мобилу)

    function deleteNotDigits(str) {                                                         // функция для того, чтобы в строке остались только числа и превратились в числовой тип переменной
        return +str.replace(/\D/g, '')                                                      // replace - ищем все не числа и заменяем их на ничего, + переводим переменную в числовую
    }

    let pbs = 0;                                                                            // среднее расстояние между слайдами (если слайды имеют разную ширину и выровнены флексом)

    function placeBetweenSlides(field, slides) {                                            // функция для рассчета среднего расстояния между слайдами (если слайды имеют разную ширину и выровнены флексом)
        const fieldWidth = deleteNotDigits(window.getComputedStyle(field).width);           // получаем ширину полосы со всеми слайдами
        let allSlideWidth = 0;                                                              // ширина всех слайдов вместе взятых

        slides.forEach(item => {
            allSlideWidth += item.offsetWidth;                                              // считаем ширину всех слайдов
        });

        pbs = (fieldWidth - allSlideWidth) / (slides.length - 1);                           // получаем среднее значение расстояния между слайдами
    }

    placeBetweenSlides(slidesField, slides);

    let offset = 0,                                                                         // отступ влево или вправо при прокрутке слайдера
        numHideSlideNext = 0,                                                               // счетчик скрытых слайдов вперед
        numHideSlidePrev = 0;

    slidesField.style.transition = '0.5s all';                                              // для плавного переключения добавялем transition
    slidesWrapper.style.overflow = 'hidden';                                                // показываем только то, что попадает в окно slidesWrapper, остальное скрываем. Иначе там все в линию выстраивается и получается горизонтальная полоса прокрутки 


    function slideNext(numSlides, slide) {                                                  // функция для перелистывания слайдера вперед. Аргументы: numSlides - кол-во отображаемых одновременно элементов, slide - псевдомассив со всеми слайдами 
        let slideWidth = 0;                                                                 // ширина следующего слайда

        if (numHideSlideNext == 0 || numHideSlideNext == numSlides) {                       // слайдер в начальном положении. Либо 0 - только открыли сайт, либо numSlides - уже тыкали "назад"

            slideWidth = slide[numSlides].offsetWidth;                                      // берем ширину следующего слайда
            numHideSlideNext = numSlides + 1;                                               // устанавливаем номер следующего скрытого слайда
            offset += slideWidth + pbs;                                                     // добавляем к текущей позиции ширину следующего слайда + отступ между слайдами
            numHideSlidePrev++;                                                             // добавляем 1 слайд к счетчику слайдов, который можно вернуть нажав "назад"

        } else if (numHideSlideNext > 0 && numHideSlideNext != slide.length) {              // слайдер в промежуточном положении (не начальное и есть еще скрытые следующие слайды)

            slideWidth = slide[numHideSlideNext].offsetWidth;                               // берем ширину следующего слайда
            numHideSlideNext++;                                                             // устанавливаем номер следующего скрытого слайда
            offset += slideWidth + pbs;                                                     // добавляем к текущей позиции ширину следующего слайда + отступ между слайдами
            numHideSlidePrev++;                                                             // добавляем 1 слайд к счетчику слайдов, который можно вернуть нажав "назад"

        } else if (numHideSlideNext == slide.length) {                                      // слайдер в конечном положении

            offset = 0;                                                                     // сбрасываем отступ в начальное значение
            numHideSlideNext = 0;                                                           // сбрасываем счетчик скрытых слайдов "вперед" в начальное значение
            numHideSlidePrev = 0;                                                           // сбрасываем счетчик скрытых слайдов "назад" в начальное значение
        }
    }   

    next.addEventListener('click', () => {
        if (currentWidth <= 767) {                                                          // при изменении ширины экрана менее 767 пикселей
            slideNext(2, slides);                                                           // показываем 2 элемента вместо 3
        } else {
            slideNext(3, slides);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;                           // передвигаем всю ленту слайдов влево на нужную длину
    });

    function slidePrev(numSlides, slide) {                                                  // функция для перелистывания слайдера назад. Аргументы: numSlides - кол-во отображаемых одновременно элементов, slide - псевдомассив со всеми слайдами 
        let slideWidth = 0;                                                                 // ширина предыдущего слайда

        if (numHideSlidePrev == 0) {                                                        // слайдер в начальном положении

            for (let i = slides.length - 1; i != slides.length - numSlides; i--) {          // считаем ширину скрытых слайдов, чтобы подвинуть на эту ширину 
                slideWidth += slide[i].offsetWidth;                                         // ширина всех скрытых слайдов
            }

            numHideSlidePrev = slides.length - numSlides;                                   // устанавливаем счетчик слайдов "назад" в максимальное положение
            offset += slideWidth + pbs * (slides.length - numSlides);                       // двигаем на максимальную ширину
            numHideSlideNext = slide.length;                                                // устанавливаем счетчик слайдов "вперед" в максимальное положение

        } else if (numHideSlidePrev > 0) {                                                  // слайдер в промежуточном положении (не начальное и есть еще скрытые предыдущие слайды)

            slideWidth = slide[numHideSlidePrev - 1].offsetWidth;                           // берем ширину следующего слайда
            numHideSlidePrev--;                                                             // устанавливаем номер следующего скрытого "назад" слайда
            offset -= slideWidth + pbs;                                                     // добавляем к текущей позиции ширину следующего слайда + отступ между слайдами
            numHideSlideNext--;                                                             // минусуем из счетчика слайдов "вперед"
        }
    }

    prev.addEventListener('click', () => {
        if (currentWidth <= 767) {                                                          // при изменении ширины экрана менее 767 пикселей
            slidePrev(2, slides);                                                           // показываем 2 элемента вместо 3
        } else {
            slidePrev(3, slides);
        }   
        
        slidesField.style.transform = `translateX(-${offset}px)`;                           // передвигаем всю ленту слайдов влево на нужную длину
    });
}

export default slider;                                                 