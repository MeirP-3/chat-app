import React from 'react';
import { Card, makeStyles, CardContent, Typography } from '@material-ui/core';
import { IMessagesProps, IMessage } from './chat.types';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  messageContainer: {
    marginBottom: theme.spacing(1)
  },
  messageBody: {
    maxWidth: theme.breakpoints.width('sm')
  },
  defaultBg: {
    backgroundColor: theme.palette.background.default
  },
  successBg: {
    backgroundColor: theme.palette.success.light
  }
}));


export default function Messages({ messages }: IMessagesProps) {

  const classes = useStyles();

  const renderMessage = ({ content, isLocal }: IMessage, index: number) => (
    <div key={index} className={classes.messageContainer}>
      <Card className={
        clsx(classes.messageBody, isLocal ? classes.successBg : classes.defaultBg)
      }>
        <CardContent>
          <Typography component="p">
            {content}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
  


  return (
    <div>
      {messages.map(renderMessage)}
    </div>
  );
};