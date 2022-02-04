import weatherAppIcon from './images/icons/weather-app-icon.svg';
import githubIcon from './images/icons/github-icon.png';
import searchIcon from './images/icons/search-icon.svg';
// const searchBoxInput = document.querySelector('.searchbox-input');
// const searchBoxBtn = document.querySelector('.searchbox-btn');
// const cityText = document.querySelector('.city-text');
// const displayElement = document.querySelector('p');

// searchBoxBtn.addEventListener('click', main);
// searchBoxInput.addEventListener('keyup', function(e) {
//   if (e.keyCode === 13) {
//     searchBoxBtn.click();
//   }
// });

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
  const searchboxButton = getImgButton(searchIcon, 'Magnifying Glass', 'searchbox-img', 'btn-base', 'searchbox-btn');
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

function getMain(...classes) {
  const main = getDOMNode('main', ...classes);

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

export default {
  startup,
}