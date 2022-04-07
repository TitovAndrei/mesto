export class Card {

    constructor(data) {
        const {
            item,
            miUserId,
            element,
            handleCardClick,
            handleDeleteCardClick,
            handleLike,
            handleRemoveLike } = data
        this._name = item.name;
        this._link = item.link;
        this._cardId = item._id;
        this._likes = item.likes;
        this._owner = item.owner;
        this._miUserId = miUserId;
        this._template = document.getElementById(element);
        this._handleCardClick = handleCardClick;
        this._handleDeleteCardClick = handleDeleteCardClick;
        this._handleLike = handleLike;
        this._handleRemoveLike = handleRemoveLike;
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
        this._searchLikes(this._likes, this._miUserId);
        this._setCardListeners();
        return this._element;
    }

    _searchLikes(arr, elem) {
        arr.forEach(element => {
            if (element._id === elem) {
                this._elementGroupActive.classList.add('element__group_active');
            }
        });
    }

    _setCardListeners() {
        this._elementGroupActive.addEventListener('click', () => this._addLikes());
        this._elementMaskGroup.addEventListener('click', () => this._handleCardClick(this._name, this._link));
        if (this._owner._id === this._miUserId) {
            this._delIcon = this._cardElement.querySelector('.element__del');
            this._delIcon.classList.remove('element__del_disabeled')
            this._delIcon.addEventListener('click', () => this._handleDeleteCardClick(this._cardId, this._cardElement));
        }
    }

    updateLikes(obj) {
        this._elementGroupActive.classList.add('element__group_active');
        this._elementGroupNumber.textContent = obj.likes.length;
    }

    deleteLikes(obj) {
        this._elementGroupActive.classList.remove('element__group_active');
        this._elementGroupNumber.textContent = obj.likes.length;
    }

    _addLikes() {
        if (this._elementGroupActive.classList.contains('element__group_active')) {
            this._handleRemoveLike(this);
        }
        else {
            this._handleLike(this);
        }

    }

}
