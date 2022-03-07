import {openPopup} from './script.js';

export class Card {

    constructor(name, link, template) {
        this._name = name;
        this._link = link;
        this._template = template;
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
        this._cardSelector = this._element.querySelector('.element');
        this._elementGroupActive = this._cardSelector.querySelector('.element__group');
        this._imagePopup = document.querySelector('.popup_image');
        this._popupTitle = document.querySelector('.popup__image-title');
        this._popupImage = document.querySelector('.popup__image');
        
        this._cardSelector.querySelector('.element__del').addEventListener('click', () => { this._elementDelete() });
        this._elementGroupActive.addEventListener('click', () => { this._elementGroup() });
        this._elementMaskGroup.addEventListener('click', () => { this._openElementMaskGroup() });
    }

    _elementDelete() {
        this._cardSelector.remove();
    }

    _elementGroup() {
        this._elementGroupActive.classList.toggle('element__group_active');
    }

    _openElementMaskGroup() {
        this._popupImage.src = this._link;
        this._popupImage.alt = this._name;
        this._popupTitle.textContent = this._name;
        this._imagePopup.classList.add('popup_opened');
        document.addEventListener('keydown', openPopup);
    }
}