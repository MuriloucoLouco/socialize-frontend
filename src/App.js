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
    <>
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
      <div className="copyright">
        <span>Socialize</span>
        <span>Copyright (C) 2022 Murilo Leandro Garcia</span>
        <span>(<a href="https://github.com/MuriloucoLouco">https://github.com/MuriloucoLouco</a>)</span>
        <span className="gnu">Este programa é um software livre: você pode redistribuí-lo e/ou
          modificá-lo sob os termos da Licença Pública Geral GNU, conforme
          publicado pela Free Software Foundation, seja a versão 3 da Licença
          ou (a seu critério) qualquer versão posterior.

          Este programa é distribuído na esperança de que seja útil,
          mas SEM QUALQUER GARANTIA; sem a garantia implícita de
          COMERCIALIZAÇÃO OU ADEQUAÇÃO A UM DETERMINADO PROPÓSITO. Veja a
          Licença Pública Geral GNU para obter mais detalhes.

          Você deve ter recebido uma cópia da Licença Pública Geral GNU
          junto com este programa. Se não, veja <a href="https://www.gnu.org/licenses/">https://www.gnu.org/licenses/</a>.
        </span>
      </div>
    </>
  )
}
 