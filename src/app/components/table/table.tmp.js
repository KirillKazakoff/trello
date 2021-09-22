import { cardT } from './column/card/card.tmp';

const headerT = (name) => ({
    block: 'header',
    cls: 'column-header',
    content: [
        {
            block: 'div',
            cls: 'header__title',
            content: name.toUpperCase(),
        },
        {
            block: 'div',
            cls: 'header__context-menu',
            content: '...',
        },
    ],
});

const cardsContainerT = (texts) => ({
    block: 'div',
    cls: 'cards-container',
    content: [texts.map(cardT)],
});

const addCardContainerT = {
    block: 'div',
    cls: 'add-card-container',
    content: {
        block: 'button',
        cls: 'add-card-title',
        content: '+ Add another card',
    },
};

const columnContainerT = (colData) => ({
    block: 'div',
    cls: 'column-container',
    content: [headerT(colData.title), cardsContainerT(colData.content), addCardContainerT],
});

const columnT = (colData) => ({
    block: 'div',
    cls: `column column__${colData.title}`,
    content: [columnContainerT(colData)],
});

const tableT = (colsData) => ({
    block: 'div',
    cls: 'columns-container',
    content: colsData.map(columnT),
});

export default tableT;
