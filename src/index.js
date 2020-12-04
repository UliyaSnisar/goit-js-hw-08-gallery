import gallery from "./gallery-items.js"

const galleryItems = document.querySelector('.js-gallery');
const lightbox = document.querySelector('.js-lightbox');
const lightboxOverlay = document.querySelector('.lightbox__overlay');
const lightboxImg = document.querySelector('.lightbox__image');
const closeBtn = document.querySelector('.lightbox__button');

gallery.map(createPhotoItemHTML);

galleryItems.addEventListener('click', showPhoto);
closeBtn.addEventListener('click', closeLightbox);
lightboxOverlay.addEventListener('click', closeLightbox);

window.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'ArrowRight':
    case 'ArrowLeft':
      showNextPhoto(event.code);
      break;
    case 'Escape':
      closeLightbox();
      break;
  }
});

function createPhotoItemHTML(photo, index) {
  const photoItem = `<li class="gallery__item">
    <a class="gallery__link" href="${photo.original}">
    <img class="gallery__image" src="${photo.preview}" data-source="${photo.original}" data-index="${index}" alt="${photo.description}">
    </a>
    </li >`;

  galleryItems.insertAdjacentHTML('beforeend', photoItem);
}

function showPhoto(event) {
  event.preventDefault();

  if (event.target === event.currentTarget) {
    return
  }

  lightbox.classList.add('is-open');

  const originalPhotoRef = event.target.getAttribute('data-source');
  lightboxImg.setAttribute('src', originalPhotoRef);

  const dataIndex = event.target.getAttribute('data-index');
  lightboxImg.setAttribute('data-index', dataIndex);

}

function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightboxImg.setAttribute('src', '');
  lightboxImg.setAttribute('data-index', '');
}

function showNextPhoto(keyCode) {
  if (!lightbox.classList.contains('is-open')){ return }
  
  const originalSrcArr = gallery.map(({ original }) => original)
  const index = Number(lightboxImg.getAttribute('data-index'));

  switch (keyCode) {
    case 'ArrowRight':
      if (index === originalSrcArr.length - 1) { return }
      lightboxImg.setAttribute('src', originalSrcArr[index + 1]);
      lightboxImg.setAttribute('data-index', (index + 1));
      break;
    case 'ArrowLeft':
      if (index === 0) { return }
      lightboxImg.setAttribute('src', originalSrcArr[index - 1]);
      lightboxImg.setAttribute('data-index', (index - 1));
      break;
  }
}