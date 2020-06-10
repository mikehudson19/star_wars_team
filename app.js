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
    const ui = new UI();
    if (input.value === '') {
      ui.createAlert('Please enter a valid Star Wars character', 'failure');
    } else {
    // Populate the selection box on UI with the character the user has sumbitted
    characterArr.forEach((char) => {
      if (input.value === char.name) {
        name.innerText = char.name;
        eyecol.innerText = char.eye_color;
        weight.innerText = char.mass;
        height.innerText = char.height;
  } 
})
    }   
     // Reset the input to blank
     input.value = '';
     e.preventDefault();
    })
  })
  
  // CREATE THE INPUT FIELD TYPE AHEAD FEATURE
  // Create the filter according to the letters entered into the input
  function findMatches (wordToMatch, array) {
    return array.filter((obj) => {
      const regex = new RegExp(wordToMatch, 'gi');
      return obj.name.match(regex);
    })
   }
  
   // Event listeners on the input field
  input.addEventListener('keyup', displayMatches);
  input.addEventListener('change', displayMatches);

  // Append the filtered array of results to the UI
  function displayMatches () {
    const matches = findMatches(input.value, characterArr);
    // Creating the HTML to append to the UL
    const html = matches.map((obj) => {
      return `
        <li>
          <span class='name'>${obj.name}</span>
        </li>
      `
    }).join('')
    const list = document.querySelector('.filter-list');
    list.innerHTML = html;
    // When search field is empty, filtered array mustn\'t display
    if (input.value === '') {
      list.innerHTML = '';
    }
    // When an item is selected from the filtered array, it must populate to the input field
    const allList = document.querySelectorAll('.filter-list');
    allList.forEach((obj, i) => {
      allList[i].addEventListener('click', (e) => {
          input.value = e.target.innerText;
          list.innerHTML = '';
      })
    })

  }


//  ADD CHARACTER TO TEAM ON CLICK
document.querySelector('.add-button').addEventListener('click', () => {
  const ui = new UI();
  // Check to see if there are already three team members
  const table = document.querySelectorAll('.table2 tr');
  console.log()
  if (table.length === 4) {
    ui.createAlert('You can only have three team members', 'failure')
  } else {
  // Instantiate new character from selection box
  const char = new Character(name.innerText, eyecol.innerText, weight.innerText, height.innerText);
  // Add the character to the team-member box
  ui.addToUi(char);
  //Display the success alert
  ui.createAlert(`${name.innerText} has been added to your team`, 'success')
  // Clear the fields in the selection box
  name.innerText = '';
  eyecol.innerText = '';
  height.innerText = '';
  weight.innerText = '';
}
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
      <td class="delete">X</td>
      `
    const table = document.querySelector('.table2');  
    table.appendChild(row);
  }

  removeFromUi (e) {
    if (e.target.className.includes('delete')) {
      e.target.parentElement.remove()
    }
  }

  createAlert(message, result) {
    const alertUI = document.querySelector('.alert');
    const alert = document.createElement('p');
    alert.innerText = `${message}`;
    alertUI.className = `alert ${result}`
    alertUI.appendChild(alert);
    alertUI.style.visibility = 'visible';
    console.log(alertUI)
    setTimeout(() => {
      alertUI.style.visibility = 'hidden';
      alert.remove();
    },2500)
  }

}

// EVENT LISTENER TO REMOVE TEAM MEMBER
document.body.addEventListener('click', (e) => {
 const ui = new UI(e);
 ui.removeFromUi(e);
})





