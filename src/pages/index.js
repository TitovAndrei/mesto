import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api';
import {
  profileOpenPopupButton, profileAddButton, fieldName, fieldAbout,
  validitySelectors, formValidators, userInformation,
  popupEditProfileSelector, popupAddElementSelector, popupImageSelector,
  popupEditAvatarSelector, profileAvatarButton, popupDeleteElementSelector,
  popupFieldTextImageAvatar
}
  from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: 'cfccdf28-17f4-49fe-948e-39de7683954d',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo(userInformation);

// загрузка карточек с сервера
api.getInitialCards()
  .then(res => {
    res.forEach((cards) => {
      const cardsElrments =
        [{
          name: cards.name,
          link: cards.link,
          cardId: cards._id,
          likes: cards.likes,
          owner: cards.owner
        }];
      renderCards(cardsElrments)
    })
  })

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

// добавление карточек
function renderCards(cards) {
  const section = new Section({ items: cards, renderer: createCard }, 'element');
  return section.renderer();
}

function createCard(name, link, cardId, likes, owner, container) {
  const card = new Card(name, link, container, handleCardClick, openPopupDeleteElement, cardId, likes, owner, likesAdd, likesDelete);
  return card.generateCard();
}

// попап открытия карточки
function handleCardClick(item, name, link) {
  const popupWithImage = new PopupWithImage(popupImageSelector, name, link);
  popupWithImage.setEventListeners();
  return popupWithImage.open();
}

// простановка и удаление лайков
function likesAdd(cardId) {
  api.setLikesCards(cardId);
}

function likesDelete(cardId) {
  api.deleteLikesCards(cardId);
}

// попап добавления карточки
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
      api.createInitialCards(cardData[0].name, cardData[0].link)
      popupWithElement.savesForm();
      setTimeout(function () {
        location.reload();
      }, 1000);
    }
  });

popupWithElement.setEventListeners();

function openPopupAdd() {
  formValidators['element-add-form'].resetValidation();
  return popupWithElement.open();
}

// попап удаления карточки
function openPopupDeleteElement(_cardId) {
  const popupDeleteElement = new PopupWithForm(
    {
      selectorPopup: popupDeleteElementSelector,
      handleForm: (evt) => {
        evt.preventDefault();
        api.deleteInitialCards(_cardId);
        popupDeleteElement.close();
        setTimeout(function () {
          location.reload();
        }, 1000);
      }
    });
  popupDeleteElement.setEventListeners();
  return popupDeleteElement.open();
}

// загрузка информации о профиле с сревера
api.getProfileInformation()
  .then(res => {
    const profileInformation =
    {
      about: res.about,
      avatar: res.avatar,
      name: res.name,
      id: res._id
    };
    getProfile(profileInformation);
  })

function getProfile(obj) {
  userInfo.setUserInfo({ name: obj.name, about: obj.about });
  userInfo.setUserAvatar({ avatar: obj.avatar });
}

// попап редактирования аватара
const popupWithAvatar = new PopupWithForm(
  {
    selectorPopup: popupEditAvatarSelector,
    handleForm: (evt, inputValues) => {
      evt.preventDefault();
      api.setAvatar(inputValues.field_image);
      popupWithAvatar.savesForm();
      setTimeout(function () {
        popupWithAvatar.close();
        location.reload();
      }, 1000);
    }
  });

popupWithAvatar.setEventListeners();

function openPopupAvatar() {
  getAvatar(userInfo.getUserAvatar());
  formValidators['element-edit-avatar'].resetValidation();
  return popupWithAvatar.open();
}

function getAvatar(obj) {
  popupFieldTextImageAvatar.value = obj.link;
}

// попап редактирования профиля
const popupWithProfile = new PopupWithForm(
  {
    selectorPopup: popupEditProfileSelector,
    handleForm: (evt, inputValues) => {
      evt.preventDefault();
      api.setProfileInformation(inputValues.name, inputValues.about);
      popupWithProfile.savesForm();
      setTimeout(function () {
        popupWithProfile.close()
        location.reload();
      }, 1000);
    }
  });

popupWithProfile.setEventListeners();

function openPopupProfile() {
  getProfileInfo(userInfo.getUserInfo());
  formValidators['profile-editing-form'].resetValidation();
  return popupWithProfile.open();
}

function getProfileInfo(obj) {
  fieldName.value = obj.name;
  fieldAbout.value = obj.about;
}

profileOpenPopupButton.addEventListener('click', openPopupProfile);
profileAddButton.addEventListener('click', openPopupAdd);
profileAvatarButton.addEventListener('click', openPopupAvatar);