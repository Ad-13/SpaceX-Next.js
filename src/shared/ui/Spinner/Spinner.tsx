import styles from './Spinner.module.scss';

interface IProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Spinner({ size = 'md', className }: IProps) {
  return (
    <span
      className={`${styles.spinner} ${styles[size]} ${className ?? ''}`}
      role="status"
      aria-label="Loading"
    >
      <span className={styles.visuallyHidden}>Loading...</span>
      
    </span>
  );
}
