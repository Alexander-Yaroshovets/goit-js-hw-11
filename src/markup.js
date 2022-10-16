export function createMarkup(photos) {
  return photos
    .map(
      ({
        webformatURL,
        tags,
        comments,
        views,
        likes,
        downloads,
        largeImageURL,
      }) => {
        return `<div class="photo-card">
      <a  class = "link" href="${largeImageURL}"> <img src="${webformatURL}" alt="${tags}" loading="lazy" class = "gallery-img" /></a>
      <div class="info">
        <p class="info-item">Likes
          <b class = "info-text"> ${likes}</b>
        </p>
        <p class="info-item">Views
          <b class = "info-text"> ${views}</b>
        </p>
        <p class="info-item">Comments
          <b class = "info-text"> ${comments}</b>
        </p>
        <p class="info-item">Downloads
          <b class = "info-text"> ${downloads}</b>
        </p>
      </div>
    </div>`;
      }
    )
    .join('');
}
