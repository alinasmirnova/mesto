import {openPopup, initPopup} from './popupOld.js'

const previewPopup = initPopup('.popup_type_element-preview');
const previewImage = previewPopup.querySelector('.preview__image');
const previewTitle = previewPopup.querySelector('.preview__title');

function openElementPreviewPopup(name, link) {
    previewTitle.textContent = name;
    previewImage.src = link;
    previewImage.alt = name;
    openPopup(previewPopup);
}

export {openElementPreviewPopup}