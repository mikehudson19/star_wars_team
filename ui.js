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
}