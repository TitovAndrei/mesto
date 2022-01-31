const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddElement = document.querySelector('.popup_add-element');
const popupOpenImage = document.querySelector('.popup_image');
const profileEditingForm = document.querySelector('.popup__form_profile-editing');
const elementAddForm = document.querySelector('.popup__form_element-add');
const nameInput = document.querySelector('.popup__field_text_name');
const jobInput = document.querySelector('.popup__field_text_job');
const fieldName = document.querySelector('.profile__title');
const fieldJob = document.querySelector('.profile__subtitle');
const profileOpenPopupButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const element = document.querySelector('#element').content;
const elements = document.querySelector('.elements');
const popupEditProfileClose = document.querySelector('.popup__close-icon_edit-profile');
const popupAddElementClose = document.querySelector('.popup__close-icon_add-element');
const popupImageClose = document.querySelector('.popup__close-icon_image');
const popupTitle = document.querySelector('.popup__image-title');
const popupImage = document.querySelector('.popup__image');
const imageInput = document.querySelector('.popup__field_text_image');
const titleInput = document.querySelector('.popup__field_text_title');



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

// добавление карточек на страницу из начального массива при загрузке
function renderCards() {
  initialCards.forEach(renderElement);
}

function renderElement(item) {
  const newElement = createCard(item)
  elements.prepend(newElement);
}

function createCard(item) {
  const newElement = element.cloneNode(true);
  const image = newElement.querySelector('.element__mask-group');
  image.src = item.link;  
  image.alt = item.name; 
  newElement.querySelector('.element__title').textContent = item.name;
  setCardListeners(newElement);
  return newElement;
}

// обработка лайка, удаления карточки и сохранения новой карточки
function setCardListeners(item) {
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
  const item = event.target.closest('.element');
  popupImage.src = event.srcElement.src;
  popupImage.alt = event.srcElement.alt;
  popupTitle.textContent = event.srcElement.alt;
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
  item.classList.add('popup_opened');
}

// функция добавления карточки
function setElemntItem(evt) {
  evt.preventDefault();
  const cardData =
    { 
      name: titleInput.value, 
      link: imageInput.value };
  
  renderElement(cardData);
  titleInput.value = null;
  imageInput.value = null;
  closePopup();
}

//функция закрытия popup
function closePopup() {
  const popup = document.querySelector('.popup_opened');
  if(popup){
    popup.classList.remove('popup_opened');
  }  
}

//функция сохранения новых значений профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  fieldName.textContent = nameInput.value;
  fieldJob.textContent = jobInput.value;
  closePopup();
}

renderCards();

profileOpenPopupButton.addEventListener('click', openPopupProfile);
profileAddButton.addEventListener('click', openAddPopup);
elementAddForm.addEventListener('submit', setElemntItem);
popupEditProfile.addEventListener('submit', handleProfileFormSubmit);
popupEditProfileClose.addEventListener('click', closePopup);
popupAddElementClose.addEventListener('click', closePopup);
popupImageClose.addEventListener('click', closePopup);




