export class FormValidator {
    constructor(obj, form) {
        this._inputSelector = obj.inputSelector;
        this._formSelector = obj.formSelector;
        this._fieldSelector = obj.fieldSelector;
        this._submitButtonSelector = obj.submitButtonSelector;
        this._errorSelector = obj.errorSelector;
        this._inactiveButtonClass = obj.inactiveButtonClass;
        this._fieldErrorClass = obj.fieldErrorClass;
        this._form = form;
    }

    //запускаем валидацию
    enableValidation() {
        const fieldList = Array.from(this._form.querySelectorAll(this._fieldSelector));
        const button = this._form.querySelector(this._submitButtonSelector);
        fieldList.forEach((fieldElement) => {
            fieldElement.addEventListener('input', () => {
                this._isValidate(fieldElement);
                this._changingButtonState(button, fieldList);
            });
        });
    };

    //проверяем на валидность
    _isValidate(fieldElement) {
        if (!fieldElement.validity.valid) {
            this._markInputError(fieldElement, fieldElement.validationMessage);
        } else {
            this._hideInputError(fieldElement);
        }
    };

    // подсвечиваем поле не прошедшее валидацию
    _markInputError(fieldElement, errorMessage) {
        const popupInput = fieldElement.closest(this._inputSelector);
        const errorElement = popupInput.querySelector(this._errorSelector);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._fieldErrorClass);
    };

    // определяем поля прошедние валидацию и показывает кнопку
    _hideInputError(fieldElement) {
        const popupInput = fieldElement.closest(this._inputSelector);
        const errorElement = popupInput.querySelector(this._errorSelector);
        errorElement.textContent = null;
        errorElement.classList.remove(this._fieldErrorClass);
    };

    // функция активации и деактевации кнопки 
    _changingButtonState(button, fieldList) {
        if (this._hasInvalidInput(fieldList)) {
            button.classList.add(this._inactiveButtonClass);
        } else {
            button.classList.remove(this._inactiveButtonClass);
        }
    }

    _hasInvalidInput(fieldList) {
        return fieldList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }
}