import React, { useState } from 'react';
import { useClient } from '../../state/client/hook';
import Control from '../../components/Control';

const App = () => {
  const [username, setUsername] = useState('');
  const [state, actions] = useClient();

  console.log('app render, state:', state);

  return (
    <div>
      Your Name is:
      <b>{state.username}</b>
      <br />
      Your ping is:
      <b>{`${state.ping} ms`}</b>
      <br />
      <input value={username} onChange={e => setUsername(e.target.value)} />
      <button
        onClick={() => {
          actions.setUsername(username);
        }}
        type="button"
      >
        change name
      </button>
      <Control
        onMove={(evt, data) => {
          if (data.direction) {
            actions.setDirection(data.direction.angle);
          }
        }}
      />
    </div>
  );
};

export default App;
