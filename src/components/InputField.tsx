import { VisuallyHidden } from '@chakra-ui/react';
import { ErrorMessage, Field, useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  isRequired?: boolean;
};

const InputField: React.FC<InputFieldProps> = ({
  'aria-hidden': ariaHidden,
  className,
  id,
  // innerRef,
  isRequired,
  label,
  name,
  placeholder,
  type,
}) => {
  const [, meta] = useField({ id, name, placeholder, type });

  return (
    <>
      <VisuallyHidden>
        <label htmlFor={id}>{label}</label>
      </VisuallyHidden>
      <Field
        as="input"
        id={id}
        aria-hidden={ariaHidden}
        aria-invalid={meta.error && meta.touched ? 'true' : null}
        aria-describedby={meta.error && meta.touched ? `${id}-error` : null}
        aria-required={isRequired ? true : null}
        className={className}
        name={name}
        placeholder={placeholder}
        type={type}
        // innerRef={innerRef}
      />
      <ErrorMessage name={name} component="small" />
    </>
  );
};
export { InputField as default };
