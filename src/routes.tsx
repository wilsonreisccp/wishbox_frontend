import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Friends from './pages/Friends'
import Wishes from './pages/Wishes'
import FormFriend from './pages/Friends/Forms'
import FormWish from './pages/Wishes/Forms'

const Routes: React.FC = () => {
  return (
      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/friends" exact component={Friends} />
        <Route path="/friends/:friend_id/wishes/" exact component={Wishes} />

        <Route path="/friend_cad" exact component={FormFriend} />
        <Route path="/friend_cad/:id" exact component={FormFriend} />

        <Route path="/friends/:friend_id/wish_cad" exact component={FormWish} />
        <Route path="/friends/:friend_id/wish_cad/:uid" exact component={FormWish} />
      </Switch>

  );
}

export default Routes;