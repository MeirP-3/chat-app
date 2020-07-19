export interface IMessage {
  time: number
  type?: 'message' | 'user connected' | 'user disconnected'
  from?: string
  content?: string
  nickname?: string
  name?: string
};

export interface IMessagesProps {
  messages: IMessage[]
};

export interface INewMessageProps {
  sendMessage: (value: string) => void
};

export enum ChatActionType {
  MessageReceived = '[CHAT_ACTION] Message received',
  MessageSent = '[CHAT_ACTION] Message sent'
};

export interface ChatAction {
  type: ChatActionType,
  payload: IMessage
};

export interface ChatState {
  messages: IMessage[]
}

export interface IChatMessageProps {
  from: string,
  time: number,
  content: string,
  nickname: string,
};