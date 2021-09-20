export default class SaveLoad {
    constructor() {
        this.storage = localStorage;
    }

    save(columns) {
        const state = columns.reduce((total, column) => {
            const content = column.cards.map((card) => card.text);
            const title = column.parentContainer.className.match(/__([\w-]+)/).pop();

            total.push({ title, content });
            return total;
        }, []);

        this.storage.setItem('state', JSON.stringify(state));
    }

    load() {
        try {
            return JSON.parse(this.storage.getItem('state'));
        } catch (e) {
            throw new Error('Invalid state');
        }
    }
}
