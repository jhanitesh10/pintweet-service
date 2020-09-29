import React, {useState} from 'react';
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import TweetCardList from '../components/TweetCardList'
import TweetForm from '../components/TweetForm'
import Loader from '../components/Loader'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import Divider from '@material-ui/core/Divider';
/* Graphql operations */
const LIST_TWEETS = gql` 
  query ListTweet($first: Int, $after: String){
    listTweet(first: $first, after: $after){
      nextToken
      pageInfo{
        hasNextPage
        endCursor
      }
      edges{
        node{
          id
          text
          userId
          created
          updated
          user{
            id
            name
            created
            updated
          }
        }
      }
    }
  } `

const NEW_TWEET = gql` 
  mutation AddTweet($id: ID!, $tweetInput: TweetInput!) {
    addTweet(id: $id, input: $tweetInput) {
      id
      text 
      created
      updated
    }
  }
`

const CREATE_USER = gql` 
  mutation CreateUser($id: ID!, $name: String!) {
    createUser(id: $id, name: $name) {
      id
      name
      created
      updated
    }
  }
`

const useStyles = makeStyles((theme) => ({
  dividerColor: {
    margin: '20px'
}, 
}));
// TODO: Handle
// Caching
// Optimistic upate
// Hydrate the storage on mutation
export default function Tweets() {
  const classes = useStyles();

  const { loading, error, data, fetchMore } = useQuery(LIST_TWEETS,
    {
      variables: {
        first: 5,
      },
      fetchPolicy: "cache-and-network"
    }
    );
  const [addTweet, newTweet] = useMutation(NEW_TWEET);
  const [createUser, newUser] = useMutation(CREATE_USER);
  
  const updateQuery = (previousResult, { fetchMoreResult }) => {
    if (!fetchMoreResult) {
      return previousResult;
    }
    const result = {
      listTweet: {
        "__typename": fetchMoreResult.listTweet.__typename,
        nextToken: fetchMoreResult.listTweet.nextToken,
        pageInfo: {
          "__typename": fetchMoreResult.listTweet.pageInfo.__typename,
          hasNextPage: fetchMoreResult.listTweet.pageInfo.hasNextPage,
          endCursor: fetchMoreResult.listTweet.pageInfo.endCursor,
        },
        edges: [
            ...previousResult.listTweet.edges,
            ...fetchMoreResult.listTweet.edges,
          
        ]
      }
    };
    return result;
  };
  const onSubmit = async (data)=> {
    if(data.name === "" && data.text==="")  {
      console.log("Enter the value");
      window.location.reload(false);
      return;
    }
    const user = {
      id: uuidv4(),
      name: data.name
    };
    const tweet = {
      id: uuidv4(),
      text: data.text,
      userId: user.id,
    };
    await createUser({ variables: { id: user.id, name: user.name}, })
    await addTweet({ variables: { id: tweet.id, tweetInput: {text: tweet.text, userId: tweet.userId}}, })
    window.location.reload(false);
  }

   
  if (loading) {
   return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
        <CircularProgress  />
      </div>
   ) 
  }
  
  if (error) {
    return <p>Eroor ococured!!</p>
  }
  
  return (
    <div>
        <TweetForm onSubmit={onSubmit}/> 
        <Divider classes={{root: classes.dividerColor}} />
        <TweetCardList tweets={data}/>
        {data.listTweet.pageInfo.hasNextPage && (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
       >
           <Button
              onClick={() =>
                fetchMore({
                  variables: {
                    after: data.listTweet.nextToken,
                  },
                  updateQuery,
                })
              }
                 variant="contained"
                 color="default"
                 className={classes.button}
                justifyContent='center' 
               >
                More 
            </Button>
            </Grid>
          )}
    </div>
  )
}