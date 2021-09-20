import { nanoid } from 'nanoid';

const cardT = (title) => ({
    block: 'div',
    cls: 'card-container',
    content: [
        {
            block: 'span',
            cls: 'card-title',
            content: title,
        },
        {
            block: 'div',
            cls: 'card-delete',
            content: 'X',
        },
    ],
    attrs: {
        id: nanoid(5),
    }
});

export { cardT };