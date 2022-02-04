import weatherAppIcon from './images/icons/weather-app-icon.svg';
import githubIcon from './images/icons/github-icon.png';
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

function getContentContainer() {
  const content = getDOMNode('div', 'content');

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

function getImage(imagePath, ...classes) {
  const img = getDOMNode('img', ...classes);
  img.src = imagePath;
  return img;
}

function getGithubAppAnchor() {
  const anchor = getAnchor('https://github.com/Drew-Daniels/weather_app');
  const img = getImage(githubIcon, 'github-icon');
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
  const head = document.querySelector('head');
  const favicon = getFavicon(weatherAppIcon);
  head.appendChild(favicon);

  const body = document.querySelector('body');
  body.classList.add('content-container');

  const footer = getFooter();
  body.appendChild(footer);
}

export default {
  startup,
}