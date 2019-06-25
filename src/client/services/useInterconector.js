import { useState } from 'react';
import interconector from './interconector';


const useInterconector = (initialValue, propertyName) => {
  const [value, setValue] = useState(initialValue); // initial value is a kind of falsy

  if (!propertyName) {
    throw new Error('The second argument is not defined (the property name)');
  }

  interconector.subscribe('message', (data) => {
    if (data.id === propertyName) {
      setValue(data.value);
    }
  });


  const setInterconectorValue = (newValue) => {
    interconector.send('message', {
      id: propertyName,
      value: newValue
    });
  };

  // TODO, define the unsubscribe
  // interconector.unsubscribe('message');

  return [value, setInterconectorValue];
};

export default useInterconector;
