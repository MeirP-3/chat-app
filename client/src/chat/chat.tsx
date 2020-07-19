import { Box, makeStyles } from '@material-ui/core';
import React, { useEffect, useLayoutEffect, useReducer, useRef, useState } from 'react';
import io from 'socket.io-client';
import { apiConfig } from '../backend/backend.config';
import ChatItem from './chat-item';
import { chatInitialState, chatReducer } from './chat.state';
import { ChatActionType, IMessage } from './chat.types';
import NewMessage from './new-message';

const useStyles = makeStyles(theme => ({
}));



export default function Chat({ nickname }: any) {

  const classes = useStyles();

  const [socket] = useState(() =>
    io(
      apiConfig.BACKEND_HOST, { query: { nickname } }
    )
  );

  const [
    { messages },
    dispatch
  ] = useReducer(
    chatReducer,
    chatInitialState
  );

  useEffect(() => {
    socket.on('reconnect_attempt', () => {
      console.log('reconnecting...')
      socket.io.opts.query = {
        nickname
      };
    });

    socket.on('message', (message: IMessage) => {
      dispatch({
        type: ChatActionType.MessageReceived,
        payload: message
      });
    });

    return () => {
      socket.disconnect();
    };

  }, []);


  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(function scrollToBottom() {
    if (
      null !== ref.current
    ) {
      ref
        .current
        .scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = (content: string) => {

    socket.send({ content });

    dispatch({
      type: ChatActionType.MessageSent,
      payload: {
        type: 'message',
        content,
        from: nickname,
        time: Date.now()
      }
    });
  }

  return (
    <>
      <Box flexGrow={1} paddingRight={2}>
        {
          messages.map((message, index) => (
            <ChatItem
              key={index}
              nickname={nickname}
              message={message}
            />
          ))
        }
      </Box>
      <div ref={ref} />
      <NewMessage sendMessage={sendMessage} />
    </>
  );
};