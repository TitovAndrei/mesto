let popupEditProfile = document.querySelector('.popup_edit-profile');
let popupAddElement = document.querySelector('.popup_add-element');
let profileEditingForm = document.querySelector('.popup__profile-editing-form');
let nameInput = document.querySelector('.popup__field_text_name');
let jobInput = document.querySelector('.popup__field_text_job');
let fieldName = document.querySelector('.profile__title');
let fieldJob = document.querySelector('.profile__subtitle');
let profileOpenPopupButton = document.querySelector('.profile__edit-button');
let profileAddButton = document.querySelector('.profile__add-button');
let popupCloseButton = document.querySelector('.popup__close-icon');
const element = document.querySelector('#element').content;
const elements = document.querySelector('.elements');
let buttomDelElement = document.querySelector('.element__del');

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

function itemElements() {
  initialCards.forEach(renderElement);
}

function renderElement(itemElement) {

  const newElement = element.cloneNode(true);

  newElement.querySelector('.element__mask-group').src = itemElement.link;
  newElement.querySelector('.element__title').textContent = itemElement.name;

  addElemnt(newElement);
  elements.append(newElement);

}

function addElemnt(li) {
  li.querySelector('.element__del').addEventListener('click', elementDelete);
  li.querySelector('.element__group').addEventListener('click', elementGroup);
  // li.querySelector('.profile__add-button').addEventListener('click', elementEdit);
}

function elementEdit() {

}

function elementGroup(event) {
  event.target.classList.toggle('element__group_active');
}

function openPopupProfile() {
  nameInput.value = fieldName.textContent;
  jobInput.value = fieldJob.textContent;
  openPopup(popupEditProfile);
}

function openAddPopup() {
  openPopup(popupAddElement);
}

function elementDelete(event) {
  event.target.closest('.element').remove();
}

function openPopup(li) {
  li.classList.add('popup_opened');
}

function closePopup() {
  let popup = document.querySelector('.popup');
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  fieldName.textContent = nameInput.value;
  fieldJob.textContent = jobInput.value;
  closePopup();
}

function formAddElement(evt) {
  evt.preventDefault();
 
  closePopup();
}

itemElements();

profileOpenPopupButton.addEventListener('click', openPopupProfile);
profileAddButton.addEventListener('click', openAddPopup);
profileEditingForm.addEventListener('submit', formSubmitHandler);
popupCloseButton.addEventListener('click', closePopup);


