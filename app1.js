const input = document.querySelector('#input');
const view = document.querySelector('#view');
const name = document.querySelector('.td-name')
const home = document.querySelector('.td-home')
const ships = document.querySelector('.td-ships')
const films = document.querySelector('.td-films')

const swapi = new Swapi;
const ui = new UI;
characters = [];

view.addEventListener('click', (e) => {
  
    if (input.value === '') {
      alert('cannot be blank')
    } else {
      swapi.getCharacters()
      .then((res) => {
        for (let i = 0; i < 8; i ++) {
          for (let j = 0; j < 10; j ++) {
            characters.push(res[i].data.results[j])
          }
        }
      })
      ui.populateName(characters);
    }
  
e.preventDefault();
})

