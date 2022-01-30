let popupEditProfile = document.querySelector('.popup_edit-profile');
let popupAddElement = document.querySelector('.popup_add-element');
let popupOpenImage = document.querySelector('.popup_image');
let profileEditingForm = document.querySelector('.popup__form_profile-editing');
let elementAddForm = document.querySelector('.popup__form_element-add');
let nameInput = document.querySelector('.popup__field_text_name');
let jobInput = document.querySelector('.popup__field_text_job');
let fieldName = document.querySelector('.profile__title');
let fieldJob = document.querySelector('.profile__subtitle');
let profileOpenPopupButton = document.querySelector('.profile__edit-button');
let profileAddButton = document.querySelector('.profile__add-button');
const element = document.querySelector('#element').content;
const elements = document.querySelector('.elements');
let popupEditProfileClose = document.querySelector('.popup_edit-profile_closes');
let popupAddElementClose = document.querySelector('.popup_add-element_closes');
let popupImageClose = document.querySelector('.popup_image_closes');
let item;

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

console.log(initialCards);
// добавление карточек на страницу из начального массива при загрузке
function itemElements() {
  initialCards.forEach(renderElement);
}

function renderElement(item) {
  const newElement = element.cloneNode(true);
  newElement.querySelector('.element__mask-group').src = item.link;
  newElement.querySelector('.element__title').textContent = item.name;
  addElemnt(newElement);
  elements.prepend(newElement);
}

// обработка лайка, удаления карточки и сохранения новой карточки
function addElemnt(item) {
  item.querySelector('.element__del').addEventListener('click', elementDelete);
  item.querySelector('.element__group').addEventListener('click', elementGroup);
  item.querySelector('.element__mask-group').addEventListener('click', openElementMaskGroup);
}

function elementDelete(event) {
  event.target.closest('.element').remove();
}

function elementGroup(event) {
  event.target.classList.toggle('element__group_active');
}

// открытие попапов
//функция открытия popup просмотра фотографии
function openElementMaskGroup (event) {
  //event.target.classList.item('element__mask-group');
  item = event.target.closest('.element');
  const text = item.querySelector('.element__title').textContent;
  let popupImage = document.querySelector('.popup__image');
  popupImage.src = event.srcElement.src;
  let popupTitle = document.querySelector('.popup__image-title');
  popupTitle.textContent = text;
  openPopup(popupOpenImage);
}

// popup редактирование профиля
function openPopupProfile() {
  nameInput.value = fieldName.textContent;
  jobInput.value = fieldJob.textContent;
  openPopup(popupEditProfile);
}

// popup добавление карточки
function openAddPopup() {
  openPopup(popupAddElement);
}

// функция открытия popup
function openPopup(item) {
  item.classList.remove('popup_close');
  item.classList.add('popup_opened');
}

// функция добавления карточки
function addElemntItem(evt) {
  evt.preventDefault();
  let imageInput = document.querySelector('.popup__field_text_image').value;
  let titleInput = document.querySelector('.popup__field_text_title').value;
  initialCards.unshift(
    { 
      name: titleInput, 
      link: imageInput });
  
  renderElement(initialCards[0]);
  closePopup(popupAddElement);
}

//функция закрытия popup
function closePopup() {
  let popup = document.querySelector('.popup_opened');
  popup.classList.add('popup_close');
  popup.classList.remove('popup_opened');
}

//функция сохранения новых значений профиля
function formSubmitHandler(evt) {
  evt.preventDefault();
  fieldName.textContent = nameInput.value;
  fieldJob.textContent = jobInput.value;
  closePopup();
}

itemElements();

profileOpenPopupButton.addEventListener('click', openPopupProfile);
profileAddButton.addEventListener('click', openAddPopup);
elementAddForm.addEventListener('submit', addElemntItem);
profileEditingForm.addEventListener('submit', formSubmitHandler);
popupEditProfileClose.addEventListener('click', closePopup);
popupAddElementClose.addEventListener('click', closePopup);
popupImageClose.addEventListener('click', closePopup);




