import React from 'react';
import reactDOM from 'react-dom';

import App from './containers/App';
import interconector from './services/interconector';

interconector.connect();

reactDOM.render(<App />, window.document.querySelector('#app')); // eslint-disable-line
