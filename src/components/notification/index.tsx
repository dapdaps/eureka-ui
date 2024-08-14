import { INotification } from '@/components/navigation/desktop/Notification';

import styles from './notification.module.css';
import { formatTimeAgo } from '@/utils/format-time';
import cls from 'classnames';

export default function Notification({
  data,
  className,
  variant = 'default',
  onClick,
}: {
  data: INotification;
  className?: string;
  variant?: 'default' | 'list';
  onClick?: () => void;
}) {
  return (
    <div className={cls(styles.NotificationComWrapper, className)} onClick={onClick}>
      <img className={styles.icon} src={data.logo} />
      {variant === 'default' && (
        <div className={styles.content}>
          <div className={styles.descContent}>
            <div className={styles.title}>{data.title}</div>
            <div className={styles.time}>
              {!data.status && <div className={styles.dot}></div>}
              <div className={styles.timeText}>{formatTimeAgo(data.created_at)}</div>
            </div>
          </div>
          <div className={cls(styles.subTtitle, `${className}-sub-title`)}>{data.content}</div>
        </div>
      )}
      {variant === 'list' && (
        <div className={cls(styles.content, styles.notificationList)}>
          <div className={styles.descContent}>
            <div className={styles.title}>{data.title}</div>
            <div className={cls(styles.subTtitle, `${className}-sub-title`)}>{data.content}</div>
          </div>
          <div className={styles.time}>
            {!data.status && <div className={styles.dot}></div>}
            <div className={styles.timeText}>{formatTimeAgo(data.created_at)}</div>
          </div>
        </div>
      )}
    </div>
  );
}
