import { ChatAction, ChatActionType, ChatState } from "./chat.types";


export const chatInitialState = { messages: [] };


export const chatReducer = (
  
  { messages }: ChatState,

  { type, payload }: ChatAction

): ChatState => {
  
  switch (type) {
    case ChatActionType.MessageSent:
    case ChatActionType.MessageReceived:
      return {
        messages: [
          ...messages,
          payload
        ]
      };

    default: throw new Error('Chat reducer received actions with wrong type');
  }
};