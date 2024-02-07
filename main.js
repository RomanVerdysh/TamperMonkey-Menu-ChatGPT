// ==UserScript==
// @name         Вспомогательное меню для своих заголовок промтов в ChatGPT
// @namespace    https://romanus.ru/
// @version      1.0
// @description  Добавляет в правую нижнюю часть страницы меню с вашими кастомными промтами, чтобы каждый раз не вводить руками свои конструкции.
// @author       Roman Verdysh
// @match        https://chat.openai.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function checkSenseArticle() {
        if (window.location.href.includes("chat.openai.com")) {
            const inputSelector = document.querySelector('input[type="text"], textarea');
            if (inputSelector) {
                inputSelector.value = '';
                inputSelector.value = 'Представь, что ты опытный SEO-оптимизатор и редактор контента. Я хочу чтобы ты проверил мой текст на раскрытие в нем определенных тем и вопросов описанных во 2 промте. Твои рекомендации пиши на русском языке. Не нужно никакого введения, уточнения, извинений, повторений вопроса и прочих ненужных действией. Сразу переходи к ответу без лишних слов и прелюдий. У нас будет задача состоящая из 3 промтов. В 1 промте (текущий) - я опишу тебе твою задачу, если ты понял меня ты должен дать ответ "ОК, давай темы для проверки". Во 2 промте - я дам тебе темы и вопросы должны были быть раскрыты в статье, если ты понял меня ты должен дать ответ "ОК, жду текст или ссылку на него". В 3 промте - я дам тебе текст или ссылку на текст, а ты будешь проверять в нем, насколько раскрыты темы и вопросы поданные на 2 промте. В результате мне нужна четкая информация о том, какие темы и вопросы не раскрыты в тексте или раскрыты не явно.';
                const inputEvent = new Event('input', { bubbles: true });
                inputSelector.dispatchEvent(inputEvent);

                setTimeout(() => {
                    const sendButton = document.querySelector('button[data-testid="send-button"]');
                    if (sendButton) {
                        sendButton.click();
                    }
                }, 500);
            }
        } else {
            alert("Этот скрипт работает только на странице https://chat.openai.com/");
        }
    }


    function addCustomUI() {
        const menu = document.createElement('div');
        menu.style.position = 'fixed';
        menu.style.bottom = '20px';
        menu.style.right = '20px';
        menu.style.padding = '10px';
        menu.style.background = 'white';
        menu.style.border = '1px solid black';
        menu.style.zIndex = '10000';
        document.body.appendChild(menu);

        const checkSenseArticleButton = document.createElement('button');
        checkSenseArticleButton.textContent = "Проверка текста на раскрытие тем";
        checkSenseArticleButton.style.display = 'block';
        checkSenseArticleButton.style.margin = '5px';
        checkSenseArticleButton.style.color = 'black'; // Явно указываем цвет текста
        checkSenseArticleButton.style.backgroundColor = 'lightgray'; // Добавляем фон
        checkSenseArticleButton.style.border = '1px solid darkgray'; // Улучшаем видимость границы
        checkSenseArticleButton.style.padding = '5px 10px'; // Добавляем отступы
        checkSenseArticleButton.style.cursor = 'pointer'; // Изменяем курсор
        checkSenseArticleButton.onclick = checkSenseArticle;
        menu.appendChild(checkSenseArticleButton);

    }

    if (document.readyState === "complete" || document.readyState === "interactive") {
        addCustomUI();
    } else {
        document.addEventListener("DOMContentLoaded", addCustomUI);
    }
})();
