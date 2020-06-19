const input = document.querySelector('#input');
const view = document.querySelector('#view');
const name = document.querySelector('.td-name')
const home = document.querySelector('.td-home')
const ships = document.querySelector('.td-ships')
const films = document.querySelector('.td-films')

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
        starships.push(axios.get(ship).then(res => res.data.name));
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
    }
  
