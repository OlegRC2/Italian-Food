import Parallax from './lib/parallax';              // подключение библиотеки параллакса
import search from './modules/search';
import slider from './modules/slider';
import moreText from './modules/moreText';
import form from './modules/form';
import fullVersionForMobile from './modules/fullVersionForMobile';

window.addEventListener('DOMContentLoaded', () => {

    let scene = document.getElementById('scene');       // активация библиотеки параллакса
    let parallaxInstance = new Parallax(scene);         // взято из документации

    $('.subscription__3Sheets').paroller();             // подключение движения вверх/вниз при скролле из библиотеки paroller
    $('.subscription__2Sheets').paroller();
    $('.pizza__5Sheets').paroller();
    $('.pizza__3Sheets').paroller();
    $('.pizza__slice').paroller();

    new WOW().init();

    search('.header__search');                          // поиск по сайту через библиотеку mark

    window.addEventListener('load', () => {             // чтобы слайдер корректно отрабатывал ждем пока загрузится вся страница (все стили, картинки и т.п.)
        slider({
            nextArrow: '.slider-block__next',               // стрелка "следующий слайд"
            prevArrow: '.slider-block__prev',               // стрелка "предыдущий слайд"
            slide: '.slider-block__item',                   // сам слайд
            wrapper: '.slider-block__slider-window',        // обертка всего слайдера
            field: '.slider-block__slider-wrapper'          // длинный блок со всеми слайдами
        });
    });

    moreText('.more-text__btn', '.more-text__hide-text', '.more-text');
    form();
    fullVersionForMobile();

});

