import React from 'react';
import PropTypes from 'prop-types';
import ReactNipple from 'react-nipple';

const Control = ({ onMove }) => { // eslint-disable-line
  return (
    <div>
      <ReactNipple
        options={{ mode: 'static', position: { top: '50%', left: '50%' } }}
        style={{
          outline: '1px dashed red',
          background: 'grey',
          width: 500,
          height: 500,
          position: 'relative'
        }}
        onMove={onMove}
      />
    </div>
  );
};

Control.propTypes = {
  onMove: PropTypes.func.isRequired
};

export default Control;
