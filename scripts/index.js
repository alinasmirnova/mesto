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

const elementInfoPopup = new PopupWithForm('.popup_type_element-info', onAddElementFormSubmit);
const addElementForm = document.forms['add-element'];
const addElementValidator = new FormValidator(validationSettings, addElementForm);

const elementTemplate = document.querySelector('#element-template');

function openProfileInfoPopup() {
    profileInfoPopup.open(userInfo.getUserInfo());
    profileInfoValidator.clearValidations();
}

function openElementInfoPopup() {
    addElementValidator.clearValidations();
    elementInfoPopup.open();
}

function onEditProfileFormSubmit(newUserInfo) {
    userInfo.setUserInfo(newUserInfo);
    profileInfoPopup.close();    
}

function onAddElementFormSubmit(newPlace) {
    elementsSection.addItem(newPlace);
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
