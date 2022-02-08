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
    const button = formElement.querySelector(obj.submitButtonSelector);
    fieldList.forEach((fieldElement) => {
        fieldElement.addEventListener('input', () => {
            isValidate(obj, fieldElement)
            changingButtonState(obj, button, fieldList);
        });
    });
};

//проверяем на валидность
const isValidate = (obj, fieldElement) => {
    if (!fieldElement.validity.valid) {
        markInputError(obj, fieldElement, fieldElement.validationMessage);
    } else {
        hideInputError(obj, fieldElement);
    }
};

// подсвечиваем поле не прошедшее валидацию
const markInputError = (obj, fieldElement, errorMessage) => {
    const popupInput = fieldElement.closest(obj.inputSelector);
    const errorElement = popupInput.querySelector(obj.errorSelector);
    errorElement.textContent = errorMessage;
    fieldElement.classList.add(obj.fieldErrorClass);
};

// определяем поля прошедние валидацию и показывает кнопку
const hideInputError = (obj, fieldElement) => {
    const popupInput = fieldElement.closest(obj.inputSelector);
    const errorElement = popupInput.querySelector(obj.errorSelector);
    errorElement.textContent = null;
    fieldElement.classList.remove(obj.fieldErrorClass);
};

// функция активации и деактевации кнопки 
function changingButtonState(obj, button, fieldList) {
    if (hasInvalidInput(fieldList)) {
        button.classList.add(obj.inactiveButtonClass);
    } else {
        button.classList.remove(obj.inactiveButtonClass);
    }
}

function hasInvalidInput(fieldList) {
    return fieldList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

// Вызовем функцию
enableValidation({
    inputSelector: '.popup__input',
    formSelector: '.popup__form',
    fieldSelector: '.popup__field',
    submitButtonSelector: '.popup__submit-button',
    errorSelector: '.popup__field-error',
    inactiveButtonClass: 'popup__submit-button_disabled',
    fieldErrorClass: 'popup__field_type_error'
});