const searchBoxInput = document.querySelector('.searchbox-input');
const searchBoxBtn = document.querySelector('.searchbox-btn');
const cityText = document.querySelector('.city-text');
const displayElement = document.querySelector('p');

const API_KEY = '9337f92135b1f0193cefc57b9b2c3d3b';
const CURRENT_WEATHER_DATA_URL = 'http://api.openweathermap.org/data/2.5/weather?';
const ONE_CALL_API_URL = 'https://api.openweathermap.org/data/2.5/onecall?';

function getCity() {
  return searchBoxInput.value;
}

function getFilledCurrentWeatherQryStr(city) {
  return `q=${city}&units=Imperial&APPID=${API_KEY}`;
}

function getFilledOneCallAPIQryStr(lat, lon) {
  return `lat=${lat}&lon=${lon}&units=Imperial&exclude=minutely&appid=${API_KEY}`;
}

function getFullURL(baseURL, qryStr) {
  return baseURL + qryStr;
}

searchBoxBtn.addEventListener('click', main);
searchBoxInput.addEventListener('keyup', function(e) {
  if (e.keyCode === 13) {
    searchBoxBtn.click();
  }
});

async function main() {
  const city = getCity();
  const currentWeatherQryStr = getFilledCurrentWeatherQryStr(city);
  const fullCurrentWeatherURL = getFullURL(CURRENT_WEATHER_DATA_URL, currentWeatherQryStr);
  const currentWeatherResponse = await fetch(fullCurrentWeatherURL);
  const currentWeatherData = await currentWeatherResponse.json();
  console.log(currentWeatherData.message);
  if (currentWeatherData.message) {
    //handle
    
  } else {
    cityText.innerText = currentWeatherData.name;
    const lat = currentWeatherData.coord.lat;
    const lon = currentWeatherData.coord.lon;
  
    const oneCallAPIQryStr = getFilledOneCallAPIQryStr(lat, lon);
    const fullOneCallAPIURL = getFullURL(ONE_CALL_API_URL, oneCallAPIQryStr);
    const oneCallAPIResponse = await fetch(fullOneCallAPIURL);
    const oneCallAPIData = await oneCallAPIResponse.json();
    console.log(oneCallAPIData.daily);
    console.log(oneCallAPIData.hourly);
  }
}
