import Card from './card/card';
import { cardT, emptyCardT } from './card/card.tmp';
import engine from '../../../lib/engine/engine';

export default class Column {
    constructor(container) {
        this.parentContainer = container;
        this.container = this.parentContainer.querySelector('.cards-container');

        this.cards = [];
        this.initColumn();

        this.container.addEventListener('click', (e) => this.onRemove(e));
    }

    initColumn() {
        this.cards = [...this.container.children].map((node) => new Card(node));
    }

    renderCard(title) {
        const html = engine(cardT(title));
        this.container.insertAdjacentHTML('beforeend', html);
        return this.container.lastElementChild;
    }

    addCard(node) {
        this.cards.push(new Card(node));
        this.initColumn();
    }

    onRemove(e) {
        if (e.target.classList.contains('card-delete')) {
            const noteEl = e.target.closest('.card-container');
            this.deleteEl(noteEl.id);
        }
    }

    getCard(id) {
        return this.cards.find((card) => card.id === id);
    }

    deleteEl(id) {
        const delCard = this.getCard(id);
        delCard.remove();
        const index = this.cards.findIndex((card) => card.id === id);
        this.cards.splice(index, 1);
    }

    insertBfr(newnode, existing) {
        this.container.insertBefore(newnode, existing);
        this.addCard(newnode);
    }
}
