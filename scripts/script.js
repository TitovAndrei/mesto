let popupEditProfile = document.querySelector('.popup_edit-profile');
let popupAddElement = document.querySelector('.popup_add-element');
let profileEditingForm = document.querySelector('.popup__form_profile-editing');
let elementAddForm = document.querySelector('.popup__form_element-add');
let nameInput = document.querySelector('.popup__field_text_name');
let jobInput = document.querySelector('.popup__field_text_job');
let fieldName = document.querySelector('.profile__title');
let fieldJob = document.querySelector('.profile__subtitle');
let elementMaskGroup = document.querySelector('.element__mask-group');
let elementTitle = document.querySelector('.element__title');
let profileOpenPopupButton = document.querySelector('.profile__edit-button');
let profileAddButton = document.querySelector('.profile__add-button');
let popupCloseButton = document.querySelector('.popup__close-icon');
const element = document.querySelector('#element').content;
const elements = document.querySelector('.elements');
let buttomDelElement = document.querySelector('.element__del');



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

function renderElement(li) {
  console.log(initialCards);
  const newElement = element.cloneNode(true);
  newElement.querySelector('.element__mask-group').src = li.link;
  newElement.querySelector('.element__title').textContent = li.name;
  addElemnt(newElement);
  elements.prepend(newElement);
}

// обработка лайка, удаления карточки и сохранения новой карточки
function addElemnt(li) {
  li.querySelector('.element__del').addEventListener('click', elementDelete);
  li.querySelector('.element__group').addEventListener('click', elementGroup);
}

function elementDelete(event) {
  event.target.closest('.element').remove();
}

function elementGroup(event) {
  event.target.classList.toggle('element__group_active');
}

// открытие попапов
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

// функция открытия
function openPopup(li) {
  li.classList.remove('popup_close');
  li.classList.add('popup_opened');
}

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

//http://mediasvod.ru/wp-content/uploads/2016/10/man.jpg

//функция закрытия
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
popupCloseButton.addEventListener('click', closePopup);
elementAddForm.addEventListener('submit', addElemntItem);
profileEditingForm.addEventListener('submit', formSubmitHandler);




