import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import { openPopup, closePopup, initPopup } from "./popup.js";

const validationSettings = {
    inputSelector: '.form__input',
    inputErrorClass: 'form__input_invalid',
    errorClass: 'form__input-error_visible',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled'
};

const nameProfileField = document.querySelector('.profile__name');
const aboutProfileField = document.querySelector('.profile__about');
const profileInfoPopup = initPopup('.popup_type_profile-info');
const profileInfoForm = document.forms['profile-info'];
const profileInfoValidator = new FormValidator(validationSettings, profileInfoForm);
const namePopupField = profileInfoForm.elements.name;
const aboutPopupField = profileInfoForm.elements.about;

const elementInfoPopup = initPopup('.popup_type_element-info');
const addElementForm = document.forms['add-element'];
const addElementValidator = new FormValidator(validationSettings, addElementForm);
const placeNamePopupField = addElementForm.elements.name;
const placeLinkPopupField = addElementForm.elements.link;

const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template');


function initForm(form, onSubmit) {
    form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        onSubmit();
    });    
}

function openProfileInfoPopup() {
    namePopupField.value = nameProfileField.textContent;
    aboutPopupField.value = aboutProfileField.textContent;
    profileInfoValidator.clearValidations();
    openPopup(profileInfoPopup);
}

function openElementInfoPopup() {
    addElementForm.reset();
    addElementValidator.clearValidations();
    openPopup(elementInfoPopup);
}

function onEditProfileFormSubmit(evt) {
    nameProfileField.textContent = namePopupField.value;
    aboutProfileField.textContent = aboutPopupField.value;
    closePopup(profileInfoPopup);    
}

function onAddElementFormSubmit(evt) {
    const place = {
        name: placeNamePopupField.value,
        link: placeLinkPopupField.value,
    };
    insertElements(createElement(place));
    closePopup(elementInfoPopup);
    addElementForm.reset();   
}

function addOnClickAction(selector, onClick) {
    const editProfileButton = document.querySelector(selector);
    editProfileButton.addEventListener('click', onClick);
}

function insertElements(...items) {
    elements.prepend(...items);
}

function displayElements(elements) {
    insertElements(...elements.map(e => createElement(e)));
}

function createElement(data) {
    return new Card(data, elementTemplate).build();
}

initForm(profileInfoForm, onEditProfileFormSubmit);
initForm(addElementForm, onAddElementFormSubmit);

addOnClickAction('.profile__edit-button', openProfileInfoPopup);
addOnClickAction('.profile__add-button', openElementInfoPopup);

profileInfoValidator.enableValidations();
addElementValidator.enableValidations();

const initialElements = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
displayElements(initialElements);