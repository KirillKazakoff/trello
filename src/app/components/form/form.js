/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import './form.css';
import formT from './form.tmp';

import engine from '../../lib/engine/engine';
import errorMessages from './errorMessages';
import FormElement from '../tooltip/formElem';

export default class Form {
    constructor(target) {
        this.container = document.body;
        this.render();
        this.position(target);
        this.init();

        this.node.addEventListener('input', (e) => this.onInput(e));

        this.cancelButton = this.node.querySelector('.cancel-button');
        this.cancelButton.addEventListener('click', () => this.remove());
    }

    render() {
        const html = engine(formT);
        this.container.insertAdjacentHTML('beforeend', html);

        this.node = this.container.querySelector('.form');
    }

    position(target) {
        const targetCoords = target.getBoundingClientRect();

        this.node.style.left = `${targetCoords.left - 10}px`;
        this.node.style.top = `${targetCoords.top - 110}px`;
    }

    init() {
        this.formElems = [...this.node.elements].map((elem) => new FormElement(elem));
    }

    // clearFields() {
    //     this.formElems.forEach((input) => input.clearField());
    // }

    remove() {
        this.clearErrors();
        this.node.remove();
    }

    checkSubmit(e) {
        e.preventDefault();

        if (this.node.checkValidity()) {
            return true;
        }

        this.formElems.forEach((elem) => {
            const { node } = elem;
            if (node.validity.valid) return;

            const errorMsg = this.getInputError(node);
            elem.showError(errorMsg);
        });

        return false;
    }

    getInputError(node) {
        const findCallback = (key) => node.validity[key];
        const field = Object.keys(ValidityState.prototype).find(findCallback);
        return errorMessages[node.name][field];
    }

    clearErrors() {
        this.formElems.forEach((elem) => elem.hideError());
    }

    onInput(e) {
        const field = e.target;
        const formElem = this.findFormElem(field);
        const errorMsg = this.getInputError(field);

        if (!errorMsg) {
            formElem.hideError();
            return false;
        }

        formElem.showError(errorMsg);
        return true;
    }

    findFormElem(node) {
        return this.formElems.find((elem) => elem.node.name === node.name);
    }

    getFormData() {
        return this.formElems.reduce((total, elem) => {
            const { node } = elem;
            if (node.value) {
                total[node.name] = node.value;
            }
            return total;
        }, {});
    }
}
