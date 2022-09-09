import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryListEl = document.querySelector(".gallery");
const galleryMarkup = createGalleryImageMarkup();

galleryListEl.insertAdjacentHTML("beforeend", galleryMarkup);
galleryListEl.addEventListener("click", selecetImage);

function createGalleryImageMarkup() {
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

function selecetImage(e) {
  e.preventDefault();

  const galleryItemClick = e.target.closest(".gallery__item");
  if (!galleryItemClick) {
    return;
  }

  const imgMarkupCreate = `
  <img src="${e.target.dataset.source}" alt="${e.target.alt}" >
  `;

  const instance = basicLightbox.create(imgMarkupCreate);
  instance.show();

  const whenModalIsOpen = document.querySelector(".gallery");

  whenModalIsOpen.addEventListener("keydown", closeModal.bind(instance));
  function closeModal(event) {
    if (event.keyCode === 27) {
      this.close();
    }
  }
  whenModalIsOpen.removeEventListener("keydown", closeModal.bind(instance));
}
