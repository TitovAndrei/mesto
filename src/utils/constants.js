const profileOpenPopupButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const fieldName = document.querySelector('.popup__field_text_name');
const fieldJob = document.querySelector('.popup__field_text_job');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddElement = document.querySelector('.popup_add-element');

const userInformation = {
  nameSelector: '.profile__title',
  jobSelector: '.profile__subtitle'
}

const validitySelectors = {
  inputSelector: '.popup__input',
  formSelector: '.popup__form',
  fieldSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  errorSelector: '.popup__field-error',
  inactiveButtonClass: 'popup__submit-button_disabled',
  fieldErrorClass: 'popup__field_type_error'
};

//Начальный массив карточек
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

const formValidators = {
  popupEditProfile,
  popupAddElement
}

export { profileOpenPopupButton, profileAddButton, fieldName, fieldJob, popupEditProfile, popupAddElement, validitySelectors, initialCards, formValidators, userInformation } 