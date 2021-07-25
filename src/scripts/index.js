import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import Section from "./Section.js";
import { validationSettings, initialElements, elementTemplate } from "./constants.js";
import '../pages/index.css';

import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import Api from "./Api.js"

const api = new Api({ 
    baseUri: 'https://nomoreparties.co/v1/cohort-26', 
    authToken: 'e9c41e78-4da5-45a9-a519-987aa0bd1bef'
});

const userInfoSelectors = {
    nameFieldSelector: '.profile__name',
    aboutFieldSelector: '.profile__about',
    avatarSelector: '.profile__avatar'
}

const elementInfoPopup = new PopupWithForm('.popup_type_element-info', onAddElementFormSubmit);
const addElementForm = document.forms['add-element'];
const addElementValidator = new FormValidator(validationSettings, addElementForm);

const popupWithImage = new PopupWithImage('.popup_type_element-preview');
const elementsSection = new Section({
    items: initialElements,
    renderer: (data) => new Card(data, elementTemplate, (name, link) => popupWithImage.open(name, link)).build()
}, '.elements');


function openElementInfoPopup() {
    addElementValidator.clearValidations();
    elementInfoPopup.open();
}

function onAddElementFormSubmit(newPlace) {
    elementsSection.addItem(newPlace);
    elementInfoPopup.close();
}

function addOnClickAction(selector, onClick) {
    const editProfileButton = document.querySelector(selector);
    editProfileButton.addEventListener('click', onClick);
}

function onApiError(err) {
    console.log(err)
}

addOnClickAction('.profile__add-button', openElementInfoPopup);

api.getUserInfo()
.then(userInfo => {
    return new UserInfo(userInfo, userInfoSelectors)
})
.then(userInfo => {
    const profileInfoForm = document.forms['profile-info'];
    const profileInfoValidator = new FormValidator(validationSettings, profileInfoForm);
    const profileInfoPopup = new PopupWithForm('.popup_type_profile-info', onEditProfileFormSubmit);

    function openProfileInfoPopup() {
        profileInfoPopup.open(userInfo.getUserInfo());
        profileInfoValidator.clearValidations();
    }

    function onEditProfileFormSubmit(newUserInfo) {
        userInfo.setUserInfo(newUserInfo);
        profileInfoPopup.close();    
    }

    addOnClickAction('.profile__edit-button', openProfileInfoPopup);
    profileInfoValidator.enableValidations();
})
.catch(onApiError);

addElementValidator.enableValidations();

elementsSection.render();
