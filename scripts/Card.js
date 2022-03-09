const popupTitle = document.querySelector('.popup__image-title');
const popupImage = document.querySelector('.popup__image');
const imagePopup = document.querySelector('.popup_image');

export class Card {

    constructor(name, link, template, handleCardClick) {
        this._name = name;
        this._link = link;
        this._template = template;
        this._imagePopup = imagePopup;
        this._popupTitle = popupTitle;
        this._popupImage = popupImage;
        this._handleCardClick = handleCardClick;

    }

    _getTemplate() {
        const cardElement = this._template
            .content
            .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._elementMaskGroup = this._element.querySelector('.element__mask-group');
        this._elementMaskGroup.src = this._link;
        this._elementMaskGroup.alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;
        this._setCardListeners();

        return this._element;
    }

    _setCardListeners() {
        this._cardElement = this._element.querySelector('.element');
        this._elementGroupActive = this._cardElement.querySelector('.element__group');

        this._cardElement.querySelector('.element__del').addEventListener('click', () => { this._elementDelete() });
        this._elementGroupActive.addEventListener('click', () => { this._elementGroup() });
        this._elementMaskGroup.addEventListener('click', () => { this._handleCardClick(this._name, this._link)});
    }

    _elementDelete() {
        this._cardElement.remove();
    }

    _elementGroup() {
        this._elementGroupActive.classList.toggle('element__group_active');
    }

}