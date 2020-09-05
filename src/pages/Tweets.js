import React from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import TweetCardList from '../components/TweetCardList'
import TweetForm from '../components/TweetForm'
import Loader from '../components/Loader'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

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

const NEW_TEET = gql` 
  mutation AddTweet($id: ID!, $tweetInput: TweetInput!) {
    addTweet(id: $id, input: $tweetInput) {
      id
      text 
      created
      updaated
    }
  }
`

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));
export default function Tweets() {
  const classes = useStyles();

  const { loading, error, data, fetchMore } = useQuery(LIST_TWEETS,
    {
      variables: {
        first: 2,
      },
      fetchPolicy: "cache-and-network"
    }
    );
  const [createPet, newPet] = useMutation(NEW_TEET, {
    // update(cache, { data: { addTweet } }) {
    //   const data = cache.readQuery({ query: LIST_TWEETS})
    //   cache.writeQuery({
    //     query: LIST_TWEETS,
    //     data: {pets: [addTweet, data.tweets]}
    //   })
    // }
  });

  
  const updateQuery = (previousResult, { fetchMoreResult }) => {
    if (!fetchMoreResult) {
      return previousResult;
    }
    console.log(fetchMoreResult.listTweet.edges); 
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
  const onSubmit = input => {
    createPet({
      variables: { newPet: input },
      optimisticResponse: {
        __typename: 'Mutation',
        addPet: {
          __typename: 'Pet',
          id: Math.floor(Math.random() * 10000 + ""),
          name: input.name,
          type: input.type,
          img: 'https://via.placeholder.com/300'

        }
      }
    })
  }

   
  if (loading) {
    return <Loader />
  }
  
  if (error || newPet.error) {
    return <p>Eroor ococured!!</p>
  }
  
  return (
    <div className="page pets-page">
      <section>
        <div className="row betwee-xs middle-xs">
          <div className="col-xs-10">
            <h1>Tweets</h1>
          </div>
          <div className="col-xs-2">
            <TweetForm onSubmit={onSubmit}/> 
          </div>
        </div>
      </section>
      <section>
        <TweetCardList tweets={data}/>
        {data.listTweet.pageInfo.hasNextPage && (
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
                //  startIcon={<CloudUploadIcon />}
               >
                More 
            </Button>
          )}
      </section>
    </div>
  )
}