import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router'
import SendButton from './SendButton';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));

const TweetForm = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <div>
        <TextField
          id="outlined-margin-none"
          label="userName"
          placeholder="type.."
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-full-width"
          label="Tweet"
          style={{ margin: 8 }}
          placeholder="type.."
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <SendButton />
      </div>
    </div>
  );
}

export default withRouter(TweetForm)