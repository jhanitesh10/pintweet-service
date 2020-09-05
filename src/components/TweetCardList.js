import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import TweetCard from './TweetCard';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  icon: {
    color: 'white',
  },
}));
export default function AdvancedGridList({tweets}) {
  const classes = useStyles();
  const {
    listTweet: {
      edges,
    }
  } = tweets;
  return (
    <div className={classes.root}>
      <GridList cellHeight={200} spacing={1} className={classes.gridList}>
        {edges.map(({node}) => (
          <TweetCard key={node.id} item={node}/>
        ))}
      </GridList>
    </div>
  );
}
