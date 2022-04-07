import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor({ selectorPopup, handleForm }) {
        super(selectorPopup);
        this._handleForm = handleForm;
        this._form = this._popup.querySelector('.popup__form');
        this._buttomSubmit = this._form.querySelector('.popup__submit-button');
        this._inputList = this._form.querySelectorAll('.popup__field');
    }

    _getInputValues() {
        this._inputValues = {};
        this._inputList.forEach(input => {
            this._inputValues[input.name] = input.value;
        });
        return this._inputValues;
    }

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => this._handleForm(evt, this._getInputValues()));
        super.setEventListeners();
    }

    renderLoading(evt) {
        if (evt) {
            this._buttomSubmit.textContent = 'Сохранение...'
        }
        else {
            this._buttomSubmit.textContent = 'Сохранить'
        }
    }

    close() {
        this._form.reset();
        super.close();
    }
}