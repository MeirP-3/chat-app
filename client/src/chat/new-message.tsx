import React, { useState } from 'react';
import { ChatService } from './chat.service';
import { INewMessageProps } from './chat.types';
import { send } from 'process';

const NewMessage = ({ sendMessage }: INewMessageProps) => {

  const [newMessage, setNewMessage] = useState('');

  const send = () => {
    sendMessage(newMessage);
    setNewMessage('');
  };

  return (
    <>
      <div>
        <input
          placeholder="Type a message"
          value={newMessage}
          onChange={
            ({ target: { value } }) => setNewMessage(value)
          }
        />

        <button
          type="submit"
          disabled={!newMessage}
          onClick={() => send()}
        >
          &gt;
        </button>
      </div>
    </>
  );
};

export default NewMessage;