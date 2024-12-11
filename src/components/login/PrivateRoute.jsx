import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { firebaseConfig } from '../../firebase/firebase';
import { getAuth } from "firebase/auth";
import Login from './Login';

const PrivateRoute = ({ children }) => {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  if (loading) {
    // You can show a loading spinner here
    return <div>Loading...</div>;
  }

  if (!user) {
    // If user is not authenticated, redirect to the login page
    // return <Navigate to="/signin" />;
    return <Login open={true}/>
  }

  // If user is authenticated, render the children components
  return children;
};

export default PrivateRoute;
