import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const popups = document.querySelectorAll('.popup')
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddElement = document.querySelector('.popup_add-element');
const popupOpenImage = document.querySelector('.popup_image');
const elementAddForm = document.querySelector('.popup__form_element-add');
const nameInput = document.querySelector('.popup__field_text_name');
const jobInput = document.querySelector('.popup__field_text_job');
const popupEditProfileClose = document.querySelector('.popup__close-icon_edit-profile');
const popupAddElementClose = document.querySelector('.popup__close-icon_add-element');
const popupImageClose = document.querySelector('.popup__close-icon_image');
const imageInput = document.querySelector('.popup__field_text_image');
const titleInput = document.querySelector('.popup__field_text_title');
const fieldName = document.querySelector('.profile__title');
const fieldJob = document.querySelector('.profile__subtitle');
const profileOpenPopupButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const elements = document.querySelector('.elements');
const cardTemplate = document.getElementById('element');

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

function popupValidation(item) {
  const validity = new FormValidator(validitySelectors, item);
  validity.enableValidation();
}

function resetValidation(item) {
  const validity = new FormValidator(validitySelectors, item);
  validity.resetValidation();
}

// добавление карточек на страницу из начального массива при загрузке
function renderCards(cards) {
  elements.prepend(cards);
}

function createCard(item) {
  item.forEach((cards) => {
    cards.template = cardTemplate;
    const card = new Card(cards.name, cards.link, cards.template);
    const cardElement = card.generateCard();
    return renderCards(cardElement);
  });
}

// popup редактирование профиля
function openPopupProfile() {
  nameInput.value = fieldName.textContent;
  jobInput.value = fieldJob.textContent;
  openPopup(popupEditProfile);
  resetValidation(popupEditProfile);
}

function openPopupAdd() {
  openPopup(popupAddElement);
  resetValidation(popupAddElement);
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
    })
  })
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
  createCard(cardData);
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

createCard(initialCards);
popupValidation(popupEditProfile);
popupValidation(popupAddElement);

profileOpenPopupButton.addEventListener('click', openPopupProfile);
profileAddButton.addEventListener('click', openPopupAdd);
elementAddForm.addEventListener('submit', setElemntItem);
popupEditProfile.addEventListener('submit', handleProfileFormSubmit);
popupEditProfileClose.addEventListener('click', setPopupListeners(popupEditProfile));
popupAddElementClose.addEventListener('click', setPopupListeners(popupAddElement));
popupImageClose.addEventListener('click', setPopupListeners(popupOpenImage));

export {openPopup}