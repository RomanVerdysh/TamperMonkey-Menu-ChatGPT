<h2>tampermonkey.js - свои закладки промтов</h2>
<ol>
  <li>Скачиваем сам плагин для Google Chrome - <a href="https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo">tampermonkey</a></li>
  <li>Закидываем в него содержимое моего tampermonkey.js</li>
</ol>

Всё. На выходе получите менюшку, в которую можете добавлять свои кнопки с промтами:
![image](https://github.com/RomanVerdysh/TamperMonkey-Menu-ChatGPT/assets/909951/00d5b1b3-524c-45f2-8d14-f464cd929db0)

Оставил вам 1 для примера.

<h3>Как добавить свои?</h3>
<ol>
  <li>Дублируете функцию function checkSenseArticle()</li>
  <li>Меняете название функции на своё</li>
  <li>Внутри функции в text задаете свой промт</li>
  <li>Дублируете createAndAppendButton("Проверка текста на раскрытие тем", checkSenseArticle); и меняете название и "checkSenseArticle" на свою функцию</li>
</ol>

Можете сразу над кнопкой вставить заголовок функцией createAndAppendHeader("Ваш заголовок"), это поможет структурировать кнопки.
