import Popup from "./Popup.js";

class PopupWithForm extends Popup {
    constructor(popupSelector, disableSubmitButtonClass, onFormSubmit) {
        super(popupSelector);
        this._onFormSubmit = onFormSubmit;  
        this._form = this._popup.querySelector('.form');
        this.setEventListeners();
        this._submitButton = this._popup.querySelector('.popup__save-button');   
        this._submitButtonInitialText = this._submitButton.textContent;
        this._disableSubmitButtonClass = disableSubmitButtonClass;
    }

    _getInputValues() {
        return Array.from(this._form.elements)
                    .filter(e => e['name'])
                    .reduce((res, cur) => {
                        res[cur['name']] = cur.value;
                        return res;
                    }, {});
    }

    _setInputValues(obj) {
        Object.keys(obj).forEach(item => {
            this._form.elements[item].value = obj[item];
        });
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._disableSubmitButton();
            this._onFormSubmit(this._getInputValues());            
        }); 
    }

    close() {
        super.close();
        this._form.reset();
        this._enableSubmitButton();
    }

    open(values) {
        if (values) {
            this._setInputValues(values);
        }
        super.open();
    }

    _disableSubmitButton() {
        this._submitButton.classList.add(this._disableSubmitButtonClass);
        this._submitButton.textContent = 'Сохранение...';
        this._submitButton.disabled = true;
    }

    _enableSubmitButton() {
        this._submitButton.classList.remove(this._disableSubmitButtonClass);
        this._submitButton.textContent = this._submitButtonInitialText;
        this._submitButton.disabled = false;
    }
}

export default PopupWithForm;