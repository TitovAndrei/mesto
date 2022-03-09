import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const popups = document.querySelectorAll('.popup')
const elements = document.querySelector('.elements');
const cardTemplate = document.getElementById('element');
const profileOpenPopupButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const fieldName = document.querySelector('.profile__title');
const fieldJob = document.querySelector('.profile__subtitle');

const imagePopup = document.querySelector('.popup_image');
const popupTitle = imagePopup.querySelector('.popup__image-title');
const popupImage = imagePopup.querySelector('.popup__image');

const popupEditProfile = document.querySelector('.popup_edit-profile');
const nameInput = popupEditProfile.querySelector('.popup__field_text_name');
const jobInput = popupEditProfile.querySelector('.popup__field_text_job');

const popupAddElement = document.querySelector('.popup_add-element');
const imageInput = popupAddElement.querySelector('.popup__field_text_image');
const titleInput = popupAddElement.querySelector('.popup__field_text_title');
const elementAddForm = popupAddElement.querySelector('.popup__form_element-add');

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

// добавление карточек на страницу из начального массива при загрузке
function renderCards(cards) {
  cards.forEach((item) => {
    const cardElement = createCard(item);
    elements.prepend(cardElement);
  });
}

function createCard(cardElement) {
  const card = new Card(cardElement.name, cardElement.link, cardTemplate, handleCardClick);
  return card.generateCard();
}

// popup редактирование профиля
function openPopupProfile() {
  nameInput.value = fieldName.textContent;
  jobInput.value = fieldJob.textContent;
  openPopup(popupEditProfile);
  formValidators['profile-editing-form'].resetValidation();
}

function openPopupAdd() {
  openPopup(popupAddElement);
  formValidators['element-add-form'].resetValidation();
}

// функция открытия popup
function openPopup(item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscapeKey);
}

//функция закрытия popup
function closePopup(item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscapeKey);
}

// функция определения элемента закрывающего popup
function setPopupListeners() {
  popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close-icon')) {
        closePopup(popup)
      }
    });
  });
}

//функция закрытия popup по клавише Escape
const handleEscapeKey = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

// функция добавления карточки
function setElemntItem(evt) {
  evt.preventDefault();
  const cardData =
    [{
      name: titleInput.value,
      link: imageInput.value
    }];
  renderCards(cardData);
  evt.target.reset();
  const item = evt.target.closest('.popup_opened');
  closePopup(item);
}

//функция сохранения новых значений профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  fieldName.textContent = nameInput.value;
  fieldJob.textContent = jobInput.value;
  const item = evt.target.closest('.popup_opened');
  closePopup(item);
}

function handleCardClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupTitle.textContent = this._name;
  openPopup(imagePopup);
}

renderCards(initialCards);
setPopupListeners()

profileOpenPopupButton.addEventListener('click', openPopupProfile);
profileAddButton.addEventListener('click', openPopupAdd);
elementAddForm.addEventListener('submit', setElemntItem);
popupEditProfile.addEventListener('submit', handleProfileFormSubmit);