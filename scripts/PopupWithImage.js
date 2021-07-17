import Popup from "./Popup.js";

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        this._previewImage = this._popup.querySelector('.preview__image');
        this._previewTitle = this._popup.querySelector('.preview__title');

        this.setEventListeners();   
    }

    open(name, link) {
        this._previewTitle.textContent = name;
        this._previewImage.src = link;
        this._previewImage.alt = name;
        
        super.open();
    }
}

export default PopupWithImage;