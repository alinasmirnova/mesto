import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import Section from "./Section.js";
import { validationSettings, initialElements } from "./constants.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

const userInfo = new UserInfo('.profile__name', '.profile__about')
const profileInfoPopup = new PopupWithForm('.popup_type_profile-info', onEditProfileFormSubmit);
const profileInfoForm = document.forms['profile-info'];
const profileInfoValidator = new FormValidator(validationSettings, profileInfoForm);
const namePopupField = profileInfoForm.elements.name;
const aboutPopupField = profileInfoForm.elements.about;

const elementInfoPopup = new PopupWithForm('.popup_type_element-info', onAddElementFormSubmit);
const addElementForm = document.forms['add-element'];
const addElementValidator = new FormValidator(validationSettings, addElementForm);
const placeNamePopupField = addElementForm.elements.name;
const placeLinkPopupField = addElementForm.elements.link;

const elementTemplate = document.querySelector('#element-template');


function openProfileInfoPopup() {
    const v = userInfo.getUserInfo();
    namePopupField.value = v.name;
    aboutPopupField.value = v.about;
    profileInfoValidator.clearValidations();
    profileInfoPopup.open();
}

function openElementInfoPopup() {
    addElementValidator.clearValidations();
    elementInfoPopup.open();
}

function onEditProfileFormSubmit(evt) {
    userInfo.setUserInfo({name: namePopupField.value, about: aboutPopupField.value});
    profileInfoPopup.close();    
}

function onAddElementFormSubmit(evt) {
    const place = {
        name: placeNamePopupField.value,
        link: placeLinkPopupField.value,
    };
    elementsSection.addItem(place);
    elementInfoPopup.close();
}

function addOnClickAction(selector, onClick) {
    const editProfileButton = document.querySelector(selector);
    editProfileButton.addEventListener('click', onClick);
}

addOnClickAction('.profile__edit-button', openProfileInfoPopup);
addOnClickAction('.profile__add-button', openElementInfoPopup);

profileInfoValidator.enableValidations();
addElementValidator.enableValidations();

const popupWithImage = new PopupWithImage('.popup_type_element-preview');
const elementsSection = new Section({
    items: initialElements,
    renderer: (data) => new Card(data, elementTemplate, (name, link) => popupWithImage.open(name, link)).build()
}, '.elements');

elementsSection.render();
