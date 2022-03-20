import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor({selectorPopup, handleForm}) {
        super(selectorPopup);
        this._handleForm = handleForm;
        this._form = selectorPopup.querySelector('.popup__form');
    }

    _getInputValues() {
        this._inputList = this._form.querySelectorAll('.popup__field');
        this._inputValues = {};
        this._inputList.forEach(input => {
            this._inputValues[input.name] = input.value;
        });
        return this._inputValues;
    }

    _setEventListeners() {
        super._setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleForm(this._getInputValues());   
        });
    }

    close() {
        this._form.reset();
        super.close();
    }
}