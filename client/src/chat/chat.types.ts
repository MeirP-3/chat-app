export enum MessageType {
  Sent = '[MESSAGE_TYPE] SENT',
  Received = '[MESSAGE_TYPE] RECEIVED'
};

export interface IIncomingMessage {
  content: string
};

export interface IOutgoingMessage extends IIncomingMessage {};

export interface IMessageView {
  content: string,
  type: MessageType
};

export interface IMessagesProps {
  messages: IMessageView[]
};

export interface INewMessageProps {
  sendMessage: (value: string) => void
};

export enum ChatActionType {
  MessageReceived,
  MessageSent
};

export interface ChatAction {
  type: ChatActionType,
  payload: IIncomingMessage | IOutgoingMessage
}

export interface ChatState {
  messages: IMessageView[]
}