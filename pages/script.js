const profileOpenPopupButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
const popupCloseButton = document.querySelector('.popup__close-icon');
const popupSubmitButton = document.querySelector('.popup__submit-button');

console.log(profileTitle.textContent);
console.log(profileSubtitle.textContent);

function OpenPopup () {
    console.log("Открыть");
    popup.classList.add('popup__open');
}

function ClosePopup () {
    console.log("Закрыть");
    popup.classList.remove('popup__open');
}

function SubmitButton () {
    console.log("Сохранить");
    let popupFieldName = document.getElementsByClassName('.popup__field-name').textContent;
    console.log(popupFieldName.textContent);
    // profileTitle.textContent = '' + popupFieldName.textContent;
    let popupFieldAbout = document.querySelector('.popup__field-about');
    console.log(popupFieldAbout.textContent);
    // profileSubtitle.textContent = '' + popupFieldAbout.textContent;
    
    
    
    // ClosePopup();
}

profileOpenPopupButton.addEventListener('click', OpenPopup);
popupCloseButton.addEventListener('click', ClosePopup);
popupSubmitButton.addEventListener('click', SubmitButton);