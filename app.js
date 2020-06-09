const input = document.querySelector('#input');
const submit = document.querySelector('#submit');
const name = document.querySelector('.td-name')
const eyecol = document.querySelector('.td-eyecol')
const weight = document.querySelector('.td-weight')
const height = document.querySelector('.td-height')

const characterArr = [];

function addToArr (res) {
  // Add current set of results to the character array
  const resultsArr = res.data.results;
  resultsArr.forEach((obj) => {
    characterArr.push(obj);
  })
  // Get next set of results
  const nextURL = res.data.next;
  return axios.get(nextURL);
}

// GET THE CHARACTER DATA FROM THE STAR WARS API
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
  // Event listener for submit button
  submit.addEventListener('click', (e) => {
    // Populate the selection box on UI with the character the user has sumbitted
    characterArr.forEach((char) => {
      if (input.value === char.name) {
        name.innerText = char.name;
        eyecol.innerText = char.eye_color;
        weight.innerText = char.mass;
        height.innerText = char.height;
      }
    })
    // Reset the input to blank
    input.value = '';
    e.preventDefault();
  })
})




//  ADD CHARACTER TO TEAM ON CLICK
document.querySelector('.add-button').addEventListener('click', () => {
  // Instantiate new character from selection box
  const char = new Character(name.innerText, eyecol.innerText, weight.innerText, height.innerText);
  // Add the character to the team-member box
  const ui = new UI();
  ui.addToUi(char);
  // Clear the fields in the selection box
  name.innerText = '';
  eyecol.innerText = '';
  height.innerText = '';
  weight.innerText = '';
})


// CREATE THE CHARACTER CLASS
class Character {
  constructor(name, eyecol, weight, height) {
    this.name = name;
    this.eyecol = eyecol;
    this.weight = weight;
    this.height = height;
  }
}

// UI METHODS
class UI {
  // ADD SELECTION TO TEAM (UI)
  addToUi(char) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${char.name}</td>
      <td>${char.eyecol}</td>
      <td>${char.weight}</td>
      <td>${char.height}</td>
      <td>X</td>
      `
    const table = document.querySelector('.table2');  
    table.appendChild(row);
  }
}