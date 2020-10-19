function search(inputSelector) {

    const context = document.body,                              // получаем весь сайт для поиска по нему
          input = document.querySelector(inputSelector);

    let instance = new Mark(context);                           // активируем библиотеку mark, ищем по всему сайту, взято из документации

    input.addEventListener('input', () => {                     // при изменении значения в инпуте
        instance.unmark(input.value);                           // убираем все выделения 
        instance.mark(input.value);                             // выделяем на сайте то, что введено в инпут
    });
}

export default search;