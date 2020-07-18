import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import React, { useEffect, useState } from 'react';
import { ChatService } from './chat.service';
import { IMessage } from './chat.types';
import Messages from './messages';
import NewMessage from './new-message';

const useStyles = makeStyles(theme => {console.log(theme); return ({
  main: {
    padding: theme.spacing(2),
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: `1fr auto`,
    gridGap: theme.spacing(1),
    justifyItems: 'stretch',
    alignItems: 'stretch',
    height: '100%',
    backgroundColor: theme.palette.grey[200]
  }
})});

export default function Chat () {
  const classes = useStyles();

  const [
    messages,
    setMessages
  ] = useState<IMessage[]>([]);

    
  useEffect(() => {
    const effect = (message: IMessage) => {
      setMessages(messages => [...messages, message]);
    };
    
    ChatService.subscribeToMessage(effect);
    
    return () => {
      ChatService.unsubscribeFromMessage(effect);
    };
    
  });
  
  
  const sendMessage = (content: string) => {
    
    const message: IMessage = { content };
    
    ChatService.sendMessage(message);
    
    message.isLocal = true;
    
    setMessages(messages => [...messages, message]);
  }
  

  return (
    <>
    <Container className={classes.main} maxWidth="md">
      <Messages messages={messages}/>
      <NewMessage sendMessage={sendMessage}/>
    </Container>
    </>
  );
};