class FormValidator {
    constructor(settings, form) {
        this._inputSelector = settings.inputSelector;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass

        this._form = form;
    }

    enableValidations() {
        const inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
        const button = this._form.querySelector(this._submitButtonSelector);
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this._checkValidity(input);
                this._updateSubmitButtonState(inputs, button);
            });
        });
    }

    clearValidations() {
        const button = this._form.querySelector(this._submitButtonSelector);
        const inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    
        inputs.forEach(input => this._hideError(input));
        this._updateSubmitButtonState(inputs, button);    
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
        if (input.validity.valueMissing)
            return 'Вы пропустили это поле';
    
        if (input.validity.typeMismatch && input.type === 'url')
            return 'Введите адрес сайта';    
        
        return input.validationMessage;
    }
    
    _hasErrors(inputs) {
        return inputs.some(input => !input.validity.valid);
    }
    
    _updateSubmitButtonState(inputs, button) {
        if (this._hasErrors(inputs)){
            button.classList.add(this._inactiveButtonClass);
            button.disabled = true;
        }
        else {
            button.classList.remove(this._inactiveButtonClass);
            button.disabled = false;
        }
    }   
}

export default FormValidator;