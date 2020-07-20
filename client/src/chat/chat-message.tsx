import { Avatar, Box, makeStyles, Paper, Typography, Theme, Color } from '@material-ui/core';
import React from 'react';
import { IChatMessageProps } from './chat.types';
import { orange, purple, blue, yellow, green, red, pink, brown } from '@material-ui/core/colors';
import clsx from 'clsx';

const paint = (theme: Theme, color: Color) => {
  return {
    color: theme.palette.getContrastText(color[600]),
    backgroundColor: color[600]
  };
}


const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(0, 1)
  },
  orange: paint(theme, orange),
  purple: paint(theme, purple),
  blue: paint(theme, blue),
  yellow: paint(theme, yellow),
  green: paint(theme, green),
  red: paint(theme, red),
  pink: paint(theme, pink),
  brown: paint(theme, brown),
}));


const ChatMassage = (
  {
    from,
    time,
    content,
    nickname,
    avatarColorsMap
  }: IChatMessageProps
) => {
  const classes = useStyles();

  let bgcolor,
    flexDirection;

  if (from === nickname) {
    bgcolor = 'grey.300';
    flexDirection = 'row-reverse';
  } else {
    bgcolor = 'background.paper';
    flexDirection = 'row';
  }

  const colorClassName = avatarColorsMap[from];

  return (
    <Box
      display="flex"
      flexDirection={flexDirection}
      marginBottom={2}
    >
      <Avatar className={clsx(classes.avatar, (classes as any)[colorClassName])}>
        {from[0].toUpperCase()}
      </Avatar>
      <Box
        maxWidth="700px"
        padding={1}
        component={Paper}
        bgcolor={bgcolor}
      >
        <Typography variant="subtitle2" color="primary">
          {from}
        </Typography>
        <Typography>
          {content}
        </Typography>
        {/* <CardHeader
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
        </CardContent> */}
      </Box>
    </Box>
  );
};

export default ChatMassage;