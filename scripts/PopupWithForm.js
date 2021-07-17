import Popup from "./Popup.js";

class PopupWithForm extends Popup {
    constructor(popupSelector, onFormSubmit) {
        super(popupSelector);
        this._onFormSubmit = onFormSubmit;  
        this._form = this._popup.querySelector('.form');
        this.setEventListeners();   
    }

    _getInputValues() {
        console.log(this._form.elements);
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._getInputValues();
            this._onFormSubmit();            
        }); 
    }

    close() {
        super.close();
        this._form.reset();
    }
}

export default PopupWithForm;