const validationSettings = {
    inputSelector: '.form__input',
    inputErrorClass: 'form__input_invalid',
    errorClass: 'form__input-error_visible',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled'
};

const elementTemplate = document.querySelector('#element-template');

const escapeKey = 'Escape';

export {validationSettings, elementTemplate, escapeKey};