import { AppBar, Container, CssBaseline, makeStyles, Toolbar, Typography, IconButton, Paper } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React, { useState } from 'react';
import Chat from './chat/chat';
import Login from './login';


const useStyles = makeStyles(theme => {
  console.log(theme);

  return {
    root: {
      height: '100%',
      display: 'grid',
      gridTemplateRows: 'auto 1fr',
    },
    appBar: {
      boxShadow: 'none'
    },
    title: {
      flexGrow: 1
    },
    main: {
      height: '100%',
      backgroundColor: theme.palette.grey[200],
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(1, 0, 0, 2)
    }
  };
});


function App() {

  const classes = useStyles();

  const [nickname, setNickname] = useState(sessionStorage.getItem('nickname'));

  const logOut = () => {
    sessionStorage.removeItem('nickname');
    setNickname(null);
  }

  return (
    // <ThemeProvider theme={theme}>
    <>
      <CssBaseline />

      <Container maxWidth="md" disableGutters className={classes.root}>

        <AppBar position="relative" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Chat app
            </Typography>
            <IconButton color="inherit" onClick={logOut}>
              <ExitToAppIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Paper elevation={0} square className={classes.main}>
          {
            nickname ?
              <Chat nickname={nickname} />
              :
              <Login setNickname={setNickname} />
          }
        </Paper>
      </Container>
    </>
    // </ThemeProvider>
  );
}

export default App;
