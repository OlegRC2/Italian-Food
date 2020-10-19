const postData = async (url, data) => {                                         // функция отправки на сервер
    let res = await fetch(url, {                                                // отправялем запрос на сервер
        method: 'POST',                                                         // метод запроса
        body: data                                                              // отправляемые данные
    });              
    
    return await res.text();                                                    // ждем пока данные преобразуются в текст .text(). Так же говорим, что дальше скрипт не выполнялся, пока не выполнится res (await)
};

const getResourse = async (url) => {                                            // функция получения данных с сервера
    let res = await fetch(url);                                                 // отправялем запрос на сервер
    
    if (!res.ok) {                                                              // если данные не отправились
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);       // при ошибке выводим сообщение
    }

    return await res.json();                                                    // ждем пока данные преобразуются в текст .text(). Так же говорим, что дальше скрипт не выполнялся, пока не выполнится res (await)
};

export {postData, getResourse};                                                 // экспортируем обе функции