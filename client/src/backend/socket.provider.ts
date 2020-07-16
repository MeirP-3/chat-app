import { apiConfig } from './backend.config';
import io from 'socket.io-client';

let _socket: SocketIOClient.Socket;

export const SocketProvider = {

  get socket() {
    if (!_socket) {
      _socket = io(apiConfig.BACKEND_HOST);
    }

    return _socket;
  }
};