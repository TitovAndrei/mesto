const profileOpenPopupButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-icon');
const popupSubmitButton = document.querySelector('.popup__submit-button');

function OpenPopup() {
    console.log("Открыть");
    popup.classList.add('popup__open');
}

function ClosePopup() {
    console.log("Закрыть");
    popup.classList.remove('popup__open');
}

function SubmitButton() {
    console.log("Сохранить");
    let popupFieldName = document.querySelector('.popup__field-name').value;
    console.log(popupFieldName);
    document.querySelector('.profile__title').textContent = popupFieldName;

    let popupFieldAbout = document.querySelector('.popup__field-about').value;
    console.log(popupFieldAbout);
    document.querySelector('.profile__subtitle').textContent = popupFieldAbout;

    ClosePopup();
}

profileOpenPopupButton.addEventListener('click', OpenPopup);
popupCloseButton.addEventListener('click', ClosePopup);
popupSubmitButton.addEventListener('click', SubmitButton);