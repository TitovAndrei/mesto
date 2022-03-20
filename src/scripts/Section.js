const elements = document.querySelector('.elements');

export class Section {
    constructor(items, renderer, selectorElement) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.getElementById(selectorElement);
        this._selectorElement = selectorElement;
    }

    renderer() {
        this._items.forEach((item) => {
            this._cardElement = this._renderer(item, this._selectorElement);
            return this.addItem(this._cardElement);
        });
    }

    addItem(cardElement) {
        elements.prepend(cardElement);
    }
} 