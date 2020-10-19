import {postData} from '../services/requests';                                          // импортируем функцию отправки запроса из файла 

function form () {                                                               

    const forms = document.getElementsByTagName('form');                                // берем все формы

    const message = {                                                                   // объект с сообщениями пользователю
        loading: 'Загрузка...',
        success: 'Спасибо! скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...',
        spinner: 'icons/Spinner-1s-75px.svg',                                           // путь к спиннеру
    };

    forms.forEach(form => {                                                             // перебираем псевдомассив

        form.addEventListener('submit', (e) => {                                        // навешиваем на каждую форму обработчик срабатывающий при подтверждении формы
            e.preventDefault();                                                         // отменяем стандартное поведение браузера (перезагрузку страницы)

            const statusMessageSpnr = document.createElement('img'),                    // создаем новый элемент на странице для показа его пользователю в котором будет спиннер
                statusMessageText = document.createElement('div');                      // создаем новый элемент на странице для показа его пользователю в котором будет div с текстом

            statusMessageSpnr.src = message.spinner;                                    // добавляем новому элементу атрибут src
            statusMessageSpnr.style.cssText = `
                display: block;
                margin: 0 auto;
            `;                                                                          // добавили стили картинке, чтобы встала по центру
            statusMessageText.textContent = message.loading;                            // добавили в новый div сообщение с текстом
            statusMessageText.classList.add('message', 'mt-0px');                       // добавляем классы стилизации
            form.append(statusMessageSpnr);                                             // добавляем сообщение на страницу после формы
            form.append(statusMessageText);                                             // добавляем сообщение на страницу после формы
            
            const formData = new FormData(form);                                        // создаем переменную по классу FormData. Этот класс собирает данные, которые отправить надо. У инпутов в формах должен быть обязательно быть атрибут "name", без него работать не будет

            postData('./server.php', formData)                                          // отправялем запрос
            .then(data => {                                                             // получаем ответ с сервера, data - это данные с сервера
                statusMessageSpnr.remove();                                             // удаляем спиннер
                statusMessageText.remove();                                             // удаляем текстовое сообщение об отправке
                showThanksModal(message.success);                                       // вызываем функцию, которая выводит сообщение что все успешно
                console.log(data);                                                      // выводим в консоль, то что отправили
            })
            .catch(data => {  
                console.log(data);                                                      // при какой-то ошибке пишем что будет происходить
                statusMessageSpnr.remove();                                             // удаляем спиннер
                statusMessageText.remove();                                             // удаляем текстовое сообщение об отправке
                showThanksModal(message.failure);                                       // сообщение пользователю об ошибке
            })
            .finally(() => {                                                            // блок в котором выполняются действия независимо от того что было выполнено, then или catch
                form.reset();                                                           // сбросить данные в форме
            });
        
            function showThanksModal(message) {                                         // функция для создания сообщения полсе отправки формы
                const thanksModal = document.createElement('div');                      // создаем элемент
                    
                thanksModal.classList.add('message')                                    // задаем стили будущего сообщения
                thanksModal.textContent = message;                                      // добавляем сообщение в div
                form.append(thanksModal);                                               // добавляем этот div в форму
            
                setTimeout(() => {
                    thanksModal.remove();                                               // удаляем этот созданный элемент через 4 секунды
                }, 4000);        
            }
        });
    });     
};

export default form;