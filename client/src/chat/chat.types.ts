export interface IMessage {
  content: string,
  isLocal?: true
};

export interface IMessagesProps {
  messages: IMessage[]
};

export interface INewMessageProps {
  sendMessage: (value: string) => void
};