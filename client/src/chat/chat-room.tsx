import React, { useEffect, useState } from 'react';
import ChatMessage from './chat-message';
import { ChatService } from './chat.service';
import { IMessage } from './chat.types';
import NewMessage from './new-message';


export default function Room () {

  const [
    messages,
    setMessages
  ] = useState<IMessage[]>([]);

  
  const appendMessage = (message: IMessage) => {
    setMessages([...messages, message]);
  };


  useEffect(() => {
    const effect = (message: IMessage) => {
      appendMessage(message);
    };

    ChatService.subscribeToMessage(effect);

    return () => {
      ChatService.unsubscribeFromMessage(effect);
    };

  }, []);


  const sendMessage = (content: string) => {
    
    const message: IMessage = { content };

    ChatService.sendMessage(message);
    
    appendMessage(message);
  }
  

  return (
    <>
      {
        messages.map(
          ({ content }, index) => (
            <ChatMessage key={index} content={content} />
          )
        )
      }

      <NewMessage sendMessage={sendMessage}/>
    </>
  );
};