import { Popup } from "./Popup";

export class PopupWithConfirmation extends Popup {
    constructor ({selectorPopup, handleForm}){
        super(selectorPopup);
        this._handleForm = handleForm;
        this._form = this._popup.querySelector('.popup__form');
    }

    submitDeletePopup(cardId, cardElement) {
        this._cardId = cardId;
        this._cardElement = cardElement;
    }
    
    setEventListeners(){
        super.setEventListeners()
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleForm(this._cardId, this._cardElement);
        });
    }

    close(){
        super.close();
        this._form.removeEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleForm(this._cardId, this._cardElement);
        });
    }
}