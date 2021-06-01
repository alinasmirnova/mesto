const editProfileButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const namePopupField = document.querySelector('.popup__text-field_name_name');
const aboutPopupField = document.querySelector('.popup__text-field_name_about');
const nameProfileField = document.querySelector('.profile__name');
const aboutProfileField = document.querySelector('.profile__about');
const editProfileForm = document.querySelector('.popup__container');

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