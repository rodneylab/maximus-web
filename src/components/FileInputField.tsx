import { FormControl, FormErrorMessage, FormLabel, Input, VisuallyHidden } from '@chakra-ui/react';
import { ErrorMessage, Field, useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';

type FileInputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  accept: string;
  label: string;
  name: string;
  isRequired?: boolean;
  onChange(event: ChangeEvent<HTMLInputElement>): void;
};

const FileInputField: React.FC<FileInputFieldProps> = ({
  accept,
  'aria-hidden': ariaHidden,
  className,
  id,
  isRequired,
  label,
  name,
  onChange,
  placeholder,
  type,
}) => {
  const [, meta] = useField({ id, name, placeholder, type });

  return (
    <>
      <VisuallyHidden>
        <label htmlFor={id}>{label}</label>
      </VisuallyHidden>
      <Field name={name}>
        {({ field, form }) => (
          <FormControl id={id}>
            <FormLabel>{label}</FormLabel>
            <Input
              id={id}
              type="file"
              multiple
              formEncType="multipart/form-data"
              name={name}
              onChange={onChange}
              accept={accept}
            />
          </FormControl>
        )}
      </Field>
      <FormErrorMessage>
        <ErrorMessage name={name} component="small" />
      </FormErrorMessage>
    </>
  );
};

export { FileInputField as default };
