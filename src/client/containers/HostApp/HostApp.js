import React, { useState, useEffect } from 'react';
import { useHost } from '../../state/host/hook';
import Snake from '../../components/Snake';

const HostApp = () => {
  const [state] = useHost();
  return (
    <div>
      You are the HOST!
      <ul>
        {JSON.stringify(state)}
      </ul>
      <Snake users={state.state || []} />
    </div>
  );
};

export default HostApp;
