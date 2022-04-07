export class Section {
    constructor(renderer) {
        this._renderer = renderer;
        this._element = 'element';
        this._elements = document.querySelector('.elements');
    }

    renderer(items, miUserId) {
        this._miUserId = miUserId;
        items.forEach((item) => {
            this._cardElement = this._renderer(item, this._element, this._miUserId);
            return this.addItem(this._cardElement);
        });
    }

    addItem(cardElement) {
        this._elements.prepend(cardElement);
    }
} 