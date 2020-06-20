const input = document.querySelector('#input');
const view = document.querySelector('#view');
const name = document.querySelector('.td-name')
const home = document.querySelector('.td-home')
const ships = document.querySelector('.td-ships')
const films = document.querySelector('.td-films')
const addBtn = document.querySelector('.add-button')
const removeBtn = document.querySelector('.remove-button')

class Character {
  constructor(name, home, ships, films) {
    this.name = name;
    this.home = home;
    this.ships = ships;
    this.films = films;
  }
}

class UI {
  populateName(char) {
    name.innerText = char.name
  }

  populatePlanet(char) {
    axios.get(char.homeworld)
      .then((res) => {
        home.innerText = res.data.name;
    })
  }

  async populateStarships(char) {
    const starships = [];
      char.starships.forEach((ship) => {
        starships.push(axios.get(ship).then(res => res.data.name))
      })
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

  async populateFilms(char) {
    const filmsArr = [];
    char.films.forEach((film) => {
      filmsArr.push(axios.get(film).then(res => res.data.title))
    }) 
      const filims = await Promise.all(filmsArr);
      if (filims.length === 0) {
        films.innerText = 'None';
      } else {
        const html = filims.map((obj) => {
        return `<span> ${obj}</span>`
        })
        films.innerHTML = html;
          }
        }

    addToTeam(char) {
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
    console.log(document.querySelectorAll('.table2 tr'))
    }

    removeFromTeam(e) {
      if (e.target.className === 'delete') e.target.parentElement.remove();
    }

    removeFromViewing() {
      name.innerHTML = ''; 
      home.innerHTML = '';
      ships.innerHTML = '';
      films.innerHTML = '';
    }  

    clearInput() {
      input.value = '';
    }

    createAlert(message, state) {
      const alertDiv = document.querySelector('.alert');
      const text = document.createElement('p');
      text.innerText = message;
      alertDiv.className = `alert ${state}`
      alertDiv.appendChild(text);
      alertDiv.style.visibility = 'visible'
      setTimeout(() => {
        alertDiv.style.visibility = 'hidden'
        text.remove();
      }, 2800)
    }

    findMatches(wordToMatch, array) {
      return array.filter((obj) => {
        const regex = new RegExp(wordToMatch, 'gi');
        return obj.name.match(regex);
      })
    }

    displayMatches(characterArr) {
      const matches = this.findMatches(input.value, characterArr);
      // Creating the HTML to append to the UL
      const html = matches.map((obj) => {
        return `<li><span class='name'>${obj.name}</span></li>`}).join('')

      const list = document.querySelector('.filter-list');
      list.innerHTML = html;

      // When search field is empty, filtered array must not display
      if (input.value === '') list.innerHTML = '';
      
      // When an item is selected from the filtered array, it must populate to the input field
      const listItems = document.querySelectorAll('.filter-list');
      listItems.forEach((obj, i) => {
        listItems[i].addEventListener('click', (e) => {
          input.value = e.target.innerText;
          list.innerHTML = '';
        })
      })
    }

    }


  
