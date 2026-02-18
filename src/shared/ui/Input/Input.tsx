import { InputHTMLAttributes } from 'react';
import { Field, FieldProps } from 'formik';
import classNames from 'classnames';
import styles from './Input.module.scss';

interface IProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> {
  name: string;
  label?: string;
  hint?: string;
}

export default function Input({ name, label, hint, className, ...rest }: IProps) {
  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => {
        const hasError = meta.touched && meta.error;

        return (
          <div className={styles.field}>
            {label && (
              <label htmlFor={name} className={styles.label}>
                {label}
              </label>
            )}

            <input
              {...field}
              {...rest}
              id={name}
              className={classNames(
                styles.input,
                {
                  [styles.inputError]: hasError,
                },
                className
              )}
              aria-invalid={!!hasError}
              aria-describedby={
                hasError
                  ? `${name}-error`
                  : hint
                  ? `${name}-hint`
                  : undefined
              }
            />

            {hint && !hasError && (
              <p id={`${name}-hint`} className={styles.hint}>
                {hint}
              </p>
            )}

            {hasError && (
              <p id={`${name}-error`} className={styles.error} role="alert">
                {meta.error}
              </p>
            )}
          </div>
        );
      }}
    </Field>
  );
}
