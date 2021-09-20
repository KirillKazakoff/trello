import Table from '../components/table/table';
import SaveLoad from '../logic/saveLoad';

let initData = [
    {
        title: 'todo',
        content: ['some content there1', 'some content there2', 'some content there3'],
    },
    {
        title: 'in-progress',
        content: ['some content there4', 'some content there5', 'some content there6'],
    },
    {
        title: 'done',
        content: ['some content there7', 'some content there8', 'some content there9'],
    }
]
    

export default class Controller {
    constructor() {
        const saveLoader = new SaveLoad();
        const loadedData = saveLoader.load();
        if (loadedData) initData = loadedData; 

        const table = new Table(initData);
        saveLoader.save(table.columns);

        window.addEventListener('unload', () => saveLoader.save(table.columns));
    }


}
