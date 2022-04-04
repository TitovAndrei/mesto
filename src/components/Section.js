const elements = document.querySelector('.elements');

export class Section {
    constructor({ items, miUserId, renderer }, selectorElement) {
        this._items = items;
        this._miUserId = miUserId;
        this._renderer = renderer;
        this._selectorElement = selectorElement;
    }

    renderer() {
        this._items.forEach((item) => {
            this._cardElement = this._renderer(item.name, item.link, item.cardId, item.likes, item.owner, this._miUserId, this._selectorElement);
            return this.addItem(this._cardElement);
        });
    }

    addItem(cardElement) {
        elements.prepend(cardElement);
    }
} 