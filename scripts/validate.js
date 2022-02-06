// Находим все формы на странице
const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        setEventListeners(formElement);
    });
};

// Находим все поля на странице
const setEventListeners = (formElement) => {
    const fieldList = Array.from(formElement.querySelectorAll('.popup__field'));
    fieldList.forEach((fieldElement) => {
        fieldElement.addEventListener('input', () => {
            isValidate(formElement, fieldElement)
        });
    });
};

//проверяем на валидность
const isValidate = (formElement, fieldElement) => {
    if (!fieldElement.validity.valid) {
        markInputError(formElement, fieldElement, fieldElement.validationMessage);
    } else {
        hideInputError(formElement, fieldElement);
    }
};

// Функция, которая подсвечивает поле не прошедшее валидацию и скрывает кнопку
const markInputError = (element, fieldElement, errorMessage) => {
    const popupInput = fieldElement.closest('.popup__input');
    const errorElement = popupInput.querySelector('.popup__field_error');
    errorElement.textContent = errorMessage;
    const button = element.querySelector('.popup__submit-button');
    if(button) {
        button.classList.add('popup__submit-button_disabled');
    } 
    fieldElement.classList.add('popup__field_type_error');
};

// Функция, которая показывает поля прошедние валидацию и показывает кнопку
const hideInputError = (element, fieldElement) => {
    const popupInput = fieldElement.closest('.popup__input');
    const errorElement = popupInput.querySelector('.popup__field_error');
    errorElement.textContent = null;
    fieldElement.classList.remove('popup__field_type_error');
    const valid = element.querySelector('.popup__field_type_error');
    const button = element.querySelector('.popup__submit-button_disabled');
    if(button && !valid) {
        button.classList.remove('popup__submit-button_disabled');
    }  
    
};

// Вызовем функцию
enableValidation(); 