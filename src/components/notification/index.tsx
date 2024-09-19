import cls from 'classnames';

import type { INotification } from '@/components/navigation/desktop/Notification';
import { formatTimeAgo } from '@/utils/format-time';

import styles from './notification.module.css';

export default function Notification({
  data,
  className,
  variant = 'default',
  onClick
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
        <div className={styles.contentWrap}>
          <div className={cls(styles.content, styles.defaultContent)}>
            <div className={cls(styles.descContent)}>
              <div className={styles.title}>{data.title}</div>
            </div>
            <div className={cls(styles.subTtitle, `${className}-sub-title`, styles.defaultSubTtitle)}>
              {data.content}
            </div>
          </div>
          <div className={styles.timeAndButton}>
            <div className={styles.time} style={{ lineHeight: 19 }}>
              {!data.status && <div className={styles.dot}></div>}
              <div className={styles.timeText}>{formatTimeAgo(data.created_at)}</div>
            </div>
            {data?.link && (
              <div
                className={styles.button}
                onClick={() => {
                  window.open(data?.link);
                }}
              >
                More
              </div>
            )}
          </div>
        </div>
      )}
      {variant === 'list' && (
        <div className={cls(styles.content, styles.notificationList)}>
          <div className={styles.descContent} style={{ width: 673 }}>
            <div className={styles.title}>{data.title}</div>
            <div className={cls(styles.subTtitle, `${className}-sub-title`, styles.listDescContent)}>
              {data.content}
            </div>
          </div>
          <div className={styles.timeAndButton} style={{ flexDirection: 'row', gap: 34 }}>
            {data?.link && (
              <div
                className={styles.button}
                onClick={() => {
                  window.open(data?.link);
                }}
              >
                More
              </div>
            )}
            <div className={styles.time} style={{ width: 'auto' }}>
              {!data.status && <div className={styles.dot}></div>}
              <div className={styles.timeText}>{formatTimeAgo(data.created_at)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
