import { useState, useEffect } from 'react';

import Notification from '@/components/notification';
import Pagination from '@/components/pagination';

import styles from './notification.module.css';
import { get } from '@/utils/http';

import { INotification } from '@/components/navigation/desktop/Notification';
import styled from 'styled-components';

import Skeleton from 'react-loading-skeleton';
import Empty from '@/components/Empty';
import useAuthCheck from '@/hooks/useAuthCheck';
import useAccount from '@/hooks/useAccount';
import { useDebounceFn } from 'ahooks';
import { useNeedRefreshStore } from '@/stores/useNeedRefreshStore';

const WrapperList = styled.div`
  margin-top: 22px;
`;

const StyleNotification = styled.div`
  background: linear-gradient(180deg, #202329 0%, #101115 100%);
  position: relative;
  background-clip: padding-box;
  border: 1px solid transparent;
  border-radius: 12px;
  background: rgba(16, 17, 21, 1);
  margin-bottom: 20px;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 0;
    margin: 1px;
    border-radius: inherit; /*important*/
    background: rgba(16, 17, 21);
  }
  & .list-notice {
    position: relative;
    z-index: 2;
    &:hover {
      cursor: pointer;
    }
  }
`;

// const mockNotifications = (page: number, pageSize: number = 5): Promise<any> => {
//   return new Promise((resolve) => {
//     const totalNotifications = 20;
//     const notifications: INotification[] = [];

//     for (let i = 1; i <= totalNotifications; i++) {
//       const notification: INotification = {
//         created_at: new Date().toISOString(),
//         status: Math.floor(Math.random() * 3),
//         title: `Notification Title ${i}`,
//         id: i,
//         logo: `https://via.placeholder.com/50?text=Logo+${i}`,
//         user_id: Math.floor(Math.random() * 1000),
//         content: `This is the content of notification ${i}.`,
//       };
//       notifications.push(notification);
//     }
//     const startIndex = (page - 1) * pageSize;
//     const endIndex = startIndex + pageSize;
//     const paginatedData = notifications.slice(startIndex, endIndex);
//     setTimeout(() => resolve({ data: paginatedData, total: totalNotifications }), 1000);
//   });
// };

const LoadingList = () => (
  <>
    {Array.from({ length: 5 }).map(() => (
      <Skeleton height={84} borderRadius={'12px'} style={{ marginBottom: '20px' }} />
    ))}
  </>
);

const List = () => {
  const [data, setData] = useState<INotification[]>();
  const [pageNum, setPageNum] = useState(1);
  const [page_size, _] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });
  const { account } = useAccount();
  const setRefresh = useNeedRefreshStore((state) => state.setRefresh);

  const fetchNotification = async (page = 1) => {
    setPageNum(page);
    try {
      setLoading(true);
      const result = await get(`/api/notification/list`, {
        page: pageNum,
        page_size,
      });
      setData(result?.data?.data || []);
      setTotal(result?.data?.total_page || 0);
      setRefresh(new Date().getTime());
    } catch (err) {
      console.log(err, 'err');
    } finally {
      setLoading(false);
    }
  };

  const { run } = useDebounceFn(
    () => {
      check(() => fetchNotification());
    },
    { wait: 300 },
  );

  useEffect(() => {
    run();
  }, [account]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>Notification</div>
          <div className={styles.headerAmount}>{total}</div>
        </div>
        <WrapperList>
          {loading && !data ? (
            <LoadingList />
          ) : data?.length === 0 ? (
            <Empty size={64} tips="No Data" />
          ) : (
            data?.map((item) => (
              <StyleNotification key={item.id}>
                <Notification variant="list" className="list-notice" data={item} />
              </StyleNotification>
            ))
          )}
        </WrapperList>
        <div className={styles.page}>
          <Pagination
            pageTotal={total}
            pageIndex={pageNum}
            onPage={(page) => {
              fetchNotification(page);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default List;