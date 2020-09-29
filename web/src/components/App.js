import { Switch, Route } from 'react-router-dom'
import React, {Fragment} from 'react'
import Header from './Header';
import Tweets from '../pages/Tweets';
const App = () => (
  <Fragment>
    <Header />
    <div>
      <Switch>
        <Route exact path="/" component={Tweets} />
      </Switch>
    </div>
  </Fragment>
)

export default App