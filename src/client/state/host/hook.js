import React, { useContext, createContext } from 'react';
import PropTypes from 'prop-types';

import useHostInterconector from '../../services/useHostInterconector';

const StoreContext = createContext();

export const HostContext = ({ children }) => {
  const [state] = useHostInterconector();

  return (
    <StoreContext.Provider value={[{
      state
    }, {}]}
    >
      {children}
    </StoreContext.Provider>
  );
};

HostContext.propTypes = {
  children: PropTypes.node.isRequired
};

export const useHost = () => {
  const context = useContext(StoreContext);
  return context;
};
