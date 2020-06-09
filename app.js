const input = document.querySelector('#input');
const submit = document.querySelector('#submit');
const name = document.querySelector('.td-name')

const characterArr = [];

function addToArr (res) {
  const resultsArr = res.data.results;
  resultsArr.forEach((obj) => {
    characterArr.push(obj);
  })
  const nextURL = res.data.next;
  return axios.get(nextURL);
}

axios.get('https://swapi.dev/api/people/?page=1')
.then((res) => {
  return addToArr(res);
})
.then((res) => {
 return addToArr(res);
})
.then((res) => {
  return addToArr(res);
})
.then((res) => {
  return addToArr(res);
})
.then((res) => {
  return addToArr(res);
})
.then((res) => {
  return addToArr(res);
})
.then((res) => {
  return addToArr(res);
})
.then((res) => {
  return addToArr(res);
})
.then((res) => {
  submit.addEventListener('click', (e) => {
    characterArr.forEach((char) => {
      if (input.value === char.name) {
        document.querySelector('.td-name').innerText = 'char.name';

      }
    })

    
    e.preventDefault();
  })
})
