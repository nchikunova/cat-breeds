import SlimSelect from 'slim-select';
import fetchCatsBreeds from './cats-api';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { fetchCatsBreeds, fetchDetailsByCatId } from './cats-api';

const list = document.querySelector('#js-list');
const catInfo = document.querySelector('.cat-info');
// const loader = document.querySelector('.loader');
// const errorMessage = document.querySelector('.error');

fetchCatsBreeds()
  .then(data => {
    Loading.standard('Loading...', {
      backgroundColor: 'rgba(0,0,0,0.8)',
    });
    markup(data);
    Loading.remove();
    Notify.info('Select cat`s breed for more information', {
      position: 'center-center',
      width: '400px',
      timeout: 1500,
    });
    // loader.style = 'display: none';
  })
  .catch(error => {
    // errorMessage.style = 'display: block';

    Notify.failure('Oops! Something went wrong! Try reloading the page!', {
      position: 'center-top',
      showOnlyTheLastOne: true,
    });

    console.log(error);
  })
  .finally(() => console.log('finally'));

function markup(arr) {
  const markup = arr
    .map(({ name, id }) => {
      return ` <option value="${id}">${name}</option>
`;
    })
    .join('');
  list.insertAdjacentHTML('beforeend', markup);
  new SlimSelect({
    select: list,
  });
}

list.addEventListener('change', onChange);

function onChange(e) {
  const breedValue = e.currentTarget.value;
  const catId = breedValue;
  fetchDetailsByCatId(catId)
    .then(data => {
      catInfo.style =
        'display: flex; justify-content: center; align-items: center';
      markupByCatId(data);
    })
    .catch(error => error)
    .finally(() => console.log('finally'));
}

function markupByCatId(breedInfo) {
  const { url, breeds } = breedInfo[0];
  const { name, description, temperament, wikipedia_url } = breeds[0];

  const catCard = ` 
  <div class="img-wrapper">
      <img class="cat-img" src="${url}" alt="${name}">
      </div>
       <div class="cat-descr">
      <h1 class="name">${name}</h1>
      <p class="description">${description}</p>
      <p class="temperament"><span">Temperament:</span> ${temperament}</p>   
      <a href='${wikipedia_url}'>Wikipedia</a> 
      </div>`;
  catInfo.innerHTML = catCard;
}
