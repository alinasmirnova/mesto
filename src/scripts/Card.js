class Card {
    constructor(data, template, {onClick, onDeleteClick}) {
        this._imageLink = data.link;
        this._title = data.name;
        this._id = data.id;
        this._likes = data.likes;
        
        this._template = template;
        this._onClick = onClick;
        this._onDeleteClick = onDeleteClick;
    }

    build() {
        this._card = this._getEmptyCard();
        this._image = this._card.querySelector('.element__image');
        this._setEventListeners();

        this._image.style.backgroundImage = `url('${this._imageLink}')`;
        this._card.querySelector('.element__header').textContent = this._title;

        this._card.querySelector('.like__counter').textContent = this._likes.length;
        
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
        this._card.querySelector('.element__delete').addEventListener('click', () => this._onDeleteClick(this));
        this._image.addEventListener('click', () => this._onClick(this._title, this._imageLink));
    }

    _toggleLike(evt){
        evt.target.classList.toggle('like__button_active');
    }
    
    remove() {
        this._card.remove();
        this._card = null;
    }
}

export default Card;