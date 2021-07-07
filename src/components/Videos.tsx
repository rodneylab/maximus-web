import React from 'react';
import { useVideosQuery } from '../generated/graphql';
import CreateVideo from './CreateVideo';
import Video from './Video';

const Videos = ({ slug, videos }) => {
  const { data, error, loading } = useVideosQuery({
    variables: {
      slug,
    },
  });

  if (loading) {
    return <>loading...</>;
  }

  if (error) {
    return <>Videos: {error.message}</>;
  }

  if (videos.length === 0) {
    return (
      <>
        Post with slug: {slug} does not have any videos yet
        <CreateVideo slug={slug} />
      </>
    );
  }

  return (
    <>
      <h4>Post Videos:</h4>
      <ul>
        {videos?.map((element) => {
          const { createdAt, description, id, key, playbackId } = element;

          return (
            <li key={id}>
              <Video
                createdAt={createdAt}
                description={description}
                id={id}
                key={key}
                playbackId={playbackId}
              />
            </li>
          );
        })}
      </ul>
      <CreateVideo slug={slug} />
    </>
  );
};

export { Videos as default };
