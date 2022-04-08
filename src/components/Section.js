export class Section {
    constructor(renderer, constainerSelector) {
        this._renderer = renderer;
        this._constainerSelector = constainerSelector;
    }

    renderer(items, miUserId) {
        this._miUserId = miUserId;
        items.forEach((item) => {
            this._cardElement = this._renderer(item, this._miUserId);
            return this.addItem(this._cardElement);
        });
    }

    addItem(cardElement) {
        this._constainerSelector.prepend(cardElement);
    }
} 