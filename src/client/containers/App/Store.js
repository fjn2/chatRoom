import React from 'react';
import { ClientContext } from '../../state/client/hook';
import App from './App';

const Store = () => (
  <ClientContext>
    <App />
  </ClientContext>
);

export default Store;
