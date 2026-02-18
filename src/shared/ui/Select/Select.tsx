import { SelectHTMLAttributes } from 'react';
import { Field, FieldProps } from 'formik';
import classNames from 'classnames';
import styles from './Select.module.scss';

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
}

interface IProps<T extends string = string>
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'name'> {
  name: string;
  options: SelectOption<T>[];
  label?: string;
  hint?: string;
}

export default function Select<T extends string = string>({
  name,
  options,
  label,
  hint,
  className,
  ...rest
}: IProps<T>) {
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

            <select
              {...field}
              {...rest}
              id={name}
              className={classNames(
                styles.select,
                { [styles.selectError]: hasError },
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
            >
              {options.map(({ value, label: optionLabel }) => (
                <option key={value} value={value}>
                  {optionLabel}
                </option>
              ))}
            </select>

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
