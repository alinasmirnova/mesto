let editProfileButton = document.querySelector('.profile__edit-button');
let closePopupButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let namePopupField = document.querySelector('.popup__text-field_name_name');
let aboutPopupField = document.querySelector('.popup__text-field_name_about');
let nameProfileField = document.querySelector('.profile__name');
let aboutProfileField = document.querySelector('.profile__about');
let editProfileForm = document.querySelector('.popup__container');

function togglePopup() {
    namePopupField.value = nameProfileField.textContent;
    aboutPopupField.value = aboutProfileField.textContent;
    popup.classList.toggle('popup_opened');
}

editProfileButton.addEventListener('click', togglePopup);
closePopupButton.addEventListener('click', togglePopup);

function onEditProfileFormSubmit(evt) {
    evt.preventDefault();
    nameProfileField.textContent = namePopupField.value;
    aboutProfileField.textContent = aboutPopupField.value;
    togglePopup();    
}

editProfileForm.addEventListener('submit', onEditProfileFormSubmit); 