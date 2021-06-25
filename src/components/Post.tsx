import React from 'react';
import { usePostQuery } from '../generated/graphql';

const Post = ({ slug }) => {
  const { data, error, loading } = usePostQuery({
    variables: {
      slug,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (loading) {
    return <>loading...</>;
  }

  if (error) {
    return <>{error.message}</>;
  }

  if (!data?.post) {
    return <>Could not find post</>;
  }

  const { title, createdAt, videos } = data.post;
  return (
    <>
      <h3>{title}</h3>
      <p>{slug}</p>
      <p>Created: {createdAt}</p>
      <h4>Videos</h4>
      {videos == null ? null : <pre>{JSON.stringify(videos, null, 2)}</pre>}
    </>
  );
};

export { Post as default };
