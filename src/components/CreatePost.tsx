import { Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useCreatePostMutation } from '../generated/graphql';
import InputField from './InputField';

const CreatePost: React.FC<{}> = () => {
  const [createPost] = useCreatePostMutation();
  const [errors, setErrors] = useState('');
  const handleSubmit = async (values) => {
    const { errors: createPostErrors } = await createPost({
      variables: { input: values },
      update: (cache) => {
        cache.evict({ fieldName: 'posts:{}' });
      },
    });
    if (createPostErrors) {
      // setErrors(createPostErrors);
      // router.push('/');
      console.log('Error creating post: ', { createPostErrors });
    }
  };
  return (
    <>
      <Formik initialValues={{ title: '', slug: '' }} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="Title" label="Title" />
            <InputField name="slug" placeholder="post-slug" label="Slug" />
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
