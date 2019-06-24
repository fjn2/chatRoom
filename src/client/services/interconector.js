import io from 'socket.io-client';

let socket;

const connect = (params) => {
  socket = io(params);
};
const send = (action, message) => new Promise((resolve) => {
  socket.emit(action, message, (resp) => {
    resolve(resp);
  });
  // TODO reject???
});

const subscribe = (action, fn) => {
  socket.on(action, fn);
};
// TODO use promise for subcribe??

const unsubscribe = (action) => {
  socket.off(action);
};


export default {
  connect,
  send,
  subscribe,
  unsubscribe
};
