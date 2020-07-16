import * as socketio from 'socket.io';
import * as http from 'http';


const port = process.env.PORT || 8080;

const httpServer = http.createServer();

const io = socketio(httpServer);

io.on('connection', async socket => {
  console.log('a new client has connected');

  socket.on('message', (data) => {
    console.log('New message!', data);
    socket.broadcast.send(data);
  });
});

httpServer.listen(port, () => {
  console.log(`Chat app server is listening on port ${port}`);
});