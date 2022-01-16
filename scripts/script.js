let popup = document.querySelector('.popup');
let profileEditingForm = document.querySelector('.profile-editing-form');
let nameInput = document.querySelector('.popup__field-name');
let jobInput = document.querySelector('.popup__field-job');
let fieldName = document.querySelector('.profile__title');
let fieldJob = document.querySelector('.profile__subtitle');
let profileOpenPopupButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close-icon');

function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = fieldName.textContent;
    jobInput.value = fieldJob.textContent;
}
function closePopup() {
    popup.classList.remove('popup_opened');
}
function formSubmitHandler(evt) {
    evt.preventDefault();
    fieldName.textContent = nameInput.value;
    fieldJob.textContent = jobInput.value;
    closePopup();
}

profileOpenPopupButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
profileEditingForm.addEventListener('submit', formSubmitHandler);