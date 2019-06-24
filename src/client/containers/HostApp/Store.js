import React from 'react';
import { HostContext } from '../../state/host/hook';
import HostApp from './HostApp';

const Store = () => (
  <HostContext>
    <HostApp />
  </HostContext>
);

export default Store;
