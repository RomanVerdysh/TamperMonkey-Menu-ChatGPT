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

    function executeChatCommand(text) {
        // Проверка, что скрипт запущен на нужной странице
        if (!window.location.href.includes("chat.openai.com")) {
            alert("Этот скрипт работает только на странице https://chat.openai.com/");
            return;
        }

        const inputSelector = document.querySelector('input[type="text"], textarea');
        if (!inputSelector) {
            console.error("Не найден элемент ввода.");
            return;
        }

        // Очищаем поле ввода и вводим новый текст
        inputSelector.value = '';
        inputSelector.dispatchEvent(new Event('input', { bubbles: true })); // Для обновления состояния React компонента
        inputSelector.value = text;
        inputSelector.dispatchEvent(new Event('input', { bubbles: true }));

        // Имитация задержки перед отправкой
        setTimeout(() => {
            const sendButton = document.querySelector('button[data-testid="send-button"]');
            if (sendButton) {
                sendButton.click();
            } else {
                console.error("Кнопка отправки не найдена.");
            }
        }, 500); // Задержка в 500 мс
    }

    function checkSenseArticle() {
        const text = 'Представь, что ты опытный SEO-оптимизатор и редактор контента. Я хочу чтобы ты проверил мой текст на раскрытие в нем определенных тем и вопросов описанных во 2 промте. Твои рекомендации пиши на русском языке. Не нужно никакого введения, уточнения, извинений, повторений вопроса и прочих ненужных действией. Сразу переходи к ответу без лишних слов и прелюдий. У нас будет задача состоящая из 3 промтов. В 1 промте (текущий) - я опишу тебе твою задачу, если ты понял меня ты должен дать ответ "ОК, давай темы для проверки". Во 2 промте - я дам тебе темы и вопросы должны были быть раскрыты в статье, если ты понял меня ты должен дать ответ "ОК, жду текст или ссылку на него". В 3 промте - я дам тебе текст или ссылку на текст, а ты будешь проверять в нем, насколько раскрыты темы и вопросы поданные на 2 промте. В результате мне нужна четкая информация о том, какие темы и вопросы не раскрыты в тексте или раскрыты не явно.';
        executeChatCommand(text);
    }

    function importantTerms() {
        const text = 'Представь, что ты опытный SEO-оптимизатор и ИИ, который ранжирует сайты в Яндексе и Google. Я дам тебе термины состоящие из 1 и более слов, где каждый термин будет с новой строки и название страницы (это может быть так же главный ключевой запрос). Твоя задача - расположить термины для внедрения на страницу в порядке убывания важности и влияния на ранжирование. Не нужно никакого введения, уточнения, извинений, повторений вопроса и прочих ненужных действией. Сразу переходи к ответу без лишних слов и прелюдий. У нас будет задача состоящая из 3 промтов. В 1 промте (текущий) - я опишу тебе твою задачу, если ты понял меня ты должен дать ответ "ОК, жду название страницы". Во 2 промте - я дам тебе название страницы, если ты понял меня ты должен дать ответ "ОК, жду термины". В 3 промте - я дам тебе термины, если их будет более 30 штук, то в ответе выводи до 20 самых важных.';
        executeChatCommand(text);
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

        // Функция для создания и добавления кнопки
        function createAndAppendButton(text, onClickFunction) {
            const button = new ButtonCreator(text, onClickFunction);
            button.appendTo(menu);
        }

        // Создание и добавление кнопок
        createAndAppendButton("Проверка текста на раскрытие тем", checkSenseArticle);
        createAndAppendButton("Получить 20 важных терминов из списка", importantTerms);
    }

    class ButtonCreator {
        constructor(text, onClickFunction) {
            this.button = document.createElement('button');
            this.button.textContent = text;
            this.button.style.display = 'block';
            this.button.style.margin = '5px';
            this.button.style.color = 'black';
            this.button.style.backgroundColor = 'lightgray';
            this.button.style.border = '1px solid darkgray';
            this.button.style.padding = '5px 10px';
            this.button.style.cursor = 'pointer';
            this.button.onclick = onClickFunction;
        }

        appendTo(parent) {
            parent.appendChild(this.button);
        }
    }

    // Пример использования функции addCustomUI для добавления пользовательского интерфейса на страницу
    addCustomUI();

    if (document.readyState === "complete" || document.readyState === "interactive") {
        addCustomUI();
    } else {
        document.addEventListener("DOMContentLoaded", addCustomUI);
    }
})();
