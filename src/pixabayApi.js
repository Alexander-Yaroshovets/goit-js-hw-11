import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api';
export class pixabayApi {
  #page = 1;
  #query = '';
  #totalPages = 0;
  #perPage = 40;
  #params = {
    params: {
      key: `30563823-6c3f13d072854be17d7816287`,
      image_type: `photo`,
      orientation: `horizontal`,
      safesearch: true,
      per_page: 40,
    },
  };
  getPhoto = async () => {
    const url = `/?q=${this.#query}&per_page=${this.#perPage}&page=${
      this.#page
    }`;
    const { data } = await axios.get(url, this.#params);
    return data;
  };
  set query(newQuery) {
    this.#query = newQuery;
  }
  get query() {
    return this.#query;
  }
  incrementPage() {
    this.#page += 1;
  }
  resetPage() {
    this.#page = 1;
  }
  calculateTotalPages(total) {
    this.#totalPages = Math.ceil(total / this.#perPage);
  }
  get isShownLoadMore() {
    return this.#page < this.#totalPages;
  }
}
