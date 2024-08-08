
import { INotification } from '@/components/navigation/desktop/Notification';

import styles from './notification.module.css';
import { formatTimeAgo } from '@/utils/format-time';

export default function Notification({
    data
}: {
    data: INotification
}) {
  console.log(data, 'data');
  
  return (
    <div className={styles.wrapper}>
        <img className={styles.icon} src={data.logo} />
    
      <div className={styles.content}>
        <div className={styles.descContent}>
          <div className={styles.title}>New achievement!</div>
          <div className={styles.time}>
            {!data.status && <div className={styles.dot}></div>}
            <div className={styles.timeText}>{formatTimeAgo(data.created_at)}</div>
          </div>
        </div>
        <div className={styles.subTtitle}>{data.content}</div>
      </div>
    </div>
  );
}
