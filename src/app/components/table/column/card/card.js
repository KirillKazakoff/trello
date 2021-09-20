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

    toggleVision() {
        this.node.classList.toggle('hidden');
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
            this.toggleVision();

            const element = document.elementFromPoint(e.clientX, e.clientY);
            let container = element.closest('.card-container');
            this.toggleVision();

            if (this.fromPoint) {
                this.fromPoint.style['margin-top'] = '';
            }
            resolve(container);
        }
    }

    initCoordinates(e) {
        this.node.style.top = `${e.clientY + window.scrollY + 5}px`;
        this.node.style.left = `${e.clientX + window.scrollX}px`;
    }

    onDrag(e) {
        e.preventDefault();

        this.initCoordinates(e);

        const fromPoint = document.elementFromPoint(e.clientX, e.clientY)
        if (fromPoint.className === 'card-title' || fromPoint.className === 'card-container') {
            if (this.fromPoint) {
                this.fromPoint.style['margin-top'] = '';
            }

            this.fromPoint = fromPoint.closest('.card-container');
            this.fromPoint.style['margin-top'] = '25px';
        }
    }
}
