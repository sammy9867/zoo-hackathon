import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { Header} from './components';
import { Home, Donate, Login, Game, Error } from './views';
import './App.css';

export const App = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/game" component={Game} />
          <Route exact path="/donate" component={Donate} />
          <Route path="*" component={Error} />
        </Switch>
      </Router>
    </div>
  );
}