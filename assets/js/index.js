const searchBox = document.querySelector('input');
const searchBtn = document.querySelector('button');
const displayElement = document.querySelector('p');

const API_KEY = '9337f92135b1f0193cefc57b9b2c3d3b';
const url = 'http://api.openweathermap.org/data/2.5/weather?';

function getCity() {
  return searchBox.value;
}

function getQryStr(city) {
  return `q=${city}&units=Imperial&APPID=${API_KEY}`;
}

function getFullURL(baseURL, qryStr) {
  return baseURL + qryStr;
}

searchBtn.addEventListener('click', main);

async function main() {
  const city = getCity();
  const qryStr = getQryStr(city);
  const fullURL = getFullURL(url, qryStr);
  const response = await fetch(fullURL);
  const weatherData = await response.json();
  console.log(weatherData);
  displayElement.innerText = weatherData.main.temp;
}
