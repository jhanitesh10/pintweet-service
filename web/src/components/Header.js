import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { AppBar, Toolbar} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import TweetForm from './TweetForm';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Link to="/" >
              <HomeIcon />
            </Link>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(Header)