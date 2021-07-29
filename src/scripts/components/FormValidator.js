class FormValidator {
    constructor(settings, form) {
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass

        this._form = form;
        this._inputs = Array.from(this._form.querySelectorAll(settings.inputSelector));
        this._submitButton = this._form.querySelector(settings.submitButtonSelector);
    }

    enableValidations() {
        this._inputs.forEach(input => {
            input.addEventListener('input', () => {
                this._checkValidity(input);
                this._updateSubmitButtonState();
            });
        });
    }

    clearValidations() {
        this._inputs.forEach(input => this._hideError(input));
        this._updateSubmitButtonState();    
    }
    
    _checkValidity(input) {
        if (input.validity.valid) {
            this._hideError(input);
        }
        else {
            this._showError(input);
        }
    }
    
    _showError(input) {
        const inputError = this._form.querySelector(`.${input.id}-error`);
        input.classList.add(this._inputErrorClass);
        inputError.textContent = this._getValidationMessage(input);
        inputError.classList.add(this._errorClass);
    }
    
    _hideError(input) {
        const inputError = this._form.querySelector(`.${input.id}-error`);
        input.classList.remove(this._inputErrorClass);
        inputError.textContent = '';
        inputError.classList.remove(this._errorClass);
    }
    
    _getValidationMessage(input) {
        if (input.validity.valueMissing) {
            return 'Вы пропустили это поле';
        }
    
        if (input.validity.typeMismatch && input.type === 'url') {
            return 'Введите адрес сайта';    
        }
        
        return input.validationMessage;
    }
    
    _hasErrors() {
        return this._inputs.some(input => !input.validity.valid);
    }
    
    _updateSubmitButtonState() {
        if (this._hasErrors()) {
            this.disableSubmitButton();
        }
        else {
            this.enableSubmitButton();
        }
    }
    
    enableSubmitButton() {
        this._submitButton.classList.remove(this._inactiveButtonClass);
        this._submitButton.disabled = false;
    }

    disableSubmitButton() {
        this._submitButton.classList.add(this._inactiveButtonClass);
        this._submitButton.disabled = true;
    }
}

export default FormValidator;