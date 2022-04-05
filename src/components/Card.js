export class Card {

    constructor(data) {
        const {
            card: {
                name,
                link,
                cardId,
                likes,
                owner,
            },
            miUserId,
            templateSelector,
            handleCardClick,
            likesAdd,
            likesDelete,
            handleDeleteCardClick } = data
        this._name = name;
        this._link = link;
        this._cardId = cardId;
        this._likes = likes;
        this._owner = owner;
        this._miUserId = miUserId;
        this._template = document.getElementById(templateSelector);
        this._handleCardClick = handleCardClick;
        this._likesAdd = likesAdd;
        this._likesDelete = likesDelete;
        this._handleDeleteCardClick = handleDeleteCardClick;
    }

    _getTemplate() {
        const cardElement = this._template
            .content
            .cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._elementMaskGroup = this._element.querySelector('.element__mask-group');
        this._elementMaskGroup.src = this._link;
        this._elementMaskGroup.alt = this._name;
        this._elementGroupNumber = this._element.querySelector('.element__group_number');
        this._elementGroupNumber.textContent = this._likes.length;
        this._element.querySelector('.element__title').textContent = this._name;
        this._cardElement = this._element.querySelector('.element');
        this._elementGroupActive = this._cardElement.querySelector('.element__group');
        this._likeSearch(this._likes, this._miUserId);
        this._setCardListeners();
        return this._element;
    }

    _likeSearch(arr, elem) {
        arr.forEach(element => {
            if (element._id === elem) {
                this._elementGroupActive.classList.add('element__group_active');
            }
        });
    }

    _setCardListeners() {
        this._elementGroupActive.addEventListener('click', () => this._elementGroup());
        this._elementMaskGroup.addEventListener('click', () => this._handleCardClick(this._name, this._link));
        if (this._owner._id === this._miUserId) {
            this._delIcon = this._cardElement.querySelector('.element__del');
            this._delIcon.classList.remove('element__del_disabeled')
            this._delIcon.addEventListener('click', () => this._handleDeleteCardClick(this._cardId, this._cardElement));
        }
    }

    elementDelete() {
        this._cardElement.remove();
    }

    _elementGroup() {
        if (this._elementGroupActive.classList.contains('element__group_active')) {
            this._elementGroupActive.classList.remove('element__group_active');
            this._elementGroupNumber.textContent = --this._likes.length;
            this._likesDelete(this._cardId);
        }
        else {
            this._elementGroupActive.classList.add('element__group_active');
            this._elementGroupNumber.textContent = ++this._likes.length;
            this._likesAdd(this._cardId);
        }

    }

}
