import { Switch, Route } from 'react-router-dom'
import React, {Fragment} from 'react'
import Header from './Header';
import TweetCardList from './TweetCardList';

const App = () => (
  <Fragment>
    <Header />
    <div>
      <Switch>
        <Route exact path="/" component={TweetCardList} />
      </Switch>
    </div>
  </Fragment>
)

export default App