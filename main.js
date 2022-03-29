(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e,n,r,o){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._name=e,this._link=n,this._template=document.getElementById(r),this._handleCardClick=o,this._imagePopup=document.querySelector(".popup_image")}var n,r;return n=t,(r=[{key:"_getTemplate",value:function(){return this._template.content.cloneNode(!0)}},{key:"generateCard",value:function(){return this._element=this._getTemplate(),this._elementMaskGroup=this._element.querySelector(".element__mask-group"),this._elementMaskGroup.src=this._link,this._elementMaskGroup.alt=this._name,this._element.querySelector(".element__title").textContent=this._name,this._setCardListeners(),this._element}},{key:"_setCardListeners",value:function(){var e=this;this._cardElement=this._element.querySelector(".element"),this._elementGroupActive=this._cardElement.querySelector(".element__group"),this._cardElement.querySelector(".element__del").addEventListener("click",(function(){return e._elementDelete()})),this._elementGroupActive.addEventListener("click",(function(){return e._elementGroup()})),this._elementMaskGroup.addEventListener("click",(function(){return e._handleCardClick(e._imagePopup,e._name,e._link)}))}},{key:"_elementDelete",value:function(){this._cardElement.remove()}},{key:"_elementGroup",value:function(){this._elementGroupActive.classList.toggle("element__group_active")}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._inputSelector=t.inputSelector,this._formSelector=t.formSelector,this._fieldSelector=t.fieldSelector,this._submitButtonSelector=t.submitButtonSelector,this._errorSelector=t.errorSelector,this._inactiveButtonClass=t.inactiveButtonClass,this._fieldErrorClass=t.fieldErrorClass,this._form=n,this._fieldList=Array.from(this._form.querySelectorAll(this._fieldSelector)),this._button=this._form.querySelector(this._submitButtonSelector)}var t,r;return t=e,(r=[{key:"enableValidation",value:function(){var e=this;this._fieldList.forEach((function(t){t.addEventListener("input",(function(){e._isValidate(t),e._changingButtonState(e._button,e._fieldList)}))}))}},{key:"_isValidate",value:function(e){e.validity.valid?this._hideInputError(e):this._markInputError(e,e.validationMessage)}},{key:"_markInputError",value:function(e,t){var n=e.closest(this._inputSelector).querySelector(this._errorSelector);n.textContent=t,n.classList.add(this._fieldErrorClass)}},{key:"_hideInputError",value:function(e){var t=e.closest(this._inputSelector).querySelector(this._errorSelector);t.textContent=null,t.classList.remove(this._fieldErrorClass)}},{key:"_changingButtonState",value:function(e,t){this._hasInvalidInput(t)?(e.classList.add(this._inactiveButtonClass),e.disabled=!0):(e.classList.remove(this._inactiveButtonClass),e.disabled=!1)}},{key:"resetValidation",value:function(){var e=this;this._changingButtonState(this._button,this._fieldList),this._fieldList.forEach((function(t){""!=t.value&&e._isValidate(t)}))}},{key:"_hasInvalidInput",value:function(e){return e.some((function(e){return!e.validity.valid}))}}])&&n(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=document.querySelector(".elements"),l=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._items=r,this._renderer=o,this._selectorElement=n}var t,n;return t=e,(n=[{key:"renderer",value:function(){var e=this;this._items.forEach((function(t){return e._cardElement=e._renderer(t.name,t.link,e._selectorElement),e.addItem(e._cardElement)}))}},{key:"addItem",value:function(e){i.prepend(e)}}])&&o(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var a=function(){function e(t){var n,r,o=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),r=function(e){"Escape"===e.key&&o.close()},(n="_handleEscClose")in this?Object.defineProperty(this,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):this[n]=r,this._selectorPopup=t,this._popup=document.querySelector(this._selectorPopup)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"setEventListeners",value:function(){var e=this;this._popup.addEventListener("mousedown",(function(t){(t.target.classList.contains("popup")||t.target.classList.contains("popup__close-icon"))&&e.close()}))}}])&&u(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function c(e){return c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c(e)}function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function p(){return p="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=f(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},p.apply(this,arguments)}function f(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=h(e)););return e}function d(e,t){return d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},d(e,t)}function _(e,t){if(t&&("object"===c(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function h(e){return h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},h(e)}var y=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&d(e,t)}(l,e);var t,n,r,o,i=(r=l,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=h(r);if(o){var n=h(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return _(this,e)});function l(e,t,n){var r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,l),(r=i.call(this,e))._name=t,r._link=n,r._popupTitle=r._popup.querySelector(".popup__image-title"),r._popupImage=r._popup.querySelector(".popup__image"),r}return t=l,(n=[{key:"open",value:function(){this._popupImage.src=this._link,this._popupImage.alt=this._name,this._popupTitle.textContent=this._name,p(h(l.prototype),"open",this).call(this)}}])&&s(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),l}(a);function m(e){return m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},m(e)}function v(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function b(){return b="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=g(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},b.apply(this,arguments)}function g(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=w(e)););return e}function k(e,t){return k=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},k(e,t)}function S(e,t){if(t&&("object"===m(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function w(e){return w=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},w(e)}var E=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&k(e,t)}(l,e);var t,n,r,o,i=(r=l,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=w(r);if(o){var n=w(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return S(this,e)});function l(e){var t,n=e.selectorPopup,r=e.handleForm;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,l),(t=i.call(this,n))._handleForm=r,t._form=t._popup.querySelector(".popup__form"),t._inputList=t._form.querySelectorAll(".popup__field"),t}return t=l,(n=[{key:"_getInputValues",value:function(){var e=this;return this._inputValues={},this._inputList.forEach((function(t){e._inputValues[t.name]=t.value})),this._inputValues}},{key:"setEventListeners",value:function(){var e=this;this._form.addEventListener("submit",(function(t){return e._handleForm(t,e._getInputValues())})),b(w(l.prototype),"setEventListeners",this).call(this)}},{key:"close",value:function(){this._form.reset(),b(w(l.prototype),"close",this).call(this)}}])&&v(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),l}(a);function j(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var O,P=function(){function e(t){var n=t.nameSelector,r=t.jobSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=document.querySelector(n),this._job=document.querySelector(r)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return this._userInfo={name:this._name.textContent,job:this._job.textContent}}},{key:"setUserInfo",value:function(e){this._name.textContent=e.name,this._job.textContent=e.job}}])&&j(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),C=document.querySelector(".profile__edit-button"),L=document.querySelector(".profile__add-button"),q=document.querySelector(".popup__field_text_name"),I=document.querySelector(".popup__field_text_job"),x=document.querySelector(".popup_edit-profile"),R=document.querySelector(".popup_add-element"),B={nameSelector:".profile__title",jobSelector:".profile__subtitle"},T={popupEditProfile:x,popupAddElement:R};function V(e){return new l({items:e,renderer:A},"element").renderer()}function A(e,n,r){return new t(e,n,r,F).generateCard()}O={inputSelector:".popup__input",formSelector:".popup__form",fieldSelector:".popup__field",submitButtonSelector:".popup__submit-button",errorSelector:".popup__field-error",inactiveButtonClass:"popup__submit-button_disabled",fieldErrorClass:"popup__field_type_error"},Array.from(document.querySelectorAll(O.formSelector)).forEach((function(e){var t=new r(O,e),n=e.getAttribute("name");T[n]=t,t.enableValidation()}));var G=new E({selectorPopup:".popup_edit-profile",handleForm:function(e,t){e.preventDefault(),new P(B).setUserInfo({name:t.field_name,job:t.field_job}),G.close()}});G.setEventListeners();var D=new E({selectorPopup:".popup_add-element",handleForm:function(e,t){e.preventDefault(),V([{name:t.field_title,link:t.field_image}]),D.close()}});function F(e,t,n){var r=new y(".popup_image",t,n);return r.setEventListeners(),r.open()}D.setEventListeners(),V([{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}]),C.addEventListener("click",(function(){var e;return e=new P(B).getUserInfo(),q.value=e.name,I.value=e.job,T["profile-editing-form"].resetValidation(),G.open()})),L.addEventListener("click",(function(){return T["element-add-form"].resetValidation(),D.open()}))})();