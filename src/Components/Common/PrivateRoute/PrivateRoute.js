import React from 'react';
import { Redirect } from '@reach/router';

function PrivateRoute({ component: Component, ...rest }) {
  return (
    localStorage.getItem('REACTAPP.TOKEN') ? <Component {...rest} /> : <Redirect from="" to="/login" noThrow />
  )
}

export default PrivateRoute
