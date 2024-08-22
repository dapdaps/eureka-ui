import { useDebounceFn, useLockFn } from 'ahooks';
import { useEffect, useMemo,useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

import Loading from '@/components/Icons/Loading';
import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import useInititalDataWithAuth from '@/hooks/useInititalDataWithAuth';
import { get, post } from '@/utils/http';
import type { MedalType } from "@/views/Profile/types";

import CheckInGrid, { type CheckInGridRef } from './CheckInGrid';
import MedalCard from './MedalCard';
import MedalPopup from './MedalPopup';
import type { ICheckInData } from './types';

const StyleCheckIn = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 34px;

  &:hover {
    .text {
      cursor: pointer;
      color: rgba(255, 255, 255, 1);
    }
  }

  .text {
    font-size: 12px;
    line-height: 12px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.8);
  }
`;

const StyledImg = styled.img<{ isHovered: boolean }>`
  width: ${(props) => (props.isHovered ? '41px' : '18px')};
  height: ${(props) => (props.isHovered ? '36px' : '16px')};
  transition: width 0.3s, height 0.3s;
  margin-right: 6px;
  object-fit: contain;
`;

const StyleDropdown = styled.div`
  position: absolute;
  top: 34px;
  right: -10px;
  .dropdown-content {
    width: 472px;
    border: 1px solid #333648;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
    background-color: #1f2229;
    border-radius: 12px;
    border-top-width: 0;
  }
  .dropdown-header {
    padding: 20px 20px 20px 36px;
    border: 1px solid #333648;
    border-right-width: 0;
    border-left-width: 0;
    border-radius: 12px;
    display: flex;
    align-items: center;
    .header-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: Montserrat;
      text-align: left;
      margin-right: 48px;
      gap: 4px;
      &:nth-last-child(2) {
        margin-right: 30px;
      }
      .value {
        font-size: 26px;
        font-weight: 700;
        line-height: 26px;
      }
      .label {
        font-size: 14px;
        font-weight: 400;
        line-height: 14px;
        text-align: left;
      }
    }
    .dap-check {
      padding: 16px 28px;
      font-size: 16px;
      font-weight: 700;
      line-height: 16px;
      text-align: left;
      color: rgba(0, 0, 0, 1);
      background: rgba(235, 244, 121, 1);

      border-radius: 12px;
      &:hover {
        cursor: pointer;
        background: rgba(235, 244, 121, 0.8);
        color: rgba(0, 0, 0, 0.5);
      }
    }
  }
  .dropdown-main {
    padding: 16px 20px 22px 20px;
    text-align: center;
    .dropdown-medals {
      margin-bottom: 16px;
    }
    .mystery-img {
      width: 220px;
      height: 20px;
      margin-bottom: 24px;
      display: inline-block;
    }
    .mystery-header {
        font-family: Montserrat;
        font-size: 16px;
        font-weight: 700;
        line-height: 20px;
        background: linear-gradient(90deg, #FFFFFF 0%, #979ABE 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 20px;
    }
  }
`;

const StyledButton = styled.button`
  width: 154px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 10px;
  background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
  color: #1e2028;
  font-size: 16px;
  font-weight: 700;
  border: none;
  transition: 0.3s;
  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }
  &:disabled {
    background: #7c7f96;
    opacity: 0.5;
  }
`;

const LoadingCard = () => (
  <>
    <Skeleton width={432} height={145} borderRadius={'12px'} />
    <Skeleton width={432} height={200} borderRadius={'12px'} style={{ marginTop: '20px' }} />
  </>
);

const CheckIn = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navHeaderRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<ICheckInData>();
  const [loading, setLoading] = useState<boolean>(false);
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });
  const { account } = useAccount();
  const [claimLoading, setClaimLoading] = useState(false);

  const [medalData, setMedalData] = useState<MedalType>();
  const [medalVisible, setMedalVisible] = useState(false);
  // const [checkDisabled, setCheckDisabled] = useState(false);
  const { getInitialDataWithAuth } = useInititalDataWithAuth();

  const [imgSrc, setImgSrc] = useState('/images/header/fist-dapdap.png');
  const checkInGridRef = useRef<CheckInGridRef>(null);
  
  const isClaimed = useMemo(() => {
    if (!data) return false;
    return data?.data?.some((item) => item.status === 'claimed' && item?.today);
  }, [data]);

  // const isTodayClaim = useMemo(() => {
  //   if (!data) return false;
  //   return data?.data?.find((item) => item.today)?.day
  // }, [data])


  const handleMouseEnter = () => {
    setIsHovered(true);
    setImgSrc('/images/header/dapdap.gif');
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setImgSrc('/images/header/fist-dapdap.png');
  };

  const handleClick = () => {
    setIsHovered(true);
    setImgSrc('/images/header/dapdap.gif');
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (navHeaderRef.current && !navHeaderRef.current.contains(event.target as Node)) {
      setIsHovered(false);
      setImgSrc('/images/header/fist-dapdap.png');
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchSignsInfo = async () => {
    try {
      setLoading(true);
      const result = await get(`/api/check-in`);
      setData(result.data);
    } catch (err) {
      console.log(err, 'err');
    } finally {
      setLoading(false);
    }
  };

  const { run } = useDebounceFn(
    () => {
      check(() => fetchSignsInfo());
    },
    { wait: 300 },
  );

  const updateTokenAndRun = useLockFn(async () => {
    await getInitialDataWithAuth(account);
    run();
  });

  useEffect(() => {
    updateTokenAndRun();
  }, [account]);

  const checkIn = async () => {
    try {
      setClaimLoading(true);
      const data = await post(`/api/check-in`);

      // if (checkInGridRef.current && isTodayClaim) { // to trigger check in grid animation
      //   checkInGridRef.current.triggerCheckIn(isTodayClaim);
      // }
      run()
      if (data?.data?.medal) {
        setMedalData(data.data.medal);
        setMedalVisible(true);
      }
    } catch (err) {
      console.log(err, 'err');
    } finally {
      setClaimLoading(false);
    }
  };

  const { run: claim } = useDebounceFn(
    () => {
      check(() => checkIn());
    },
    { wait: 300 },
  );

  return (
    <>
      <StyleCheckIn
        ref={navHeaderRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <StyledImg src={imgSrc} alt="fist" isHovered={isHovered} />
        <span className="text">DapMeUp!</span>
        {isHovered && (
          <StyleDropdown>
            <div className="dropdown-content">
              <div className="dropdown-header">
                <div className="header-item">
                  <span className="value">{data?.total_days ?? '-'}</span>
                  <span className="label">times in total</span>
                </div>
                <div className="header-item">
                  <span className="value">{data?.consecutive_days ?? '-'}</span>
                  <span className="label">days in a row</span>
                </div>
                <StyledButton
                  disabled={isClaimed || claimLoading}
                  data-bp="1001-007"
                  onClick={() => {
                    claim();
                  }}
                >
                  {claimLoading && <Loading size={16} />}
                  <span style={{ marginLeft: claimLoading ? '4px' : '' }}>Dap me up!</span>
                </StyledButton>
              </div>
              <div className="dropdown-main">
                {loading ? (
                  <LoadingCard />
                ) : (
                  <>
                    {data?.medal && (
                      <div className="dropdown-medals">
                        <MedalCard threshold={data.medal.threshold} today_days={data.total_days} medal={data.medal} style={{ width: '100%', height: '142px' }} />
                      </div>
                    )}
                    {data && data.data?.length > 0 && (
                      <div className="dropdown-mystery">
                        <div className='mystery-header'>GM, Keep the Streak Alive !</div>
                        <div className="dropdown-mystery-box">
                          <CheckInGrid ref={checkInGridRef} dayStatus={data.data} />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </StyleDropdown>
        )}
      </StyleCheckIn>
      {
        medalData && <MedalPopup visible={medalVisible} data={medalData} close={() => setMedalVisible(false)}></MedalPopup>
      }
    </>
  );
};

export default CheckIn;
