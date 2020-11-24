import React from 'react';
import {Switch, Route} from 'react-router-dom'

import Home from './pages/Home'
import Friends from './pages/Friends'

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/home" exact component={Home} />
      <Route path="/friends" exact component={Friends} />
    </Switch>
  );
}

export default Routes;