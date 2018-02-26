/*
  Соединить задание 1 и 2
  
  Напишите функцию validate которая проверяет все поля формы 
  и возвращает результат в виде обьекта со свойствами firstname,
  lastname и tel.
  
  Кроме того, формат объекта: в свойства записывается буль-флаг 
  уведомляющий о статусе прохождения валидации для поля.
  
  При клике на кнопку submit должна происходить проверка.
  
  Визуализировать результат проверки.
    Написать функцию showResults(results), которая принимает
    один аргумент results - объект такого формата который возвращает
    функция validate, и создает html разметку по результатам
    этого объекта.
  
    showResults добавляет в список с классом .results 
    (уже есть в html), li для каждого поля формы. В li записать:
    SUCCESS: 'имя поля' passed validation
    ERROR: 'имя поля' failed validation
  
    Для li с положительным результатом дать класс success, 
    с отрицательным error.
*/

const firstname = document.getElementById("first_name");
const lastname = document.getElementById("last_name");
const tel = document.getElementById("tel");
const submitBtn = document.getElementById("submit-btn");
const resultsList = document.querySelector(".results");

submitBtn.addEventListener("click", validate);

const validateResult = {
"firstName": '',
"lastName": '',
"phoneNumber": ''
}

const dataResults = {
  firstName: '',
  lastName: '',
  phoneNumber: ''
}

const firstNameLat = /^([^\d\s\-\_]+[a-z]\s)?([^\d\s\-\_]+[a-z]\s)?([^\d\s\-\_]+[a-z])$/i;
const firstNameKur = /^([^\w\s\-]+[а-яё]\s)?([^\w\s\-]+[а-яё]\s)?([^\w\s\-]+[а-яё])$/i ;

const lastNameLat = /^([^\d\s\-\_]+[a-z])\s?-?\s?([^\d\s\-\_]+[a-z])$/i;
const lastNameKur = /^([^\w\s\-]+[а-яё])\s?-?\s?([^\w\s\-]+[а-яё])$/i;

const regNum = /^\+[\d(\)\ -]{11}\d$/;

function validate(evt) {
  evt.preventDefault();
  if(resultsList.innerHTML){
    resultsList.innerHTML = "";
  }

  if(firstname.value && lastname.value && tel.value){
    validateResult["firstName"] = firstNameLat.test(firstname.value) || firstNameKur.test(firstname.value);
    validateResult["lastName"] = lastNameLat.test(lastname.value) || lastNameKur.test(lastname.value);
    validateResult["phoneNumber"] = regNum.test(tel.value);

    showResults(validateResult);

    if(validateResult["firstName"] && validateResult["lastName"] && validateResult["phoneNumber"]){
       dataResults.firstName = firstname.value;
       dataResults.lastName = lastname.value;
       dataResults.phoneNumber = tel.value.replace(/[\s-]g/, '').replace('/^(\+{1}\d{3})(\d{2})(\d{2})(\d{2})(\d{3})$/, $1 $2 $3 $4 $5');

       firstname.value = "";
       lastname.value = "";
       tel.value = "";

       console.log(dataResults);
    } 
  }
    else{
      resultsList.insertAdjacentHTML('beforeend', `<li class = "errors">Заповніть всі поля</li>`);
    } 
}

function showResults(results) {
 let res = Object.keys(results).map(key => {
   if(results[key]){
    key = `<li class="success">SUCCESS: ${key} passed validation</li>`
   } else {
    key = `<li class="error">ERROR: ${key} failed validation</li>`  
   }
   return key;
 }).reduce((acc, next) => acc + next);
 resultsList.insertAdjacentHTML('beforeend', res);
}
