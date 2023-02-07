// @ts-nocheck
import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
const defaultOptions = {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: any
  JSON: any
}

export type CreateRoleIntput = {
  isDefault?: Maybe<Scalars['Boolean']>
  scp: Array<Scalars['String']>
  title: Scalars['String']
}

export type CreateRoleOutput = {
  __typename?: 'CreateRoleOutput'
  id: Scalars['String']
}

export type CreateRoomInput = {
  capacity: Scalars['Float']
  description?: Maybe<Scalars['String']>
  language: Scalars['String']
  topic: Scalars['String']
}

export type CreateRoomOutput = {
  __typename?: 'CreateRoomOutput'
  id: Scalars['String']
}

export type DeleteRoleIntput = {
  id: Scalars['String']
}

export type DeleteRoleOutput = {
  __typename?: 'DeleteRoleOutput'
  id: Scalars['String']
}

export type DeleteUserInput = {
  id: Scalars['String']
}

export type DeleteUserOuput = {
  __typename?: 'DeleteUserOuput'
  id: Scalars['String']
}

export type GetDeletedRolesOutput = {
  __typename?: 'GetDeletedRolesOutput'
  id: Scalars['String']
  isDefault: Scalars['Boolean']
  scp: Array<Scalars['String']>
  title: Scalars['String']
}

export type GetRoleByIdInput = {
  id: Scalars['String']
  relations?: Maybe<Array<Scalars['String']>>
}

export type GetRoleByIdOutput = {
  __typename?: 'GetRoleByIdOutput'
  id: Scalars['String']
  isDefault: Scalars['Boolean']
  scp: Array<Scalars['String']>
  title: Scalars['String']
}

export type GetRolesOutput = {
  __typename?: 'GetRolesOutput'
  id: Scalars['String']
  isDefault: Scalars['Boolean']
  scp: Array<Scalars['String']>
  title: Scalars['String']
}

export type GetRoomsIntput = {
  pagination: PaginationInput
  relations?: Maybe<Array<Scalars['String']>>
}

export type GetRoomsOutput = {
  __typename?: 'GetRoomsOutput'
  data: Array<RoomEntity>
  pagination: Pagination
}

export type GetUserInput = {
  id: Scalars['String']
  relations?: Maybe<Array<Scalars['String']>>
}

export type GetUserOutput = {
  __typename?: 'GetUserOutput'
  createdAt?: Maybe<Scalars['DateTime']>
  email: Scalars['String']
  emailVerified?: Maybe<Scalars['Boolean']>
  fullName?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  image?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
  privilege?: Maybe<Array<Privilege>>
  roles?: Maybe<Array<RoleEntity>>
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type GetUsersInput = {
  pagination: PaginationInput
  relations?: Maybe<Array<Scalars['String']>>
}

export type GetUsersOutput = {
  __typename?: 'GetUsersOutput'
  data: Array<UserEntity>
  pagination: Pagination
}

export type MeOutput = {
  __typename?: 'MeOutput'
  email: Scalars['String']
  id: Scalars['String']
  scp: Array<Scalars['String']>
  sub: Scalars['String']
  username: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  createRole: CreateRoleOutput
  createRoom: CreateRoomOutput
  deleteRole: DeleteRoleOutput
  deleteUser: DeleteUserOuput
  recoverRole: RecoverRoleOutput
  recoverUser: RecoverUserOutput
  signin: SigninOutput
  signinByGoogle: SigninOutput
  signup: SignupOutput
  updateRole: UpdateRoleOuput
  updateUser: UpdateUserOutput
  updateUserByAdmin: UpdateUserByAdminOutput
}

export type MutationCreateRoleArgs = {
  input: CreateRoleIntput
}

export type MutationCreateRoomArgs = {
  input: CreateRoomInput
}

export type MutationDeleteRoleArgs = {
  input: DeleteRoleIntput
}

export type MutationDeleteUserArgs = {
  input: DeleteUserInput
}

export type MutationRecoverRoleArgs = {
  input: RecoverRoleIntput
}

export type MutationRecoverUserArgs = {
  input: RecoverUserInput
}

export type MutationSigninArgs = {
  input: SigninIntput
}

export type MutationSigninByGoogleArgs = {
  input: SigninByGoogleIntput
}

export type MutationSignupArgs = {
  input: Signup
}

export type MutationUpdateRoleArgs = {
  input: UpdateRoleIntput
}

export type MutationUpdateUserArgs = {
  input: UpdateUserInput
}

export type MutationUpdateUserByAdminArgs = {
  input: UpdateUserByAdminInput
}

export type Pagination = {
  __typename?: 'Pagination'
  limit: Scalars['Float']
  page: Scalars['Float']
  totalCount: Scalars['Float']
}

export type PaginationInput = {
  limit: Scalars['Float']
  page: Scalars['Float']
  totalCount?: Maybe<Scalars['Float']>
}

export enum Privilege {
  SuperAdmin = 'SuperAdmin',
}

export type Query = {
  __typename?: 'Query'
  getDeletedRoles: Array<GetDeletedRolesOutput>
  getDeletedUsers: GetUsersOutput
  getRoleById: GetRoleByIdOutput
  getRoles: Array<GetRolesOutput>
  getRooms: GetRoomsOutput
  getUser: GetUserOutput
  getUsers: GetUsersOutput
  me: MeOutput
}

export type QueryGetDeletedUsersArgs = {
  input: GetUsersInput
}

export type QueryGetRoleByIdArgs = {
  input: GetRoleByIdInput
}

export type QueryGetRoomsArgs = {
  input: GetRoomsIntput
}

export type QueryGetUserArgs = {
  input: GetUserInput
}

export type QueryGetUsersArgs = {
  input: GetUsersInput
}

export type RecoverRoleIntput = {
  id: Scalars['String']
}

export type RecoverRoleOutput = {
  __typename?: 'RecoverRoleOutput'
  id: Scalars['String']
}

export type RecoverUserInput = {
  id: Scalars['String']
}

export type RecoverUserOutput = {
  __typename?: 'RecoverUserOutput'
  id: Scalars['String']
}

export type RelationshipInput = {
  id: Scalars['String']
}

export type RoleEntity = {
  __typename?: 'RoleEntity'
  createdAt?: Maybe<Scalars['DateTime']>
  id?: Maybe<Scalars['String']>
  isDefault?: Maybe<Scalars['Boolean']>
  scp?: Maybe<Array<Scalars['String']>>
  title: Scalars['String']
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type RoomEntity = {
  __typename?: 'RoomEntity'
  capacity: Scalars['Float']
  clients?: Maybe<Array<UserEntity>>
  createdAt?: Maybe<Scalars['DateTime']>
  creator: UserEntity
  description?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  language: Scalars['String']
  topic: Scalars['String']
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type SigninByGoogleIntput = {
  token: Scalars['String']
}

export type SigninIntput = {
  email: Scalars['String']
  password: Scalars['String']
}

export type SigninOutput = {
  __typename?: 'SigninOutput'
  email: Scalars['String']
  id: Scalars['String']
  memberships: Scalars['JSON']
  refreshToken?: Maybe<Scalars['String']>
  scp: Array<Scalars['String']>
  token: Scalars['String']
}

export type Signup = {
  email: Scalars['String']
  password: Scalars['String']
}

export type SignupOutput = {
  __typename?: 'SignupOutput'
  email: Scalars['String']
  id: Scalars['String']
  refreshToken?: Maybe<Scalars['String']>
  scp: Array<Scalars['String']>
  token: Scalars['String']
}

export type UpdateRoleIntput = {
  id: Scalars['String']
  isDefault?: Maybe<Scalars['Boolean']>
  scp?: Maybe<Array<Scalars['String']>>
  title?: Maybe<Scalars['String']>
}

export type UpdateRoleOuput = {
  __typename?: 'UpdateRoleOuput'
  id: Scalars['String']
}

export type UpdateUserByAdminInput = {
  id: Scalars['String']
  roles?: Maybe<Array<RelationshipInput>>
}

export type UpdateUserByAdminOutput = {
  __typename?: 'UpdateUserByAdminOutput'
  id: Scalars['String']
}

export type UpdateUserInput = {
  fullName?: Maybe<Scalars['String']>
  id: Scalars['String']
  mobile?: Maybe<Scalars['String']>
  password?: Maybe<Scalars['String']>
  profile?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
}

export type UpdateUserOutput = {
  __typename?: 'UpdateUserOutput'
  id: Scalars['String']
}

export type UserEntity = {
  __typename?: 'UserEntity'
  createdAt?: Maybe<Scalars['DateTime']>
  email: Scalars['String']
  emailVerified?: Maybe<Scalars['Boolean']>
  fullName?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  image?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
  privilege?: Maybe<Array<Privilege>>
  roles?: Maybe<Array<RoleEntity>>
  updatedAt?: Maybe<Scalars['DateTime']>
}

/** A GraphQL Schema defines the capabilities of a GraphQL server. It exposes all available types and directives on the server, as well as the entry points for query, mutation, and subscription operations. */
export type __Schema = {
  __typename?: '__Schema'
  description?: Maybe<Scalars['String']>
  /** A list of all types supported by this server. */
  types: Array<__Type>
  /** The type that query operations will be rooted at. */
  queryType: __Type
  /** If this server supports mutation, the type that mutation operations will be rooted at. */
  mutationType?: Maybe<__Type>
  /** If this server support subscription, the type that subscription operations will be rooted at. */
  subscriptionType?: Maybe<__Type>
  /** A list of all directives supported by this server. */
  directives: Array<__Directive>
}

/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByUrl`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type __Type = {
  __typename?: '__Type'
  kind: __TypeKind
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  specifiedByUrl?: Maybe<Scalars['String']>
  fields?: Maybe<Array<__Field>>
  interfaces?: Maybe<Array<__Type>>
  possibleTypes?: Maybe<Array<__Type>>
  enumValues?: Maybe<Array<__EnumValue>>
  inputFields?: Maybe<Array<__InputValue>>
  ofType?: Maybe<__Type>
}

/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByUrl`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type __TypeFieldsArgs = {
  includeDeprecated?: Maybe<Scalars['Boolean']>
}

/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByUrl`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type __TypeEnumValuesArgs = {
  includeDeprecated?: Maybe<Scalars['Boolean']>
}

/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByUrl`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type __TypeInputFieldsArgs = {
  includeDeprecated?: Maybe<Scalars['Boolean']>
}

/** An enum describing what kind of type a given `__Type` is. */
export enum __TypeKind {
  /** Indicates this type is a scalar. */
  Scalar = 'SCALAR',
  /** Indicates this type is an object. `fields` and `interfaces` are valid fields. */
  Object = 'OBJECT',
  /** Indicates this type is an interface. `fields`, `interfaces`, and `possibleTypes` are valid fields. */
  Interface = 'INTERFACE',
  /** Indicates this type is a union. `possibleTypes` is a valid field. */
  Union = 'UNION',
  /** Indicates this type is an enum. `enumValues` is a valid field. */
  Enum = 'ENUM',
  /** Indicates this type is an input object. `inputFields` is a valid field. */
  InputObject = 'INPUT_OBJECT',
  /** Indicates this type is a list. `ofType` is a valid field. */
  List = 'LIST',
  /** Indicates this type is a non-null. `ofType` is a valid field. */
  NonNull = 'NON_NULL',
}

/** Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type. */
export type __Field = {
  __typename?: '__Field'
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  args: Array<__InputValue>
  type: __Type
  isDeprecated: Scalars['Boolean']
  deprecationReason?: Maybe<Scalars['String']>
}

/** Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type. */
export type __FieldArgsArgs = {
  includeDeprecated?: Maybe<Scalars['Boolean']>
}

/** Arguments provided to Fields or Directives and the input fields of an InputObject are represented as Input Values which describe their type and optionally a default value. */
export type __InputValue = {
  __typename?: '__InputValue'
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  type: __Type
  /** A GraphQL-formatted string representing the default value for this input value. */
  defaultValue?: Maybe<Scalars['String']>
  isDeprecated: Scalars['Boolean']
  deprecationReason?: Maybe<Scalars['String']>
}

/** One possible value for a given Enum. Enum values are unique values, not a placeholder for a string or numeric value. However an Enum value is returned in a JSON response as a string. */
export type __EnumValue = {
  __typename?: '__EnumValue'
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  isDeprecated: Scalars['Boolean']
  deprecationReason?: Maybe<Scalars['String']>
}

/**
 * A Directive provides a way to describe alternate runtime execution and type validation behavior in a GraphQL document.
 *
 * In some cases, you need to provide options to alter GraphQL's execution behavior in ways field arguments will not suffice, such as conditionally including or skipping a field. Directives provide this by describing additional information to the executor.
 */
export type __Directive = {
  __typename?: '__Directive'
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  isRepeatable: Scalars['Boolean']
  locations: Array<__DirectiveLocation>
  args: Array<__InputValue>
}

/** A Directive can be adjacent to many parts of the GraphQL language, a __DirectiveLocation describes one such possible adjacencies. */
export enum __DirectiveLocation {
  /** Location adjacent to a query operation. */
  Query = 'QUERY',
  /** Location adjacent to a mutation operation. */
  Mutation = 'MUTATION',
  /** Location adjacent to a subscription operation. */
  Subscription = 'SUBSCRIPTION',
  /** Location adjacent to a field. */
  Field = 'FIELD',
  /** Location adjacent to a fragment definition. */
  FragmentDefinition = 'FRAGMENT_DEFINITION',
  /** Location adjacent to a fragment spread. */
  FragmentSpread = 'FRAGMENT_SPREAD',
  /** Location adjacent to an inline fragment. */
  InlineFragment = 'INLINE_FRAGMENT',
  /** Location adjacent to a variable definition. */
  VariableDefinition = 'VARIABLE_DEFINITION',
  /** Location adjacent to a schema definition. */
  Schema = 'SCHEMA',
  /** Location adjacent to a scalar definition. */
  Scalar = 'SCALAR',
  /** Location adjacent to an object type definition. */
  Object = 'OBJECT',
  /** Location adjacent to a field definition. */
  FieldDefinition = 'FIELD_DEFINITION',
  /** Location adjacent to an argument definition. */
  ArgumentDefinition = 'ARGUMENT_DEFINITION',
  /** Location adjacent to an interface definition. */
  Interface = 'INTERFACE',
  /** Location adjacent to a union definition. */
  Union = 'UNION',
  /** Location adjacent to an enum definition. */
  Enum = 'ENUM',
  /** Location adjacent to an enum value definition. */
  EnumValue = 'ENUM_VALUE',
  /** Location adjacent to an input object type definition. */
  InputObject = 'INPUT_OBJECT',
  /** Location adjacent to an input object field definition. */
  InputFieldDefinition = 'INPUT_FIELD_DEFINITION',
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = { __typename?: 'Query' } & { me: { __typename?: 'MeOutput' } & Pick<MeOutput, 'id' | 'username' | 'scp' | 'sub'> }

export type SigninMutationVariables = Exact<{
  input: SigninIntput
}>

export type SigninMutation = { __typename?: 'Mutation' } & { signin: { __typename?: 'SigninOutput' } & Pick<SigninOutput, 'id' | 'token' | 'refreshToken' | 'email' | 'scp'> }

export type SignupMutationVariables = Exact<{
  input: Signup
}>

export type SignupMutation = { __typename?: 'Mutation' } & { signup: { __typename?: 'SignupOutput' } & Pick<SignupOutput, 'id' | 'token' | 'refreshToken' | 'email' | 'scp'> }

export type CreateRoleMutationVariables = Exact<{
  input: CreateRoleIntput
}>

export type CreateRoleMutation = { __typename?: 'Mutation' } & { createRole: { __typename?: 'CreateRoleOutput' } & Pick<CreateRoleOutput, 'id'> }

export type DeleteRoleMutationVariables = Exact<{
  input: DeleteRoleIntput
}>

export type DeleteRoleMutation = { __typename?: 'Mutation' } & { deleteRole: { __typename?: 'DeleteRoleOutput' } & Pick<DeleteRoleOutput, 'id'> }

export type GetDeletedRolesQueryVariables = Exact<{ [key: string]: never }>

export type GetDeletedRolesQuery = { __typename?: 'Query' } & { getDeletedRoles: Array<{ __typename?: 'GetDeletedRolesOutput' } & Pick<GetDeletedRolesOutput, 'id' | 'title' | 'isDefault' | 'scp'>> }

export type PermissionsQueryVariables = Exact<{ [key: string]: never }>

export type PermissionsQuery = { __typename?: 'Query' } & {
  __schema: { __typename?: '__Schema' } & {
    queryType: { __typename?: '__Type' } & { fields?: Maybe<Array<{ __typename?: '__Field' } & Pick<__Field, 'name' | 'description'>>> }
    mutationType?: Maybe<{ __typename?: '__Type' } & { fields?: Maybe<Array<{ __typename?: '__Field' } & Pick<__Field, 'name' | 'description'>>> }>
    subscriptionType?: Maybe<{ __typename?: '__Type' } & { fields?: Maybe<Array<{ __typename?: '__Field' } & Pick<__Field, 'name' | 'description'>>> }>
  }
}

export type GetRoleByIdQueryVariables = Exact<{
  input: GetRoleByIdInput
}>

export type GetRoleByIdQuery = { __typename?: 'Query' } & { getRoleById: { __typename?: 'GetRoleByIdOutput' } & Pick<GetRoleByIdOutput, 'id' | 'title' | 'isDefault' | 'scp'> }

export type GetRolesQueryVariables = Exact<{ [key: string]: never }>

export type GetRolesQuery = { __typename?: 'Query' } & { getRoles: Array<{ __typename?: 'GetRolesOutput' } & Pick<GetRolesOutput, 'id' | 'title' | 'isDefault' | 'scp'>> }

export type RecoverRoleMutationVariables = Exact<{
  input: RecoverRoleIntput
}>

export type RecoverRoleMutation = { __typename?: 'Mutation' } & { recoverRole: { __typename?: 'RecoverRoleOutput' } & Pick<RecoverRoleOutput, 'id'> }

export type UpdateRoleMutationVariables = Exact<{
  input: UpdateRoleIntput
}>

export type UpdateRoleMutation = { __typename?: 'Mutation' } & { updateRole: { __typename?: 'UpdateRoleOuput' } & Pick<UpdateRoleOuput, 'id'> }

export type DeleteUserMutationVariables = Exact<{
  input: DeleteUserInput
}>

export type DeleteUserMutation = { __typename?: 'Mutation' } & { deleteUser: { __typename?: 'DeleteUserOuput' } & Pick<DeleteUserOuput, 'id'> }

export type GetDeletedUsersQueryVariables = Exact<{
  input: GetUsersInput
}>

export type GetDeletedUsersQuery = { __typename?: 'Query' } & {
  getDeletedUsers: { __typename?: 'GetUsersOutput' } & {
    data: Array<
      { __typename?: 'UserEntity' } & Pick<UserEntity, 'id' | 'email' | 'fullName' | 'createdAt' | 'updatedAt'> & {
          roles?: Maybe<Array<{ __typename?: 'RoleEntity' } & Pick<RoleEntity, 'id' | 'title'>>>
        }
    >
    pagination: { __typename?: 'Pagination' } & Pick<Pagination, 'limit' | 'page' | 'totalCount'>
  }
}

export type GetUserQueryVariables = Exact<{
  input: GetUserInput
}>

export type GetUserQuery = { __typename?: 'Query' } & {
  getUser: { __typename?: 'GetUserOutput' } & Pick<GetUserOutput, 'id' | 'email' | 'fullName'> & { roles?: Maybe<Array<{ __typename?: 'RoleEntity' } & Pick<RoleEntity, 'id' | 'title'>>> }
}

export type GetUsersQueryVariables = Exact<{
  input: GetUsersInput
}>

export type GetUsersQuery = { __typename?: 'Query' } & {
  getUsers: { __typename?: 'GetUsersOutput' } & {
    data: Array<
      { __typename?: 'UserEntity' } & Pick<UserEntity, 'id' | 'email' | 'fullName' | 'createdAt' | 'updatedAt'> & {
          roles?: Maybe<Array<{ __typename?: 'RoleEntity' } & Pick<RoleEntity, 'id' | 'title'>>>
        }
    >
    pagination: { __typename?: 'Pagination' } & Pick<Pagination, 'limit' | 'page' | 'totalCount'>
  }
}

export type RecoverUserMutationVariables = Exact<{
  input: RecoverUserInput
}>

export type RecoverUserMutation = { __typename?: 'Mutation' } & { recoverUser: { __typename?: 'RecoverUserOutput' } & Pick<RecoverUserOutput, 'id'> }

export type UpdateUserByAdminMutationVariables = Exact<{
  input: UpdateUserByAdminInput
}>

export type UpdateUserByAdminMutation = { __typename?: 'Mutation' } & { updateUserByAdmin: { __typename?: 'UpdateUserByAdminOutput' } & Pick<UpdateUserByAdminOutput, 'id'> }

export const MeDocument = gql`
  query me {
    me {
      id
      username
      scp
      sub
    }
  }
`

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options)
}
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options)
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>
export const SigninDocument = gql`
  mutation signin($input: SigninIntput!) {
    signin(input: $input) {
      id
      token
      refreshToken
      email
      scp
    }
  }
`
export type SigninMutationFn = Apollo.MutationFunction<SigninMutation, SigninMutationVariables>

/**
 * __useSigninMutation__
 *
 * To run a mutation, you first call `useSigninMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSigninMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signinMutation, { data, loading, error }] = useSigninMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSigninMutation(baseOptions?: Apollo.MutationHookOptions<SigninMutation, SigninMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<SigninMutation, SigninMutationVariables>(SigninDocument, options)
}
export type SigninMutationHookResult = ReturnType<typeof useSigninMutation>
export type SigninMutationResult = Apollo.MutationResult<SigninMutation>
export type SigninMutationOptions = Apollo.BaseMutationOptions<SigninMutation, SigninMutationVariables>
export const SignupDocument = gql`
  mutation signup($input: Signup!) {
    signup(input: $input) {
      id
      token
      refreshToken
      email
      scp
    }
  }
`
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options)
}
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>
export const CreateRoleDocument = gql`
  mutation createRole($input: CreateRoleIntput!) {
    createRole(input: $input) {
      id
    }
  }
`
export type CreateRoleMutationFn = Apollo.MutationFunction<CreateRoleMutation, CreateRoleMutationVariables>

/**
 * __useCreateRoleMutation__
 *
 * To run a mutation, you first call `useCreateRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRoleMutation, { data, loading, error }] = useCreateRoleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRoleMutation(baseOptions?: Apollo.MutationHookOptions<CreateRoleMutation, CreateRoleMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateRoleMutation, CreateRoleMutationVariables>(CreateRoleDocument, options)
}
export type CreateRoleMutationHookResult = ReturnType<typeof useCreateRoleMutation>
export type CreateRoleMutationResult = Apollo.MutationResult<CreateRoleMutation>
export type CreateRoleMutationOptions = Apollo.BaseMutationOptions<CreateRoleMutation, CreateRoleMutationVariables>
export const DeleteRoleDocument = gql`
  mutation deleteRole($input: DeleteRoleIntput!) {
    deleteRole(input: $input) {
      id
    }
  }
`
export type DeleteRoleMutationFn = Apollo.MutationFunction<DeleteRoleMutation, DeleteRoleMutationVariables>

/**
 * __useDeleteRoleMutation__
 *
 * To run a mutation, you first call `useDeleteRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRoleMutation, { data, loading, error }] = useDeleteRoleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteRoleMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRoleMutation, DeleteRoleMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteRoleMutation, DeleteRoleMutationVariables>(DeleteRoleDocument, options)
}
export type DeleteRoleMutationHookResult = ReturnType<typeof useDeleteRoleMutation>
export type DeleteRoleMutationResult = Apollo.MutationResult<DeleteRoleMutation>
export type DeleteRoleMutationOptions = Apollo.BaseMutationOptions<DeleteRoleMutation, DeleteRoleMutationVariables>
export const GetDeletedRolesDocument = gql`
  query getDeletedRoles {
    getDeletedRoles {
      id
      title
      isDefault
      scp
    }
  }
`

/**
 * __useGetDeletedRolesQuery__
 *
 * To run a query within a React component, call `useGetDeletedRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDeletedRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDeletedRolesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDeletedRolesQuery(baseOptions?: Apollo.QueryHookOptions<GetDeletedRolesQuery, GetDeletedRolesQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetDeletedRolesQuery, GetDeletedRolesQueryVariables>(GetDeletedRolesDocument, options)
}
export function useGetDeletedRolesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDeletedRolesQuery, GetDeletedRolesQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetDeletedRolesQuery, GetDeletedRolesQueryVariables>(GetDeletedRolesDocument, options)
}
export type GetDeletedRolesQueryHookResult = ReturnType<typeof useGetDeletedRolesQuery>
export type GetDeletedRolesLazyQueryHookResult = ReturnType<typeof useGetDeletedRolesLazyQuery>
export type GetDeletedRolesQueryResult = Apollo.QueryResult<GetDeletedRolesQuery, GetDeletedRolesQueryVariables>
export const PermissionsDocument = gql`
  query permissions {
    __schema {
      queryType {
        fields {
          name
          description
        }
      }
      mutationType {
        fields {
          name
          description
        }
      }
      subscriptionType {
        fields {
          name
          description
        }
      }
    }
  }
`

/**
 * __usePermissionsQuery__
 *
 * To run a query within a React component, call `usePermissionsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePermissionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePermissionsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePermissionsQuery(baseOptions?: Apollo.QueryHookOptions<PermissionsQuery, PermissionsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<PermissionsQuery, PermissionsQueryVariables>(PermissionsDocument, options)
}
export function usePermissionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PermissionsQuery, PermissionsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<PermissionsQuery, PermissionsQueryVariables>(PermissionsDocument, options)
}
export type PermissionsQueryHookResult = ReturnType<typeof usePermissionsQuery>
export type PermissionsLazyQueryHookResult = ReturnType<typeof usePermissionsLazyQuery>
export type PermissionsQueryResult = Apollo.QueryResult<PermissionsQuery, PermissionsQueryVariables>
export const GetRoleByIdDocument = gql`
  query getRoleById($input: GetRoleByIdInput!) {
    getRoleById(input: $input) {
      id
      title
      isDefault
      scp
    }
  }
`

/**
 * __useGetRoleByIdQuery__
 *
 * To run a query within a React component, call `useGetRoleByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoleByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoleByIdQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetRoleByIdQuery(baseOptions: Apollo.QueryHookOptions<GetRoleByIdQuery, GetRoleByIdQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetRoleByIdQuery, GetRoleByIdQueryVariables>(GetRoleByIdDocument, options)
}
export function useGetRoleByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRoleByIdQuery, GetRoleByIdQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetRoleByIdQuery, GetRoleByIdQueryVariables>(GetRoleByIdDocument, options)
}
export type GetRoleByIdQueryHookResult = ReturnType<typeof useGetRoleByIdQuery>
export type GetRoleByIdLazyQueryHookResult = ReturnType<typeof useGetRoleByIdLazyQuery>
export type GetRoleByIdQueryResult = Apollo.QueryResult<GetRoleByIdQuery, GetRoleByIdQueryVariables>
export const GetRolesDocument = gql`
  query getRoles {
    getRoles {
      id
      title
      isDefault
      scp
    }
  }
`

/**
 * __useGetRolesQuery__
 *
 * To run a query within a React component, call `useGetRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRolesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRolesQuery(baseOptions?: Apollo.QueryHookOptions<GetRolesQuery, GetRolesQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetRolesQuery, GetRolesQueryVariables>(GetRolesDocument, options)
}
export function useGetRolesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRolesQuery, GetRolesQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetRolesQuery, GetRolesQueryVariables>(GetRolesDocument, options)
}
export type GetRolesQueryHookResult = ReturnType<typeof useGetRolesQuery>
export type GetRolesLazyQueryHookResult = ReturnType<typeof useGetRolesLazyQuery>
export type GetRolesQueryResult = Apollo.QueryResult<GetRolesQuery, GetRolesQueryVariables>
export const RecoverRoleDocument = gql`
  mutation recoverRole($input: RecoverRoleIntput!) {
    recoverRole(input: $input) {
      id
    }
  }
`
export type RecoverRoleMutationFn = Apollo.MutationFunction<RecoverRoleMutation, RecoverRoleMutationVariables>

/**
 * __useRecoverRoleMutation__
 *
 * To run a mutation, you first call `useRecoverRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRecoverRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [recoverRoleMutation, { data, loading, error }] = useRecoverRoleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRecoverRoleMutation(baseOptions?: Apollo.MutationHookOptions<RecoverRoleMutation, RecoverRoleMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<RecoverRoleMutation, RecoverRoleMutationVariables>(RecoverRoleDocument, options)
}
export type RecoverRoleMutationHookResult = ReturnType<typeof useRecoverRoleMutation>
export type RecoverRoleMutationResult = Apollo.MutationResult<RecoverRoleMutation>
export type RecoverRoleMutationOptions = Apollo.BaseMutationOptions<RecoverRoleMutation, RecoverRoleMutationVariables>
export const UpdateRoleDocument = gql`
  mutation updateRole($input: UpdateRoleIntput!) {
    updateRole(input: $input) {
      id
    }
  }
`
export type UpdateRoleMutationFn = Apollo.MutationFunction<UpdateRoleMutation, UpdateRoleMutationVariables>

/**
 * __useUpdateRoleMutation__
 *
 * To run a mutation, you first call `useUpdateRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRoleMutation, { data, loading, error }] = useUpdateRoleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateRoleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRoleMutation, UpdateRoleMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateRoleMutation, UpdateRoleMutationVariables>(UpdateRoleDocument, options)
}
export type UpdateRoleMutationHookResult = ReturnType<typeof useUpdateRoleMutation>
export type UpdateRoleMutationResult = Apollo.MutationResult<UpdateRoleMutation>
export type UpdateRoleMutationOptions = Apollo.BaseMutationOptions<UpdateRoleMutation, UpdateRoleMutationVariables>
export const DeleteUserDocument = gql`
  mutation deleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input) {
      id
    }
  }
`
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options)
}
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>
export const GetDeletedUsersDocument = gql`
  query getDeletedUsers($input: GetUsersInput!) {
    getDeletedUsers(input: $input) {
      data {
        id
        email
        fullName
        roles {
          id
          title
        }
        createdAt
        updatedAt
      }
      pagination {
        limit
        page
        totalCount
      }
    }
  }
`

/**
 * __useGetDeletedUsersQuery__
 *
 * To run a query within a React component, call `useGetDeletedUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDeletedUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDeletedUsersQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetDeletedUsersQuery(baseOptions: Apollo.QueryHookOptions<GetDeletedUsersQuery, GetDeletedUsersQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetDeletedUsersQuery, GetDeletedUsersQueryVariables>(GetDeletedUsersDocument, options)
}
export function useGetDeletedUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDeletedUsersQuery, GetDeletedUsersQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetDeletedUsersQuery, GetDeletedUsersQueryVariables>(GetDeletedUsersDocument, options)
}
export type GetDeletedUsersQueryHookResult = ReturnType<typeof useGetDeletedUsersQuery>
export type GetDeletedUsersLazyQueryHookResult = ReturnType<typeof useGetDeletedUsersLazyQuery>
export type GetDeletedUsersQueryResult = Apollo.QueryResult<GetDeletedUsersQuery, GetDeletedUsersQueryVariables>
export const GetUserDocument = gql`
  query getUser($input: GetUserInput!) {
    getUser(input: $input) {
      id
      email
      fullName
      roles {
        id
        title
      }
    }
  }
`

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options)
}
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options)
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>
export const GetUsersDocument = gql`
  query getUsers($input: GetUsersInput!) {
    getUsers(input: $input) {
      data {
        id
        email
        fullName
        roles {
          id
          title
        }
        createdAt
        updatedAt
      }
      pagination {
        limit
        page
        totalCount
      }
    }
  }
`

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options)
}
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options)
}
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>
export const RecoverUserDocument = gql`
  mutation recoverUser($input: RecoverUserInput!) {
    recoverUser(input: $input) {
      id
    }
  }
`
export type RecoverUserMutationFn = Apollo.MutationFunction<RecoverUserMutation, RecoverUserMutationVariables>

/**
 * __useRecoverUserMutation__
 *
 * To run a mutation, you first call `useRecoverUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRecoverUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [recoverUserMutation, { data, loading, error }] = useRecoverUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRecoverUserMutation(baseOptions?: Apollo.MutationHookOptions<RecoverUserMutation, RecoverUserMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<RecoverUserMutation, RecoverUserMutationVariables>(RecoverUserDocument, options)
}
export type RecoverUserMutationHookResult = ReturnType<typeof useRecoverUserMutation>
export type RecoverUserMutationResult = Apollo.MutationResult<RecoverUserMutation>
export type RecoverUserMutationOptions = Apollo.BaseMutationOptions<RecoverUserMutation, RecoverUserMutationVariables>
export const UpdateUserByAdminDocument = gql`
  mutation updateUserByAdmin($input: UpdateUserByAdminInput!) {
    updateUserByAdmin(input: $input) {
      id
    }
  }
`
export type UpdateUserByAdminMutationFn = Apollo.MutationFunction<UpdateUserByAdminMutation, UpdateUserByAdminMutationVariables>

/**
 * __useUpdateUserByAdminMutation__
 *
 * To run a mutation, you first call `useUpdateUserByAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserByAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserByAdminMutation, { data, loading, error }] = useUpdateUserByAdminMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserByAdminMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserByAdminMutation, UpdateUserByAdminMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateUserByAdminMutation, UpdateUserByAdminMutationVariables>(UpdateUserByAdminDocument, options)
}
export type UpdateUserByAdminMutationHookResult = ReturnType<typeof useUpdateUserByAdminMutation>
export type UpdateUserByAdminMutationResult = Apollo.MutationResult<UpdateUserByAdminMutation>
export type UpdateUserByAdminMutationOptions = Apollo.BaseMutationOptions<UpdateUserByAdminMutation, UpdateUserByAdminMutationVariables>
