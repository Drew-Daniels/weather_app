import {format} from 'date-fns';

import weatherAppIcon from './images/icons/weather-app-icon.svg';
import githubIcon from './images/icons/github-icon.png';
import searchIcon from './images/icons/search-icon.svg';
import dateIcon from './images/icons/date-icon.svg';
import clearIcon from './images/icons/clear-icon.svg';
import actualTempIcon from './images/icons/actual-temp-icon.svg';
import feelsLikeTempIcon from './images/icons/feels-like-temp-icon.svg';
import highIcon from './images/icons/high-icon.svg';
import lowIcon from './images/icons/low-icon.svg';
import sunriseIcon from './images/icons/sunrise-icon.svg';
import sunsetIcon from './images/icons/sunset-icon.svg';
import rainProbIcon from './images/icons/rain-prob-icon.svg';
import humidityIcon from './images/icons/humidity-icon.svg';
import windIcon from './images/icons/wind-icon.svg';
import uvIndexIcon from './images/icons/uv-index-icon.svg';

const day0 = new Date();
const day1 = getOffsetDateFromToday(1)
const day2 = getOffsetDateFromToday(2)
const day3 = getOffsetDateFromToday(3)
const day4 = getOffsetDateFromToday(4)
const day5 = getOffsetDateFromToday(5)
const day6 = getOffsetDateFromToday(6)

// searchBoxInput.addEventListener('keyup', function(e) {
//   if (e.keyCode === 13) {
//     searchBoxBtn.click();
//   }
// });

function getOffsetDate(date, offset) {
  return new Date(new Date().setDate((date.getDate() + offset)));
}

function getOffsetDateFromToday(offset) {
  return getOffsetDate(new Date(), offset);
}

/**
 * Creates and returns a DOM node with the listed classes (if any) added
 * @param {string} tagName 
 * @param  {...any} classes 
 * @returns DOM node object
 */
function getDOMNode(tagName, ...classes) {
  const node = document.createElement(tagName);
  if (classes.length) {
    node.classList.add(...classes);
  }
  return node;
}

function getFavicon(faviconPath) {
  const faviconNode = getDOMNode('link');
  faviconNode.setAttribute('rel', 'shortcut icon');
  faviconNode.setAttribute('href', faviconPath);
  return faviconNode;
}

function getH1(h1Text, ...classes) {
  const h1 = getDOMNode('h1', ...classes);
  h1.innerText = h1Text;
  return h1;
}

function getBanner() {
  const banner = getDOMNode('div', 'banner');
  const bannerImg = getImage(weatherAppIcon, 'Hurricane symbol', 'banner-img');
  const bannerHeader = getH1('Weather App', 'banner-text');
  banner.append(bannerImg, bannerHeader);
  return banner;
}

function getInput(inputType, placeholderText, ...classes) {
  const input = getDOMNode('input', ...classes);
  input.type = inputType;
  if (placeholderText) {
    input.placeholder = placeholderText;
  }
  return input;
}

function getTextInput(placeholderText, ...classes) {
  const input = getInput('text', placeholderText, ...classes);
  return input;
}

function getButton(...btnClasses) {
  const btn = getDOMNode('button', ...btnClasses);
  return btn;
}
/**
 * 
 * @param {string} btnImgPath 
 * @param {string} btnImgAlt 
 * @param {array} btnImgClasses 
 * @param  {...string} btnClasses 
 * @returns button DOM node with a nested img
 */
function getImgButton(btnImgPath, btnImgAlt, btnImgClasses, ...btnClasses) {
  const btn = getButton(...btnClasses);
  const img = getImage(btnImgPath, btnImgAlt, ...btnImgClasses);
  btn.appendChild(img);
  return btn;
}

/**
 * 
 * @param {string} btnImgPath 
 * @param {string} btnImgAlt 
 * @param {array} btnImgClasses 
 * @param {string} btnSpanText 
 * @param {array} btnSpanClasses 
 * @param  {...string} btnClasses 
 * @returns button DOM node with nested img and span nodes
 */
function getImgAndSpanButton(
  btnImgPath, 
  btnImgAlt,
  btnImgClasses,
  btnSpanText,
  btnSpanClasses, 
  ...btnClasses) {
  const btn = getImgButton(btnImgPath, btnImgAlt, ...btnImgClasses, ...btnClasses);
  const btnSpan = getSpan(btnSpanText, ...btnSpanClasses);
  btn.appendChild(btnSpan);
  return btn;
}

function getSearchbox() {
  const searchbox = getDOMNode('div', 'searchbox');
  const searchboxInput = getTextInput('Enter your city', 'searchbox-input');
  const searchboxButton = getImgButton(searchIcon, 'Magnifying Glass', ['searchbox-img'], 'btn-base', 'searchbox-btn');
  searchbox.append(searchboxInput, searchboxButton);
  return searchbox;
}

function getUI() {
  const ui = getDOMNode('div', 'ui');
  const searchbox = getSearchbox();

  ui.append(searchbox);
  return ui;
}

function getHeader(...classes) {
  const header = getDOMNode('header', ...classes);
  const banner = getBanner();
  const ui = getUI();

  header.append(banner, ui);
  return header;
}

function getPanelRowImgContainer() {
  const imgContainer = getDOMNode('div', 'panel-row-img-container');
  return imgContainer;
}

function getPanelRowTextContainer() {
  const textContainer = getDOMNode('div', 'panel-row-text-container');
  return textContainer;
}

function getDiv(...classes) {
  const div = getDOMNode('div', ...classes);
  return div;
}

function getDateFromUnixTS(unixTimestamp) {
  return new Date(unixTimestamp * 1000);
}

function getPanelRowDate() {
  const [row, textContainer] = getPanelRowItems(dateIcon, 'Calendar', 'Date:');

  const dateContainer = getDiv('date-container');
  const dateSpan = getSpan(format(new Date(), 'MM/dd/yyyy'), 'date-span');
  dateContainer.appendChild(dateSpan);
  textContainer.append(dateContainer);

  return row;
}

/**
 * Creates a new Panel Row and returns the following in an array:
 * - panelRow DOM node
 * - textContainer DOM node
 * @returns [row, textContainer]
 */
function getPanelRowItems(imagePath, imageAlt, labelText) {
  const row = getPanelRow();
  const imgContainer = row.querySelector('.panel-row-img-container');
  const img = getImage(imagePath, imageAlt);
  imgContainer.appendChild(img);

  const textContainer = row.querySelector('.panel-row-text-container');
  const label = getSpan(labelText, 'label-text');
  const valueContainer = getDiv();
  textContainer.append(label, valueContainer);

  return [row, valueContainer];
}

function getPanelRowSingleSpan(imagePath, imageAlt, labelText, spanValue, ...spanClasses) {
  const [row, valueContainer] = getPanelRowItems(imagePath, imageAlt, labelText);
  const span = getSpan(spanValue, ...spanClasses);
  valueContainer.appendChild(span);

  return row;
}

function getPanelRowItemsDoubleSpan(imagePath, imageAlt, labelText, span1Value, span1Classes, span2Value, span2Classes) {
  const [row, valueContainer] = getPanelRowItems(imagePath, imageAlt, labelText);
  const span1 = getSpan(span1Value, ...span1Classes);
  const span2 = getSpan(span2Value, ...span2Classes);
  valueContainer.append(span1, span2);
  return row;
}

function getPanelRowStatus() {
  const row = getPanelRowSingleSpan(
    clearIcon, 
    'Sun', 
    'Status:', 
    'Clear', 
    'weather-description'
  );
  return row;
}

function getPanelRowActualTemp() {
  const row = getPanelRowItemsDoubleSpan(
    actualTempIcon, 
    'Temperature Gauge with "A" adjacent', 
    'Actual:', 
    '76', 
    ['actual-temperature-value'],
    '°F', 
    ['actual-temperature-units']
  )
  return row;
}

function getPanelRowFeelsLikeTemp() {
  const row = getPanelRowItemsDoubleSpan(
    feelsLikeTempIcon, 
    'Temperature Gauge', 
    'Feels Like:', 
    '76', 
    ['feels-like-temperature-value'], 
    '°F', 
    ['feels-like-temperature-units']
  )
  return row;
}

function getPanelRowHighTemp() {
  const row = getPanelRowItemsDoubleSpan(
    highIcon, 
    'Upward Pointing Chevron', 
    'High:', 
    '80', 
    ['high-temperature-value'], 
    '°F', 
    ['high-temperature-units'],
  )
  return row;
}

function getPanelRowLowTemp() {
  const row = getPanelRowItemsDoubleSpan(
    lowIcon,
    'Downward Pointing Chevron',
    'Low:',
    '60',
    ['low-temperature-value'],
    '°F',
    ['low-temperature-units'],
  );
  return row;
}

function getPanelRowSunrise() {
  const row = getPanelRowSingleSpan(
    sunriseIcon,
    'Sunrise',
    'Sunrise:',
    '7:00AM',
    'sunrise-value',
  );
  return row;
}

function getPanelRowSunset() {
  const row = getPanelRowSingleSpan(
    sunsetIcon,
    'Sunset',
    'Sunset:',
    '7:00PM',
    'sunset-value',
  );
  return row;
}

function getPanelRowRainProbability() {
  const row = getPanelRowItemsDoubleSpan(
    rainProbIcon,
    'Umbrella',
    'Rain Probability:',
    '92',
    'rain-probability-value',
    '%',
    'rain-probability-units',
  );
  return row;
}

function getPanelRowHumidity() {
  const row = getPanelRowItemsDoubleSpan(
    humidityIcon,
    'Raindrop',
    'Humidity:',
    '92',
    'humidity-value',
    '%',
    'humidity-units',
  );
  return row;
}

function getPanelRowWind() {
  const row = getPanelRowItemsDoubleSpan(
    windIcon,
    'Squiggly Lines',
    'Wind:',
    '5',
    'wind-value',
    'MPH',
    'wind-units',
  );
  return row;
}

function getPanelRowUVIndex() {
  const row = getPanelRowSingleSpan(
    uvIndexIcon,
    'Sunglasses',
    'UV Index:',
    '4.63',
    'uv-index-value',
  );
  return row;
}

function getPanelRow() {
  const row = getDOMNode('div', 'panel-row');
  const imgContainer = getPanelRowImgContainer();
  const textContainer = getPanelRowTextContainer();
  row.append(imgContainer, textContainer);
  return row;
}

function getPanel() {
  const panel = getDOMNode('div', 'panel');
  const datePanelRow = getPanelRowDate();
  const statusPanelRow = getPanelRowStatus();
  const actualTempPanelRow = getPanelRowActualTemp();
  const feelsLikeTempPanelRow = getPanelRowFeelsLikeTemp();
  const highTempPanelRow = getPanelRowHighTemp();
  const lowTempPanelRow = getPanelRowLowTemp();
  const sunrisePanelRow = getPanelRowSunrise();
  const sunsetPanelRow = getPanelRowSunset();
  const rainProbabilityPanelRow = getPanelRowRainProbability();
  const humidityPanelRow = getPanelRowHumidity();
  const windPanelRow = getPanelRowWind();
  const uvIndexPanelRow = getPanelRowUVIndex();

  panel.append(
    datePanelRow,
    statusPanelRow,
    actualTempPanelRow,
    feelsLikeTempPanelRow,
    highTempPanelRow,
    lowTempPanelRow,
    sunrisePanelRow,
    sunsetPanelRow,
    rainProbabilityPanelRow,
    humidityPanelRow,
    windPanelRow,
    uvIndexPanelRow,
  )
  return panel;
}

function getPanels() {
  const panel0 = getPanel();
  const panel1 = getPanel();
  const panel2 = getPanel();
  const panel3 = getPanel();
  const panel4 = getPanel();
  const panel5 = getPanel();
  const panel6 = getPanel();

  return [
    panel0,
    panel1,
    panel2,
    panel3,
    panel4,
    panel5,
    panel6,
  ]
}

function getMain(...classes) {
  const main = getDOMNode('main', ...classes);
  const panels = getPanels();
  panels.forEach(function(panel) {
    main.appendChild(panel);
  })
  return main;
}

function getContentContainer() {
  const content = getDOMNode('div', 'content');
  const header = getHeader('header');
  const main = getMain('panels');
  content.append(header, main);
  return content;
}

function getAnchor(href, anchorText, ...classes) {
  const anchor = getDOMNode('a', ...classes);
  anchor.href = href;
  if (anchorText) {
    anchor.innerText = anchorText;
  }
  return anchor;
}

function getSpan(spanText, ...classes) {
  const span = getDOMNode('span', ...classes);
  span.innerText = spanText;
  return span;
}

function getImage(imagePath, alt, ...classes) {
  const img = getDOMNode('img', ...classes);
  img.src = imagePath;
  if (alt) {
    img.alt = alt;
  }
  return img;
}

function getGithubAppAnchor() {
  const anchor = getAnchor('https://github.com/Drew-Daniels/weather_app');
  const img = getImage(githubIcon, 'Github Icon', 'github-icon');
  anchor.append(img);
  return anchor;
}

function getGithubProfileContainer() {
  const container = getDOMNode('div', 'github-profile-container');
  const span = getSpan('Created by');
  const anchor = getAnchor('https://github.com/Drew-Daniels', 'Drew Daniels');
  container.append(span, anchor);
  return container;
}

/**
 * Recursively creates all the elements required in the footer
 * @returns Footer DOM node
 */
function getFooter() {
  const footerNode = getDOMNode('footer', 'footer');
  const githubAppAnchor = getGithubAppAnchor();
  const githubProfileContainer = getGithubProfileContainer();
  footerNode.append(githubAppAnchor, githubProfileContainer);
  return footerNode;
}
/**
 * Creates the DOM elements to display on the webpage
 */
function startup() {
  // HEAD
  const head = document.querySelector('head');
  const favicon = getFavicon(weatherAppIcon);
  head.appendChild(favicon);

  // BODY
  const body = document.querySelector('body');
  body.classList.add('content-container');
  const content = getContentContainer();
  const footer = getFooter();
  body.append(content, footer);

}

/**
 * Takes an array of daily forecast objects and uses them to refresh all DOM elements
 * on the webpage
 * @param {*} forecastData 
 */
function refresh(forecastData) {

}

export default {
  startup,
  refresh,
}