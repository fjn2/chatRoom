const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const { throttle } = require('lodash'); // todo, implement this to send the state

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(`${process.cwd()}/src/client/clientIndex.html`);
});

app.get('/host', (req, res) => {
  res.sendFile(`${process.cwd()}/src/client/hostIndex.html`);
});

app.get('/client.js', (req, res) => {
  res.sendFile(`${process.cwd()}/dist/client.js`);
});
app.get('/host.js', (req, res) => {
  res.sendFile(`${process.cwd()}/dist/host.js`);
});

const users = [];
const hosts = [];

io.on('connection', (socket) => {
  if (socket.handshake.query.isHost) {
    hosts.push({
      socket,
      state: {}
    });
  } else {
    users.push({
      socket,
      state: {}
    });
  }

  socket.on('message', (msg) => {
    const currentUser = users.find(user => user.socket === socket);
    currentUser.state[msg.id] = msg.value;
    io.emit('message', msg);
    // send the new state to the host
    if (hosts[0]) {
      hosts[0].socket.emit('state', users.map(({ state }) => state));
    }
  });

  socket.on('disconnect', () => {
    const collection = socket.handshake.query.isHost ? hosts : users;
    const conectionToRemove = collection.find(
      elem => elem.socket === socket
    );
    collection.splice(collection.indexOf(conectionToRemove), 1);
  });
});

http.listen(port, () => {
  console.log('listening on *:', port);
});
