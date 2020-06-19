class Swapi {
  constructor() {
    this.characters = [];
  }
  async getCharacters() {
    const prom1 = axios.get('https://swapi.dev/api/people/?page=1')
    const prom2 = axios.get('https://swapi.dev/api/people/?page=2')
    const prom3 = axios.get('https://swapi.dev/api/people/?page=3')
    const prom4 = axios.get('https://swapi.dev/api/people/?page=4')
    const prom5 = axios.get('https://swapi.dev/api/people/?page=5')
    const prom6 = axios.get('https://swapi.dev/api/people/?page=6')
    const prom7 = axios.get('https://swapi.dev/api/people/?page=7')
    const prom8 = axios.get('https://swapi.dev/api/people/?page=8')
    const results = await Promise.all([prom1, prom2, prom3, prom4, prom5, prom6, prom7, prom8])
    return results;
  }
}






