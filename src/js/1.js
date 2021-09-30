loadMoreBtn.addEventListener('click', () => {
  pageNumber += 1;
  const url = `${BASE_URL}/${params}&q=${searchQuery}&page=${pageNumber}&per_page=${perPage}&key=${API_KEY}`;

  fetch(url)
    .then(r => r.json())
    .then(data => {
      list.insertAdjacentHTML('beforeend', imgCard(data.hits));
    });
  setTimeout(() => {
    loadMoreBtn.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, 500);
});