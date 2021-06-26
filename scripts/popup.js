const openPopupClass = 'popup_opened';
function openPopup(popup) {
    if (!popup.classList.contains(openPopupClass)) {
        popup.classList.add(openPopupClass);
        enableClosePopupOnEsc();
    }
}

function closePopup(popup) {
    if (popup.classList.contains(openPopupClass)) {
        popup.classList.remove(openPopupClass);
        disableClosePopupOnEsc();  
    }
}

function enableClosePopupOnEsc() {
    document.addEventListener('keydown', closePopupOnEsc);
}

function disableClosePopupOnEsc() {
    document.removeEventListener('keydown', closePopupOnEsc);
}

function closePopupOnEsc(evt) {
    if(evt.key === 'Escape'){
        evt.preventDefault();
        const popup = document.querySelector(`.${openPopupClass}`);
        closePopup(popup);
    }
}

function initPopup(type){
    const popup = document.querySelector(type);
    const closeButton = popup.querySelector('.popup__close-button');    
    closeButton.addEventListener('click', () => closePopup(popup));
    
    const popupContent = popup.querySelector('.popup__content');
    popupContent.addEventListener('click', evt => evt.stopPropagation());
    popup.addEventListener('click', () => closePopup(popup));

    return popup;
}

export {openPopup, closePopup, initPopup}