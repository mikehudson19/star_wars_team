const swapi = new Swapi;
const ui = new UI;
characters = [];



window.onload = (event) => {
  swapi.getCharacters()
  .then((res) => {
    for (let i = 0; i < 8; i ++) {
      for (let j = 0; j < 10; j ++) {
        characters.push(res[i].data.results[j])
      }
    }
    console.log(res);
  })
};

view.addEventListener('click', (e) => {
    if (input.value === '') {
      alert('cannot be blank')
    } else {
      characters.forEach((char) => {
        if (char.name === input.value) {
          ui.populateName(char);
          ui.populatePlanet(char);
          ui.populateStarships(char);
          ui.populateFilms(char);
        }
      })
      
    }
  
e.preventDefault();
})

