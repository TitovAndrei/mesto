const profileOpenPopupButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileAvatarButton = document.querySelector('.profile__avatar-button');
const fieldName = document.querySelector('.popup__field_text_name');
const fieldAbout = document.querySelector('.popup__field_text_about');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddElement = document.querySelector('.popup_add-element');
const popupDeleteElement = document.querySelector('.popup_delete-element');
const popupEditAvatar = document.querySelector('.popup_edit-avatar');
const elementGroupNumber = document.querySelector('.element__group_number');
const profileImage = document.querySelector('.profile__image');
const popupFieldTextImageAvatar = document.querySelector('.popup__field_text_image-avatar');
const constainerSelector = document.querySelector('.elements');
const element = document.getElementById('element');

const popupEditProfileSelector = '.popup_edit-profile';
const popupAddElementSelector = '.popup_add-element';
const popupImageSelector = '.popup_image';
const popupDeleteElementSelector = '.popup_delete-element';
const popupEditAvatarSelector = '.popup_edit-avatar';

const userInformation = {
  nameSelector: '.profile__title',
  aboutSelector: '.profile__subtitle',
  avatarSelector: '.profile__image'
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

const formValidators = {
  popupEditProfile,
  popupAddElement
}

export {
  profileOpenPopupButton, profileAddButton, fieldName, fieldAbout, popupEditProfile,
  popupAddElement, validitySelectors, formValidators, userInformation,
  popupEditProfileSelector, popupAddElementSelector, popupImageSelector, profileAvatarButton,
  elementGroupNumber, popupDeleteElement, popupEditAvatar, popupDeleteElementSelector,
  popupEditAvatarSelector, profileImage, popupFieldTextImageAvatar, constainerSelector, element
} 