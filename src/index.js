import './style.css';
import DOM from './dom';
import APP from './app';

async function router() {
  setTimeout(() => {
    const bannerImg = document.querySelector('.banner-img');
    bannerImg.classList.add('spin')
    setTimeout(() => {
      bannerImg.classList.remove('spin')
    }, 500)
  }, 500)
  const data = await APP.getData();
  DOM.refresh(data);
}

function main() {
  DOM.startup();
  APP.startup();

  const searchboxButton = document.querySelector('.searchbox-btn');
  const searchboxInput = document.querySelector('.searchbox-input');
  searchboxButton.addEventListener('click', router);
  searchboxInput.addEventListener('keyup', function(e) {
  if (e.keyCode === 13) {
    searchboxButton.click();
  }
  });
}

main();
router();
