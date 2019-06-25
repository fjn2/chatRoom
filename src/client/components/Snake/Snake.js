import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import P5 from 'p5';
import 'p5/lib/addons/p5.dom'; // do not remove p5DOM

let snakes = [];
const diff = 10;

const avatarColors = [
  '#E27D7A',
  '#F27E18',
  '#FEDF71',
  '#8FB676',
  '#7FAFD0',
  '#9FA2A6'
];

const getColorByName = (name) => {
  const numberByName = [...name].reduce((acc, val) => (
    acc + val.charCodeAt(0)
  ), 0);

  return avatarColors[(numberByName % avatarColors.length)];
};

function addSnake(username) {
  const newSnake = {
    numSegments: 10,
    xStart: 0,
    yStart: 250,
    direction: 'right',
    xCor: [],
    yCor: [],
    username,
    color: getColorByName(username)
  };

  for (let i = 0; i < newSnake.numSegments; i += 1) {
    newSnake.xCor.push(newSnake.xStart + i * diff);
    newSnake.yCor.push(newSnake.yStart);
  }

  snakes.push(newSnake);
}
function removeSnake(snake) {
  const index = snakes.indexOf(snake);
  if (index > -1) {
    snakes.splice(snakes.indexOf(snake), 1);
  }
}

const Snake = ({ users }) => {
  const canvasEl = useRef();
  const [, setP5Instance] = useState();

  useEffect(() => {
    if (!users || users.length === 0) {
      return;
    }

    // check if it needed to add a snake
    users.forEach((user) => {
      if (user.username) {
        if (!snakes.find(snake => snake.username === user.username)) {
          addSnake(user.username);
        }
      }
    });
    // check if it needed to remove a snake
    snakes.forEach((snake) => {
      const user = users.find(u => u.username === snake.username);
      if (!user) {
        removeSnake(snake.username);
      } else {
        // if the user exists, then, update the snake direction
        if (snake.direction === 'right' && user.direction === 'left') {
          return;
        }
        if (snake.direction === 'left' && user.direction === 'right') {
          return;
        }
        if (snake.direction === 'up' && user.direction === 'down') {
          return;
        }
        if (snake.direction === 'down' && user.direction === 'up') {
          return;
        }

        snake.direction = user.direction;
      }
    });


  }, [users]);

  useEffect(() => {
    // const snakes = [{
    //   numSegments: 10,
    //   xStart: 0,
    //   yStart: 250,
    //   direction: 'right',
    //   xCor: [],
    //   yCor: []
    // }, {
    //   numSegments: 10,
    //   xStart: 0,
    //   yStart: 40,
    //   direction: 'right',
    //   xCor: [],
    //   yCor: []
    // }];

    if (canvasEl && canvasEl.current) {
      const myp5 = new P5((p) => {
        let xFruit = 0;
        let yFruit = 0;
        let scoreElem;

        function updateFruitCoordinates() {
          xFruit = p.floor(p.random(10, (p.width - 100) / 10)) * 10;
          yFruit = p.floor(p.random(10, (p.height - 100) / 10)) * 10;
        }

        function updateSnakeCoordinates(snake) {
          const {
            xCor,
            yCor,
            numSegments,
            direction
          } = { ...snake };

          for (let i = 0; i < numSegments - 1; i += 1) {
            xCor[i] = xCor[i + 1];
            yCor[i] = yCor[i + 1];
          }
          switch (direction) {
            default:
            case 'right':
              xCor[numSegments - 1] = xCor[numSegments - 2] + diff;
              yCor[numSegments - 1] = yCor[numSegments - 2];
              break;
            case 'up':
              xCor[numSegments - 1] = xCor[numSegments - 2];
              yCor[numSegments - 1] = yCor[numSegments - 2] - diff;
              break;
            case 'left':
              xCor[numSegments - 1] = xCor[numSegments - 2] - diff;
              yCor[numSegments - 1] = yCor[numSegments - 2];
              break;
            case 'down':
              xCor[numSegments - 1] = xCor[numSegments - 2];
              yCor[numSegments - 1] = yCor[numSegments - 2] + diff;
              break;
          }

          return {
            ...snake,
            xCor,
            yCor,
            numSegments,
            direction
          };
        }

        function checkSnakeCollision({
          xCor,
          yCor,
        }, {
          headX,
          headY
        }) {
          for (let i = 0; i < xCor.length - 1; i += 1) {
            if (xCor[i] === headX && yCor[i] === headY) {
              return true;
            }
          }
          return false;
        }

        function resetSnake(snake) {
          // snake.xStart = 0; // eslint-disable-line
          // snake.xStart = 250; // eslint-disable-line
          // snake.direction = 'right'; // eslint-disable-line
          // snake.xCor = []; // eslint-disable-line
          // snake.yCor = []; // eslint-disable-line
          // snake.numSegments = 10; // eslint-disable-line

          // scoreElem = p.createDiv('Score = 0');
          // scoreElem.position(20, 20);
          // scoreElem.id = 'score';
          // scoreElem.style('color', 'red');

          // for (let i = 0; i < snake.numSegments; i += 1) {
          //   snake.xCor.push(snake.xStart + i * diff);
          //   snake.yCor.push(snake.yStart);
          // }
          removeSnake(snake);
          addSnake(snake.username);
        }

        function checkGameStatus(snake) {
          const {
            xCor,
            yCor,
          } = snake;
          const checkAllSnakeColission = snakes.map(sn => checkSnakeCollision(sn, {
            headX: xCor[xCor.length - 1],
            headY: yCor[yCor.length - 1]
          }));
          console.log('checkAllSnakeColission', checkAllSnakeColission);

          return (
            xCor[xCor.length - 1] > p.width || xCor[xCor.length - 1] < 0
            || yCor[yCor.length - 1] > p.height
            || yCor[yCor.length - 1] < 0 || checkAllSnakeColission.includes(true)
          );
        }

        /*
        Whenever the snake consumes a fruit, I increment the number of segments,
        and just insert the tail segment again at the start of the array (basically
        I add the last segment again at the tail, thereby extending the tail)
        */

        function checkForFruit(snake) {
          const {
            xCor,
            yCor,
            numSegments
          } = { ...snake };
          let segmentIncrementCounter = 0;
          p.stroke(p.color(255, 255, 255));
          p.point(xFruit, yFruit);
          if (xCor[xCor.length - 1] === xFruit && yCor[yCor.length - 1] === yFruit) {
            xCor.unshift(xCor[0]);
            yCor.unshift(yCor[0]);
            segmentIncrementCounter += 1;
            updateFruitCoordinates();
          }

          snake.numSegments = numSegments + segmentIncrementCounter;
        }

        p.setup = () => { // eslint-disable-line
          p.createCanvas(500, 500);
          p.frameRate(20);
          p.stroke(255);
          p.strokeWeight(10);
          updateFruitCoordinates();
        };

        p.draw = () => { // eslint-disable-line
          p.background(0);
          // console.log('snakes', snakes);
          snakes.forEach((snake) => {
            for (let i = 0; i < snake.numSegments - 1; i += 1) {
              p.stroke(p.color(snake.color));
              p.line(snake.xCor[i], snake.yCor[i], snake.xCor[i + 1], snake.yCor[i + 1]);
            }
            updateSnakeCoordinates(snake);
            const hasLost = checkGameStatus(snake);
            checkForFruit(snake);
            if (hasLost) {
              snake.hasLost = true;
            }
          });
          snakes = snakes.filter(snake => !snake.hasLost);
        };
      }, canvasEl.current);

      setP5Instance(myp5);
    }
  }, [canvasEl]);

  return <div style={{ margin: 'auto', width: '500px' }} ref={canvasEl} />;
};

Snake.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};


export default Snake;
