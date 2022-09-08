import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryEl = document.querySelector(".gallery");

const galleryMarkup = createGalleryImageMarkup(galleryEl);

galleryEl.insertAdjacentHTML("beforeend", galleryMarkup);
galleryEl.addEventListener("click", selecetImage);

function createGalleryImageMarkup(items) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <div class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
            />
        </a>
    </div> 
`;
    })
    .join("");
}

function createBigImageMarkup({ description, url }) {
  return `
  <img src="${url}" alt="${description}" >
  `;
}

function selecetImage(e) {
  e.preventDefault();

  const galleryItem = e.target.closest(".gallery__item");
  if (!galleryItem) {
    return;
  }

  const img = galleryItem.querySelector("img");

  const {
    alt: description,
    dataset: { source: url },
  } = img;

  const arg = { description, url };
  const instance = basicLightbox.create(createBigImageMarkup(arg));
  instance.show();
}
