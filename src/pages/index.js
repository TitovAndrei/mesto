import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
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

let miUserId;

const userInfo = new UserInfo(userInformation);

// загрузка информации о профиле с сревера
api.getProfileInformation()
  .then(res => {
    const profileInformation =
    {
      about: res.about,
      avatar: res.avatar,
      name: res.name,
      Id: res._id
    };
    setProfile(profileInformation);
    miUserId = profileInformation.Id;
  })

function setProfile(obj) {
  userInfo.setUserInfo({ name: obj.name, about: obj.about });
  userInfo.setUserAvatar({ avatar: obj.avatar });
}

// попап редактирования аватара
const popupWithAvatar = new PopupWithForm(
  {
    selectorPopup: popupEditAvatarSelector,
    handleForm: (evt, inputValues) => {
      evt.preventDefault();
      popupWithAvatar.savesForm(true);
      api.setAvatar(inputValues.field_image)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          else {
            return Promise.reject(res.status);
          }
        })
        .then((res) => {
          userInfo.setUserAvatar({ avatar: res.avatar });
          popupWithAvatar.close();
        })
        .catch((res) => {
          return Promise.reject(`Что-то пошло не так: ${res}`);
        })
        .finally(() => {
          popupWithAvatar.savesForm(false);
        })
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
      popupWithProfile.savesForm(true);
      api.setProfileInformation(inputValues.name, inputValues.about)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          else {
            return Promise.reject(res.status);
          }
        })
        .then((res) => {
          userInfo.setUserInfo({ name: res.name, about: res.about });
          popupWithProfile.close();
        })
        .catch((res) => {
          return Promise.reject(`Что-то пошло не так: ${res}`);
        })
        .finally(() => {
          popupWithProfile.savesForm(false);
        })
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


// загрузка карточек с сервера
api.getInitialCards(miUserId)
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
      renderCards(cardsElrments, miUserId)
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
function renderCards(cards, miUserId) {
  const section = new Section({ items: cards, miUserId, renderer: createCard }, 'element');
  return section.renderer();
}

const popupDeleteElement = new PopupWithConfirmation(
  {
    selectorPopup: popupDeleteElementSelector,
    handleForm: (cardId, cardElement) => {
      api.deleteInitialCards(cardId);
      popupDeleteElement.close();
      cardElement.remove();
    }
  });

popupDeleteElement.setEventListeners();

function createCard(name, link, cardId, likes, owner, miUserId, templateSelector) {
  const card = new Card({
    card: {
      name,
      link,
      cardId,
      likes,
      owner,
    },
    miUserId,
    templateSelector,
    handleCardClick,
    likesAdd,
    likesDelete,
    handleDeleteCardClick: (cardId, cardsElrment) => {
      popupDeleteElement.submitDeletePopup(cardId, cardsElrment);
      popupDeleteElement.open();
    }
  });
  return card.generateCard();
}

// попап открытия карточки

const popupWithImage = new PopupWithImage(popupImageSelector);
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  return popupWithImage.open(name, link);
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
      popupWithElement.savesForm(true);
      const cardData =
        [{
          name: inputValues.field_title,
          link: inputValues.field_image
        }];
      api.createInitialCards(cardData[0].name, cardData[0].link)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          else {
            return Promise.reject(res.status);
          }
        })
        .then((res) => {
          const cardsElrments =
            [{
              name: res.name,
              link: res.link,
              cardId: res._id,
              likes: res.likes,
              owner: res.owner
            }];
          renderCards(cardsElrments, miUserId);
          popupWithElement.close();
        })
        .catch((res) => {
          return Promise.reject(`Что-то пошло не так: ${res}`);
        })
        .finally(() => {
          popupWithElement.savesForm(false);
        })
    }
  });

popupWithElement.setEventListeners();

function openPopupAdd() {
  formValidators['element-add-form'].resetValidation();
  return popupWithElement.open();
}

profileOpenPopupButton.addEventListener('click', openPopupProfile);
profileAddButton.addEventListener('click', openPopupAdd);
profileAvatarButton.addEventListener('click', openPopupAvatar);