// Находим все формы на странице
const enableValidation = (obj) => {
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
    formList.forEach((formElement) => {
        inputElement = obj.fieldSelector;
        setEventListeners(obj, formElement, inputElement);
    });
};

// Находим все поля на странице
const setEventListeners = (obj, formElement, inputElement) => {
    const fieldList = Array.from(formElement.querySelectorAll(inputElement));
    fieldList.forEach((fieldElement) => {
        fieldElement.addEventListener('input', () => {
            isValidate(obj, formElement, fieldElement)
        });
    });
};

//проверяем на валидность
const isValidate = (obj, formElement, fieldElement) => {
    if (!fieldElement.validity.valid) {
        markInputError(obj, formElement, fieldElement, fieldElement.validationMessage);
    } else {
        hideInputError(obj, formElement, fieldElement);
    }
};

// подсвечиваем поле не прошедшее валидацию
const markInputError = (obj, formElement, fieldElement, errorMessage) => {
    const popupInput = fieldElement.closest(obj.inputSelector);
    const errorElement = popupInput.querySelector(obj.errorSelector);
    errorElement.textContent = errorMessage;
    fieldElement.classList.add(obj.fieldErrorClass);
    changingButtonState(obj, formElement, false);
};

// определяем поля прошедние валидацию и показывает кнопку
const hideInputError = (obj, formElement, fieldElement) => {
    const popupInput = fieldElement.closest(obj.inputSelector);
    const errorElement = popupInput.querySelector(obj.errorSelector);
    errorElement.textContent = null;
    fieldElement.classList.remove(obj.fieldErrorClass);
    changingButtonState(obj, formElement, true);

};

// функция активации и деактевации кнопки 
function changingButtonState(obj, formElement, boolean) {
    const button = formElement.querySelector(obj.submitButtonSelector);
    const valid = formElement.querySelector(`.${obj.fieldErrorClass}`);

    console.log(obj.inactiveButtonClass);
    console.log(button);
    if (button && boolean === true && !valid) {
        button.classList.remove(obj.inactiveButtonClass);
    }
    else if (button && boolean === false && valid) {
        button.classList.add(obj.inactiveButtonClass);
    }
}

// Вызовем функцию
enableValidation({
    inputSelector: '.popup__input',
    formSelector: '.popup__form',
    fieldSelector: '.popup__field',
    submitButtonSelector: '.popup__submit-button',
    errorSelector: '.popup__field_error',
    inactiveButtonClass: 'popup__submit-button_disabled',
    fieldErrorClass: 'popup__field_type_error'
});