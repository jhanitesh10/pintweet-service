import { Switch, Route } from 'react-router-dom'
import React, {Fragment} from 'react'
import Header from './Header';


const App = () => (
  <Fragment>
    <Header />
    {/* <div>
      <Switch>
        <Route exact path="/" component={Pets} />
      </Switch>
    </div> */}
  </Fragment>
)

export default App