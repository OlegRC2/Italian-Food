function moreText(btnSelector, textSelector, sectionSelector) {                                         // функция показа скрытого блока текста

    const btn = document.querySelector(btnSelector),
          text = document.querySelector(textSelector),
          section = document.querySelector(sectionSelector);

    text.classList.add('animated');

    btn.addEventListener('click', () => {
        text.classList.add('fadeIn');
        text.style.display = 'block';
        btn.style.display = 'none';
        section.style.minHeight = '630px';
    });
}

export default moreText;