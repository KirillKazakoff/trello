// eslint-disable-next-line import/no-extraneous-dependencies
import 'regenerator-runtime/runtime';

import '../css/defaultStyle.css';
import Controller from './controller/controller';

window.addEventListener('load', () => new Controller());
