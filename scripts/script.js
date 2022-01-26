let popup = document.querySelector('.popup');
let profileEditingForm = document.querySelector('.popup__profile-editing-form');
let nameInput = document.querySelector('.popup__field_text_name');
let jobInput = document.querySelector('.popup__field_text_job');
let fieldName = document.querySelector('.profile__title');
let fieldJob = document.querySelector('.profile__subtitle');
let profileOpenPopupButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close-icon');

const initialCards = [
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

