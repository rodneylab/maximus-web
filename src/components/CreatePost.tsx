import { Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useCreatePostMutation } from '../generated/graphql';
import InputField from './InputField';

const CreatePost: React.FC<{}> = () => {
  const [createPost] = useCreatePostMutation();
  const [, setErrors] = useState('');
  const handleSubmit = async (values) => {
    const { errors: createPostErrors } = await createPost({
      variables: { input: values },
      update: (cache) => {
        cache.evict({ fieldName: 'posts:{}' });
      },
    });
    if (createPostErrors) {
      setErrors(`Error creating post: ${createPostErrors[0].message}`);
      createPostErrors.forEach((error) => {
        console.log('Error creating post: ', error.message);
      });
    }
  };
  return (
    <>
      <Formik initialValues={{ title: '', slug: '' }} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="Title" label="Title" isRequired />
            <InputField name="slug" placeholder="post-slug" label="Slug" isRequired />
            <Button type="submit" isLoading={isSubmitting}>
              Add Post
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export { CreatePost as default };
