let formElement = document.querySelector('.popup');
let nameInput = document.querySelector('.popup__field-name');
let jobInput = document.querySelector('.popup__field-about');
let profileOpenPopupButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close-icon');
let popupSubmitButton = document.querySelector('.popup__submit-button');
function OpenPopup() {
    formElement.classList.add('popup_opened');
}
function ClosePopup() {
    formElement.classList.remove('popup_opened');
}
function formSubmitHandler(evt) {
    evt.preventDefault();
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__subtitle').textContent = jobInput.value;
    ClosePopup();
}
profileOpenPopupButton.addEventListener('click', OpenPopup);
popupCloseButton.addEventListener('click', ClosePopup);
popupSubmitButton.addEventListener('click', formSubmitHandler);
formElement.addEventListener('submit', formSubmitHandler);