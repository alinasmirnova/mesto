const nameProfileField = document.querySelector('.profile__name');
const aboutProfileField = document.querySelector('.profile__about');
const profileInfoPopup = initPopup('.popup_type_profile-info', onEditProfileFormSubmit);
const namePopupField = profileInfoPopup.querySelector('.popup__text-field_name_name');
const aboutPopupField = profileInfoPopup.querySelector('.popup__text-field_name_about');

const elementInfoPopup = initPopup('.popup_type_element-info', onAddElementFormSubmit);
const placeNamePopupField = elementInfoPopup.querySelector('.popup__text-field_name_name');
const placeLinkPopupField = elementInfoPopup.querySelector('.popup__text-field_name_link');

const previewPopup = initPopup('.popup_type_element-preview');
const previewImage = previewPopup.querySelector('.preview__image');
const previewTitle = previewPopup.querySelector('.preview__title');

function initPopup(type, onSubmit){
    const popup = document.querySelector(type);
    const closeButton = popup.querySelector('.popup__close-button');    

    function closePopup() {
        togglePopup(popup);
    }

    closeButton.addEventListener('click', closePopup);    

    if (onSubmit) {
        const form = popup.querySelector('.popup__container');
        form.addEventListener('submit', onSubmit);
    }

    return popup;
}

function toggleProfileInfoPopup() {
    namePopupField.value = nameProfileField.textContent;
    aboutPopupField.value = aboutProfileField.textContent;
    togglePopup(profileInfoPopup);
}

function toggleElementInfoPopup() {    
    togglePopup(elementInfoPopup);
    placeNamePopupField.value = '';
    placeLinkPopupField.value = '';
}

function toggleElementPreviewPopup(evt) {
    const element = evt.target.closest('.element');
    const title = element.querySelector('.element__header').textContent;
    previewTitle.textContent = title;
    previewImage.src = evt.target.style.backgroundImage.split('"')[1];
    previewImage.alt = title;
    togglePopup(previewPopup);
}

function togglePopup(popup) {    
    popup.classList.toggle('popup_opened');
}

function onEditProfileFormSubmit(evt) {
    evt.preventDefault();
    nameProfileField.textContent = namePopupField.value;
    aboutProfileField.textContent = aboutPopupField.value;
    togglePopup(profileInfoPopup);    
}

function onAddElementFormSubmit(evt) {
    evt.preventDefault();
    const place = {
        name: placeNamePopupField.value,
        link: placeLinkPopupField.value,
    };
    insertElements(createElement(place));
    toggleElementInfoPopup();
    placeNamePopupField.value = '';
    placeLinkPopupField.value = '';
}

function addOnClickAction(selector, onClick) {
    const editProfileButton = document.querySelector(selector);
    editProfileButton.addEventListener('click', onClick);
}

addOnClickAction('.profile__edit-button', toggleProfileInfoPopup);
addOnClickAction('.profile__add-button', toggleElementInfoPopup);

const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template').content;

function createElement({name, link}) {
    const element = elementTemplate.querySelector('.element').cloneNode(true);
    const image = element.querySelector('.element__image');
    image.style.backgroundImage = `url('${link}')`;
    element.querySelector('.element__header').textContent = name;
    element.querySelector('.element__like').addEventListener('click', toggleLike);
    element.querySelector('.element__delete').addEventListener('click', removeElement);
    image.addEventListener('click', toggleElementPreviewPopup)
    return element;
}

function insertElements(...items) {
    elements.prepend(...items);
}

function toggleLike(evt){
    evt.target.classList.toggle('element__like_active');
}

function removeElement(evt) {
    const elementToRemove = evt.target.closest('.element');
    elementToRemove.remove();
}

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

function displayElements(elements) {
    insertElements(...elements.map(e => createElement(e)));
}