/* eslint-disable no-param-reassign */
import './table.css';
import tableT from './table.tmp';
import engine from '../../lib/engine/engine';

import Column from './column/column';
import Form from '../form/form';

export default class Table {
    constructor(data) {
        this.container = document.querySelector('.manager');
        this.columns = [];

        this.render(data);
        this.container.addEventListener('mousedown', (e) => this.onDrag(e));
    }

    render(data) {
        const html = engine(tableT(data));
        this.container.innerHTML = html;
        this.notes = [...this.container.children];

        this.initColumns();

        this.container.addEventListener('click', (e) => this.onAdd(e));
    }

    onAdd(e) {
        if (e.target.className === 'add-card-title') {
            const column = this.getColumn(e.target.closest('.column').className);

            this.form = new Form(e.target);
            this.form.node.addEventListener('submit', (e) => this.onFormSubmit(e, column));
        }
    }

    initColumns() {
        [...this.container.firstElementChild.children].forEach((container) => {
            this.columns.push(new Column(container));
        });
    }

    getColumn(cls) {
        return this.columns.find((column) => column.parentContainer.className === cls);
    }

    onFormSubmit(e, column) {
        this.form.clearErrors();

        if (this.form.checkSubmit(e)) {
            const note = this.form.getFormData();

            const node = column.renderCard(note.title);
            column.addCard(node);

            this.form.remove();
        }
    }

    async onDrag(e) {
        if (e.target.className === 'card-title' || e.target.className === 'card-container') {
            const cardContainer = e.target.closest('.card-container');
            const { className } = e.target.closest('.column');

            const columnFrom = this.getColumn(className);
            const draggedCard = columnFrom.getCard(cardContainer.id);
            
            draggedCard.initCoordinates(e);
            const resultEl = await draggedCard.addDropListener();
            
            if (resultEl) {
                const columnTo = this.getColumn(resultEl.closest('.column').className);
                const {id, node} = draggedCard;

                columnFrom.deleteEl(id);
                columnTo.insertBfr(node, resultEl);
            }
        }
    }
}

