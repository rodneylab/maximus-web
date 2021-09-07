import { DeleteIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React from 'react';
import { useDeleteVideoMutation } from '../generated/graphql';

dayjs.extend(timezone);
dayjs.extend(utc);
const Video = ({
  captionsStorageId,
  captionsStorageKey,
  createdAt,
  description,
  id,
  videoKey: key,
  playbackId,
  videoStorageId,
  videoStorageKey,
}) => {
  const [deleteVideoMutation] = useDeleteVideoMutation();

  const handleDelete = async (videoId) => {
    await deleteVideoMutation({
      variables: {
        id: parseInt(videoId, 10),
      },
      update: (cache) => {
        cache.evict({ videoId: `Video:${videoId}` });
      },
    });
  };

  const createdDate = dayjs(createdAt).tz(dayjs.tz.guess(), true);
  const createdDateString = createdDate.fromNow();

  return (
    <>
      {key}
      <IconButton
        aria-label="Delete video"
        icon={<DeleteIcon />}
        onClick={() => {
          handleDelete(id);
        }}
      />
      <p>Description: {description}</p>
      <p>Playback id: {playbackId}</p>
      <p>Captions storage id: {captionsStorageId}</p>
      <p>Captions storage key: {captionsStorageKey}</p>
      <p>Video storage id: {videoStorageId}</p>
      <p>Video storage key: {videoStorageKey}</p>
      <p>Created: {createdDateString}</p>
      <>{dayjs(new Date()).fromNow()}</>
    </>
  );
};

export { Video as default };
