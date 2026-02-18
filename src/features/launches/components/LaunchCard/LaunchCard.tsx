import { Launch } from '../../types/launch';
import styles from './LaunchCard.module.scss';

interface IProps {
  launch: Launch;
}

export default function LaunchCard({ launch }: IProps) {
  return (
    <article className={styles.card}>
      <h2>{launch.name}</h2>
      <p>{new Date(launch.date_utc).toLocaleDateString()}</p>
      <p>
        {launch.success === null
          ? 'Upcoming'
          : launch.success
          ? 'Success'
          : 'Failure'}
      </p>
    </article>
  );
}
