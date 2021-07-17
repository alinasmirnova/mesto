class Section {
    constructor({items, renderer}, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    render() {
        this._items.forEach((item) => {
            this.addItem(item);
        });
    }

    _addElement(element) {
        this._container.prepend(element);
    }

    addItem(item) {
        this._addElement(this._renderer(item));
    }
}

export default Section;