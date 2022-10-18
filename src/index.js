import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { refs } from './refs';
import { pixabayApi } from './pixabayApi';
import { createMarkup } from './markup';
const pixabay = new pixabayApi();
const lightbox = new SimpleLightbox('.photo-card a');

const handleSubmit = async event => {
  event.preventDefault();
  clearPage();
  const {
    elements: { searchQuery },
  } = event.currentTarget;
  const userQuery = searchQuery.value.trim().toLowerCase();
  if (!userQuery) {
    Notify.failure(' enter your query!');
    return;
  }
  pixabay.query = userQuery;

  try {
    const { hits, total } = await pixabay.getPhoto();
    if (hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    Notify.info(`Hooray! We found ${total} images.`);
    const markup = createMarkup(hits);
    refs.galleryEl.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
    pixabay.calculateTotalPages(total);
    if (pixabay.isShownLoadMore) {
      refs.loadMoreEl.classList.remove('is-hidden');
    }
  } catch (error) {
    Notify.failure(error.message);
    clearPage();
  }
};

const handleClick = async () => {
  pixabay.incrementPage();
  if (!pixabay.isShownLoadMore) {
    refs.loadMoreEl.classList.add('is-hidden');
    Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
  }

  try {
    const { hits } = await pixabay.getPhoto();
    const markup = createMarkup(hits);
    refs.galleryEl.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
  } catch (error) {
    Notify.failure(error.message);
    clearPage();
  }
};
refs.formEl.addEventListener('submit', handleSubmit);
refs.loadMoreEl.addEventListener('click', handleClick);

function clearPage() {
  pixabay.resetPage();
  refs.galleryEl.innerHTML = '';
  refs.loadMoreEl.classList.add('is-hidden');
}
