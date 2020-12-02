import fetch from 'cross-fetch';
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  from,
  fromPromise
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { token } from './cache';
import { login, logout } from '../helper/login';

const getAccessToken = async () => {
  // TODO: production url
  const res = await fetch('http://localhost:4000/refresh_token', {
    method: 'POST',
    credentials: 'include'
  });

  const data = await res.json();

  if (data.ok) {
    // Set new access token
    token(data.accessToken);
    login();
    return data.accessToken;
  }
  // Invalid refresh token, remove token
  token(undefined);
  logout();
  return undefined;
};

const refreshTokenLink = onError(({ forward, operation, graphQLErrors }) => {
  if (graphQLErrors) {
    for (const error of graphQLErrors) {
      if (
        error.message ===
        'Access denied! You need to be authorized to perform this action!'
        // error.extensions?.code === 'UNAUTHENTICATED'
      ) {
        if (localStorage.getItem('loggedIn') === 'true')
          return (
            fromPromise(getAccessToken())
              .filter((value) => !!value)
              // retry initial operation if access token was reset
              .flatMap(() => forward(operation))
          );
      }
    }
  }
});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }: any) => {
    if (token()) {
      return {
        headers: {
          ...headers,
          authorization: token()
        }
      };
    }
    return { headers };
  });
  return forward(operation);
});

export const client = new ApolloClient({
  link: from([
    refreshTokenLink,
    authLink,
    new HttpLink({
      uri:
        process.env.NODE_ENV === 'production'
          ? 'https://glootie-api.herokuapp.com/graphql'
          : 'http://localhost:4000/graphql',
      fetch,
      credentials: 'include'
    })
  ]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          token: {
            read() {
              return token();
            }
          }
        }
      }
    }
  })
});
