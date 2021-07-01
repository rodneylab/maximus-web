import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
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


export type Image = {
  __typename?: 'Image';
  id: Scalars['ID'];
  slug: Scalars['String'];
  key: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  post: Post;
};

export type Mutation = {
  __typename?: 'Mutation';
  createVideo: Video;
  deleteVideo: Scalars['Boolean'];
  createPost: Post;
};


export type MutationCreateVideoArgs = {
  identifiers: VideoIdentifiers;
};


export type MutationDeleteVideoArgs = {
  id: Scalars['Int'];
};


export type MutationCreatePostArgs = {
  input: PostInput;
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  posts: Array<Post>;
  hasMore: Scalars['Boolean'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['ID'];
  title: Scalars['String'];
  slug: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  images?: Maybe<Array<Image>>;
  videos?: Maybe<Array<Video>>;
  relatedPosts?: Maybe<Array<Post>>;
};

export type PostInput = {
  slug: Scalars['String'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  image: Scalars['String'];
  images: Array<Image>;
  videos: Videos;
  post?: Maybe<Post>;
  posts: PaginatedPosts;
};


export type QueryVideosArgs = {
  slug: Scalars['String'];
};


export type QueryPostArgs = {
  slug: Scalars['String'];
};


export type QueryPostsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};

export type Video = {
  __typename?: 'Video';
  id: Scalars['ID'];
  slug: Scalars['String'];
  key: Scalars['String'];
  duration: Scalars['Int'];
  playbackId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  post: Post;
};

export type VideoIdentifiers = {
  slug: Scalars['String'];
  key: Scalars['String'];
};

export type Videos = {
  __typename?: 'Videos';
  videos?: Maybe<Array<Video>>;
};

export type PostSnippetFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'slug' | 'title' | 'createdAt'>
);

export type VideoSnippetFragment = (
  { __typename?: 'Video' }
  & Pick<Video, 'id' | 'key' | 'createdAt'>
);

export type CreatePostMutationVariables = Exact<{
  input: PostInput;
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'Post' }
    & PostSnippetFragment
  ) }
);

export type CreateVideoMutationVariables = Exact<{
  identifiers: VideoIdentifiers;
}>;


export type CreateVideoMutation = (
  { __typename?: 'Mutation' }
  & { createVideo: (
    { __typename?: 'Video' }
    & VideoSnippetFragment
  ) }
);

export type DeleteVideoMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteVideoMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteVideo'>
);

export type PostQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type PostQuery = (
  { __typename?: 'Query' }
  & { post?: Maybe<(
    { __typename?: 'Post' }
    & { videos?: Maybe<Array<(
      { __typename?: 'Video' }
      & VideoSnippetFragment
    )>> }
    & PostSnippetFragment
  )> }
);

export type PostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: (
    { __typename?: 'PaginatedPosts' }
    & Pick<PaginatedPosts, 'hasMore'>
    & { posts: Array<(
      { __typename?: 'Post' }
      & PostSnippetFragment
    )> }
  ) }
);

export type VideosQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type VideosQuery = (
  { __typename?: 'Query' }
  & { videos: (
    { __typename?: 'Videos' }
    & { videos?: Maybe<Array<(
      { __typename?: 'Video' }
      & VideoSnippetFragment
    )>> }
  ) }
);

export const PostSnippetFragmentDoc = gql`
    fragment PostSnippet on Post {
  id
  slug
  title
  createdAt
}
    `;
export const VideoSnippetFragmentDoc = gql`
    fragment VideoSnippet on Video {
  id
  key
  createdAt
}
    `;
export const CreatePostDocument = gql`
    mutation CreatePost($input: PostInput!) {
  createPost(input: $input) {
    ...PostSnippet
  }
}
    ${PostSnippetFragmentDoc}`;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

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
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const CreateVideoDocument = gql`
    mutation CreateVideo($identifiers: VideoIdentifiers!) {
  createVideo(identifiers: $identifiers) {
    ...VideoSnippet
  }
}
    ${VideoSnippetFragmentDoc}`;
export type CreateVideoMutationFn = Apollo.MutationFunction<CreateVideoMutation, CreateVideoMutationVariables>;

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
 *      identifiers: // value for 'identifiers'
 *   },
 * });
 */
export function useCreateVideoMutation(baseOptions?: Apollo.MutationHookOptions<CreateVideoMutation, CreateVideoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateVideoMutation, CreateVideoMutationVariables>(CreateVideoDocument, options);
      }
export type CreateVideoMutationHookResult = ReturnType<typeof useCreateVideoMutation>;
export type CreateVideoMutationResult = Apollo.MutationResult<CreateVideoMutation>;
export type CreateVideoMutationOptions = Apollo.BaseMutationOptions<CreateVideoMutation, CreateVideoMutationVariables>;
export const DeleteVideoDocument = gql`
    mutation DeleteVideo($id: Int!) {
  deleteVideo(id: $id)
}
    `;
export type DeleteVideoMutationFn = Apollo.MutationFunction<DeleteVideoMutation, DeleteVideoMutationVariables>;

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
export function useDeleteVideoMutation(baseOptions?: Apollo.MutationHookOptions<DeleteVideoMutation, DeleteVideoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteVideoMutation, DeleteVideoMutationVariables>(DeleteVideoDocument, options);
      }
export type DeleteVideoMutationHookResult = ReturnType<typeof useDeleteVideoMutation>;
export type DeleteVideoMutationResult = Apollo.MutationResult<DeleteVideoMutation>;
export type DeleteVideoMutationOptions = Apollo.BaseMutationOptions<DeleteVideoMutation, DeleteVideoMutationVariables>;
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
${VideoSnippetFragmentDoc}`;

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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
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
    ${PostSnippetFragmentDoc}`;

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
export function usePostsQuery(baseOptions: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
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
    ${VideoSnippetFragmentDoc}`;

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
export function useVideosQuery(baseOptions: Apollo.QueryHookOptions<VideosQuery, VideosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VideosQuery, VideosQueryVariables>(VideosDocument, options);
      }
export function useVideosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VideosQuery, VideosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VideosQuery, VideosQueryVariables>(VideosDocument, options);
        }
export type VideosQueryHookResult = ReturnType<typeof useVideosQuery>;
export type VideosLazyQueryHookResult = ReturnType<typeof useVideosLazyQuery>;
export type VideosQueryResult = Apollo.QueryResult<VideosQuery, VideosQueryVariables>;