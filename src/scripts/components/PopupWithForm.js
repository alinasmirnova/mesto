import Popup from "./Popup.js";

class PopupWithForm extends Popup {
    constructor(popupSelector, onFormSubmit) {
        super(popupSelector);
        this._onFormSubmit = onFormSubmit;  
        this._form = this._popup.querySelector('.form');
        this.setEventListeners();
        this._submitButton = this._popup.querySelector('.popup__save-button');   
        this._submitButtonInitialText = this._submitButton.textContent;
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
            this._submitButton.textContent = 'Сохранение...';
            this._onFormSubmit(this._getInputValues());            
        }); 
    }

    close() {
        super.close();
        this._form.reset();
        this._submitButton.textContent = this._submitButtonInitialText;
    }

    open(values) {
        if (values) {
            this._setInputValues(values);
        }
        super.open();
    }
}

export default PopupWithForm;