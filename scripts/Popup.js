class Popup {
    constructor(popupSelector) {
        this._openPopupClass = 'popup_opened';
        this._popup = document.querySelector(popupSelector);
        this._onEscClose = this._handleEscClose.bind(this);
        this.setEventListeners();        
    }

    open() {
        if (!this._popup.classList.contains(this._openPopupClass)) {
            this._popup.classList.add(this._openPopupClass);
            this._enableClosePopupOnEsc();
        }
    }

    close() {
        if (this._popup.classList.contains(this._openPopupClass)) {
            this._popup.classList.remove(this._openPopupClass);
            this._disableClosePopupOnEsc();  
        }
    }

    setEventListeners() {
        const closeButton = this._popup.querySelector('.popup__close-button');    
        closeButton.addEventListener('click', () => this.close());
    
        const popupContent = this._popup.querySelector('.popup__content');
        popupContent.addEventListener('click', evt => evt.stopPropagation());
        this._popup.addEventListener('click', () => this.close());
    }

    _handleEscClose(evt) {
        if(evt.key === 'Escape'){
            evt.preventDefault();
            this.close();
        }
    }

    _enableClosePopupOnEsc() {
        document.addEventListener('keydown', this._onEscClose);
    }
    
    _disableClosePopupOnEsc() {
        document.removeEventListener('keydown', this._onEscClose);
    }
}

export default Popup;