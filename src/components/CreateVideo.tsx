import { Button } from '@chakra-ui/react';
import axios from 'axios';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useCreateVideoMutation } from '../generated/graphql';
import FileInputField from './FileInputField';
import InputField from './InputField';

type CreateVideoProps = {
  slug: string;
};

const CreateVideo: React.FC<CreateVideoProps> = ({ slug }) => {
  const [createVideo] = useCreateVideoMutation();
  const [errors, setErrors] = useState('');

  const handleSubmit = async (values, actions) => {
    const { description, key } = values;
    const captionsFileName = values.captions[0].name;
    const videoFileName = values.video[0].name;
    const data = new FormData();
    data.append('captions', values.captions[0], captionsFileName);
    data.append('video', values.video[0], videoFileName);
    try {
      // upload captions and video files to storage
      const response = await axios({
        url: process.env.NEXT_PUBLIC_UPLOAD_URI as string,
        method: 'POST',
        data,
      });

      if (!response.data.successful) {
        setErrors('Error uploading captions and video files to storage.');
        return;
      }
      const { id: captionsStorageId, url: captionsUrl } = response.data.captions;
      const { id: videoStorageId, url: videoUrl } = response.data.video;

      // create video
      const { errors: createVideoErrors } = await createVideo({
        variables: {
          parameters: {
            captionsFile: captionsFileName,
            captionsStorageId,
            captionsStorageKey: captionsFileName,
            captionsUrl,
            description,
            key,
            slug,
            videoFile: videoFileName,
            videoStorageId,
            videoStorageKey: videoFileName,
            videoUrl,
          },
        },
        update: (cache) => {
          cache.evict({ fieldName: 'posts:{}' });
        },
      });
      if (createVideoErrors) {
        setErrors(`Error creating video: ${createVideoErrors[0].message}`);
        createVideoErrors.forEach((error) => {
          console.log('Error creating video: ', error.message);
        });
      }

      actions.resetForm();
    } catch (error) {
      let message;
      if (error.response) {
        message = `Server responded with non 2xx code: ${error.response.data}`;
      } else if (error.request) {
        message = `No response received: ${error.request}`;
      } else {
        message = `Error setting up response: ${error.message}`;
      }
      console.log('error: ', message);
    }
  };
  return (
    <>
      <Formik initialValues={{ description: '', key: '' }} onSubmit={handleSubmit}>
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <InputField name="key" placeholder="video-key" label="Key" />
            <InputField name="description" placeholder="Description" label="Description" />
            <FileInputField
              id="captions"
              name="captions"
              label="Choose a closed captions file"
              isRequired
              accept="text/vtt"
              onChange={(event) => {
                setFieldValue('captions', event.target.files);
              }}
            />
            <FileInputField
              id="video"
              name="video"
              label="Choose a video file"
              isRequired
              accept="video/mp4"
              onChange={(event) => {
                setFieldValue('video', event.target.files);
              }}
            />
            <Button type="submit" isLoading={isSubmitting}>
              Add Video
            </Button>
          </Form>
        )}
      </Formik>
      <p>{errors}</p>
    </>
  );
};

export { CreateVideo as default };
