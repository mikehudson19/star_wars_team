const swapi = new Swapi;
const ui = new UI;
characters = [];

// GET DATA FROM API ON WINDOW LOAD
window.onload = () => {
  swapi.getCharacters()
  .then((res) => {
    for (let i = 0; i < 8; i ++) {
      for (let j = 0; j < 10; j ++) {
        characters.push(res[i].data.results[j])
      }
    }
  })
};

// VIEW CHARACTER IN SELECTION BOX
view.addEventListener('click', (e) => {
    if (input.value === '') {
      ui.createAlert(`You need to enter a character.`, 'failure')
    } else {
      characters.forEach((char) => {
        if (char.name === input.value) {
          ui.populateName(char);
          ui.populatePlanet(char);
          ui.populateFilms(char);
          ui.populateStarships(char);
        }
      })
    }
  
  e.preventDefault();
})

// ADD CHARACTER TO TEAM
addBtn.addEventListener('click', () => {
  if (document.querySelectorAll('.table2 tr').length === 4) {
    ui.createAlert('You can only have three team members', 'failure')
  } else {
    const char = new Character(name.innerText, home.innerText, ships.innerText, films.innerText);
    ui.addToTeam(char);
    ui.removeFromViewing();
    ui.clearInput();
    ui.createAlert(`${char.name} has been added to your team.`, 'success')
  }

})

// REMOVE CHARACTER FROM TEAM
document.addEventListener('click', (e) => {
  ui.removeFromTeam(e);
})

// REMOVE CHARACTER FROM VIEWING BOX
removeBtn.addEventListener('click', () => {
  ui.removeFromViewing();
  ui.clearInput();
})


// TRIGGER THE TYPE AHEAD DROP-DOWN LIST
input.addEventListener('keyup', () => {
  ui.displayMatches(characters);
})
input.addEventListener('change', () => {
  ui.displayMatches(characters);
})


