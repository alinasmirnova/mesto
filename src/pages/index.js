import FormValidator from "../scripts/components/FormValidator.js";
import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import { validationSettings, elementTemplate, userInfoSelectors } from "../scripts/constants.js";
import './index.css';

import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from "../scripts/components/Api.js"
import SubmitPopup from "../scripts/components/SubmitPopup.js";

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
        .then(_ => submitPopup.close())
        .catch(onApiError);
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
        if (card1.createdAt < card2.createdAt) {
            return -1;
        }
        if (card1.createdAt > card2.createdAt) {
            return 1;
        }
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

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then (results => {
    const userInfo = new UserInfo(results[0], userInfoSelectors);
    const cards = results[1];    

    return {
        cards: cards.map(c => getCardData(c, userInfo)),
        me: userInfo
    };
})
.then(res => {
    const userInfo = res.me;
    const profileInfoForm = document.forms['profile-info'];
    const profileInfoValidator = new FormValidator(validationSettings, profileInfoForm);
    const profileInfoPopup = new PopupWithForm('.popup_type_profile-info', onEditProfileFormSubmit);

    function openProfileInfoPopup() {
        profileInfoPopup.open(userInfo.getUserInfo());
        profileInfoValidator.clearValidations();
    }

    function onEditProfileFormSubmit(newUserInfo) {
        profileInfoValidator.disableSubmitButton();

        api.setUserInfo(newUserInfo)
        .then(newInfo => {
            userInfo.setUserInfo(newInfo);            
        })
        .then(_ => profileInfoPopup.close())
        .catch(onApiError)
        .finally(() => profileInfoValidator.enableSubmitButton());        
    }   

    addOnClickAction('.profile__edit-button', openProfileInfoPopup);
    profileInfoValidator.enableValidations();
    
    return res;
})
.then(res => {
    const userInfo = res.me;
    const avatarInfoForm = document.forms['avatar'];
    const avatarValidator = new FormValidator(validationSettings, avatarInfoForm);
    const avatarPopup = new PopupWithForm('.popup_type_avatar', onEditAvatarFormSubmit);

    function openAvatarPopup() {
        avatarPopup.open(userInfo.getAvatar());
        avatarValidator.clearValidations();
    }

    function onEditAvatarFormSubmit(newAvatar) {
        avatarValidator.disableSubmitButton();

        api.setAvatar(newAvatar)
        .then(newAvatar => {
            userInfo.setAvatar(newAvatar);            
        })
        .then(_ => avatarPopup.close())
        .catch(onApiError)
        .finally(() => avatarValidator.enableSubmitButton());        
    }

    addOnClickAction('.avatar__edit-button', openAvatarPopup);
    avatarValidator.enableValidations();

    return res;
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
        addElementValidator.disableSubmitButton();

        api.createCard(newPlace)
        .then(newCard => {
            elementsSection.addItem(getCardData(newCard, me));    
        })
        .then(_ => elementInfoPopup.close())
        .catch(onApiError)
        .finally(() => addElementValidator.enableSubmitButton());    
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