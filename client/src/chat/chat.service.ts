import { SocketProvider } from "../backend/socket.provider";
import { IOutgoingMessage } from "./chat.types";

export class ChatService {
  private static _messageEmitter: SocketIOClient.Emitter;

  private static get messageEmitter() {
    if (!this._messageEmitter) {
      this._messageEmitter = SocketProvider.socket.on('message', (data: any) => {
        console.log('chat service received data', data);
      });
    }

    return this._messageEmitter;
  }

  static subscribeToMessage(listener: Function) {
    this.messageEmitter.addEventListener('message', listener);
  }

  static unsubscribeFromMessage(listener: Function) {
    this.messageEmitter.removeEventListener('message', listener);
  }

  static sendMessage(message: IOutgoingMessage) {
    SocketProvider.socket.send(message);
  }
}