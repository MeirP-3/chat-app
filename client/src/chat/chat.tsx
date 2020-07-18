import { Box, Card, CardContent, makeStyles, Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import React, { useEffect, useLayoutEffect, useReducer, useRef } from 'react';
import { ChatService } from './chat.service';
import { chatInitialState, chatReducer } from './chat.state';
import { ChatActionType, IMessageView, MessageType } from './chat.types';
import NewMessage from './new-message';


const useStyles = makeStyles(theme => {
  console.log(theme); return ({
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
  })
});

export default function Chat() {
  const classes = useStyles();

  const [
    { messages },
    dispatch
  ] = useReducer(
    chatReducer,
    chatInitialState
  );

  useEffect(() => {
    const onReceive = (message: IMessageView) => {
      dispatch({
        type: ChatActionType.MessageReceived,
        payload: message
      });
    };

    ChatService.subscribeToMessage(onReceive);

    return () => {
      ChatService.unsubscribeFromMessage(onReceive);
    };

  }, []);


  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(function scrollToBottom() {
    if (
      null !== ref.current
    ) {
      ref
        .current
        .scrollIntoView();
    }
  }, [messages]);

  const sendMessage = (content: string) => {

    ChatService.sendMessage({ content });

    dispatch({
      type: ChatActionType.MessageSent,
      payload: {
        content
      }
    });
  }


  return (
    <Container className={classes.main} maxWidth="md">
      <Box
        flexGrow={1}
        paddingX={8}
        overflow="auto"
      >
        {
          messages.map(({ content, type }, index) => {

            let justifyContent, bgcolor;

            switch (type) {
              case MessageType.Received:
                justifyContent = 'flex-start';
                bgcolor = 'background.paper'
                break;

              case MessageType.Sent:
                justifyContent = 'flex-end';
                bgcolor = 'success.light';
                break;
            }

            return (
              <Box
                display="flex"
                justifyContent={justifyContent}
                marginBottom={2}
                key={index}
              >
                <Box
                  bgcolor={bgcolor}
                  component={Card}
                  maxWidth={600}
                >
                  <CardContent>
                    <Typography>
                      {content}
                    </Typography>
                  </CardContent>
                </Box>
              </Box>
            );
          })
        }
        <div ref={ref} />
      </Box>
      <NewMessage sendMessage={sendMessage} />
    </Container>
  );
};