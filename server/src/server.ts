import * as http from 'http';
import * as socketio from 'socket.io';

const connectedUsers = {};

const port = process.env.PORT || 8080;

const httpServer = http.createServer();

const io = socketio(httpServer);

io.use((socket, next) => {
  const { id, handshake: { query: { nickname } } } = socket;

  if (!nickname) {
    return next(new Error(`
      In order to use this service please connect as following:
      import io from 'socket.io-client';
      const socket = io(YOUR_SERVER_URL, {
        query: {
          nickname: YOUR_NICKNAME
        }
      });
    `));
  }

  if (!!connectedUsers[id]) {
    return next(new Error('Nickname in use. Please select another nickname'));
  }

  connectedUsers[id] = nickname;

  next();
});


io.on('connection', async socket => {
  const { id } = socket;

  const clientName = connectedUsers[id];

  socket.on('disconnect', () => {
    io.send({
      type: 'user disconnected',
      name: clientName
    });

    delete connectedUsers[id];
  });

  io.send({
    type: 'user connected',
    name: clientName,
    time: Date.now()
  });

  socket.on('message', ({ content }) => {
    const message = {
      type: 'message',
      content,
      from: clientName,
      time: Date.now()
    };

    socket.broadcast.send(message);
  });
});


httpServer.listen(port, () => {
  console.log(`Chat app server is listening on port ${port}`);
});