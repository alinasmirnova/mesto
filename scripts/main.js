const nameProfileField = document.querySelector('.profile__name');
const aboutProfileField = document.querySelector('.profile__about');
const profileInfoPopup = initPopup('.popup_type_profile-info', onEditProfileFormSubmit, '.profile__edit-button', toggleProfileInfoPopup);
const namePopupField = profileInfoPopup.querySelector('.popup__text-field_name_name');
const aboutPopupField = profileInfoPopup.querySelector('.popup__text-field_name_about');

const elementInfoPopup = initPopup('.popup_type_element-info', onAddElementFormSubmit, '.profile__add-button', toggleElementInfoPopup);
const placeNamePopupField = elementInfoPopup.querySelector('.popup__text-field_name_name');
const placeLinkPopupField = elementInfoPopup.querySelector('.popup__text-field_name_link');

function initPopup(type, onSubmit, buttonToOpen, onOpenPopup){
    const popup = document.querySelector(type);
    const closeButton = popup.querySelector('.popup__close-button');
    const form = popup.querySelector('.popup__container');
    const openPopupButton = document.querySelector(buttonToOpen);

    function closePopup() {
        togglePopup(popup);
    }

    closeButton.addEventListener('click', closePopup);
    form.addEventListener('submit', onSubmit);
    openPopupButton.addEventListener('click', onOpenPopup);
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

const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template').content;

function createElement({name, link}) {
    const element = elementTemplate.querySelector('.element').cloneNode(true);
    let image = element.querySelector('.element__image');
    image.src = link;
    image.alt = name;
    element.querySelector('.element__header').textContent = name;
    element.querySelector('.element__like').addEventListener('click', toggleLike);
    element.querySelector('.element__delete').addEventListener('click', removeElement);
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