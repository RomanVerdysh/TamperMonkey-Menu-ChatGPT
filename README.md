<h2>tampermonkey.js - свои закладки промтов</h2>
<ol>
  <li>Скачиваем сам плагин для Google Chrome - <a href="https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo">tampermonkey</a></li>
  <li>Закидываем в него содержимое моего chatGPT.js и claudeAI.js</li>
</ol>

Всё. На выходе получите менюшку, в которую можете добавлять свои кнопки с промтами:
![image](https://github.com/RomanVerdysh/TamperMonkey-Menu-ChatGPT/assets/909951/ae00c493-c0a2-4868-a74a-b59f4207c84b)


Оставил вам 1 для примера.

<h3>Как добавить свои?</h3>
<ol>
  <li>Дублируете функцию function checkSenseArticle()</li>
  <li>Меняете название функции на своё</li>
  <li>Внутри функции в text задаете свой промт</li>
  <li>Дублируете createAndAppendButton("Проверка текста на раскрытие тем", checkSenseArticle); и меняете название и "checkSenseArticle" на свою функцию</li>
</ol>

Можете сразу над кнопкой вставить заголовок функцией createAndAppendHeader("Ваш заголовок"), это поможет структурировать кнопки.

Изменения:
06.05.2024
<ol>
  <li>добавил сворачивание (изначально свернуто) и переместил вверх.</li>
  <li>добавил скролинг колесом при малых размерах окон</li>
  <li>адаптировал под Claude.ai ![image](https://github.com/RomanVerdysh/TamperMonkey-Menu-ChatGPT/assets/909951/44274a4b-fb65-4651-988a-bb33cf79ee4d)
</li>
</ol>
