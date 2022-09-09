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

  document.onkeydown = function (evt) {
    evt = evt || window.event;
    let isEscape = false;
    if ("key" in evt) {
      isEscape = evt.code === "Escape" || evt.code === "Esc";
    } else {
      isEscape = evt.code === "Escape";
    }
    if (isEscape) {
      instance.close();
    }
  };
}
