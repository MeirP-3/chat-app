import React from 'react';
import ChatMassage from './chat-message';
import { IMessage } from "./chat.types";
import { Paper, Box, makeStyles, Typography } from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  notification: {
    padding: theme.spacing(0, 1),
    backgroundColor: theme.palette.grey[300],
    display: 'flex',
    flexDirection: 'column'
  }
}));

const ChatItem = (
  { message, nickname }: { message: IMessage, nickname: string }
) => {

  const classes = useStyles();

  const { type, from = '', time, content = '', name = '' } = message;

  let body, justifyContent;

  switch (type) {
    case 'message':
      justifyContent = from === nickname ? 'flex-end' : 'flex-start';
      body = (
        <ChatMassage
          nickname={nickname}
          from={from}
          time={time}
          content={content}
        />
      );
      break;

    case 'user connected':
      body = (
        <>
        <Paper className={classes.notification}>
          <Typography variant="body1">
            {nickname === name ? 'you' : name} connected
          </Typography>
        </Paper>
        </>
      );
      break;

    case 'user disconnected':
      body = (
        <Paper className={classes.notification}>
          <Typography variant="body1">
            {name} disconnected
          </Typography>
        </Paper>
      );
      break;

    default:
      throw new Error(`Chat Item received unknown message type: ${type}`);
  }

  return (
    <Box
      display="flex"
      justifyContent={justifyContent || 'center'}
      marginBottom={2}
    >
      {body}
    </Box>
  )
};

export default ChatItem;