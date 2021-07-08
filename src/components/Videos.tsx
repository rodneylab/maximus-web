import React from 'react';
import CreateVideo from './CreateVideo';
import Video from './Video';

const Videos = ({ slug, videos }) => {
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
                videoKey={key}
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
