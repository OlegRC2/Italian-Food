function moreText(btnSelector, textSelector, sectionSelector) {                                         // функция показа скрытого блока текста

    const btn = document.querySelector(btnSelector),
          text = document.querySelector(textSelector),
          section = document.querySelector(sectionSelector);

    text.classList.add('animated');

    btn.addEventListener('click', () => {
        text.classList.add('fadeIn');
        text.style.display = 'block';
        btn.style.display = 'none';
        const height = +window.getComputedStyle(section).minHeight.slice(0,3);
        if (height < 800) {
            section.style.minHeight = height + 100 + 'px';
        } else {
            section.style.minHeight = height + 40 + 'px';
        }
        
    });
}

export default moreText;