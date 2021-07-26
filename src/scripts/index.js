import FormValidator from "./components/FormValidator.js";
import Card from "./components/Card.js";
import Section from "./components/Section.js";
import { validationSettings, elementTemplate, userInfoSelectors } from "./constants.js";
import '../pages/index.css';

import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import Api from "./components/Api.js"
import SubmitPopup from "./components/SubmitPopup.js";

const api = new Api({ 
    baseUri: 'https://nomoreparties.co/v1/cohort-26', 
    authToken: 'e9c41e78-4da5-45a9-a519-987aa0bd1bef'
});

const submitPopup = new SubmitPopup('.popup_type_submit');

function onDeleteCardClick(card) {
    submitPopup.open(() => {
        api.deleteCard(card.id).then(() => {
            card.remove()
        })
        .catch(onApiError)
        .finally(() => submitPopup.close());
    });
}

function onLikeCardClick(card) {
    api.toggleLike(card.id, card.likeIsActive).then(newCard => {
        card.toggleLike();
        card.setLikesCount(newCard.likes.length);
    })
    .catch(onApiError);
}

function addOnClickAction(selector, onClick) {
    const editProfileButton = document.querySelector(selector);
    editProfileButton.addEventListener('click', onClick);
}

function onApiError(err) {
    console.log(err)
}

function orderedByCreationDate(cards) {
    return cards.sort((card1, card2) => {
        if (card1.createdAt < card2.createdAt)
            return -1;
        if (card1.createdAt > card2.createdAt)
            return 1;
        return 0;
    });
}

function getCardData(card, userInfo){
    return {
        name: card.name,
        link: card.link,
        createdAt: Date.parse(card.createdAt),
        likesCount: card.likes.length,
        likeIsActive: card.likes.some(l => l._id ===  userInfo.id),
        deleteEnabled: card.owner._id === userInfo.id,
        id: card._id
    }
}

const userInfoPromise = api.getUserInfo()
.then(userInfo => {
    return new UserInfo(userInfo, userInfoSelectors)
});

userInfoPromise
.then(userInfo => {
    const profileInfoForm = document.forms['profile-info'];
    const profileInfoValidator = new FormValidator(validationSettings, profileInfoForm);
    const profileInfoPopup = new PopupWithForm('.popup_type_profile-info', onEditProfileFormSubmit);

    function openProfileInfoPopup() {
        profileInfoPopup.open(userInfo.getUserInfo());
        profileInfoValidator.clearValidations();
    }

    function onEditProfileFormSubmit(newUserInfo) {
        api.setUserInfo(newUserInfo)
        .then(newInfo => {
            userInfo.setUserInfo(newInfo);            
        })
        .catch(onApiError)
        .finally(() => profileInfoPopup.close());        
    }   

    addOnClickAction('.profile__edit-button', openProfileInfoPopup);
    profileInfoValidator.enableValidations();
    
    return userInfo;
})
.then(userInfo => {
    const avatarInfoForm = document.forms['avatar'];
    const avatarValidator = new FormValidator(validationSettings, avatarInfoForm);
    const avatarPopup = new PopupWithForm('.popup_type_avatar', onEditAvatarFormSubmit);

    function openAvatarPopup() {
        avatarPopup.open(userInfo.getAvatar());
        avatarValidator.clearValidations();
    }

    function onEditAvatarFormSubmit(newAvatar) {
        api.setAvatar(newAvatar)
        .then(newAvatar => {
            userInfo.setAvatar(newAvatar);            
        })
        .catch(onApiError)
        .finally(() => avatarPopup.close());        
    }

    addOnClickAction('.avatar__edit-button', openAvatarPopup);
    avatarValidator.enableValidations();

    return userInfo;
});

const cardsPromise = api.getInitialCards();

Promise.all([userInfoPromise, cardsPromise])
.then (results => {
    const userInfo = results[0];
    const cards = results[1];    

    return {
        cards: cards.map(c => getCardData(c, userInfo)),
        me: userInfo
    };
})
.then(({cards, me}) => {
    const addElementForm = document.forms['add-element'];
    const addElementValidator = new FormValidator(validationSettings, addElementForm);

    const popupWithImage = new PopupWithImage('.popup_type_element-preview');
    const elementInfoPopup = new PopupWithForm('.popup_type_element-info', onAddElementFormSubmit);
    
    const elementsSection = new Section({
        items: orderedByCreationDate(cards),
        renderer: (data) => {
            return new Card(data, elementTemplate, {
                onClick: (name, link) => popupWithImage.open(name, link),
                onDeleteClick: onDeleteCardClick,
                onLikeClick: onLikeCardClick   
            })
            .build();
        }
    }, '.elements');

    function onAddElementFormSubmit(newPlace) {
        api.createCard(newPlace)
        .then(newCard => {
            elementsSection.addItem(getCardData(newCard, me));    
        })
        .catch(onApiError)
        .finally(() => elementInfoPopup.close());    
    }

    function openElementInfoPopup() {
        addElementValidator.clearValidations();
        elementInfoPopup.open();
    }

    addOnClickAction('.profile__add-button', openElementInfoPopup);
    addElementValidator.enableValidations();
    elementsSection.render();
})
.catch(onApiError);