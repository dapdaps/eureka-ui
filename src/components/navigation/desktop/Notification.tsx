import styled from 'styled-components';

import NotificationItem from '@/components/notification';
import { useEffect, useRef, useState } from 'react';
import { get } from '@/utils/http';
import { useRouter } from 'next/router';
import Skeleton from 'react-loading-skeleton';
import useAuthCheck from '@/hooks/useAuthCheck';
import useAccount from '@/hooks/useAccount';
import Empty from '@/components/Empty';
import { useDebounceFn } from 'ahooks';
import { useNeedRefreshStore } from '@/stores/useNeedRefreshStore';
import { StyledContainer } from '@/styled/styles';


const Wrapper = styled.div`
  position: relative;
  .dot {
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 15px;
    border: 1px solid rgba(22, 24, 29, 1);
    background-color: rgba(255, 0, 138, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 10px;
    font-weight: 600;
    top: 10%;
    left: 50%;
  }
`;

const Trigger = styled.div`
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  &:hover {
    cursor: pointer;
    background-color: rgba(24, 25, 30, 1);
  }
`;

const Layer = styled.div`
  position: absolute;
  top: 38px;
  right: -20px;
  width: 436px;
  border-radius: 12px;
  border: 1px solid rgba(51, 54, 72, 1);
  background: rgba(31, 34, 41, 1);
`;

const LayerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 16px 0 16px;
  margin-bottom: 10px;
  .noti-title {
    font-family: Montserrat;
    font-size: 18px;
    font-weight: 600;
    line-height: 18px;
    text-align: left;
    color: rgba(255, 255, 255, 1);
  }
  .noti-read-all {
    font-family: Montserrat;
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    color: rgba(151, 154, 190, 1);
    text-decoration: underline;
    &:hover {
      cursor: pointer;
      color: rgba(255, 255, 255, 1);
    }
  }
`;

const StyleLoading = styled.div`
  padding: 16px;
`

export interface INotification {
  created_at: string;
  status: number;
  title: string;
  id: number;
  logo: string;
  user_id: number;
  content: string;
}

export interface INotificationsResponse {
  unread: number;
  data: INotification[];
}


const LoadingList = () => (
  <>
    <StyleLoading>
      <Skeleton height={80} count={3} borderRadius={'12px'}/>
    </StyleLoading>    
  </>
)

export default function Notification() {
  const [isHovered, setIsHovered] = useState(false);
  const [data, setData] = useState<INotificationsResponse>();
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false);
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });
  const { account } = useAccount();
  const refresh = useNeedRefreshStore((state) => state.refresh);
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsHovered(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchNotification = async () => {
    try {
      setLoading(true);
      const result = await get(`/api/notification/latest`);
      setData(result.data);
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
  }, [account, refresh]);



  return (
    <Wrapper ref={ref} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Trigger>
        <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 3.47727C9.30518 3.47727 11.1806 5.40419 11.1806 7.77273V13.0435L11.5575 13.4565L12.3437 14.3182H1.65634L2.44248 13.4565L2.81943 13.0435V7.77273C2.81943 5.40419 4.69481 3.47727 7 3.47727ZM7 2.04545C3.92151 2.04545 1.42591 4.60964 1.42591 7.77273V12.4773L0.325424 13.6834C-0.389751 14.4672 0.151135 15.75 1.19687 15.75H12.8032C13.8489 15.75 14.3897 14.4672 13.6746 13.6834L12.5741 12.4773V7.77273C12.5741 4.60964 10.0785 2.04545 7 2.04545ZM8.39352 16.5682H5.60648C5.42168 16.5682 5.24446 16.6436 5.11379 16.7779C4.98312 16.9121 4.90972 17.0942 4.90972 17.2841C4.90972 17.474 4.98312 17.6561 5.11379 17.7903C5.24446 17.9246 5.42168 18 5.60648 18H8.39352C8.57831 18 8.75554 17.9246 8.88621 17.7903C9.01687 17.6561 9.09028 17.474 9.09028 17.2841C9.09028 17.0942 9.01687 16.9121 8.88621 16.7779C8.75554 16.6436 8.57831 16.5682 8.39352 16.5682ZM7.49768 0H6.50231C6.41081 -1.40093e-09 6.32021 0.0185176 6.23567 0.0544954C6.15114 0.0904732 6.07433 0.143207 6.00963 0.209685C5.94493 0.276163 5.8936 0.355085 5.85859 0.441943C5.82357 0.528801 5.80555 0.621895 5.80555 0.715909C5.80555 0.809924 5.82357 0.903018 5.85859 0.989876C5.8936 1.07673 5.94493 1.15565 6.00963 1.22213C6.07433 1.28861 6.15114 1.34135 6.23567 1.37732C6.32021 1.4133 6.41081 1.43182 6.50231 1.43182H7.49768C7.58918 1.43182 7.67979 1.4133 7.76432 1.37732C7.84886 1.34135 7.92567 1.28861 7.99037 1.22213C8.05507 1.15565 8.10639 1.07673 8.14141 0.989876C8.17642 0.903018 8.19445 0.809924 8.19445 0.715909C8.19445 0.621895 8.17642 0.528801 8.14141 0.441943C8.10639 0.355085 8.05507 0.276163 7.99037 0.209685C7.92567 0.143207 7.84886 0.0904732 7.76432 0.0544954C7.67979 0.0185176 7.58918 -1.40093e-09 7.49768 0Z"
            fill="#979ABE"
          />
        </svg>
      </Trigger>

      {!!data?.unread && <div className="dot">{data.unread}</div>}

      {isHovered && (
        <Layer>
          <LayerHeader>
            <div className="noti-title">Notifications</div>
            <StyledContainer className="noti-read-all" data-bp="1001-006-001" onClick={() => {
              router.push('/notification')
              setIsHovered(false);
            } }>Read all</StyledContainer>
          </LayerHeader>
          <div className="noti-content">
            {
              loading ? <LoadingList /> : data?.data.length === 0 ? 
              <Empty size={48} tips="Waiting New Notifications" />:
              data?.data.map((item) => {
                return <NotificationItem key={item.id} data={item} onClick={() => {
                  router.push('/notification')
                  setIsHovered(false)
                }}/>;
              })
            }
          </div>
        </Layer>
      )}
    </Wrapper>
  );
}