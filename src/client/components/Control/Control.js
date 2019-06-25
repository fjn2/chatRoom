import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactNipple from 'react-nipple';

function keyPressed(keyCode) {
  let direction;
  switch (keyCode) {
    case 37:
      if (direction !== 'right') {
        direction = 'left';
      }
      break;
    case 39:
      if (direction !== 'left') {
        direction = 'right';
      }
      break;
    case 38:
      if (direction !== 'down') {
        direction = 'up';
      }
      break;
    case 40:
      if (direction !== 'up') {
        direction = 'down';
      }
      break;
    default:
      break;
  }
  return direction;
}

const Control = ({ onMove }) => { // eslint-disable-line
  useEffect(() => {
    const readKeyboardButton = (e) => {
      console.log(e.keyCode);
      const direction = keyPressed(e.keyCode);
      onMove(null, {
        direction: {
          angle: direction
        }
      });
    };
    window.addEventListener('keydown', readKeyboardButton);

    return () => {
      window.removeEventListener('keydown', readKeyboardButton);
    };
  }, []);
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
