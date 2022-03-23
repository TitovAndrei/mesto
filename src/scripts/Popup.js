export class Popup {
    constructor(selectorPopup) {
        this._selectorPopup = selectorPopup;
    }

    open() {
        this._selectorPopup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
        this._setEventListeners();
    }

    close() {
        this._selectorPopup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _setEventListeners() {
        this._selectorPopup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-icon')) {
                this.close();
            }
        });
    }
}