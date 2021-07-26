const validationSettings = {
    inputSelector: '.form__input',
    inputErrorClass: 'form__input_invalid',
    errorClass: 'form__input-error_visible',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled'
};

const elementTemplate = document.querySelector('#element-template');

const escapeKey = 'Escape';

const userInfoSelectors = {
    nameFieldSelector: '.profile__name',
    aboutFieldSelector: '.profile__about',
    avatarSelector: '.avatar__image'
}

export {validationSettings, elementTemplate, escapeKey, userInfoSelectors};