import './style.css';
import DOM from './dom';
import APP from './app';

async function router() {
  const data = await APP.getData();
  DOM.refresh(data);
}

function main() {
  DOM.startup();
  APP.startup();

  const searchButton = document.querySelector('.searchbox-btn');
  searchButton.addEventListener('click', router);
}

main();
