import React from 'react';
import { Redirect } from 'react-router-dom';
import { logout } from '../helper/login';

export const Logout: React.FC = () => {
  logout();
  return <Redirect to="/" />;
};
