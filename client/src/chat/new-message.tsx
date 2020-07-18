import React, { useState } from 'react';
import { INewMessageProps } from './chat.types';
import { TextField, Button, Icon, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  actions: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  input: {
    marginBottom: theme.spacing(1)
  }
}));

const NewMessage = ({ sendMessage }: INewMessageProps) => {

  const classes = useStyles();

  const [newMessage, setNewMessage] = useState('');

  const send = () => {
    sendMessage(newMessage);
    setNewMessage('');
  };

  return (
      <form className={classes.actions} onSubmit={e => e.preventDefault()}>
        <TextField
          placeholder="Type a message"
          variant="outlined"
          autoFocus
          fullWidth
          // multiline
          className={classes.input}
          value={newMessage}
          onChange={
            ({ target: { value } }) => setNewMessage(value)
          }
        />

        <Button
          type="submit"
          size="large"
          variant="contained"
          color="primary"
          endIcon={<Icon>send</Icon>}
          onClick={() => !!newMessage && send()}
        >
          Send
        </Button>
      </form>
  );
};

export default NewMessage;