export const question = [
  {
    complication: "low",
    questions: [
      {
        question: `Какой из вариантов получения этого элемента со страницы будет правильным <div id="hi">Hello</div>?`,
        answers: [
          "document.getElementById('#hi')",
          "document.getElementByAttribute(id, 'hi')",
          "document.querySelector('#hi')",
          "document.querySelectorAll('#hi')"
        ],
        correctAnswer: "document.getElementById('#hi')"
      },
      {
        question: "Какое событие отвечает за отправку формы со страницы?",
        answers: [
          "click",
          "resize",
          "scroll",
          "submit"
        ],
        correctAnswer: "submit"
      },
      {
        question: "Что такое объект события?",
        answers: [
          "Это функция, которая \"привязывается\" к определенному элементу на странице",
          "Это объект, который содержит всю информацию о произошедшем событии",
          "Это объект, который содержит только информацию об элементе, на котором произошло событие",
          "Это специальная структура, которую мы можем создать сами и записать туда важные для нас данные о событии"
        ],
        correctAnswer: "Это объект, который содержит всю информацию о произошедшем событии"
      },
      {
        question: "Как отменить стандартное поведение браузера при работе со ссылками, формами и тп?",
        answers: [
          "event.target = false",
          "event.preventDefault()",
          "event.stop()",
          "event.stopPropagation()"
        ],
        correctAnswer: "event.preventDefault()"
      },
      {
        question: "В чем разница между nextSibling и nextElementSibling?",
        answers: [
          "nextElementSibling получает только соседний элемент, без получения текстовых узлов и тп",
          "nextElementSibling получает соседний, следующий узел, а nextSibling - соседний элемент",
          "nextSibling - это устаревшая команда, по функционалу тоже самое, что и nextElementSibling",
          "Нет верного варианта"
        ],
        correctAnswer: "nextElementSibling получает только соседний элемент, без получения текстовых узлов и тп"
      },
      {
        question: "Для чего существуют data-атрибуты?",
        answers: [
          "Для дополнительной возможности по стилизации элементов",
          "Для прямого взаимодействия с этими элементами через JS",
          "Для удобного ориентирования в элементах по из значению при помощи JS",
          "Для указания дополнительной информации роботам-поисковикам"
        ],
        correctAnswer: "Для прямого взаимодействия с этими элементами через JS"
      },
      {
        question: "Какой из команд можно создать элемент на странице?",
        answers: [
          "div.createElement()",
          "document.createTextNode('div')",
          "document.createElement('div')",
          "document.createDivElement()"
        ],
        correctAnswer: "document.createElement('div')"
      },
      {
        question: "Какой командой можно удалить элемент со страницы?",
        answers: [
          "div.delete()",
          "div.remove()",
          "remove(div)",
          "delete(div)"
        ],
        correctAnswer: "div.remove()"
      },
      {
        question: "При получении псевдомассива элементов через метод querySelectorAll у него доступен такой метод как...",
        answers: [
          "push()",
          "remove()",
          "forEach()",
          "map()"
        ],
        correctAnswer: "forEach()"
      },
      {
        question: "Какой из методов безопаснее всего использовать, если мы четко хотим получить от пользователя текст и использовать его дальше?",
        answers: [
          "innerHTML",
          "insertAdjacentHTML",
          "placeText()",
          "textContent"
        ],
        correctAnswer: "textContent"
      }
    ]
  },
  {
    complication: "medium",
    questions: [
      {
        question: "Методы какого объекта, позволяют проводить манипуляции с классом элемента?",
        answers: [
          "styles",
          "class",
          "classList",
          "innerText"
        ],
        correctAnswer: "classList"
      },
      {
        question: "Какого метода не существует у свойства classList?",
        answers: [
          ".contains()",
          ".toggle()",
          ".remove()",
          ".includes()"
        ],
        correctAnswer: ".includes()"
      },
      {
        question: "Какое свойство отвечает за ширину элемента, включая только сам контент и padding?",
        answers: [
          "scrollWidth",
          "clientWidth",
          "offsetLeft",
          "offsetWidth"
        ],
        correctAnswer: "clientWidth"
      },
      {
        question: "Как правильно задать наследование одного класса от другого?",
        answers: [
          "class Slider from Element",
          "class Slider extends Element",
          "class Slider child of Element",
          "class Slider proto Element"
        ],
        correctAnswer: "class Slider extends Element"
      },
      {
        question: "В чем ключевая разница между методами call и apply?",
        answers: [
          "call принимает в себя дополнительные аргументы в виде строки, а apply - в виде массива",
          "apply принимает в себя дополнительные аргументы в виде строки, а call - в виде массива",
          "У этих методов нет отличий",
          "Нет верного варианта ответа"
        ],
        correctAnswer: "call принимает в себя дополнительные аргументы в виде строки, а apply - в виде массива"
      },
      {
        question: "Свойство объекта события event.code позволяет получить...",
        answers: [
          "Код физической клавиши, которая была нажата. Вне зависимости от зажатых клавиш Shift или Alt",
          "Код события, которое произошло",
          "Код (или по другому номер) клавиши с учетом выбранного языка, разных клавиатур, зажатых клавиш Shift или Alt",
          "Такого свойства не существует"
        ],
        correctAnswer: "Код физической клавиши, которая была нажата. Вне зависимости от зажатых клавиш Shift или Alt"
      },
      {
        question: "Для чего необходимо сохранять уникальный идентификатор таймера const timerId = setInterval(func, 2000)?",
        answers: [
          "Для того, чтобы вручную вызывать и запускать нужный таймер",
          "Для того, чтобы иметь возможность остановить этот конкретный таймер",
          "Для того, чтобы иметь ссылку на функцию, которая запускается внутри таймера",
          "Это правило хорошего кода, которое не несет особой функциональности"
        ],
        correctAnswer: "Для того, чтобы иметь возможность остановить этот конкретный таймер"
      },
      {
        question: "Делегирование событий - это прием, который позволяет...",
        answers: [
          "Уменьшить количество обработчиков событий",
          "Проще взаимодействовать с DOM-деревом, легко работать с неограниченным количеством элементов в родителе",
          "Не обращать внимания на всплытие событий",
          "Все верны, кроме пункта №3"
        ],
        correctAnswer: "Все верны, кроме пункта №3"
      },
      {
        question: "Какой из методов массива вернет элемент из массива объектов, удволетворяющего условию?",
        answers: [
          ".map()",
          ".filter()",
          ".find()",
          ".slice()"
        ],
        correctAnswer: ".find()"
      },
      {
        question: "Что будет выведено в консоль в результате работы функции? function setOptions(height, width, ...additional) {\n" +
          "console.log(height, width, ...additional)\n" +
          "} setOptions(400, 500, 'red', 'top');",
        answers: [
          "400 500 ['red', 'top']",
          "400 500 'red' 'top'",
          "400 500 {'red', 'top'}",
          "400 500"
        ],
        correctAnswer: "400 500 'red' 'top'"
      }
    ]
  },
  {
    complication: "hard",
    questions: [
      {
        question: "Какое из перечисленных ниже слов не является зарезервированным словом в JavaScript?",
        answers: [
          "default",
          "throw",
          "finally",
          "undefined"
        ],
        correctAnswer: "undefined"
      },
      {
        question: "Какое скрытое свойство получают функции при рождении?",
        answers: [
          "Opened",
          "LIFE",
          "Environment",
          "Prototype"
        ],
        correctAnswer: "Environment"
      },
      {
        question: "Как называется следующая функция (function() {/* */})() ?",
        answers: [
          "LIFE",
          "Function Declaration",
          "HOC",
          "Function Expression"
        ],
        correctAnswer: "LIFE"
      },
      {
        question: "Как называется функция, у которой есть имя?",
        answers: [
          "Function With Named",
          "Named Function",
          "Named Function Declaration",
          "Named Function Expression"
        ],
        correctAnswer: "Named Function Expression"
      },
      {
        question: "Как называется основная инструкция возвращающая значение в генераторе?",
        answers: [
          "default",
          "yield",
          "value",
          "return"
        ],
        correctAnswer: "yield"
      },
      {
        question: "Какая функция встроенная в JS позволяет выполнять строки кода?",
        answers: [
          "Run",
          "Eval",
          "StringGo",
          "Evil"
        ],
        correctAnswer: "Eval"
      },
      {
        question: "Что такое декоратор?",
        answers: [
          "Функция, которая принимает компонент и возвращает новый компонент",
          "Обёртка над функцией, которая модифицирует её поведение",
          "Функция, результатом которой является вызов другой функции",
          "Функция, которая инициалзирует экземпляр класса, и возвращет конкретный метод класса"
        ],
        correctAnswer: "Обёртка над функцией, которая модифицирует её поведение"
      },
      {
        question: "Что делает код: break me?",
        answers: [
          "Ломает интерпретатор javascript",
          "Выходит из текущего блока цикла или switch на метку «me»",
          "Выдает ошибку",
          "Запускает новую итеррацию с метки «me»"
        ],
        correctAnswer: "Выходит из текущего блока цикла или switch на метку «me»"
      },
      {
        question: "Чему равен typeof null в режиме use strict?",
        answers: [
          "null",
          "undefined",
          "object",
          "string"
        ],
        correctAnswer: "object"
      },
      {
        question: "Чему равно выражение [] + false - null + true?",
        answers: [
          "0",
          "NaN",
          "undefined",
          "1"
        ],
        correctAnswer: "NaN"
      }
    ]
  }
]
