import React, { useState, useEffect } from 'react';
import { useHost } from '../../state/host/hook';

const HostApp = () => {
  const [state] = useHost();
  return (
    <div>
      You are the HOST!
      <ul>
        {/* {
          messages.map(message => <li>{message}</li>)
        } */}
        {JSON.stringify(state)}
      </ul>
    </div>
  );
};

export default HostApp;
