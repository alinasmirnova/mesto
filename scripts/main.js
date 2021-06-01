const editProfileButton = document.querySelector('.profile__edit-button');
const nameProfileField = document.querySelector('.profile__name');
const aboutProfileField = document.querySelector('.profile__about');
const profileInfoPopup = initPopup('.popup_type_profile-info', onEditProfileFormSubmit);
const namePopupField = document.querySelector('.popup__text-field_name_name');
const aboutPopupField = document.querySelector('.popup__text-field_name_about');

function initPopup(type, onSubmit){
    const popup = document.querySelector(type);
    const closeButton = popup.querySelector('.popup__close-button');
    const form = document.querySelector('.popup__container');

    function closePopup() {
        togglePopup(popup);
    }

    closeButton.addEventListener('click', closePopup);
    form.addEventListener('submit', onSubmit);
    return popup;
}

function toggleProfileInfoPopup() {
    namePopupField.value = nameProfileField.textContent;
    aboutPopupField.value = aboutProfileField.textContent;
    togglePopup(profileInfoPopup);
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

editProfileButton.addEventListener('click', toggleProfileInfoPopup);

const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template').content;

function createElement({name, link}) {
    const element = elementTemplate.querySelector('.element').cloneNode(true);
    let image = element.querySelector('.element__image');
    image.src = link;
    image.alt = name;
    element.querySelector('.element__header').textContent = name;
    return element;
}

function insertElement(element) {
    elements.prepend(element);
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
    for(let i = elements.length - 1; i >= 0; i--){
        insertElement(createElement(elements[i]));
    }
}