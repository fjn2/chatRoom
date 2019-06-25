import { useState, useEffect } from 'react';
import interconector from './interconector';


const useHostInterconector = () => {
  const [value, setValue] = useState(); // initial value is a kind of falsy

  const setInterconectorValue = () => {
    // TODO check if this has sense
  };

  useEffect(() => {
    interconector.subscribe('state', (data) => {
      setValue(data);
    });
  }, []);

  // TODO, define the unsubscribe
  // interconector.unsubscribe('message');

  return [value, setInterconectorValue];
};

export default useHostInterconector;
