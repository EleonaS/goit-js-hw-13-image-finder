import cardImageTpl from '../templates/gallery';
import NewFetchApiImage from './apiService';
import notices from '../js/pnotify';

///Lightbox
import * as basicLightbox from 'basiclightbox';

const instance = basicLightbox.create(`
    <img src="assets/images/image.png" width="800" height="600">
`);

export default instance.show();

///document.querySelector('#search-form');
const refs = {
  searchInput: document.querySelector('.search-input'),
  searchButton: document.querySelector('.search-button'),
  loadMoreBtn: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
  buttonUp: document.querySelector('.up'),
};

///
refs.searchButton.addEventListener('click', onInputSearchImage);
refs.loadMoreBtn.addEventListener('click', onButtonLoadImages);
refs.gallery.addEventListener('click', zoomCard);

///
const newFetchApiImage = new NewFetchApiImage();

// Коллбек для слушателя сабмита формы
async function onInputSearchImage(e) {
  e.preventDefault();

  newFetchApiImage.query = refs.searchInput.value;

  // Проверка на недопустимые символы
  //RegExp.prototype.test()

  if (!RegExp(/^\p{L}/, 'u').test(newFetchApiImage.query)
   // || (!newFetchApiImage.query)
  ) {
    return notices.errorEmptyInput();
  };
  newFetchApiImage.resetPageNum();
  const images = await newFetchApiImage.fetchApiImage();

  try {
    if (refs.searchInput.value){
      resetOldQueryPage(images);
      makeCardImage(images.hits);
      addButtonLoadMore(images);
      scrollPageDown();
      addButtonUp();
      if (images.hits.length === 0) {
        notices.errorEmptyInput();
      }
      if (!refs.searchInput.value.trim()) {
      notices.errorEmptyInput();
      }
    }
}catch (error) {
    console.log(error);
  }
  //clear input
  finally {
    document.querySelector('#search-form').reset()
  }
}

// Рендер
function makeCardImage(images) {
  refs.gallery.insertAdjacentHTML('beforeend', cardImageTpl(images));
}

function addButtonLoadMore(images) {
  if (images.hits.length > 0) {
    refs.loadMoreBtn.classList.remove('hidden');
  } else {
    refs.loadMoreBtn.classList.add('hidden');
  }
}

// Очистка галлереи
function resetOldQueryPage() {
  refs.gallery.innerHTML = '';
}


//// Дозагрузка карточек галлереи
//метод Element.scrollIntoView()

async function onButtonLoadImages(e) {
  newFetchApiImage.incrementPage();
  const images = await newFetchApiImage.fetchApiImage();
  makeCardImage(images.hits);
  scrollPageDown();
}

//scroll
function scrollPageDown() {
  if (newFetchApiImage.page === 1) {
    window.scrollTo({
      top: 150,
      behavior: 'smooth',
    });
  } else {
    window.scrollBy({
      top: 505,
      behavior: 'smooth',
    });
  }
}

//up
function addButtonUp() {
  refs.buttonUp.classList.remove('hidden');
  refs.buttonUp.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}

//Можно добавить функционал отображения большой версии изображения через плагин модального окна, например basicLightbox, при клике на изображение галереи
///zoom

function zoomCard(e) {
  if (e.target.hasAttribute('data-action')) {
    const basicLightbox = require('basiclightbox');
    const instance = basicLightbox.create(`
  <img src=${e.target.name} width="1000" height="800">
`);
    instance.show();
  }
}

