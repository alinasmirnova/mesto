import {openElementPreviewPopup} from './previewPopup.js'

class Card {
    constructor(data, template) {
        this._imageLink = data.link;
        this._title = data.name;
        
        this._template = template;
    }

    build() {
        this._card = this._getEmptyCard();
        this._image = this._card.querySelector('.element__image');
        this._setEventListeners();

        this._image.style.backgroundImage = `url('${this._imageLink}')`;
        this._card.querySelector('.element__header').textContent = this._title;
        
        return this._card;    
    }

    _getEmptyCard() {
        return this._template
                    .content
                    .querySelector('.element')
                    .cloneNode(true);
    }

    _setEventListeners() {
        this._card.querySelector('.element__like').addEventListener('click', this._toggleLike);
        this._card.querySelector('.element__delete').addEventListener('click', () => this._remove());
        this._image.addEventListener('click', () => openElementPreviewPopup(this._title, this._imageLink));
    }

    _toggleLike(evt){
        evt.target.classList.toggle('element__like_active');
    }
    
    _remove() {
        this._card.remove();
    }
}

export default Card;