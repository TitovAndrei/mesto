import { popupActive } from "./script.js";

export class Card {

    constructor(name, link, cardSelector) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
            .getElementById('element')
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setCardListeners();
        this._element.querySelector('.element__mask-group').src = this._link;
        this._element.querySelector('.element__title').textContent = this._name;

        return this._element;
    }

    // обработка лайка, удаления карточки и сохранения новой карточки
    _setCardListeners() {
        this._element.querySelector('.element__del').addEventListener('click', () => { this._elementDelete() });
        this._element.querySelector('.element__group').addEventListener('click', () => { this._elementGroup() });
        this._element.querySelector('.element__mask-group').addEventListener('click', () => { this._openElementMaskGroup() });
    }

    _elementDelete() {
        this._element.closest('.element').remove();
    }

    _elementGroup() {
        this.elementGroup = this._element.querySelector('.element__group');
        this.elementGroup.classList.toggle('element__group_active');
    }

    _openElementMaskGroup() {
        this.popupTitle = document.querySelector('.popup__image-title');
        this.popupImage = document.querySelector('.popup__image');
        this.popupImage.src = this._link;
        this.popupImage.alt = this._name;
        this.popupTitle.textContent = this._name;
        this._cardSelector = document.querySelector('.popup_image');
        this._cardSelector.classList.add('popup_opened');
        document.addEventListener('keydown', popupActive);
    }

}