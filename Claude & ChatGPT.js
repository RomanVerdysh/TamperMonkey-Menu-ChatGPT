// ==UserScript==
// @name         Вспомогательное меню для своих заголовок промтов в Claude & ChatGPT
// @namespace    https://romanus.ru/
// @version      1.1
// @description  Добавляет в правую нижнюю часть страницы меню с вашими кастомными промтами, чтобы каждый раз не вводить руками свои конструкции.
// @author       Roman Verdysh
// @match        https://claude.ai/*
// @match        https://*.chatgpt.com/*
// @grant        none
// ==/UserScript==

(function() {
    const url = window.location.href;
    let inputSelector, sendButtonSelector, clearInput, sendPrompt;

    function executeChatCommand(text) {
        if (url.includes("claude.ai")) {
            inputSelector = document.querySelector('div[contenteditable="true"]');
            sendButtonSelector = 'div[data-value="new chat"], button[aria-label="Send Message"]';

            clearInput = () => {
                inputSelector.innerHTML = '';
            };

            sendPrompt = () => {
                const promptText = document.createElement('span');
                promptText.textContent = text;
                inputSelector.appendChild(promptText);
            };
        } else if (url.includes("chatgpt.com")) {
            inputSelector = document.querySelector('div[contenteditable="true"].ProseMirror');
            sendButtonSelector = 'button[data-testid="send-button"]';

            clearInput = () => {
                inputSelector.innerHTML = ''; // Для очистки поля ввода
                inputSelector.dispatchEvent(new Event('input', { bubbles: true }));
            };

            sendPrompt = () => {
                inputSelector.innerHTML = text; // Вводим текст в contenteditable
                inputSelector.dispatchEvent(new Event('input', { bubbles: true }));
            };
        }
        else {
            console.error("Неизвестный сайт.");
            return;
        }

        if (!inputSelector) {
            console.error("Не найден элемент ввода.");
            return;
        }

        // Очищаем поле ввода и вводим новый текст
        clearInput();
        sendPrompt();

        // Имитация задержки перед отправкой
        setTimeout(() => {
            const sendButton = document.querySelector(sendButtonSelector);
            if (sendButton) {
                sendButton.click();
            } else {
                console.error("Кнопка отправки не найдена.");
            }
        }, 500); // Задержка в 500 мс
    }




    function checkSenseArticle() {
        const text = 'Представь, что ты опытный редактор контента. Я хочу чтобы ты проверил мой текст на раскрытие в нем определенных тем и вопросов описанных во 2 промте. Если ты нашел раскрытие темы - укажи заголовок, под которым ты нашел раскрытие этой темы, чтобы я мог быстро найти и перепроверить в тексте самостоятельно. Будь придирчив, ты редактор, твоя задача получить от автора крутой контент, который будет раскрывать все поданные темы. Но подробно пиши что и как можно улучшить, чтобы автор понял это. Если поданная тема не вопросительная - ты сам должен определить, что должно быть раскрыто в ней и высказать свои предположения. Свои рекомендации пиши на русском языке. Не нужно никакого введения, определений, уточнения, извинений, повторений вопроса и прочих ненужных действией. Сразу переходи к ответу без лишних слов и прелюдий. У нас будет задача состоящая из 3 промтов. В 1 промте (текущий) - я опишу тебе твою задачу, если ты понял меня ты должен дать ответ "ОК, давай темы для проверки". Во 2 промте - я дам тебе темы и вопросы должны были быть раскрыты в статье, если ты понял меня ты должен дать ответ "ОК, жду текст или ссылку на него". В 3 промте - я дам тебе текст или ссылку на текст, а ты будешь проверять в нем, насколько раскрыты темы и вопросы поданные на 2 промте. В результате мне нужна четкая информация о том, какие темы и вопросы не раскрыты в тексте или раскрыты не явно.';
        executeChatCommand(text);
    }

    function achesAndPainsCA() {
        const userInput = prompt("Введите запрос:");
        if (userInput !== null) {
            const template = `Выступи как маркетолог и копирайтер. Я предоставлю тебе свой главный ключевой запрос "${userInput}", а твоя задача будет следующей: Во-первых: тезисно рассказать мне о целевой аудитории, которая могла бы вбивать мой ключевой запрос в поисковую выдачу Google. Во-вторых: Какие боли у целевой аудитории, раз она решила вбить этот запрос? Что их реально интересовало? В-третьих: Расскажи, какие вопросы могли быть у целевой аудитории? Представь, как бы они вводили их в поиск Google и напиши 3-5 штук мне. В-четвертых: Подробно напиши о чем нужно рассказать в статье копирайтеру в стиле "просьбы", т.е. в кажом пункте (маркер, а не буква или цифра) нужно просить его сделать что-то. Обращайся на "вы", но не нужно избыточной вежливости, т.е. не используй слова "пожалуйста, умоляю и т.д.". Будь четким и лаконичным. Ответ предоставь в виде списка с пояснениями. Если в последующих промтах я буду тебе так же давать ключевые запросы - ты должен следовать для них инструкциям из первого промта. `;
            executeChatCommand(template);
        }
    }

    async function semanticProximity() {
        const result = await customInputWindow();
        if (result !== null) {
            const formattedInput2 = result.input2.split('\n').map(item => item.trim()).filter(Boolean).join(', ');
            const template = `Рассчитай семантическую близость слов и фраз (каждая с новой строки) для фразы "${result.input1}": \n"${formattedInput2}". Оставляй только значимые фразы (которые имеют близость более 0,6, остальные мне не интересны. Не нужно никаких пояснений, в твоем ответе я хочу видеть строго фразу и ее оценку от 0,0 до 1,0 и ничего больше. Формат ответа строго: Фраза[tab]Оценка. Где [tab] - это табуляция. `;
            executeChatCommand(template);
        }
    }

    // --------------------------------------------------------------
    // !!!!! ВСЕ СВОИ ФУНКЦИИ ВСТАВЛЯТЬ СЮДА !!!!!
    // --------------------------------------------------------------

    function customInputWindow() {
        return new Promise((resolve) => {
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.left = '0';
            overlay.style.top = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            overlay.style.zIndex = '10000';

            const div = document.createElement('div');
            div.style.position = 'fixed';
            div.style.left = '50%';
            div.style.top = '50%';
            div.style.transform = 'translate(-50%, -50%)';
            div.style.backgroundColor = 'white';
            div.style.padding = '20px';
            div.style.border = '1px solid black';
            div.style.zIndex = '10001';
            div.style.width = '300px';

            const input1 = document.createElement('input');
            input1.type = 'text';
            input1.placeholder = 'Введите первый запрос';
            input1.style.width = '100%';
            input1.style.marginBottom = '10px';
            input1.style.color = 'black';

            const textarea = document.createElement('textarea');
            textarea.rows = 5;
            textarea.placeholder = 'Введите второй запрос (до 5 строк)';
            textarea.style.width = '100%';
            textarea.style.marginBottom = '10px';
            textarea.style.color = 'black';

            const submitButton = document.createElement('button');
            submitButton.textContent = 'Отправить';
            submitButton.style.color = 'black';
            submitButton.style.border = '1px solid #ccc';
            submitButton.style.padding = '5px 10px';
            submitButton.style.background = '#f5f5f5';
            submitButton.style.marginRight = '5px';
            submitButton.onclick = () => {
                if (input1.value.trim() === '' || textarea.value.trim() === '') {
                    alert('Пожалуйста, заполните оба поля перед отправкой.');
                    return;
                }
                overlay.remove();
                resolve({input1: input1.value, input2: textarea.value});
            };

            const cancelButton = document.createElement('button');
            cancelButton.textContent = 'Отмена';
            cancelButton.style.color = 'black';
            cancelButton.style.border = '1px solid #ccc';
            cancelButton.style.padding = '5px 10px';
            cancelButton.onclick = () => {
                overlay.remove();
                resolve(null);
            };

            div.appendChild(input1);
            div.appendChild(textarea);
            div.appendChild(document.createElement('br'));
            div.appendChild(submitButton);
            div.appendChild(cancelButton);

            overlay.appendChild(div);
            document.body.appendChild(overlay);

            // Закрытие окна при клике вне его
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    overlay.remove();
                    resolve(null);
                }
            });
        });
    }

    function promptAsync(message) {
        return new Promise((resolve) => {
            const result = prompt(message);
            resolve(result);
        });
    }

    function promptTextAreaAsync(message, rows) {
        return new Promise((resolve) => {
            const div = document.createElement('div');
            div.style.position = 'fixed';
            div.style.left = '50%';
            div.style.top = '50%';
            div.style.transform = 'translate(-50%, -50%)';
            div.style.backgroundColor = 'white';
            div.style.padding = '20px';
            div.style.border = '1px solid black';
            div.style.zIndex = '10001';

            const textarea = document.createElement('textarea');
            textarea.rows = rows;
            textarea.style.width = '100%';
            textarea.style.marginBottom = '10px';

            const submitButton = document.createElement('button');
            submitButton.textContent = 'Отправить';
            submitButton.onclick = () => {
                div.remove();
                resolve(textarea.value);
            };

            const cancelButton = document.createElement('button');
            cancelButton.textContent = 'Отмена';
            cancelButton.onclick = () => {
                div.remove();
                resolve(null);
            };

            div.appendChild(document.createTextNode(message));
            div.appendChild(document.createElement('br'));
            div.appendChild(textarea);
            div.appendChild(document.createElement('br'));
            div.appendChild(submitButton);
            div.appendChild(cancelButton);

            document.body.appendChild(div);
        });
    }

    function addCustomUI() {
        if (document.querySelector('#custom-prompt-menu')) {
            return;
        }
        const menu = document.createElement('div');
        menu.id = 'custom-prompt-menu';
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
        menu.style.cursor = 'move';  // Изменение курсора на курсор перемещения
        document.body.appendChild(menu);

        // Логика перемещения меню
        let isDragging = false;
        let offsetX, offsetY;

        menu.addEventListener('mousedown', function(e) {
            isDragging = true;
            offsetX = e.clientX - menu.getBoundingClientRect().left;
            offsetY = e.clientY - menu.getBoundingClientRect().top;
            menu.style.cursor = 'grabbing'; // Изменение курсора при захвате
        });

        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                menu.style.left = `${e.clientX - offsetX}px`;
                menu.style.top = `${e.clientY - offsetY}px`;
            }
        });

        document.addEventListener('mouseup', function() {
            isDragging = false;
            menu.style.cursor = 'move'; // Возвращаем курсор в исходное состояние
        });

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
                menu.style.width = '17%';
                menu.style.maxHeight = '500px';
                a.style.display = 'none';
            } else if (window.innerWidth < 1950) {
                menu.style.width = '18%';
                menu.style.maxHeight = '600px';
                a.style.display = 'none';
            } else if (window.innerWidth < 2400) {
                menu.style.width = '30%';
            } else {
                menu.style.width = '750px';
            }
        }

        // вызовем функцию при загрузке страницы
        adjustMenuForScreenSize();
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

        // --------------------------------------------------------------
        // СОЗДАНИЕ И ДОБАВЛЕНИЕ КНОПОК
        // --------------------------------------------------------------
        createAndAppendHeader("Анализ"); // Это заголовок, который выводится перед рядом кнопок
        createAndAppendButton("Аудитория ключа", achesAndPainsCA); // Это сама кнопка с вашим названием и соответствующей функцией-промтом
        createAndAppendButton("Семантическая близость", semanticProximity);


        createAndAppendHeader("Проверка текста");
        createAndAppendButton("Раскрытия тем", checkSenseArticle);
    }

    class ButtonCreator {
        constructor(text, onClickFunction) {
            this.button = document.createElement('button');
            this.button.textContent = text;
            this.button.style.fontFamily = 'Arial, Sans-Serif';
            this.button.style.fontSize = '13px';
            this.button.style.display = 'block';
            this.button.style.margin = '3px';
            this.button.style.color = '#000';
            this.button.style.backgroundColor = '#e5e5e5';
            this.button.style.border = '1px solid darkgray';
            this.button.style.padding = '2px 6px';
            this.button.style.cursor = 'pointer';
            this.button.onclick = onClickFunction;
        }

        appendTo(parent) {
            parent.appendChild(this.button);
        }
    }

    if (document.readyState === "complete" || document.readyState === "interactive") {
        addCustomUI();
    } else {
        document.addEventListener("DOMContentLoaded", addCustomUI);
    }
})();
