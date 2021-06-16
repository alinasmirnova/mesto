function enableValidation(settings) {
    const forms = Array.from(document.querySelectorAll(settings.formSelector));
    forms.forEach(form => addValiidations(form, settings));
}

function addValiidations(form, settings) {
    const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
    inputs.forEach(input => {
        input.addEventListener('input', (evt) => {
            checkValidity(input, form, settings);
        });
    });
}

function checkValidity(input, form, settings) {
    const inputError = form.querySelector(`.${input.id}-error`);    
    if (input.validity.valid) {
        hideError(input, inputError, settings);
    }
    else {
        showError(input, inputError, settings);
    }
}

function showError(input, inputError, {inputErrorClass, errorClass}) {
    input.classList.add(inputErrorClass);
    inputError.textContent = getValidationMessage(input);
    inputError.classList.add(errorClass);
}

function hideError(input, inputError, {inputErrorClass, errorClass}) {
    input.classList.remove(inputErrorClass);
    inputError.textContent = '';
    inputError.classList.remove(errorClass);
}

function getValidationMessage(input) {
    if (input.validity.valueMissing)
        return 'Вы пропустили это поле';

    if (input.validity.typeMismatch && input.type === 'url')
        return 'Введите адрес сайта';

    if (input.validity.tooShort)
        return 'Строка должна быть не короче 2 символов';
    
    return input.validationMessage;
}