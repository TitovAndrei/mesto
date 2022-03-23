import './index.css';
import { Card } from '../scripts/Card.js';
import { FormValidator } from '../scripts/FormValidator.js';
import { Section } from '../scripts/Section.js';
import { Popup } from '../scripts/Popup.js';
import { PopupWithImage } from '../scripts/PopupWithImage.js';
import { PopupWithForm } from '../scripts/PopupWithForm.js';
import { UserInfo } from '../scripts/UserInfo.js';
import { profileOpenPopupButton, profileAddButton, fieldName, fieldJob, popupEditProfile, popupAddElement, validitySelectors, initialCards, formValidators, userInformation }
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

// popup редактирование профиля
function openPopupProfile() {
  const userInfo = new UserInfo(userInformation);
  userInfo.setUserInfo(userInfo.getUserInfo());
  const popupWithForm = new PopupWithForm(
    {
      selectorPopup: popupEditProfile,
      handleForm: (inputValues) => {
        userInfo.setUserInfo({ name: inputValues.field_name, job: inputValues.field_job });
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
        popupWithForm.close(popupAddElement);
      }
    });
  formValidators['element-add-form'].resetValidation();
  return popupWithForm.open();
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
