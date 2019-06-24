import React, {
  useState,
  useContext,
  createContext,
  useEffect
} from 'react';
import PropTypes from 'prop-types';

import useInterconector from '../../services/useInterconector';

const StoreContext = createContext();

const PING_SAMPLE_TIME = 1000;
let pingTimeoutRef;

export const ClientContext = ({ children }) => {
  const [username, setUsername] = useInterconector();
  const [ping, setPing] = useInterconector(0);

  useEffect(() => {
    const pingSampling = (date) => {
      const goingDate = new Date();
      setPing(goingDate - date);
      setTimeout(() => {
        pingTimeoutRef = pingSampling(goingDate.setMilliseconds(
          goingDate.getMilliseconds() + PING_SAMPLE_TIME // asuming no latency from the event loop
        ));
      }, PING_SAMPLE_TIME);
    };

    pingTimeoutRef = pingSampling(new Date());

    return () => {
      clearTimeout(pingTimeoutRef);
    };
  }, []);

  return (
    <StoreContext.Provider value={[{
      username,
      ping
    }, {
      setUsername
    }]}
    >
      {children}
    </StoreContext.Provider>
  );
};

ClientContext.propTypes = {
  children: PropTypes.node.isRequired
};

export const useClient = () => {
  const context = useContext(StoreContext);
  return context;
};
