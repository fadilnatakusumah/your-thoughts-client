import jwtDecode from "jwt-decode";
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// let authenticated;

// const token = localStorage.FBIdToken;
// if(token){
//   const decodeToken = jwtDecode(token);
//   if(decodeToken.exp * 1000 < Date.now()){
    
//   }
// }

function RouteGuard({ authenticated, ...rest }) {
  if (authenticated) {
    return (
      <Route {...rest} />
    )
  }
  return <Redirect to="/" />
}

export default RouteGuard
