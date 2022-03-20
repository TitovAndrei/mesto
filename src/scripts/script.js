import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { Popup } from './Popup.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';

const cardTemplate = document.getElementById('element');
const profileOpenPopupButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const fieldName = document.querySelector('.profile__title');
const fieldJob = document.querySelector('.profile__subtitle');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddElement = document.querySelector('.popup_add-element');


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

const userInfo = new UserInfo({name: fieldName, job: fieldJob});


// Включение валидации
const enableValidation = (validitySelectors) => {
  const formList = Array.from(document.querySelectorAll(validitySelectors.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(validitySelectors, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validitySelectors);

function renderCards(cards) {
  const section = new Section(cards, createCard, 'element');
  return section.renderer();
}

function createCard(cardElement) {
  const card = new Card(cardElement.name, cardElement.link, cardTemplate, handleCardClick);
  return card.generateCard();
}

// popup редактирование профиля
function openPopupProfile() {
  const popupWithForm = new PopupWithForm(
    {
      selectorPopup: popupEditProfile,
      handleForm: (inputValues) => {
        userInfo.setUserInfo({name: inputValues.field_name, job: inputValues.field_job})
        closePopup(popupEditProfile);
      }
    });
  formValidators['profile-editing-form'].resetValidation();
  return popupWithForm.open();
}

function openPopupAdd() {
  const popupWithForm = new PopupWithForm(
    {
      selectorPopup: popupAddElement,
      handleForm: (inputValues) => {
        const cardData =
          [{
            name: inputValues.field_title,
            link: inputValues.field_image
          }];
        renderCards(cardData);
        closePopup(popupAddElement);
      }
    });
  formValidators['element-add-form'].resetValidation();
  return popupWithForm.open();
}

// функция открытия popup
function openPopup(item) {
  const popup = new Popup(item);
  return popup.open();
}

//функция закрытия popup
function closePopup(item) {
  const popup = new Popup(item);
  return popup.close();
}

function handleCardClick(item, name, link) {
  const popupWithImage = new PopupWithImage(item, name, link);
  return popupWithImage.open();
}

renderCards(initialCards);

profileOpenPopupButton.addEventListener('click', openPopupProfile);
profileAddButton.addEventListener('click', openPopupAdd);
