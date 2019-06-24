import { useState } from 'react';
import interconector from './interconector';


const useInterconector = (initialValue) => {
  const [value, setValue] = useState(initialValue); // initial value is a kind of falsy

  const messageNumber = Math.round(Math.random() * 100000); // replace for guid

  const setInterconectorValue = (newValue) => {
    interconector.send('message', {
      id: messageNumber,
      value: newValue
    });
  };

  interconector.subscribe('message', (data) => {
    if (data.id === messageNumber) {
      setValue(data.value);
    }
  });

  // TODO, define the unsubscribe
  // interconector.unsubscribe('message');

  return [value, setInterconectorValue];
};

export default useInterconector;
