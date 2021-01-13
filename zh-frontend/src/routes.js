import React from 'react';
import {
    Route, 
    Redirect
} from 'react-router-dom';
import { useAuthValue } from './context';

export const PrivateRoute = ({ component: Component, ...rest }) => {
    const { token } = useAuthValue();    
    return (
        <Route {...rest} render={(props) => (
        token
            ? <Component {...props} />
            : <Redirect to='/login' />
        )} />
    );
  }