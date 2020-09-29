import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TweetCard from './TweetCard';
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

export default function TweetCardList({tweets}) {
  const classes = useStyles();
  const {
    listTweet: {
      edges,
    }
  } = tweets;
  return (
    <List className={classes.root}>
        {edges.map(({node}) => (
         <> 
          <TweetCard key={node.id} tweet={node}/>
           <Divider ariant="inset" component="li" />
         </>
         ))}
    </List>
  );
}
