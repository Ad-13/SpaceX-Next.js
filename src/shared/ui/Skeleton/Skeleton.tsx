import classNames from 'classnames';
import styles from './Skeleton.module.scss';

interface IProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  className?: string;
}

export default function Skeleton({
  width,
  height = '1rem',
  borderRadius,
  className,
}: IProps) {
  return (
    <div
      className={classNames(styles.skeleton, className)}
      style={{
        width,
        height,
        borderRadius,
      }}
      aria-hidden="true"
    />
  );
}
