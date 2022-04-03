import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(selectorPopup, name, link) {
        super(selectorPopup);
        this._name = name;
        this._link = link;
        this._popupTitle = this._popup.querySelector('.popup__image-title');
        this._popupImage = this._popup.querySelector('.popup__image');
    }

    open() {
        this._popupImage.src = this._link;
        this._popupImage.alt = this._name;
        this._popupTitle.textContent = this._name;

        super.open();
    }
}