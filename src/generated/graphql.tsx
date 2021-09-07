import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
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

export type CreateVideoParameters = {
  captionsFile: Scalars['String'];
  captionsStorageId: Scalars['String'];
  captionsStorageKey: Scalars['String'];
  captionsUrl: Scalars['String'];
  description: Scalars['String'];
  key: Scalars['String'];
  slug: Scalars['String'];
  videoFile: Scalars['String'];
  videoStorageId: Scalars['String'];
  videoStorageKey: Scalars['String'];
  videoUrl: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Image = {
  __typename?: 'Image';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  key: Scalars['String'];
  post: Post;
  slug: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  createVideo: Video;
  deleteVideo: Scalars['Boolean'];
  githubLogin: UserResponse;
  login: UserResponse;
  register: UserResponse;
};

export type MutationCreatePostArgs = {
  input: PostInput;
};

export type MutationCreateVideoArgs = {
  parameters: CreateVideoParameters;
};

export type MutationDeleteVideoArgs = {
  id: Scalars['Int'];
};

export type MutationGithubLoginArgs = {
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type MutationRegisterArgs = {
  options: UsernameEmailPasswordInput;
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  hasMore: Scalars['Boolean'];
  posts: Array<Post>;
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['DateTime'];
  creator: User;
  creatorId: Scalars['String'];
  id: Scalars['ID'];
  images?: Maybe<Array<Image>>;
  relatedPosts?: Maybe<Array<Post>>;
  slug: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  videos?: Maybe<Array<Video>>;
};

export type PostInput = {
  slug: Scalars['String'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  image: Scalars['String'];
  images: Array<Image>;
  me?: Maybe<User>;
  post?: Maybe<Post>;
  posts: PaginatedPosts;
  videos: Videos;
};

export type QueryPostArgs = {
  slug: Scalars['String'];
};

export type QueryPostsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};

export type QueryVideosArgs = {
  slug: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  githubLogin: Scalars['String'];
  id: Scalars['Float'];
  posts?: Maybe<Array<Post>>;
  updatedAt: Scalars['String'];
  userId: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  session?: Maybe<User>;
  user?: Maybe<User>;
};

export type UsernameEmailPasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Video = {
  __typename?: 'Video';
  captionsStorageId: Scalars['String'];
  captionsStorageKey: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  duration?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  key: Scalars['String'];
  playbackId: Scalars['String'];
  post: Post;
  ready: Scalars['Boolean'];
  slug: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  videoId: Scalars['String'];
  videoStorageId: Scalars['String'];
  videoStorageKey: Scalars['String'];
};

export type Videos = {
  __typename?: 'Videos';
  videos?: Maybe<Array<Video>>;
};

export type PostSnippetFragment = {
  __typename?: 'Post';
  id: string;
  slug: string;
  title: string;
  createdAt: any;
};

export type RegularErrorFragment = { __typename?: 'FieldError'; field: string; message: string };

export type RegularUserFragment = { __typename?: 'User'; id: number; username: string };

export type RegularUserResponseFragment = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<{ __typename?: 'FieldError'; field: string; message: string }>>;
  user?: Maybe<{ __typename?: 'User'; id: number; username: string }>;
};

export type VideoSnippetFragment = {
  __typename?: 'Video';
  id: string;
  key: string;
  createdAt: any;
  description: string;
  playbackId: string;
  captionsStorageId: string;
  captionsStorageKey: string;
  videoStorageId: string;
  videoStorageKey: string;
};

export type CreatePostMutationVariables = Exact<{
  input: PostInput;
}>;

export type CreatePostMutation = {
  __typename?: 'Mutation';
  createPost: { __typename?: 'Post'; id: string; slug: string; title: string; createdAt: any };
};

export type CreateVideoMutationVariables = Exact<{
  parameters: CreateVideoParameters;
}>;

export type CreateVideoMutation = {
  __typename?: 'Mutation';
  createVideo: {
    __typename?: 'Video';
    id: string;
    key: string;
    createdAt: any;
    description: string;
    playbackId: string;
    captionsStorageId: string;
    captionsStorageKey: string;
    videoStorageId: string;
    videoStorageKey: string;
  };
};

export type DeleteVideoMutationVariables = Exact<{
  id: Scalars['Int'];
}>;

export type DeleteVideoMutation = { __typename?: 'Mutation'; deleteVideo: boolean };

export type GithubLoginMutationVariables = Exact<{
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
}>;

export type GithubLoginMutation = {
  __typename?: 'Mutation';
  githubLogin: {
    __typename?: 'UserResponse';
    errors?: Maybe<Array<{ __typename?: 'FieldError'; field: string; message: string }>>;
    user?: Maybe<{ __typename?: 'User'; id: number; username: string }>;
  };
};

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'UserResponse';
    errors?: Maybe<Array<{ __typename?: 'FieldError'; field: string; message: string }>>;
    user?: Maybe<{ __typename?: 'User'; id: number; username: string }>;
  };
};

export type RegisterMutationVariables = Exact<{
  options: UsernameEmailPasswordInput;
}>;

export type RegisterMutation = {
  __typename?: 'Mutation';
  register: {
    __typename?: 'UserResponse';
    errors?: Maybe<Array<{ __typename?: 'FieldError'; field: string; message: string }>>;
    user?: Maybe<{ __typename?: 'User'; id: number; username: string }>;
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  me?: Maybe<{ __typename?: 'User'; id: number; username: string }>;
};

export type PostQueryVariables = Exact<{
  slug: Scalars['String'];
}>;

export type PostQuery = {
  __typename?: 'Query';
  post?: Maybe<{
    __typename?: 'Post';
    id: string;
    slug: string;
    title: string;
    createdAt: any;
    videos?: Maybe<
      Array<{
        __typename?: 'Video';
        id: string;
        key: string;
        createdAt: any;
        description: string;
        playbackId: string;
        captionsStorageId: string;
        captionsStorageKey: string;
        videoStorageId: string;
        videoStorageKey: string;
      }>
    >;
  }>;
};

export type PostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;

export type PostsQuery = {
  __typename?: 'Query';
  posts: {
    __typename?: 'PaginatedPosts';
    hasMore: boolean;
    posts: Array<{ __typename?: 'Post'; id: string; slug: string; title: string; createdAt: any }>;
  };
};

export type VideosQueryVariables = Exact<{
  slug: Scalars['String'];
}>;

export type VideosQuery = {
  __typename?: 'Query';
  videos: {
    __typename?: 'Videos';
    videos?: Maybe<
      Array<{
        __typename?: 'Video';
        id: string;
        key: string;
        createdAt: any;
        description: string;
        playbackId: string;
        captionsStorageId: string;
        captionsStorageKey: string;
        videoStorageId: string;
        videoStorageKey: string;
      }>
    >;
  };
};

export const PostSnippetFragmentDoc = gql`
  fragment PostSnippet on Post {
    id
    slug
    title
    createdAt
  }
`;
export const RegularErrorFragmentDoc = gql`
  fragment RegularError on FieldError {
    field
    message
  }
`;
export const RegularUserFragmentDoc = gql`
  fragment RegularUser on User {
    id
    username
  }
`;
export const RegularUserResponseFragmentDoc = gql`
  fragment RegularUserResponse on UserResponse {
    errors {
      ...RegularError
    }
    user {
      ...RegularUser
    }
  }
  ${RegularErrorFragmentDoc}
  ${RegularUserFragmentDoc}
`;
export const VideoSnippetFragmentDoc = gql`
  fragment VideoSnippet on Video {
    id
    key
    createdAt
    description
    playbackId
    captionsStorageId
    captionsStorageKey
    videoStorageId
    videoStorageKey
  }
`;
export const CreatePostDocument = gql`
  mutation CreatePost($input: PostInput!) {
    createPost(input: $input) {
      ...PostSnippet
    }
  }
  ${PostSnippetFragmentDoc}
`;
export type CreatePostMutationFn = Apollo.MutationFunction<
  CreatePostMutation,
  CreatePostMutationVariables
>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostMutation(
  baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(
    CreatePostDocument,
    options,
  );
}
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<
  CreatePostMutation,
  CreatePostMutationVariables
>;
export const CreateVideoDocument = gql`
  mutation CreateVideo($parameters: CreateVideoParameters!) {
    createVideo(parameters: $parameters) {
      ...VideoSnippet
    }
  }
  ${VideoSnippetFragmentDoc}
`;
export type CreateVideoMutationFn = Apollo.MutationFunction<
  CreateVideoMutation,
  CreateVideoMutationVariables
>;

/**
 * __useCreateVideoMutation__
 *
 * To run a mutation, you first call `useCreateVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVideoMutation, { data, loading, error }] = useCreateVideoMutation({
 *   variables: {
 *      parameters: // value for 'parameters'
 *   },
 * });
 */
export function useCreateVideoMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateVideoMutation, CreateVideoMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateVideoMutation, CreateVideoMutationVariables>(
    CreateVideoDocument,
    options,
  );
}
export type CreateVideoMutationHookResult = ReturnType<typeof useCreateVideoMutation>;
export type CreateVideoMutationResult = Apollo.MutationResult<CreateVideoMutation>;
export type CreateVideoMutationOptions = Apollo.BaseMutationOptions<
  CreateVideoMutation,
  CreateVideoMutationVariables
>;
export const DeleteVideoDocument = gql`
  mutation DeleteVideo($id: Int!) {
    deleteVideo(id: $id)
  }
`;
export type DeleteVideoMutationFn = Apollo.MutationFunction<
  DeleteVideoMutation,
  DeleteVideoMutationVariables
>;

/**
 * __useDeleteVideoMutation__
 *
 * To run a mutation, you first call `useDeleteVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteVideoMutation, { data, loading, error }] = useDeleteVideoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteVideoMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteVideoMutation, DeleteVideoMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteVideoMutation, DeleteVideoMutationVariables>(
    DeleteVideoDocument,
    options,
  );
}
export type DeleteVideoMutationHookResult = ReturnType<typeof useDeleteVideoMutation>;
export type DeleteVideoMutationResult = Apollo.MutationResult<DeleteVideoMutation>;
export type DeleteVideoMutationOptions = Apollo.BaseMutationOptions<
  DeleteVideoMutation,
  DeleteVideoMutationVariables
>;
export const GithubLoginDocument = gql`
  mutation GithubLogin($accessToken: String!, $refreshToken: String!) {
    githubLogin(accessToken: $accessToken, refreshToken: $refreshToken) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;
export type GithubLoginMutationFn = Apollo.MutationFunction<
  GithubLoginMutation,
  GithubLoginMutationVariables
>;

/**
 * __useGithubLoginMutation__
 *
 * To run a mutation, you first call `useGithubLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGithubLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [githubLoginMutation, { data, loading, error }] = useGithubLoginMutation({
 *   variables: {
 *      accessToken: // value for 'accessToken'
 *      refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
export function useGithubLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<GithubLoginMutation, GithubLoginMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<GithubLoginMutation, GithubLoginMutationVariables>(
    GithubLoginDocument,
    options,
  );
}
export type GithubLoginMutationHookResult = ReturnType<typeof useGithubLoginMutation>;
export type GithubLoginMutationResult = Apollo.MutationResult<GithubLoginMutation>;
export type GithubLoginMutationOptions = Apollo.BaseMutationOptions<
  GithubLoginMutation,
  GithubLoginMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

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
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const RegisterDocument = gql`
  mutation Register($options: UsernameEmailPasswordInput!) {
    register(options: $options) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;
export type RegisterMutationFn = Apollo.MutationFunction<
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
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const MeDocument = gql`
  query Me {
    me {
      ...RegularUser
    }
  }
  ${RegularUserFragmentDoc}
`;

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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const PostDocument = gql`
  query Post($slug: String!) {
    post(slug: $slug) {
      ...PostSnippet
      videos {
        ...VideoSnippet
      }
    }
  }
  ${PostSnippetFragmentDoc}
  ${VideoSnippetFragmentDoc}
`;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
}
export function usePostLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options);
}
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const PostsDocument = gql`
  query Posts($limit: Int!, $cursor: String) {
    posts(limit: $limit, cursor: $cursor) {
      posts {
        ...PostSnippet
      }
      hasMore
    }
  }
  ${PostSnippetFragmentDoc}
`;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function usePostsQuery(
  baseOptions: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
}
export function usePostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
}
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const VideosDocument = gql`
  query Videos($slug: String!) {
    videos(slug: $slug) {
      videos {
        ...VideoSnippet
      }
    }
  }
  ${VideoSnippetFragmentDoc}
`;

/**
 * __useVideosQuery__
 *
 * To run a query within a React component, call `useVideosQuery` and pass it any options that fit your needs.
 * When your component renders, `useVideosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVideosQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useVideosQuery(
  baseOptions: Apollo.QueryHookOptions<VideosQuery, VideosQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<VideosQuery, VideosQueryVariables>(VideosDocument, options);
}
export function useVideosLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<VideosQuery, VideosQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<VideosQuery, VideosQueryVariables>(VideosDocument, options);
}
export type VideosQueryHookResult = ReturnType<typeof useVideosQuery>;
export type VideosLazyQueryHookResult = ReturnType<typeof useVideosLazyQuery>;
export type VideosQueryResult = Apollo.QueryResult<VideosQuery, VideosQueryVariables>;
