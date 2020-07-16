import React from 'react';
import { IMessage } from './chat.types';


const ChatMessage = ({ content }: IMessage) => (
  <p>
    {content}
  </p>
);

export default ChatMessage;