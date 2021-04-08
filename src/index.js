import gallery from "./gallery-items.js"

const refs = {
  galleryItems: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
  lightboxImg: document.querySelector('.lightbox__image'),
  closeBtn: document.querySelector('.lightbox__button'),
}

const galleryMarkup = createGalleryItem(gallery);

function createGalleryItem (gallery){
  return gallery.map(({preview, original, description}) => {
    return `
    <li class="gallery__item">
    <a
      class="gallery__link"
      href="${original}"
    >
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`;
  }).join('');
};

function showPhoto(event) {
  event.preventDefault();

  if (event.target === event.currentTarget) {
    return;
  }

  refs.lightbox.classList.add('is-open');

  const originalPhotoRef = event.target.getAttribute('data-source');
  refs.lightboxImg.setAttribute('src', originalPhotoRef);

};

function closeLightbox() {
  refs.lightbox.classList.remove('is-open');
  refs.lightboxImg.setAttribute('src', '');
  refs.lightboxImg.setAttribute('data-index', '');
};


window.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'Escape':
      closeLightbox();
      break;
  }
});

refs.galleryItems.insertAdjacentHTML('beforeend', galleryMarkup);
refs.galleryItems.addEventListener('click', showPhoto);
refs.closeBtn.addEventListener('click', closeLightbox);
refs.lightboxOverlay.addEventListener('click', closeLightbox);

