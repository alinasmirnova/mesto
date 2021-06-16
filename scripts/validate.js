function enableValidation(settings) {
    const forms = Array.from(document.querySelectorAll(settings.formSelector));
    forms.forEach(form => addValiidations(form, settings));
}

function addValiidations(form, settings) {
    const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
    const button = form.querySelector(settings.submitButtonSelector);
    inputs.forEach(input => {
        input.addEventListener('input', (evt) => {
            checkValidity(input, form, settings);
            updateSubmitButtonState(inputs, button, settings);
        });
    });
}

function checkValidity(input, form, settings) {
    if (input.validity.valid) {
        hideError(input, form, settings);
    }
    else {
        showError(input, form, settings);
    }
}

function showError(input, form, {inputErrorClass, errorClass}) {
    const inputError = form.querySelector(`.${input.id}-error`);
    input.classList.add(inputErrorClass);
    inputError.textContent = getValidationMessage(input);
    inputError.classList.add(errorClass);
}

function hideError(input, form, {inputErrorClass, errorClass}) {
    const inputError = form.querySelector(`.${input.id}-error`);
    input.classList.remove(inputErrorClass);
    inputError.textContent = '';
    inputError.classList.remove(errorClass);
}

function getValidationMessage(input) {
    if (input.validity.valueMissing)
        return 'Вы пропустили это поле';

    if (input.validity.typeMismatch && input.type === 'url')
        return 'Введите адрес сайта';    
    
    return input.validationMessage;
}

function hasErrors(inputs) {
    return inputs.some(input => !input.validity.valid);
}

function updateSubmitButtonState(inputs, button, settings) {
    if (hasErrors(inputs)){
        disable(button, settings);
    }
    else {
        enable(button, settings);
    }
}

function enable(button, {inactiveButtonClass}) {
    button.classList.remove(inactiveButtonClass);
}

function disable(button, {inactiveButtonClass}) {
    button.classList.add(inactiveButtonClass);
}

function clearValidations(form, settings) {
    const button = form.querySelector(settings.submitButtonSelector);
    const inputs = Array.from(form.querySelectorAll(settings.inputSelector));

    inputs.forEach(input => hideError(input, form, settings));
    enable(button, settings);    
}