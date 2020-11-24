import { client } from '../store/apollo';

export const login = () => {
  localStorage.setItem('loggedIn', 'true');
};

export const logout = () => {
  localStorage.setItem('loggedIn', 'false');
  client.resetStore();
};
