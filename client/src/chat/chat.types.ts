export interface IMessage {
  content: string
};

export interface IChatProps {
  messages: IMessage[]
};

export interface INewMessageProps {
  sendMessage: (value: string) => void
};