const input = document.querySelector('#input');
const submit = document.querySelector('#submit');
const name = document.querySelector('.td-name')
const home = document.querySelector('.td-home')
const ships = document.querySelector('.td-ships')
const films = document.querySelector('.td-films')

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
      const starships = [];
      if (input.value === char.name) {
        // Add name to UI
        name.innerText = char.name;
        
        // Add homeplanet to UI
        axios.get(char.homeworld)
        .then((res) => {
          home.innerText = res.data.name;
        })
        // Add starships to UI
        const starships = [];
        async function getStarships () {
          for (let i = 0; i < char.starships.length; i++) {
            starships.push(axios.get(char.starships[i]).then(res => res.data.name));
          }
            let newElement = document.createElement('div');
          const shipResults = await Promise.all(starships);
          if (shipResults.length === 0) {
            ships.innerText = 'None';
          } else {
            const html = shipResults.map((obj) => {
              return `<span> ${obj}</span>` 
            })
            ships.innerHTML = html;
            
          }
        }
        getStarships();
        
        // Add films to UI
        const filmsArr = [];
        async function getFilms () {
          for (let i = 0; i < char.films.length; i++) {
            filmsArr.push(axios.get(char.films[i]).then(res => res.data.title));
          }
          const filmResults = await Promise.all(filmsArr);
          if (filmResults.length === 0) {
            films.innerText = 'None';
          } else {
            console.log(filmResults)
            const html = filmResults.map((obj) => {
              return `<span> ${obj}</span>` 
            })
            films.innerHTML = html;
            
          }
        }
        getFilms();
       
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
  if (table.length === 4) {
    ui.createAlert('You can only have three team members', 'failure')
  } else {
  // Instantiate new character from selection box
  const char = new Character(name.innerText, home.innerText, ships.innerText, films.innerText);
  // Add the character to the team-member box
  ui.addToUi(char);
  //Display the success alert
  ui.createAlert(`${name.innerText} has been added to your team`, 'success')
  // Clear the fields in the selection box
  name.innerText = '';
  home.innerText = '';
  films.innerText = '';
  ships.innerText = '';
}
})


// CREATE THE CHARACTER CLASS
class Character {
  constructor(name, home, ships, films) {
    this.name = name;
    this.home = home;
    this.ships = ships;
    this.films = films;
  }
}

// UI METHODS
class UI {
  // ADD SELECTION TO TEAM (UI)
  addToUi(char) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${char.name}</td>
      <td>${char.home}</td>
      <td>${char.ships}</td>
      <td>${char.films}</td>
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
    setTimeout(() => {
      alertUI.style.visibility = 'hidden';
      alert.remove();
    },2500)
  }

  static removeFromConsideration() {
      // Clear the fields in the selection box
      name.innerText = '';
      home.innerText = '';
      films.innerText = '';
      ships.innerText = '';
   
  }
}

// EVENT LISTENERS
// Remove team member from team
document.body.addEventListener('click', (e) => {
 const ui = new UI(e);
 ui.removeFromUi(e);
})

// Remove character from selection box
document.querySelector('.remove-button').addEventListener('click', UI.removeFromConsideration)



