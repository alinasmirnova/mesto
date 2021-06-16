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
    inputError.textContent = input.validationMessage;
    inputError.classList.add(errorClass);
}

function hideError(input, inputError, {inputErrorClass, errorClass}) {
    input.classList.remove(inputErrorClass);
    inputError.textContent = '';
    inputError.classList.remove(errorClass);
}