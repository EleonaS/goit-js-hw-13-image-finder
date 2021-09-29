const BASE_URL = 'https://pixabay.com/api/';
//const API_KEY = '21694306-d611e7839c34f02b2916a8d9a';
const API_KEY = '23559462-5fccbea6e5ec1609b81e1decd';


export default class NewFetchApiImage {
  constructor() {
    this.url = BASE_URL;
    this.key = API_KEY;
    this.searchQuery = '';
    this.page = 1;
  };

  async fetchApiImage() {
   const response = await fetch(
      `${this.url}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${this.key}`,
    );

    return response.json()
      /*.then(response => {
      if (response.status === 200) {

        return response.json()
      }
      else {
        throw new Error(response.statusText)
      }*/


/*    return response.json().then(response => {
      if (response.status === 200) {

        return response.json()
      }
      else {
        throw new Error(response.statusText)
      }
    });*/

  };

  incrementPage() {
    this.page += 1;
};

  resetPageNum() {
    this.page = 1;
};

  get query() {
    return this.searchQuery;
  };

  set query(newQuery) {
    this.searchQuery = newQuery;
};
}