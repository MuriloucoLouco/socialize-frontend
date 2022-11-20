import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './routes/NotFound.js';
import Feed from './routes/Feed.js';
import Login from './routes/Login.js';
import Register from './routes/Register.js';
import User from './routes/User.js';
import Comments from './routes/Comments.js';

import './styles/main.css';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Feed />
        </Route>
        <Route exact path="/feed">
          <Feed />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="/post">
          <Comments />
        </Route>
        <Route path="/user">
          <User />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  )
}
 