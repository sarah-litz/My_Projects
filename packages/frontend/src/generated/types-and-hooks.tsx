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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  me: SafeUser;
  sleepData: Array<SleepDatum>;
  token: Scalars['String'];
  trackingAnxiety: Scalars['Boolean'];
  trackingCaffiene: Scalars['Boolean'];
  trackingDreams: Scalars['Boolean'];
  trackingMelatonin: Scalars['Boolean'];
};

export type SafeUser = {
  __typename?: 'SafeUser';
  email: Scalars['String'];
};

export type SleepDatum = {
  __typename?: 'SleepDatum';
  id: Scalars['ID'];
  totalHours?: Maybe<Scalars['Float']>;
  didDream?: Maybe<Scalars['Boolean']>;
  anxiety?: Maybe<Scalars['Int']>;
  caffeine?: Maybe<Scalars['Int']>;
  melatonin?: Maybe<Scalars['Float']>;
  sleepQuality?: Maybe<Scalars['Int']>;
  date: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addUser: Scalars['String'];
  changeEmail: Scalars['String'];
  changePassword: Scalars['String'];
  deleteAccount: Scalars['String'];
  loginUser: Scalars['String'];
  updatePreferences: Scalars['String'];
  createSleepData?: Maybe<SleepDatum>;
};

export type MutationAddUserArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
  lastname: Scalars['String'];
  firstname: Scalars['String'];
};

export type MutationChangeEmailArgs = {
  newEmail: Scalars['String'];
  email: Scalars['String'];
};

export type MutationChangePasswordArgs = {
  password: Scalars['String'];
};

export type MutationLoginUserArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type MutationUpdatePreferencesArgs = {
  newTrackMelatonin: Scalars['Boolean'];
  newTrackDreams: Scalars['Boolean'];
  newTrackCaffiene: Scalars['Boolean'];
  newTrackAnxiety: Scalars['Boolean'];
};

export type MutationCreateSleepDataArgs = {
  options: SleepDatumCreateInput;
};

export type SleepDatumCreateInput = {
  totalHours?: Maybe<Scalars['Float']>;
  didDream?: Maybe<Scalars['Boolean']>;
  anxiety?: Maybe<Scalars['Float']>;
  sleepQuality?: Maybe<Scalars['Float']>;
  melatonin?: Maybe<Scalars['Float']>;
  caffeine?: Maybe<Scalars['Float']>;
  date: Scalars['DateTime'];
};

export type LoginTokenQueryVariables = Exact<{ [key: string]: never }>;

export type LoginTokenQuery = { __typename?: 'Query' } & Pick<Query, 'token'>;

export type ChangeEmailMutationVariables = Exact<{
  email: Scalars['String'];
  newEmail: Scalars['String'];
}>;

export type ChangeEmailMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'changeEmail'
>;

export type ChangePasswordMutationVariables = Exact<{
  password: Scalars['String'];
}>;

export type ChangePasswordMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'changePassword'
>;

export type DeleteAccountMutationVariables = Exact<{ [key: string]: never }>;

export type DeleteAccountMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'deleteAccount'
>;

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;

export type LoginMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'loginUser'
>;

export type RegisterMutationVariables = Exact<{
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;

export type RegisterMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'addUser'
>;

export type UpdatePreferencesMutationVariables = Exact<{
  newTrackAnxiety: Scalars['Boolean'];
  newTrackCaffiene: Scalars['Boolean'];
  newTrackDreams: Scalars['Boolean'];
  newTrackMelatonin: Scalars['Boolean'];
}>;

export type UpdatePreferencesMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'updatePreferences'
>;

export type SleepDataFieldsFragment = { __typename?: 'SleepDatum' } & Pick<
  SleepDatum,
  | 'id'
  | 'totalHours'
  | 'didDream'
  | 'anxiety'
  | 'caffeine'
  | 'melatonin'
  | 'sleepQuality'
  | 'date'
>;

export type GetSleepDataQueryVariables = Exact<{ [key: string]: never }>;

export type GetSleepDataQuery = { __typename?: 'Query' } & {
  sleepData: Array<{ __typename?: 'SleepDatum' } & SleepDataFieldsFragment>;
};

export type CreateSleepDataMutationVariables = Exact<{
  totalHours?: Maybe<Scalars['Float']>;
  didDream?: Maybe<Scalars['Boolean']>;
  anxiety?: Maybe<Scalars['Float']>;
  sleepQuality?: Maybe<Scalars['Float']>;
  caffeine?: Maybe<Scalars['Float']>;
  melatonin?: Maybe<Scalars['Float']>;
  date: Scalars['DateTime'];
}>;

export type CreateSleepDataMutation = { __typename?: 'Mutation' } & {
  createSleepData?: Maybe<
    { __typename?: 'SleepDatum' } & SleepDataFieldsFragment
  >;
};

export type MeEmailQueryVariables = Exact<{ [key: string]: never }>;

export type MeEmailQuery = { __typename?: 'Query' } & {
  me: { __typename?: 'SafeUser' } & Pick<SafeUser, 'email'>;
};

export type UserTracksAnxietyQueryVariables = Exact<{ [key: string]: never }>;

export type UserTracksAnxietyQuery = { __typename?: 'Query' } & Pick<
  Query,
  'trackingAnxiety'
>;

export type UserTracksCaffieneQueryVariables = Exact<{ [key: string]: never }>;

export type UserTracksCaffieneQuery = { __typename?: 'Query' } & Pick<
  Query,
  'trackingCaffiene'
>;

export type UserTracksDreamsQueryVariables = Exact<{ [key: string]: never }>;

export type UserTracksDreamsQuery = { __typename?: 'Query' } & Pick<
  Query,
  'trackingDreams'
>;

export type UserTracksMelatoninQueryVariables = Exact<{ [key: string]: never }>;

export type UserTracksMelatoninQuery = { __typename?: 'Query' } & Pick<
  Query,
  'trackingMelatonin'
>;

export const SleepDataFieldsFragmentDoc = gql`
  fragment SleepDataFields on SleepDatum {
    id
    totalHours
    didDream
    anxiety
    caffeine
    melatonin
    sleepQuality
    date
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
export const ChangeEmailDocument = gql`
  mutation changeEmail($email: String!, $newEmail: String!) {
    changeEmail(email: $email, newEmail: $newEmail)
  }
`;
export type ChangeEmailMutationFn = ApolloReactCommon.MutationFunction<
  ChangeEmailMutation,
  ChangeEmailMutationVariables
>;

/**
 * __useChangeEmailMutation__
 *
 * To run a mutation, you first call `useChangeEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeEmailMutation, { data, loading, error }] = useChangeEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *      newEmail: // value for 'newEmail'
 *   },
 * });
 */
export function useChangeEmailMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ChangeEmailMutation,
    ChangeEmailMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ChangeEmailMutation,
    ChangeEmailMutationVariables
  >(ChangeEmailDocument, baseOptions);
}
export type ChangeEmailMutationHookResult = ReturnType<
  typeof useChangeEmailMutation
>;
export type ChangeEmailMutationResult = ApolloReactCommon.MutationResult<ChangeEmailMutation>;
export type ChangeEmailMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ChangeEmailMutation,
  ChangeEmailMutationVariables
>;
export const ChangePasswordDocument = gql`
  mutation changePassword($password: String!) {
    changePassword(password: $password)
  }
`;
export type ChangePasswordMutationFn = ApolloReactCommon.MutationFunction<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      password: // value for 'password'
 *   },
 * });
 */
export function useChangePasswordMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >(ChangePasswordDocument, baseOptions);
}
export type ChangePasswordMutationHookResult = ReturnType<
  typeof useChangePasswordMutation
>;
export type ChangePasswordMutationResult = ApolloReactCommon.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>;
export const DeleteAccountDocument = gql`
  mutation deleteAccount {
    deleteAccount
  }
`;
export type DeleteAccountMutationFn = ApolloReactCommon.MutationFunction<
  DeleteAccountMutation,
  DeleteAccountMutationVariables
>;

/**
 * __useDeleteAccountMutation__
 *
 * To run a mutation, you first call `useDeleteAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAccountMutation, { data, loading, error }] = useDeleteAccountMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteAccountMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteAccountMutation,
    DeleteAccountMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    DeleteAccountMutation,
    DeleteAccountMutationVariables
  >(DeleteAccountDocument, baseOptions);
}
export type DeleteAccountMutationHookResult = ReturnType<
  typeof useDeleteAccountMutation
>;
export type DeleteAccountMutationResult = ApolloReactCommon.MutationResult<DeleteAccountMutation>;
export type DeleteAccountMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteAccountMutation,
  DeleteAccountMutationVariables
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
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const RegisterDocument = gql`
  mutation register(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstname: $firstname
      lastname: $lastname
      email: $email
      password: $password
    )
  }
`;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

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
 *      firstname: // value for 'firstname'
 *      lastname: // value for 'lastname'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    RegisterMutation,
    RegisterMutationVariables
  >(RegisterDocument, baseOptions);
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const UpdatePreferencesDocument = gql`
  mutation updatePreferences(
    $newTrackAnxiety: Boolean!
    $newTrackCaffiene: Boolean!
    $newTrackDreams: Boolean!
    $newTrackMelatonin: Boolean!
  ) {
    updatePreferences(
      newTrackAnxiety: $newTrackAnxiety
      newTrackCaffiene: $newTrackCaffiene
      newTrackDreams: $newTrackDreams
      newTrackMelatonin: $newTrackMelatonin
    )
  }
`;
export type UpdatePreferencesMutationFn = ApolloReactCommon.MutationFunction<
  UpdatePreferencesMutation,
  UpdatePreferencesMutationVariables
>;

/**
 * __useUpdatePreferencesMutation__
 *
 * To run a mutation, you first call `useUpdatePreferencesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePreferencesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePreferencesMutation, { data, loading, error }] = useUpdatePreferencesMutation({
 *   variables: {
 *      newTrackAnxiety: // value for 'newTrackAnxiety'
 *      newTrackCaffiene: // value for 'newTrackCaffiene'
 *      newTrackDreams: // value for 'newTrackDreams'
 *      newTrackMelatonin: // value for 'newTrackMelatonin'
 *   },
 * });
 */
export function useUpdatePreferencesMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdatePreferencesMutation,
    UpdatePreferencesMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    UpdatePreferencesMutation,
    UpdatePreferencesMutationVariables
  >(UpdatePreferencesDocument, baseOptions);
}
export type UpdatePreferencesMutationHookResult = ReturnType<
  typeof useUpdatePreferencesMutation
>;
export type UpdatePreferencesMutationResult = ApolloReactCommon.MutationResult<UpdatePreferencesMutation>;
export type UpdatePreferencesMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdatePreferencesMutation,
  UpdatePreferencesMutationVariables
>;
export const GetSleepDataDocument = gql`
  query getSleepData {
    sleepData {
      ...SleepDataFields
    }
  }
  ${SleepDataFieldsFragmentDoc}
`;

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
export function useGetSleepDataQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetSleepDataQuery,
    GetSleepDataQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetSleepDataQuery,
    GetSleepDataQueryVariables
  >(GetSleepDataDocument, baseOptions);
}
export function useGetSleepDataLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetSleepDataQuery,
    GetSleepDataQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetSleepDataQuery,
    GetSleepDataQueryVariables
  >(GetSleepDataDocument, baseOptions);
}
export type GetSleepDataQueryHookResult = ReturnType<
  typeof useGetSleepDataQuery
>;
export type GetSleepDataLazyQueryHookResult = ReturnType<
  typeof useGetSleepDataLazyQuery
>;
export type GetSleepDataQueryResult = ApolloReactCommon.QueryResult<
  GetSleepDataQuery,
  GetSleepDataQueryVariables
>;
export const CreateSleepDataDocument = gql`
  mutation createSleepData(
    $totalHours: Float
    $didDream: Boolean
    $anxiety: Float
    $sleepQuality: Float
    $caffeine: Float
    $melatonin: Float
    $date: DateTime!
  ) {
    createSleepData(
      options: {
        totalHours: $totalHours
        didDream: $didDream
        anxiety: $anxiety
        sleepQuality: $sleepQuality
        caffeine: $caffeine
        melatonin: $melatonin
        date: $date
      }
    ) {
      ...SleepDataFields
    }
  }
  ${SleepDataFieldsFragmentDoc}
`;
export type CreateSleepDataMutationFn = ApolloReactCommon.MutationFunction<
  CreateSleepDataMutation,
  CreateSleepDataMutationVariables
>;

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
 *      sleepQuality: // value for 'sleepQuality'
 *      caffeine: // value for 'caffeine'
 *      melatonin: // value for 'melatonin'
 *      date: // value for 'date'
 *   },
 * });
 */
export function useCreateSleepDataMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateSleepDataMutation,
    CreateSleepDataMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CreateSleepDataMutation,
    CreateSleepDataMutationVariables
  >(CreateSleepDataDocument, baseOptions);
}
export type CreateSleepDataMutationHookResult = ReturnType<
  typeof useCreateSleepDataMutation
>;
export type CreateSleepDataMutationResult = ApolloReactCommon.MutationResult<CreateSleepDataMutation>;
export type CreateSleepDataMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateSleepDataMutation,
  CreateSleepDataMutationVariables
>;
export const MeEmailDocument = gql`
  query meEmail {
    me {
      email
    }
  }
`;

/**
 * __useMeEmailQuery__
 *
 * To run a query within a React component, call `useMeEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeEmailQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeEmailQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    MeEmailQuery,
    MeEmailQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<MeEmailQuery, MeEmailQueryVariables>(
    MeEmailDocument,
    baseOptions
  );
}
export function useMeEmailLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    MeEmailQuery,
    MeEmailQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<MeEmailQuery, MeEmailQueryVariables>(
    MeEmailDocument,
    baseOptions
  );
}
export type MeEmailQueryHookResult = ReturnType<typeof useMeEmailQuery>;
export type MeEmailLazyQueryHookResult = ReturnType<typeof useMeEmailLazyQuery>;
export type MeEmailQueryResult = ApolloReactCommon.QueryResult<
  MeEmailQuery,
  MeEmailQueryVariables
>;
export const UserTracksAnxietyDocument = gql`
  query userTracksAnxiety {
    trackingAnxiety
  }
`;

/**
 * __useUserTracksAnxietyQuery__
 *
 * To run a query within a React component, call `useUserTracksAnxietyQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserTracksAnxietyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserTracksAnxietyQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserTracksAnxietyQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    UserTracksAnxietyQuery,
    UserTracksAnxietyQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    UserTracksAnxietyQuery,
    UserTracksAnxietyQueryVariables
  >(UserTracksAnxietyDocument, baseOptions);
}
export function useUserTracksAnxietyLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    UserTracksAnxietyQuery,
    UserTracksAnxietyQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    UserTracksAnxietyQuery,
    UserTracksAnxietyQueryVariables
  >(UserTracksAnxietyDocument, baseOptions);
}
export type UserTracksAnxietyQueryHookResult = ReturnType<
  typeof useUserTracksAnxietyQuery
>;
export type UserTracksAnxietyLazyQueryHookResult = ReturnType<
  typeof useUserTracksAnxietyLazyQuery
>;
export type UserTracksAnxietyQueryResult = ApolloReactCommon.QueryResult<
  UserTracksAnxietyQuery,
  UserTracksAnxietyQueryVariables
>;
export const UserTracksCaffieneDocument = gql`
  query userTracksCaffiene {
    trackingCaffiene
  }
`;

/**
 * __useUserTracksCaffieneQuery__
 *
 * To run a query within a React component, call `useUserTracksCaffieneQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserTracksCaffieneQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserTracksCaffieneQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserTracksCaffieneQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    UserTracksCaffieneQuery,
    UserTracksCaffieneQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    UserTracksCaffieneQuery,
    UserTracksCaffieneQueryVariables
  >(UserTracksCaffieneDocument, baseOptions);
}
export function useUserTracksCaffieneLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    UserTracksCaffieneQuery,
    UserTracksCaffieneQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    UserTracksCaffieneQuery,
    UserTracksCaffieneQueryVariables
  >(UserTracksCaffieneDocument, baseOptions);
}
export type UserTracksCaffieneQueryHookResult = ReturnType<
  typeof useUserTracksCaffieneQuery
>;
export type UserTracksCaffieneLazyQueryHookResult = ReturnType<
  typeof useUserTracksCaffieneLazyQuery
>;
export type UserTracksCaffieneQueryResult = ApolloReactCommon.QueryResult<
  UserTracksCaffieneQuery,
  UserTracksCaffieneQueryVariables
>;
export const UserTracksDreamsDocument = gql`
  query userTracksDreams {
    trackingDreams
  }
`;

/**
 * __useUserTracksDreamsQuery__
 *
 * To run a query within a React component, call `useUserTracksDreamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserTracksDreamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserTracksDreamsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserTracksDreamsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    UserTracksDreamsQuery,
    UserTracksDreamsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    UserTracksDreamsQuery,
    UserTracksDreamsQueryVariables
  >(UserTracksDreamsDocument, baseOptions);
}
export function useUserTracksDreamsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    UserTracksDreamsQuery,
    UserTracksDreamsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    UserTracksDreamsQuery,
    UserTracksDreamsQueryVariables
  >(UserTracksDreamsDocument, baseOptions);
}
export type UserTracksDreamsQueryHookResult = ReturnType<
  typeof useUserTracksDreamsQuery
>;
export type UserTracksDreamsLazyQueryHookResult = ReturnType<
  typeof useUserTracksDreamsLazyQuery
>;
export type UserTracksDreamsQueryResult = ApolloReactCommon.QueryResult<
  UserTracksDreamsQuery,
  UserTracksDreamsQueryVariables
>;
export const UserTracksMelatoninDocument = gql`
  query userTracksMelatonin {
    trackingMelatonin
  }
`;

/**
 * __useUserTracksMelatoninQuery__
 *
 * To run a query within a React component, call `useUserTracksMelatoninQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserTracksMelatoninQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserTracksMelatoninQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserTracksMelatoninQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    UserTracksMelatoninQuery,
    UserTracksMelatoninQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    UserTracksMelatoninQuery,
    UserTracksMelatoninQueryVariables
  >(UserTracksMelatoninDocument, baseOptions);
}
export function useUserTracksMelatoninLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    UserTracksMelatoninQuery,
    UserTracksMelatoninQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    UserTracksMelatoninQuery,
    UserTracksMelatoninQueryVariables
  >(UserTracksMelatoninDocument, baseOptions);
}
export type UserTracksMelatoninQueryHookResult = ReturnType<
  typeof useUserTracksMelatoninQuery
>;
export type UserTracksMelatoninLazyQueryHookResult = ReturnType<
  typeof useUserTracksMelatoninLazyQuery
>;
export type UserTracksMelatoninQueryResult = ApolloReactCommon.QueryResult<
  UserTracksMelatoninQuery,
  UserTracksMelatoninQueryVariables
>;
