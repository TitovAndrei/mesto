import './index.css';
import { Card } from '../scripts/Card.js';
import { FormValidator } from '../scripts/FormValidator.js';
import { Section } from '../scripts/Section.js';
import { PopupWithImage } from '../scripts/PopupWithImage.js';
import { PopupWithForm } from '../scripts/PopupWithForm.js';
import { UserInfo } from '../scripts/UserInfo.js';
import {
  profileOpenPopupButton, profileAddButton, fieldName, fieldJob,
  validitySelectors, initialCards, formValidators, userInformation,
  popupEditProfileSelector, popupAddElementSelector, popupImageSelector
}
  from '../utils/constants.js';

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
  const section = new Section({ items: cards, renderer: createCard }, 'element');
  return section.renderer();
}

function createCard(name, link, container) {
  const card = new Card(name, link, container, handleCardClick);
  return card.generateCard();
}

const popupWithProfile = new PopupWithForm(
  {
    selectorPopup: popupEditProfileSelector,
    handleForm: (evt, inputValues) => {
      evt.preventDefault();
      const userInfo = new UserInfo(userInformation);
      userInfo.setUserInfo({ name: inputValues.field_name, job: inputValues.field_job });
      popupWithProfile.close();
    }
  });

popupWithProfile.setEventListeners();

function openPopupProfile() {
  const userInfo = new UserInfo(userInformation);
  getProfileInfo(userInfo.getUserInfo());
  formValidators['profile-editing-form'].resetValidation();
  return popupWithProfile.open();
}

function getProfileInfo(obj) {
  fieldName.value = obj.name;
  fieldJob.value = obj.job;
}

const popupWithElement = new PopupWithForm(
  {
    selectorPopup: popupAddElementSelector,
    handleForm: (evt, inputValues) => {
      evt.preventDefault();
      const cardData =
        [{
          name: inputValues.field_title,
          link: inputValues.field_image
        }];
      renderCards(cardData);
      popupWithElement.close();
    }
  });

popupWithElement.setEventListeners();

function openPopupAdd() {
  formValidators['element-add-form'].resetValidation();
  return popupWithElement.open();
}

function handleCardClick(item, name, link) {
  const popupWithImage = new PopupWithImage(popupImageSelector, name, link);
  popupWithImage.setEventListeners();
  return popupWithImage.open();
}

renderCards(initialCards);

profileOpenPopupButton.addEventListener('click', openPopupProfile);
profileAddButton.addEventListener('click', openPopupAdd);
