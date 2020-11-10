import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  sleepData: Array<SleepDatum>;
  token: Scalars['String'];
};

export type SleepDatum = {
  __typename?: 'SleepDatum';
  id: Scalars['ID'];
  totalHours?: Maybe<Scalars['Float']>;
  didDream?: Maybe<Scalars['Boolean']>;
  anxiety?: Maybe<Scalars['Int']>;
  caffeine?: Maybe<Scalars['Int']>;
  feltRested?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addUser: Scalars['String'];
  loginUser: Scalars['String'];
  createSleepData?: Maybe<SleepDatum>;
};


export type MutationAddUserArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationLoginUserArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationCreateSleepDataArgs = {
  options: SleepDatumCreateInput;
};

export type SleepDatumCreateInput = {
  totalHours?: Maybe<Scalars['Float']>;
  didDream?: Maybe<Scalars['Boolean']>;
  anxiety?: Maybe<Scalars['Float']>;
  feltRested?: Maybe<Scalars['Boolean']>;
  caffeine?: Maybe<Scalars['Float']>;
  date: Scalars['DateTime'];
};


export type LoginTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type LoginTokenQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'token'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'loginUser'>
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addUser'>
);

export type SleepDataFieldsFragment = (
  { __typename?: 'SleepDatum' }
  & Pick<SleepDatum, 'id' | 'totalHours' | 'didDream' | 'anxiety' | 'caffeine' | 'feltRested'>
);

export type GetSleepDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSleepDataQuery = (
  { __typename?: 'Query' }
  & { sleepData: Array<(
    { __typename?: 'SleepDatum' }
    & SleepDataFieldsFragment
  )> }
);

export type CreateSleepDataMutationVariables = Exact<{
  totalHours?: Maybe<Scalars['Float']>;
  didDream?: Maybe<Scalars['Boolean']>;
  anxiety?: Maybe<Scalars['Float']>;
  feltRested?: Maybe<Scalars['Boolean']>;
  caffeine?: Maybe<Scalars['Float']>;
  date: Scalars['DateTime'];
}>;


export type CreateSleepDataMutation = (
  { __typename?: 'Mutation' }
  & { createSleepData?: Maybe<(
    { __typename?: 'SleepDatum' }
    & SleepDataFieldsFragment
  )> }
);

export const SleepDataFieldsFragmentDoc = gql`
    fragment SleepDataFields on SleepDatum {
  id
  totalHours
  didDream
  anxiety
  caffeine
  feltRested
}
    `;
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
export function useLoginTokenQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<LoginTokenQuery, LoginTokenQueryVariables>) {
        return ApolloReactHooks.useQuery<LoginTokenQuery, LoginTokenQueryVariables>(LoginTokenDocument, baseOptions);
      }
export function useLoginTokenLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LoginTokenQuery, LoginTokenQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<LoginTokenQuery, LoginTokenQueryVariables>(LoginTokenDocument, baseOptions);
        }
export type LoginTokenQueryHookResult = ReturnType<typeof useLoginTokenQuery>;
export type LoginTokenLazyQueryHookResult = ReturnType<typeof useLoginTokenLazyQuery>;
export type LoginTokenQueryResult = ApolloReactCommon.QueryResult<LoginTokenQuery, LoginTokenQueryVariables>;
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  loginUser(email: $email, password: $password)
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

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
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation register($email: String!, $password: String!) {
  addUser(email: $email, password: $password)
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const GetSleepDataDocument = gql`
    query getSleepData {
  sleepData {
    ...SleepDataFields
  }
}
    ${SleepDataFieldsFragmentDoc}`;

/**
 * __useGetSleepDataQuery__
 *
 * To run a query within a React component, call `useGetSleepDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSleepDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSleepDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSleepDataQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetSleepDataQuery, GetSleepDataQueryVariables>) {
        return ApolloReactHooks.useQuery<GetSleepDataQuery, GetSleepDataQueryVariables>(GetSleepDataDocument, baseOptions);
      }
export function useGetSleepDataLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetSleepDataQuery, GetSleepDataQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetSleepDataQuery, GetSleepDataQueryVariables>(GetSleepDataDocument, baseOptions);
        }
export type GetSleepDataQueryHookResult = ReturnType<typeof useGetSleepDataQuery>;
export type GetSleepDataLazyQueryHookResult = ReturnType<typeof useGetSleepDataLazyQuery>;
export type GetSleepDataQueryResult = ApolloReactCommon.QueryResult<GetSleepDataQuery, GetSleepDataQueryVariables>;
export const CreateSleepDataDocument = gql`
    mutation createSleepData($totalHours: Float, $didDream: Boolean, $anxiety: Float, $feltRested: Boolean, $caffeine: Float, $date: DateTime!) {
  createSleepData(
    options: {totalHours: $totalHours, didDream: $didDream, anxiety: $anxiety, feltRested: $feltRested, caffeine: $caffeine, date: $date}
  ) {
    ...SleepDataFields
  }
}
    ${SleepDataFieldsFragmentDoc}`;
export type CreateSleepDataMutationFn = ApolloReactCommon.MutationFunction<CreateSleepDataMutation, CreateSleepDataMutationVariables>;

/**
 * __useCreateSleepDataMutation__
 *
 * To run a mutation, you first call `useCreateSleepDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSleepDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSleepDataMutation, { data, loading, error }] = useCreateSleepDataMutation({
 *   variables: {
 *      totalHours: // value for 'totalHours'
 *      didDream: // value for 'didDream'
 *      anxiety: // value for 'anxiety'
 *      feltRested: // value for 'feltRested'
 *      caffeine: // value for 'caffeine'
 *      date: // value for 'date'
 *   },
 * });
 */
export function useCreateSleepDataMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateSleepDataMutation, CreateSleepDataMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateSleepDataMutation, CreateSleepDataMutationVariables>(CreateSleepDataDocument, baseOptions);
      }
export type CreateSleepDataMutationHookResult = ReturnType<typeof useCreateSleepDataMutation>;
export type CreateSleepDataMutationResult = ApolloReactCommon.MutationResult<CreateSleepDataMutation>;
export type CreateSleepDataMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateSleepDataMutation, CreateSleepDataMutationVariables>;