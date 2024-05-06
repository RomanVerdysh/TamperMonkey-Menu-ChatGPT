// ==UserScript==
// @name         Вспомогательное меню для своих заголовок промтов в ChatGPT
// @namespace    https://romanus.ru/
// @version      1.0
// @description  Добавляет в правую нижнюю часть страницы меню с вашими кастомными промтами, чтобы каждый раз не вводить руками свои конструкции.
// @author       Roman Verdysh
// @match        *chatgpt.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function executeChatCommand(text) {
        // Проверка, что скрипт запущен на нужной странице
        if (!window.location.href.includes("chatgpt.com")) {
            alert("Этот скрипт работает только на странице https://chatgpt.com/");
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



    function addCustomUI() {
        const menu = document.createElement('div');
        menu.style.position = 'fixed';
        menu.style.top = '20px';
        menu.style.right = '20px';
        menu.style.padding = '10px';
        menu.style.background = 'white';
        menu.style.border = '1px solid black';
        menu.style.zIndex = '10000';
        menu.style.width = '600px';
        menu.style.maxHeight = '900px';
        menu.style.display = 'flex';
        menu.style.flexWrap = 'wrap';
        menu.style.overflow = 'auto';
        document.body.appendChild(menu);

        // Кнопка для сворачивания/разворачивания
        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Развернуть';
        toggleButton.style.position = 'absolute';
        toggleButton.style.top = '0';
        toggleButton.style.right = '0';
        toggleButton.style.padding = '5px';
        toggleButton.style.cursor = 'pointer';
        toggleButton.style.color = 'white'; // Цвет текста
        toggleButton.style.backgroundColor = '#007BFF'; // Цвет фона
        toggleButton.style.border = 'none'; // Убираем стандартную рамку кнопки
        toggleButton.style.boxShadow = '0px 2px 5px rgba(0,0,0,0.2)'; // Добавляем тень для лучшей видимости
        menu.appendChild(toggleButton);

        const a = document.createElement('span');
        a.innerHTML = 'Telegram-канал автора: <a href="https://t.me/craftseo"><u>Крафтовое SEO</u></a>';
        a.style.position = 'absolute';
        a.style.color = '#000';
        a.style.top = '0';
        a.style.fontSize = '12px';
        a.style.left = '0';
        a.style.padding = '5px 5px 5px 10px';
        a.style.width = '70%';
        menu.appendChild(a);

        // Сворачиваем меню по умолчанию
        let isCollapsed = true;
        menu.style.overflow = 'hidden';
        menu.style.height = '30px'; // Высота для показа только кнопки

        // Функция переключения сворачивания/разворачивания
        toggleButton.onclick = function() {
            if (isCollapsed) {
                menu.style.height = ''; // Убираем ограничение по высоте
                toggleButton.textContent = 'Свернуть';
                menu.style.overflow = 'auto';
            } else {
                menu.style.height = '30px';
                toggleButton.textContent = 'Развернуть';
                menu.style.overflow = 'hidden';
            }
            isCollapsed = !isCollapsed;
        };

        // Адаптивная верстка через JavaScript
        function adjustMenuForScreenSize() {
            if (window.innerWidth < 1450) {
                menu.style.width = '15%';
                menu.style.maxHeight = '500px';
                a.style.display = 'none';
            } else if (window.innerWidth < 1950) {
                menu.style.width = '17%';
                menu.style.maxHeight = '600px';
                a.style.display = 'none';
            } else if (window.innerWidth < 2400) {
                menu.style.width = '25%';
            } else {
                menu.style.width = '650px';
            }
        }

        // вызовем функцию при загрузке страницы
        adjustMenuForScreenSize();

        // добавим обработчик события resize
        window.addEventListener('resize', adjustMenuForScreenSize);

        function createAndAppendHeader(headerText) {
            const section = document.createElement('div');
            section.style.display = 'flex';
            section.style.flexWrap = 'wrap';
            section.style.alignItems = 'center';
            section.style.gap = '10px';

            const header = document.createElement('h3');
            header.textContent = headerText;
            header.style.fontFamily = 'Arial, Sans-Serif';
            header.style.fontWeight = 'Bold';
            header.style.color = 'black';
            header.style.fontSize = '18px';
            header.style.margin = '10px 0px 5px 0px';
            header.style.flexBasis = '100%';
            section.appendChild(header);
            menu.appendChild(header);

            function adjustHeaderForScreenSize() {
                if (window.innerWidth < 1400) {
                    header.style.fontSize = '16px';
                    header.style.margin = '10px 0px 0px 0px';
                }
            }

            // вызовем функцию при загрузке страницы
            adjustHeaderForScreenSize();

            // добавим обработчик события resize
            window.addEventListener('resize', adjustHeaderForScreenSize);

            return section;
        }

        // Функция для создания и добавления кнопки
        function createAndAppendButton(text, onClickFunction) {
            const button = new ButtonCreator(text, onClickFunction);
            button.appendTo(menu);
        }

        // Создание и добавление кнопок
        createAndAppendHeader("Проверка текста"); // Создает заголовок, удобно разграничивать кнопки
        createAndAppendButton("Раскрытия тем", checkSenseArticle); // Создание и добавление кнопок. Будут добавляться в строку с отступом
        createAndAppendButton("Редакция", textRevision); // Создание и добавление кнопок. Будут добавляться в строку с отступом

        createAndAppendHeader("Написать текст");
        createAndAppendButton("Темы для Guest Post", themeForGuestPosts);
        createAndAppendButton("Title и Description на текст", makeTitleDescription);
        createAndAppendButton("Напиши Guest Post", writeGP);
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
