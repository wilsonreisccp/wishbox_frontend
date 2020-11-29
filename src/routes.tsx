import React from 'react';
import {Switch, Route} from 'react-router-dom'

import Home from './pages/Home'
import Friends from './pages/Friends'
import FormFriend from './pages/Friends/Forms'

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/home" exact component={Home} />
      <Route path="/friends" exact component={Friends} />
      
      <Route path="/friend_cad" exact component={FormFriend} />
      <Route path="/friend_cad/:id" exact component={FormFriend} />
    </Switch>
  );
}

export default Routes;