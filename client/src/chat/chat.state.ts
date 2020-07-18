import { ChatAction, ChatActionType, ChatState, MessageType } from "./chat.types";


export const chatInitialState = { messages: [] };


export const chatReducer = (
  
  { messages }: ChatState,

  { type, payload: { content } }: ChatAction

): ChatState => {
  
  switch (type) {

    case ChatActionType.MessageReceived:
      return {
        messages: [
          ...messages,
          {
            content,
            type: MessageType.Received
          }
        ]
      };

    case ChatActionType.MessageSent:
      return {
        messages: [
          ...messages,
          {
            content,
            type: MessageType.Sent
          }
        ]
      };

    default: throw new Error('Chat reducer received actions with wrong type');
  }
};