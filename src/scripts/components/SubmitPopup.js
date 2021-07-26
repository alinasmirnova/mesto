import Popup from "./Popup.js";

class SubmitPopup extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._form = this._popup.querySelector('.form');
        this.setEventListeners(); 
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._onSubmit();            
        }); 
    }

    open(onSubmit) {
        this._onSubmit = onSubmit;
        super.open();
    }

    close() {
        this._onSubmit = null;
        super.close();
    }
}

export default SubmitPopup;