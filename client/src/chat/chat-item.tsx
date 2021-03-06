import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import ChatMassage from './chat-message';
import { IMessage } from "./chat.types";


const useStyles = makeStyles(theme => ({
  notification: {
    padding: theme.spacing(0, 1),
    backgroundColor: theme.palette.grey[300],
    display: 'flex',
    flexDirection: 'column'
  }
}));


const ChatItem = (
  { message, nickname, avatarColorsMap }: { message: IMessage, nickname: string, avatarColorsMap: any }
) => {

  const classes = useStyles();

  const { type, from = '', time, content = '', name = '' } = message;

  let body;

  switch (type) {
    case 'message':
      body = (
        <ChatMassage
          nickname={nickname}
          from={from}
          time={time}
          content={content}
          avatarColorsMap={avatarColorsMap}
        />
      );
      break;

    // case 'user connected':
    //   body = (
    //     <>
    //     <Paper className={classes.notification}>
    //       <Typography variant="body1">
    //         {nickname === name ? 'you' : name} connected
    //       </Typography>
    //     </Paper>
    //     </>
    //   );
    //   break;

    // case 'user disconnected':
    //   body = (
    //     <Paper className={classes.notification}>
    //       <Typography variant="body1">
    //         {nickname === name ? 'you' : name} disconnected
    //       </Typography>
    //     </Paper>
    //   );
    //   break;

    default:
      // throw new Error(`Chat Item received unknown message type: ${type}`);
      body = <div></div>
  }

  return body;
};

export default ChatItem;