import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '60%',
    margin: '2% 20% 0 20%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const TweetCard = ({tweet}) => {
  const classes = useStyles();
  const {name} = tweet.user;
  const nameTag = name.charAt(0); 
  const created = tweet.created;
  const text = tweet.text;
  
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={nameTag} src="/static/images/avatar/2.jpg" />
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
             @{created} 
            </Typography>
            - {text}
          </React.Fragment>
        }
      />
    </ListItem>
  );
}

export default withRouter(TweetCard)