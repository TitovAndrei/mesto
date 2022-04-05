import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(selectorPopup) {
        super(selectorPopup);
        this._popupTitle = this._popup.querySelector('.popup__image-title');
        this._popupImage = this._popup.querySelector('.popup__image');
    }

    open(name, link) {
        this._popupImage.src = link;
        this._popupImage.alt = name;
        this._popupTitle.textContent = name;

        super.open();
    }
}