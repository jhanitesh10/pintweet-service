import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router'
import SendButton from './SendButton';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

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

const TweetForm = ({onSubmit}) => {
  const classes = useStyles();
  const [userName, setUserName] = useState('');
  const [text, setText] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({name: userName, text})
  }

  return (
    <div className={classes.root}>
      <div>
      <form onSubmit={handleSubmit} >

        <TextField
          id="outlined-margin-none"
          label="userName"
          placeholder="type.."
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onInput={ e=>setUserName(e.target.value)}
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
          onInput={ e=>setText(e.target.value)}
          variant="outlined"
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
          endIcon={<Icon>send</Icon>}
        >
        Send
      </Button>
        </ form>
      </div>
    </div>
  );
}

export default withRouter(TweetForm)