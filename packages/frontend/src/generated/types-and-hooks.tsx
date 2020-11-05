import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  helloWorld: Scalars['String'];
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addUser: Scalars['Boolean'];
  loginUser?: Maybe<Scalars['String']>;
};

export type MutationAddUserArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type MutationLoginUserArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type LoginTokenQueryVariables = Exact<{ [key: string]: never }>;

export type LoginTokenQuery = { __typename?: 'Query' } & Pick<Query, 'token'>;

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;

export type LoginMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'loginUser'
>;

export const LoginTokenDocument = gql`
  query loginToken {
    token @client
  }
`;

/**
 * __useLoginTokenQuery__
 *
 * To run a query within a React component, call `useLoginTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginTokenQuery({
 *   variables: {
 *   },
 * });
 */
export function useLoginTokenQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    LoginTokenQuery,
    LoginTokenQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<LoginTokenQuery, LoginTokenQueryVariables>(
    LoginTokenDocument,
    baseOptions
  );
}
export function useLoginTokenLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    LoginTokenQuery,
    LoginTokenQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    LoginTokenQuery,
    LoginTokenQueryVariables
  >(LoginTokenDocument, baseOptions);
}
export type LoginTokenQueryHookResult = ReturnType<typeof useLoginTokenQuery>;
export type LoginTokenLazyQueryHookResult = ReturnType<
  typeof useLoginTokenLazyQuery
>;
export type LoginTokenQueryResult = ApolloReactCommon.QueryResult<
  LoginTokenQuery,
  LoginTokenQueryVariables
>;
export const LoginDocument = gql`
  mutation login($email: String!, $password: String!) {
    loginUser(email: $email, password: $password)
  }
`;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<
  LoginMutation
>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
