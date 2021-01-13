import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { PrivateRoute } from './routes'
import { Header } from './components';
import { HomeView, GameView, DonateView, LoginView, ErrorView } from './views';
import { AuthContextProvider, ForestContextProvider } from './context';
import { ToastContainer } from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {

  return (
    <div className="App">
      <Router>
        <AuthContextProvider>
          <ForestContextProvider>
            {/* <Header /> */}
            <ToastContainer
                autoClose={2000}
                position="top-right"
                className="toast-container"
                closeOnClick={true}
                pauseOnHover= {false}
                draggable={false}
              />
            <Switch>
              <Route exact path="/" component={HomeView} />
              <PrivateRoute exact path="/game" component={GameView} />
              <PrivateRoute exact path="/donate" component={DonateView} />
              <Route exact path="/login" component={LoginView} />
              <Route path="*" component={ErrorView} />
            </Switch>
          </ForestContextProvider>
        </AuthContextProvider>
      </Router>
    </div>
  );
}