import React, { useState } from 'react';
import { useClient } from '../../state/client/hook';

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
      <b>{state.ping}</b>
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
    </div>
  );
};

export default App;
