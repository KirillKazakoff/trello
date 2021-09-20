const rowT = (row) => ({
    block: 'div',
    cls: `row row__${row.param}`,
    content: [
        {
            block: 'span',
            cls: `title title__${row.param}`,
            content: row.title,
        },
        {
            block: 'input',
            cls: `input input__${row.param}`,
            attrs: {
                required: true,
                name: row.name,
                pattern: row.pattern,
            },
        },
    ],
});

const rowGen = () => {
    const rowTemplates = [
        {
            param: 'name',
            title: 'Введите текст',
            name: 'title',
            type: 'text',
            pattern: '.+',
        },
    ];
    return rowTemplates.map(rowT);
};

const buttonT = (param, title, type) => ({
    block: 'button',
    cls: `controls__button ${param}-button`,
    content: title,
    attrs: { type },
});

const controlsT = {
    block: 'div',
    cls: 'controls',
    content: [buttonT('save', 'Сохранить', 'submit'), buttonT('cancel', 'Отмена', 'button')],
};

const formT = {
    block: 'form',
    cls: 'form form__active',
    content: [rowGen(), controlsT],
    attrs: {
        novalidate: true,
    },
};

export default formT;
