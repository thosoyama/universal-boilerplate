import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Upload: any,
};


export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Counter = {
   __typename?: 'Counter',
  id: Scalars['ID'],
  count: Scalars['Int'],
};

export type Mutation = {
   __typename?: 'Mutation',
  counter?: Maybe<Counter>,
};


export type MutationCounterArgs = {
  id: Scalars['ID'],
  count: Scalars['Int']
};

export type Query = {
   __typename?: 'Query',
  counter?: Maybe<Counter>,
};


export type QueryCounterArgs = {
  id: Scalars['ID']
};


export type GetCounterQueryVariables = {
  id: Scalars['ID']
};


export type GetCounterQuery = (
  { __typename?: 'Query' }
  & { counter: Maybe<(
    { __typename?: 'Counter' }
    & Pick<Counter, 'id' | 'count'>
  )> }
);

export type SetCounterMutationVariables = {
  id: Scalars['ID'],
  count: Scalars['Int']
};


export type SetCounterMutation = (
  { __typename?: 'Mutation' }
  & { counter: Maybe<(
    { __typename?: 'Counter' }
    & Pick<Counter, 'id' | 'count'>
  )> }
);


export const GetCounterDocument = gql`
    query getCounter($id: ID!) {
  counter(id: $id) {
    id
    count
  }
}
    `;
export type GetCounterQueryResult = ApolloReactCommon.QueryResult<GetCounterQuery, GetCounterQueryVariables>;
export const SetCounterDocument = gql`
    mutation setCounter($id: ID!, $count: Int!) {
  counter(id: $id, count: $count) {
    id
    count
  }
}
    `;
export type SetCounterMutationFn = ApolloReactCommon.MutationFunction<SetCounterMutation, SetCounterMutationVariables>;
export type SetCounterMutationResult = ApolloReactCommon.MutationResult<SetCounterMutation>;
export type SetCounterMutationOptions = ApolloReactCommon.BaseMutationOptions<SetCounterMutation, SetCounterMutationVariables>;