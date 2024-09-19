import cls from 'classnames';
import { useMemo } from 'react';

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
  const link = useMemo(() => {
    if (data?.link) {
      return data?.link;
    } else {
      const array = ['New achievement!', 'PTS convert to Gem'];
      if (array.indexOf(data?.title) > -1) {
        return '/profile?target=reward';
      }
    }
  }, [data]);
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
            {link && (
              <div
                className={styles.button}
                onClick={() => {
                  window.open(link);
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
            {link && (
              <div
                className={styles.button}
                onClick={() => {
                  window.open(link);
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
