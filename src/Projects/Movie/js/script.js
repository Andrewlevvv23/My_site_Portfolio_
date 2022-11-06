/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов 

6) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

7) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

8) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

9) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

10) Фильмы должны быть отсортированы по алфавиту */
/* jshint esversion: 6 */

document.addEventListener('DOMContentLoaded', () => {
  // первоначальная загрузка DOM структуры
  const movieDB = {
    movies: ['Логан', 'Лига справедливости', 'Ла-ла лэнд', 'Одержимость', 'Скотт Пилигрим против...'],
  };

  const adv = document.querySelectorAll('.promo__adv img'),
    poster = document.querySelector('.promo__bg'),
    genre = poster.querySelector('.promo__genre');
  movieList = document.querySelector('.promo__interactive-list');
  addForm = document.querySelector('form.add'); // получил форму из верстки по классу 'add'
  addInput = addForm.querySelector('.adding__input'); // получил кнопку ввода данных
  checkbox = addForm.querySelector('[type="checkbox"]'); // получил галочку "Любимый фильм"

  addForm.addEventListener('submit', (event) => {
    // прописываю событие 'submit' с аргументом 'event' на отправку данных с формы 'input'
    event.preventDefault(); // отмена стандартного поведения браузера
    let newFilm = addInput.value; // переменная с содержанием данных, которые ввел пользователь
    const favorite = checkbox.checked; // получение булиновой инфы с чекбокса

    if (newFilm) {
      // проверка на пустую строку, если 'newFilm' true, то выполняем следующие действия
      if (newFilm.length > 21) {
        newFilm = `${newFilm.substring(0, 22)}...`; //обрезка 22+ букв с добавлением троеточия
      }
      if (favorite) {
        // если "галочка" в true, то выводим любимый фильм пользователя в консоль
        console.log(`Добавляем любимый фильм - ${newFilm}`);
      }

      movieDB.movies.push(newFilm); // загрузка фильма, введенного пользователем в общ. список
      sortArr(movieDB.movies); // сортировка списка фильмов

      createMovieList(movieDB.movies, movieList); //постройка списка фильмов на основании новых данных
    }
    event.target.reset(); // сбросить форму с введенными данными от пользователя
  });

  const deleteAdv = (arr) => {
    // функция по удалению рекламы
    arr.forEach((item) => {
      item.remove();
    });
  };

  const makeChanges = () => {
    // изменение жанра и фона страницы
    genre.textContent = 'драма';

    poster.style.backgroundImage = 'url("img/bg.jpg")';
  };

  const sortArr = (arr) => {
    // функция сортировки массива с фильмами
    arr.sort();
  };

  function createMovieList(films, parent) {
    parent.innerHTML = ' '; // удаление старого пассивного списка фильмов
    sortArr(films);

    films.forEach((film, i) => {
      // создание нового списка фильмов методом перебора
      parent.innerHTML += `
     <li class="promo__interactive-item">${i + 1} ${film}
       <div class="delete"></div>
     </li> `;
    });

    document.querySelectorAll('.delete').forEach((btn, i) => {
      // получение элемента "корзинка", и далее перебор кнопки и фильмов
      btn.addEventListener('click', () => {
        // событие что при клике мышки по "корзине" происходят следующие действия
        btn.parentElement.remove(); //удаление родительского элемента
        movieDB.movies.splice(i, 1); //сколько элементов удалить из массива

        createMovieList(films, parent);
      });
    });
  }

  deleteAdv(adv);
  makeChanges();
  sortArr(movieDB.movies);
  createMovieList(movieDB.movies, movieList);
});

// function sumArray(array) {

//   //Math.min(null, [array]);

//   array.Math.max();

//   return array;

// }

// function sumArray(array) {
// let max = Math.max.apply(null, array);
// let min = Math.min.apply(null, array);
// return `${max}, ${min}` ;
// }
// console.log(sumArray([1,3,5,7,9]));

function sumArray(array) {
  //let max = Math.max.apply(null, array);
  //let min = Math.min.apply(null, array);
  return arraySum(array);
  //- `${max}` + `${min}` ;
}
console.log(sumArray([1, 2, 2, 9]));

function sumArray(array) {
  return Array.isArray(array) && array.length > 1
    ? array.reduce((s, n) => s + n, 0) - Math.min(...array) - Math.max(...array)
    : 0;
}
console.log(sumArray([1, 2, 2, 9]));

function simpleMultiplication(number) {
  if (number % 2 === 0) {
    return number * 8;
  } else {
    return number * 9;
  }
}
console.log(simpleMultiplication(4));

function lovefunc(flower1, flower2) {
  if ((flower1 + flower2) % 2 !== 0) {
    return true;
  } else {
    return false;
  }
}
console.log(lovefunc(1, 2));

function opposite(number) {
  return -number;
}
console.log(opposite(3));

function isDivideBy(number, a, b) {
  if (number % a !== 0 || number % b !== 0) {
    return false;
  } else {
    return true;
  }
}
console.log(isDivideBy(4, 2, -3));

let results = ['1:6', '2:0', '3:0', '4:0', '2:1', '3:1', '4:1', '3:2', '4:2', '4:3'];

function points(games) {
  let i = 0;
  let points = 0;
  for (i; i < games.length; i++) {
    let each = games[i].split(':');
    if (each[0] > each[1]) {
      points += 3;
    } else if (each[0] == each[1]) {
      points += 1;
    } else {
      points += 0;
    }
  }
  return points;
}
console.log(points(results));

function numberToString(num) {
  return String(num);
}
console.log(numberToString(555));

function countSheeps(arrayOfSheep) {
  let i = 0;
  for (i; i <= arrayOfSheep.length; i++) {
    if (i == true) {
      return 1;
    } else {
      return 0;
    }
  }
}

function countSheeps(arrayOfSheep) {
  let counter = 0;
  for (let i = 0; i < arrayOfSheep.length; i++) {
    if (arrayOfSheep[i]) counter += 1;
  }
  return counter;
}

console.log(countSheeps([true, true, false, true]));

function basicOp(operation, value1, value2) {
  if (operation == '+') {
    return value1 + value2;
  } else if (operation == '-') {
    return value1 - value2;
  } else if (operation == '*') {
    return value1 * value2;
  } else if (operation == '/') {
    return value1 / value2;
  }
}
console.log(basicOp('/', 10, 5));

function repeatStr(n, s) {
  let newString = '';
  for (let i = 0; i < n; i++) {
    newString += s;
  }
  return newString;
}
console.log(repeatStr(3, 'W'));
