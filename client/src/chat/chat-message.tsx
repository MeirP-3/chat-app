import { Avatar, Box, Card, CardContent, CardHeader } from '@material-ui/core';
import React from 'react';
import { IChatMessageProps } from './chat.types';
import TimeFromNow from '../shared/time-from-now';

const ChatMassage = ({ from, time, content, nickname }: IChatMessageProps) => {
  
  let bgcolor;
  if (from === nickname) {
    bgcolor = 'success.light';
  } else {
    bgcolor = 'background.paper'
  }

  return (
    <Box
      bgcolor={bgcolor}
      maxWidth={600}
      component={Card}
      padding={1}
    >
      <CardHeader
        avatar={
          <Avatar>
            M
              </Avatar>
        }
        titleTypographyProps={{ variant: "body2", color: "primary" }}
        title={from.toUpperCase()}
        subheaderTypographyProps={{ variant: "caption" }}
        subheader={<TimeFromNow time={time}/>}
      />
      <CardContent>
        {content}
      </CardContent>
    </Box>
  );
};

export default ChatMassage;