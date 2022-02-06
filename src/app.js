let searchboxInput;
let cityText;

let API_KEY;
let CURRENT_WEATHER_DATA_URL;
let ONE_CALL_API_URL;

function startup() {
  searchboxInput = document.querySelector('.searchbox-input');
  cityText = document.querySelector('.city-text');

  API_KEY = '9337f92135b1f0193cefc57b9b2c3d3b';
  CURRENT_WEATHER_DATA_URL = 'http://api.openweathermap.org/data/2.5/weather?';
  ONE_CALL_API_URL = 'https://api.openweathermap.org/data/2.5/onecall?';
}

function getCity() {
  const cityVal = searchboxInput.value;
  let city;
  if (!cityVal) {
    return 'Austin'
  } else {
    city = cityVal;
  }
  return city;
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

/**
 * 
 * @returns Array of daily forecast objects to use in updating the DOM elements
 * on the webpage.
 */
async function getData() {
  const city = getCity();
  const currentWeatherQryStr = getFilledCurrentWeatherQryStr(city);
  const fullCurrentWeatherURL = getFullURL(CURRENT_WEATHER_DATA_URL, currentWeatherQryStr);
  const currentWeatherResponse = await fetch(fullCurrentWeatherURL);
  const currentWeatherData = await currentWeatherResponse.json();
  if (currentWeatherData.message) {
    //handle
    
  } else {
    // cityText.innerText = currentWeatherData.name;
    const lat = currentWeatherData.coord.lat;
    const lon = currentWeatherData.coord.lon;
  
    const oneCallAPIQryStr = getFilledOneCallAPIQryStr(lat, lon);
    const fullOneCallAPIURL = getFullURL(ONE_CALL_API_URL, oneCallAPIQryStr);
    const oneCallAPIResponse = await fetch(fullOneCallAPIURL);
    const oneCallAPIData = await oneCallAPIResponse.json();
    return oneCallAPIData.daily;
  }
}

export default {
  startup, 
  getData,
};