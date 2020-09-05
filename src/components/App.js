import { Switch, Route } from 'react-router-dom'
import React, {Fragment} from 'react'
import Header from './Header';
import TweetCardList from './TweetCardList';
import TweetForm from './TweetForm';

const App = () => (
  <Fragment>
    <Header />
    <div>
      <TweetForm />
      <Switch>
        <Route exact path="/" component={TweetCardList} />
      </Switch>
    </div>
  </Fragment>
)

export default App