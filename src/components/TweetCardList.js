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

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *     featured: true,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
const list = [
  {
    id: 'twet-1', 
    text: 'My first tweet', 
    created: "20 January, 2020", 
    updated: "20 January, 2020",
    user: {
      id: 'user-1',
      name: 'Nitesh',
      created: "20 January, 2020", 
      updated: "20 January, 2020",
    },
  },
  {
    id: 'twet-2', 
    text: 'My first tweet', 
    created: "20 January, 2020", 
    updated: "20 January, 2020",
    user: {
      id: 'user-1',
      name: 'Nitesh',
      created: "20 January, 2020", 
      updated: "20 January, 2020",
    },
  },
  {
    id: 'twet-3', 
    text: 'My first tweet', 
    created: "20 January, 2020", 
    updated: "20 January, 2020",
    user: {
      id: 'user-1',
      name: 'Nitesh',
      created: "20 January, 2020", 
      updated: "20 January, 2020",
    },

  },
]
export default function AdvancedGridList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={200} spacing={1} className={classes.gridList}>
        {list.map((item) => (
          <TweetCard props={item}/>
        ))}
      </GridList>
    </div>
  );
}
