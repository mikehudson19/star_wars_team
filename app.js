const input = document.querySelector('#input');
const submit = document.querySelector('#submit');
const name = document.querySelector('.td-name')
const eyecol = document.querySelector('.td-eyecol')
const weight = document.querySelector('.td-weight')
const height = document.querySelector('.td-height')

const characterArr = [];

function addToArr (res) {
  const resultsArr = res.data.results;
  resultsArr.forEach((obj) => {
    characterArr.push(obj);
  })
  const nextURL = res.data.next;
  return axios.get(nextURL);
}

axios.get('https://swapi.dev/api/people/?page=1')
.then((res) => addToArr(res))
.then((res) => addToArr(res))
.then((res) => addToArr(res))
.then((res) => addToArr(res))
.then((res) => addToArr(res))
.then((res) => addToArr(res))
.then((res) => addToArr(res))
.then((res) => addToArr(res))
.then((res) => {
  console.log('Ready');
  submit.addEventListener('click', (e) => {
    characterArr.forEach((char) => {
      if (input.value === char.name) {
        name.innerText = char.name;
        eyecol.innerText = char.eye_color;
        weight.innerText = char.mass;
        height.innerText = char.height;
      }
    })
    e.preventDefault();
  })
})

class Character {
  constructor(name, eyecol, weight, height) {
    this.name = name;
    this.eyecol = eyecol;
    this.weight = weight;
    this.height = height;
  }
}


document.querySelector('.add-button').addEventListener('click', () => {
  const char = new Character(name.innerText, eyecol.innerText, weight.innerText, height.innerText);
  const ui = new UI();
  ui.addToUi(char);
})

class UI {
  addToUi(char) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${char.name}</td>
      <td>${char.eyecol}</td>
      <td>${char.weight}</td>
      <td>${char.height}</td>
      `
    const table = document.querySelector('.table2');  
    table.appendChild(row);
  }
}