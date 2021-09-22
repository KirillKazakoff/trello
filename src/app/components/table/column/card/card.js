import './card.css';

export default class Card {
    constructor(node) {
        this.onDrag = this.onDrag.bind(this);
        this.node = node;
        this.text = this.node.firstElementChild.textContent;
        this.id = this.node.id;
    }

    remove() {
        this.node.remove();
    }

    addDropListener() {
        this.node.classList.add('dragged');
        document.documentElement.addEventListener('mousemove', this.onDrag);

        return new Promise((resolve) => {
            this.handler = this.onDragEnd(resolve);
            document.documentElement.addEventListener('mouseup', this.handler);
        });
    }

    onDragEnd(resolve) {
        return (e) => {
            document.documentElement.removeEventListener('mousemove', this.onDrag);
            document.documentElement.removeEventListener('mouseup', this.handler);

            this.node.classList.remove('dragged');

            const element = document.elementFromPoint(e.clientX, e.clientY);

            if (this.fromPoint) {
                this.fromPoint.style['padding-top'] = '';
            }
            resolve(element);
        };
    }

    initCoordinates(e) {
        this.node.style.top = `${e.clientY + window.scrollY + 5}px`;
        this.node.style.left = `${e.clientX + window.scrollX}px`;
    }

    onDrag(e) {
        e.preventDefault();

        this.initCoordinates(e);

        const fromPoint = document.elementFromPoint(e.clientX, e.clientY);
        if (fromPoint.className === 'card-title' || fromPoint.className === 'card-container') {
            if (this.fromPoint) {
                this.fromPoint.style['padding-top'] = '';
            }

            this.fromPoint = fromPoint.closest('.card-container');
            this.fromPoint.style['padding-top'] = '50px';
        }
    }
}
