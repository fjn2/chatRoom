import React from 'react';
import reactDOM from 'react-dom';

import HostApp from './containers/HostApp';
import interconector from './services/interconector';

interconector.connect({
  query: {
    isHost: 'true'
  }
});

reactDOM.render(<HostApp />, window.document.querySelector('#app')); // eslint-disable-line
