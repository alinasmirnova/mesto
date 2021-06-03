const nameProfileField = document.querySelector('.profile__name');
const aboutProfileField = document.querySelector('.profile__about');
const profileInfoPopup = initPopup('.popup_type_profile-info', onEditProfileFormSubmit);
const namePopupField = profileInfoPopup.form.querySelector('.popup__text-field_name_name');
const aboutPopupField = profileInfoPopup.form.querySelector('.popup__text-field_name_about');

const elementInfoPopup = initPopup('.popup_type_element-info', onAddElementFormSubmit);
const placeNamePopupField = elementInfoPopup.form.querySelector('.popup__text-field_name_name');
const placeLinkPopupField = elementInfoPopup.form.querySelector('.popup__text-field_name_link');

const previewPopup = initPopup('.popup_type_element-preview');
const previewImage = previewPopup.popup.querySelector('.preview__image');
const previewTitle = previewPopup.popup.querySelector('.preview__title');

const openPopupClass = 'popup_opened';
function openPopup({popup}) {
    if (!popup.classList.contains(openPopupClass)) {
        popup.classList.add(openPopupClass);
    }
}

function closePopup({popup, form}) {
    popup.classList.remove(openPopupClass);
    if (form) {
        form.reset();
    }
}

function initPopup(type, onSubmit){
    const popup = document.querySelector(type);
    const closeButton = popup.querySelector('.popup__close-button');    

    let form;
    if (onSubmit) {
        form = popup.querySelector('.popup__container');
        form.addEventListener('submit', onSubmit);
    }

    closeButton.addEventListener('click', () => closePopup({popup, form}));

    return {popup, form};
}

function openProfileInfoPopup() {
    namePopupField.value = nameProfileField.textContent;
    aboutPopupField.value = aboutProfileField.textContent;
    openPopup(profileInfoPopup);
}

function openElementInfoPopup() { 
    openPopup(elementInfoPopup);
}

function openElementPreviewPopup(name, link) {
    previewTitle.textContent = name;
    previewImage.src = link;
    previewImage.alt = name;
    openPopup(previewPopup);
}

function onEditProfileFormSubmit(evt) {
    evt.preventDefault();
    nameProfileField.textContent = namePopupField.value;
    aboutProfileField.textContent = aboutPopupField.value;
    closePopup(profileInfoPopup);    
}

function onAddElementFormSubmit(evt) {
    evt.preventDefault();
    const place = {
        name: placeNamePopupField.value,
        link: placeLinkPopupField.value,
    };
    insertElements(createElement(place));
    closePopup(elementInfoPopup);
}

function addOnClickAction(selector, onClick) {
    const editProfileButton = document.querySelector(selector);
    editProfileButton.addEventListener('click', onClick);
}

addOnClickAction('.profile__edit-button', openProfileInfoPopup);
addOnClickAction('.profile__add-button', openElementInfoPopup);

const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template').content;

function createElement({name, link}) {
    const element = elementTemplate.querySelector('.element').cloneNode(true);
    const image = element.querySelector('.element__image');
    image.style.backgroundImage = `url('${link}')`;
    element.querySelector('.element__header').textContent = name;
    element.querySelector('.element__like').addEventListener('click', toggleLike);
    element.querySelector('.element__delete').addEventListener('click', removeElement);
    image.addEventListener('click', () => openElementPreviewPopup(name, link))
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