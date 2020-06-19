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
      characters.forEach((char) => {
        if (char.name === input.value) {
          ui.populateName(char);
          ui.populatePlanet(char);
        }
      })
      
    }
  
e.preventDefault();
})

