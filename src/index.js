import './style.css';
import DOM from './dom';
import APP from './app';

async function router() {
  const data = await APP.getData();
  console.log(data);
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
