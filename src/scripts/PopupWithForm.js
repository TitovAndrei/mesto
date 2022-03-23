import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor({ selectorPopup, handleForm }) {
        super(selectorPopup);
        this._selectorPopup = selectorPopup;
        this._handleForm = handleForm;
        this._form = this._selectorPopup.querySelector('.popup__form');
        this._formAdd = document.querySelector('.popup__form_element-add');
        this._inputList = this._form.querySelectorAll('.popup__field');
    }

    _getInputValues() {
        this._inputValues = {};
        this._inputList.forEach(input => {
            this._inputValues[input.name] = input.value;
        });
        return this._inputValues;
    }

    _setEventListeners() {
        this._selectorPopup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-icon')) {
                this.close();
            }
        });
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleForm(this._getInputValues());
        }, { once: true });
    }

    close() {
        super.close();
        this._form.removeEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleForm(this._getInputValues());
        }, { once: true });
        this._form.reset();
    }
}