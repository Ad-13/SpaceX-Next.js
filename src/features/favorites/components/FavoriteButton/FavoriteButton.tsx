import classNames from 'classnames';
import { Launch } from '@/features/launches/types/launch';
import styles from './FavoriteButton.module.scss';

interface IProps {
  launch: Launch;
  isFavorite: boolean;
  onToggle: (launch: Launch) => void;
  className?: string;
}

export default function FavoriteButton({ launch, isFavorite, onToggle, className }: IProps) {
  return (
    <button
      type="button"
      className={classNames(styles.button, { [styles.active]: isFavorite }, className)}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle(launch);
      }}
      aria-label={
        isFavorite
          ? `Remove ${launch.name} from favorites`
          : `Add ${launch.name} to favorites`
      }
      aria-pressed={isFavorite}
    >
      <span className={styles.icon} aria-hidden="true">
        {isFavorite ? '★' : '☆'}
      </span>
    </button>
  );
}
