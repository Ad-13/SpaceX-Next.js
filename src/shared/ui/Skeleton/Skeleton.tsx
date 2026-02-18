import classNames from 'classnames';
import styles from './Skeleton.module.scss';

interface IProps {
  width?: string | number;
  height?: string | number;
  marginBottom?: string | number;
  borderRadius?: string;
  className?: string;
}

export default function Skeleton({
  width,
  height = '1rem',
  borderRadius,
  marginBottom,
  className,
}: IProps) {
  return (
    <div
      className={classNames(styles.skeleton, className)}
      style={{
        width,
        height,
        borderRadius,
        marginBottom,
      }}
      aria-hidden="true"
    />
  );
}
