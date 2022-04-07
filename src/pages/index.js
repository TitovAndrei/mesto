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

Promise.all([api.getProfileInformation(), api.getInitialCards()])
  .then(([userData, cards]) => {
    const profileInformation =
    {
      about: userData.about,
      avatar: userData.avatar,
      name: userData.name,
      Id: userData._id
    };
    setProfile(profileInformation);
    miUserId = profileInformation.Id;
    renderCards(cards, miUserId);
  })
  .catch((err) => {
    console.log(err);
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
      popupWithAvatar.renderLoading(true);
      api.setAvatar(inputValues.field_image)
        .then((res) => {
          userInfo.setUserAvatar({ avatar: res.avatar });
          popupWithAvatar.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupWithAvatar.renderLoading(false);
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
      popupWithProfile.renderLoading(true);
      api.setProfileInformation(inputValues.name, inputValues.about)
        .then((res) => {
          userInfo.setUserInfo({ name: res.name, about: res.about });
          popupWithProfile.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupWithProfile.renderLoading(false);
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

const section = new Section(createCard);

// подготовка карточек
function renderCards(items, miUserId) {
  return section.renderer(items, miUserId);
}

// попап удаления карточек
const popupDeleteElement = new PopupWithConfirmation(
  {
    selectorPopup: popupDeleteElementSelector,
    handleForm: (cardId, cardElement) => {
      api.deleteInitialCards(cardId)
        .then((res) => {
          cardElement.remove();
          popupDeleteElement.close();
        })
        .catch((err) => {
          console.log(err);
        })
    }
  });

popupDeleteElement.setEventListeners();

// создание карточек
function createCard(item, element, miUserId) {
  const card = new Card({
    item,
    miUserId,
    element,
    handleCardClick,
    handleDeleteCardClick: (cardId, cardsElement) => {
      popupDeleteElement.submitDeletePopup(cardId, cardsElement);
      popupDeleteElement.open();
    },
    handleLike,
    handleRemoveLike
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

function handleLike(card) {
  api.setLikesCards(card._cardId)
    .then((res) => {
      card.updateLikes(res)
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleRemoveLike(card) {
  api.deleteLikesCards(card._cardId)
    .then((res) => {
      card.deleteLikes(res)
    })
    .catch((err) => {
      console.log(err);
    });
}

// попап добавления карточки
const popupWithElement = new PopupWithForm(
  {
    selectorPopup: popupAddElementSelector,
    handleForm: (evt, inputValues) => {
      evt.preventDefault();
      popupWithElement.renderLoading(true);
      const cardData =
        [{
          name: inputValues.field_title,
          link: inputValues.field_image
        }];
      api.createInitialCards(cardData[0].name, cardData[0].link)
        .then((res) => {
          const cardsElements =
            [{
              name: res.name,
              link: res.link,
              _id: res._id,
              likes: res.likes,
              owner: res.owner
            }];
          miUserId = res.owner._id;
          renderCards(cardsElements, miUserId);
          popupWithElement.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupWithElement.renderLoading(false);
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