"use client";

import Big from 'big.js';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { Suspense, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import FjordModal from '@/components/fjord-modal';
import tokenConfig from '@/components/fjord-modal/hooks/tokenConfig';
import Loading from '@/components/Icons/Loading';
import DappBack from '@/components/PageBack';
import chainCofig from '@/config/chains';
import useDappInfo from '@/hooks/useDappInfo';
import { useUserStore } from '@/stores/user';

import {
  StyledContainer,
  StyledFlex,
  StyledFont,
  StyledLoadingWrapper,
  StyledSvg
} from '@/styled/styles';
import type { Token } from '@/types';
import { formatValueDecimal } from '@/utils/formate';
import DappDetail from '@/views/Dapp/components/DappDetail';
import DappDetailScroll from '@/views/Dapp/components/DappDetail/Scroll';
import DappFallback from '@/views/Dapp/components/Fallback';

import Timer from './components/Timer';
import usePool from './hooks/usePool';
import usePools from './hooks/usePools';
import useUser from './hooks/useUser';

const StyledFjordSvgContainer = styled.div`
  position: absolute;
  width: 600px;
  height: 600px;
  left: 50%;
  top: -165px;
  transform: translateX(-50%);
  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 600px;
    opacity: 0.3;
    background: radial-gradient(50% 50% at 50% 50%, #543DC9 0%, rgba(84, 61, 201, 0.00) 100%);
    filter: blur(25px);
    z-index: 10;
  }
  svg {
    position: absolute;
    left: 50%;
    top: 233px;
    transform: translateX(-50%);
    z-index: 20;
  }
`

const StyledYoursContainer = styled.div`
  position: relative;
  z-index: 10;
  margin-bottom: 80px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`
const StyledYours = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 1124px;
  height: 105px;
  padding: 0 34px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #373A53;
  background: #262836;
`
const StyledProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 116px;

`
const StyledProject = styled.div`
  position: relative;
  /* margin-bottom: 116px; */
  padding: 14px 30px 14px 14px;
  display: flex;
  /* align-items: center; */
  gap: 30px;
  width: 1124px;
  height: 363px;
  border-radius: 16px;
  border: 1px solid #373A53;
  background: #262836;
`
const StyledTimerContainer = styled.div`
  position: absolute;
  right: 30px;
  top: 30px;
  display: flex;
  gap: 22px;
`
const StyledProjectImageContainer = styled.div`
  position: relative;
  width: 335px;
  height: 335px;
  border-radius: 16px;
  background: #0D0E12;
  overflow: hidden;
`
const StyledProjectImage = styled.img`
  width: 100%;
  height: 100%;

`
const StyledProjectStatus = styled.div`
  /* position: absolute;
  left: 15px;
  top: 15px; */
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0 7px 0 8px;
  height: 26px;
  border-radius: 30px;
  border: 1px solid #61FD53;
  background: rgba(14, 80, 8, 0.20);
  backdrop-filter: blur(5px);
  &.upcoming {
    border-color: #FFAE63;
    background-color: rgba(156, 95, 38, 0.20);
    span {
      color: #FFAE63;
    }
  }
  span {
    color: #61FD53;
    font-family: Montserrat;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`
const StyledProjectSupportChain = styled.div`
  position: absolute;
  left: 12px;
  top: 13px;
  height: 30px;
  padding: 0 7px 0 5px;
  display: flex;
  align-items: center;
  gap: 5px;
  border-radius: 6px;
  background: #373A53;
  backdrop-filter: blur(5px);
  span {
    color: #FFF;
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`
const StyledProjectButtonContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 11px;
`
const StyledProjectButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 212px;
  height: 56px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #543DC9;
  color: #FFF;
  text-align: center;
  font-family: Gantari;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`
const StyledCompletedSalesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 38px;
`
const StyledCompletedSalesTable = styled.div``
const StyledCompletedSalesTHeader = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  margin-bottom: 20px;

`
const StyledCompletedSalesTh = styled.div`
  display: flex;
  gap: 6px;
  flex: 1;
`
const StyledCompletedSalesTBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
const StyledCompletedSalesTr = styled.div`
  display: flex;
  align-items: center;
  height: 89px;
  border-radius: 12px;
  border: 1px solid #373A53;
  background: #262836;
`
const StyledCompletedSalesTd = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`
const StyledLogoContainer = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
`
const StyledLogo = styled.img`
  width: 100%;
  height: 100%;
`
const StyledChainImage = styled.img`
  width: 20px;
`

const StyledTokenImageContainer = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  overflow: hidden;
`
const StyledTokenImage = styled.img`
  width: 100%;
`

const StyledCurrentChain = styled.div`
  cursor: pointer;
  padding-left: 9px;
  padding-right: 33px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 6px;
  border: 1px solid #3D405A;
  span {
    color: #FFF;
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`
const StyledChainList = styled.div`
  position: absolute;
  display: none;
  bottom: 0;
  left: 0;
  transform: translateY(100%);
  width: 204px;
  border: 1px solid #373a53;
  border-radius: 12px;
  background-color: #303142;
  padding: 12px 0;
  z-index: 10;
`
const StyledChainListContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  &:hover {
    ${StyledChainList} {
      display: block;
    }
  }
`
const StyledChain = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #FFF;
  cursor: pointer;
  line-height: 38px;
  padding: 0 10px;
  span {
    font-size: 14px;
  }
  &:hover {
    background-color: rgba(24, 26, 39, 0.3);
  }
`
const StyledPoolStatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`
const StyledPoolStatus = styled.div`
  cursor: pointer;
  padding: 6px 22px;
  border-radius: 6px;
  color: #FFF;
  text-align: right;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  border: 1px solid #3D405A;
  &.active {
    background: #543DC9;
  }
`

const StyledSpecitalRewardTips = styled.div`
  display: none;
  position: absolute;
  top: -6px;
  right: -85px;
  transform: translateY(-100%);
  padding: 10px 0 10px 14px;
  width: 181px;
  height: 53px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid #373A53;
  background: #373A53;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
  color: #979ABE;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const StyledSpecitalReward = styled.div`
  position: relative;
  cursor: pointer;
  &:hover {
    ${StyledSpecitalRewardTips} {
      display: block;
    }
  }
`
const StyledCircleSvg = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @keyframes rotateAnimate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  &.loading {
    animation: rotateAnimate 1s linear infinite;
  }
`
const STATUS_TXT_MAPPING: any = {
  'ongoing': 'Live Now',
  'upcoming': 'Coming Soon'
}
const COLUMN_LIST = [{
  key: "symobl",
  label: "Token & Project",
}, {
  key: "rate_return_usd",
  label: "Rate of Return",
  sortable: true
}, {
  key: "funds_raised_usd",
  label: "Funds Raised",
  sortable: true
}, {
  key: "participants",
  label: "Participants",
  sortable: true
}, {
  key: "chain_id",
  label: "Chain",
}, {
  key: "start_time",
  label: "Start Date",
  sortable: true
}]
const FjordSvg = (
  <svg xmlns="http://www.w3.org/2000/svg" width="98" height="30" viewBox="0 0 98 30" fill="none">
    <path d="M19.419 17.6401V12.3594H5.28369V17.6401H19.419Z" fill="url(#paint0_linear_15098_1236)" />
    <path d="M21.6066 0H8.20589C3.67302 0 0 3.6684 0 8.1953V29.9999H5.28357V8.1953C5.28357 6.58281 6.59131 5.27687 8.20589 5.27687H21.6066V0Z" fill="url(#paint1_linear_15098_1236)" />
    <path d="M0 11.8395C0 10.2271 2.4461 5.27687 8.20589 5.27687H21.6066V0H8.20589C3.67302 0 0 3.6684 0 8.1953V11.8395Z" fill="url(#paint2_linear_15098_1236)" />
    <path d="M27.0356 0V17.8339C27.0356 21.6393 23.9478 24.7231 20.1375 24.7231H12.8518V29.9999H20.1091C26.854 29.9999 32.3192 24.5418 32.3192 17.8057V0H27.0356Z" fill="url(#paint3_linear_15098_1236)" />
    <path d="M32.3232 15.0391C32.3232 18.8445 28.9851 24.7219 20.1415 24.7219H12.8518V29.9988H20.1091C26.8539 29.9988 32.3192 24.5405 32.3192 17.8045V15.0391H32.3232Z" fill="url(#paint4_linear_15098_1236)" />
    <path d="M54.1315 0H45.2234C41.1225 0 37.7964 3.32175 37.7964 7.41731V29.9999H43.0801V7.30445C43.0801 6.18383 43.9883 5.27672 45.1104 5.27672H54.1315V0Z" fill="url(#paint5_linear_15098_1236)" />
    <path d="M45.2234 0C41.1225 0 37.7964 3.32175 37.7964 7.41731V29.9999H43.0801V7.30445C43.0801 4.90591 44.2022 0 48.5049 0H45.2234Z" fill="url(#paint6_linear_15098_1236)" />
    <path d="M43.0801 29.9999H51.9882C56.0892 29.9999 59.4152 26.6782 59.4152 22.5826V0H54.1315V22.6955C54.1315 23.8161 53.2233 24.7231 52.1012 24.7231H43.0801V29.9999Z" fill="url(#paint7_linear_15098_1236)" />
    <path d="M51.9924 29.9999C56.0934 29.9999 59.4194 26.6782 59.4194 22.5826V0H54.1359V22.6955C54.1359 25.094 53.0137 29.9999 48.7109 29.9999H51.9924Z" fill="url(#paint8_linear_15098_1236)" />
    <path d="M70.1762 29.9999V12.1661C70.1762 8.36065 73.264 5.27687 77.0743 5.27687H84.36V0H77.1026C70.3578 0 64.8926 5.45817 64.8926 12.1943V29.9999H70.1762Z" fill="url(#paint9_linear_15098_1236)" />
    <path d="M64.8926 14.9596C64.8926 11.1541 68.2307 5.27687 77.0743 5.27687H84.36V0H77.1026C70.3578 0 64.8926 5.45817 64.8926 12.1943V14.9596Z" fill="url(#paint10_linear_15098_1236)" />
    <path d="M91.9282 10.8887H83.0199C78.9189 10.8887 75.593 14.2104 75.593 18.306V30.0005H80.8766V18.1971C80.8766 17.0765 81.7847 16.1696 82.9069 16.1696H91.9282V10.8887Z" fill="url(#paint11_linear_15098_1236)" />
    <path d="M83.0199 10.8887C78.9189 10.8887 75.593 14.2104 75.593 18.306V30.0005H80.8766V18.1971C80.8766 15.7986 81.9987 10.8928 86.3015 10.8928H83.0199V10.8887Z" fill="url(#paint12_linear_15098_1236)" />
    <path d="M80.8765 29.9999H89.7848C93.8857 29.9999 97.2116 26.6782 97.2116 22.5826V0H91.928V22.6955C91.928 23.8161 91.0199 24.7231 89.8978 24.7231H80.8765V29.9999Z" fill="url(#paint13_linear_15098_1236)" />
    <path d="M89.7848 29.9999C93.8857 29.9999 97.2117 26.6782 97.2117 22.5826V0H91.9281V22.6955C91.9281 25.094 90.806 29.9999 86.5032 29.9999H89.7848Z" fill="url(#paint14_linear_15098_1236)" />
    <defs>
      <linearGradient id="paint0_linear_15098_1236" x1="19.4179" y1="14.9996" x2="5.28459" y2="14.9996" gradientUnits="userSpaceOnUse">
        <stop stop-color="#EDEEFF" />
        <stop offset="1" stop-color="#9FA2FF" />
      </linearGradient>
      <linearGradient id="paint1_linear_15098_1236" x1="10.8026" y1="0" x2="10.8026" y2="29.9997" gradientUnits="userSpaceOnUse">
        <stop offset="0.25" stop-color="#EDEEFF" />
        <stop offset="1" stop-color="#9FA2FF" />
      </linearGradient>
      <linearGradient id="paint2_linear_15098_1236" x1="10.8026" y1="0" x2="10.8026" y2="11.8403" gradientUnits="userSpaceOnUse">
        <stop stop-color="#EDEEFF" />
        <stop offset="1" stop-color="#9FA2FF" />
      </linearGradient>
      <linearGradient id="paint3_linear_15098_1236" x1="22.5873" y1="29.9997" x2="22.5873" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0.5" stop-color="#EDEEFF" />
        <stop offset="0.9" stop-color="#9FA2FF" />
      </linearGradient>
      <linearGradient id="paint4_linear_15098_1236" x1="12.8527" y1="22.5178" x2="32.3219" y2="22.5178" gradientUnits="userSpaceOnUse">
        <stop stop-color="#EDEEFF" />
        <stop offset="1" stop-color="#9FA2FF" />
      </linearGradient>
      <linearGradient id="paint5_linear_15098_1236" x1="37.7961" y1="14.9998" x2="54.1321" y2="14.9998" gradientUnits="userSpaceOnUse">
        <stop stop-color="#EDEEFF" />
        <stop offset="1" stop-color="#9FA2FF" />
      </linearGradient>
      <linearGradient id="paint6_linear_15098_1236" x1="43.1506" y1="29.9997" x2="43.1506" y2="0" gradientUnits="userSpaceOnUse">
        <stop stop-color="#EDEEFF" />
        <stop offset="1" stop-color="#9FA2FF" />
      </linearGradient>
      <linearGradient id="paint7_linear_15098_1236" x1="59.4167" y1="14.9998" x2="43.0805" y2="14.9998" gradientUnits="userSpaceOnUse">
        <stop stop-color="#EDEEFF" />
        <stop offset="1" stop-color="#9FA2FF" />
      </linearGradient>
      <linearGradient id="paint8_linear_15098_1236" x1="54.0622" y1="0" x2="54.0622" y2="29.9995" gradientUnits="userSpaceOnUse">
        <stop stop-color="#EDEEFF" />
        <stop offset="1" stop-color="#9FA2FF" />
      </linearGradient>
      <linearGradient id="paint9_linear_15098_1236" x1="74.6255" y1="0" x2="74.6255" y2="29.9995" gradientUnits="userSpaceOnUse">
        <stop offset="0.5" stop-color="#EDEEFF" />
        <stop offset="0.9" stop-color="#9FA2FF" />
      </linearGradient>
      <linearGradient id="paint10_linear_15098_1236" x1="84.3603" y1="7.48068" x2="64.8909" y2="7.48068" gradientUnits="userSpaceOnUse">
        <stop stop-color="#EDEEFF" />
        <stop offset="1" stop-color="#9FA2FF" />
      </linearGradient>
      <linearGradient id="paint11_linear_15098_1236" x1="75.5933" y1="20.4452" x2="91.9283" y2="20.4452" gradientUnits="userSpaceOnUse">
        <stop stop-color="#EDEEFF" />
        <stop offset="1" stop-color="#9FA2FF" />
      </linearGradient>
      <linearGradient id="paint12_linear_15098_1236" x1="80.9479" y1="30.0002" x2="80.9479" y2="10.8903" gradientUnits="userSpaceOnUse">
        <stop stop-color="#EDEEFF" />
        <stop offset="1" stop-color="#9FA2FF" />
      </linearGradient>
      <linearGradient id="paint13_linear_15098_1236" x1="97.2127" y1="14.9998" x2="80.8777" y2="14.9998" gradientUnits="userSpaceOnUse">
        <stop stop-color="#EDEEFF" />
        <stop offset="1" stop-color="#9FA2FF" />
      </linearGradient>
      <linearGradient id="paint14_linear_15098_1236" x1="91.8582" y1="0" x2="91.8582" y2="29.9995" gradientUnits="userSpaceOnUse">
        <stop stop-color="#EDEEFF" />
        <stop offset="1" stop-color="#9FA2FF" />
      </linearGradient>
    </defs>
  </svg>
)

const ChainList = function (props: any) {
  const {
    chainId,
    setChainId,
    poolsMapping
  } = props
  return (
    <StyledChainListContainer>

      <StyledCurrentChain>
        {
          chainId === "0" ? (
            <span>All Chain</span>
          ) : (
            <>
              <StyledChainImage src={chainCofig[chainId]?.icon} />
              <span>{chainCofig[chainId]?.chainName}</span>
            </>
          )
        }
        <StyledSvg style={{ position: 'absolute', right: 9, top: 13 }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
            <path d="M1 1L6 5L11 1" stroke="#979ABE" stroke-width="1.6" stroke-linecap="round" />
          </svg>
        </StyledSvg>
      </StyledCurrentChain>
      <StyledChainList>
        {
          Object.keys(poolsMapping).map((_chainId: any) => {
            return (
              <StyledChain key={_chainId} onClick={() => setChainId(_chainId)}>
                {
                  _chainId === "0" ? (
                    <span>All Chain</span>
                  ) : (
                    <>
                      <StyledChainImage src={chainCofig[_chainId]?.icon} />
                      <span>{chainCofig[_chainId]?.chainName}</span>
                    </>
                  )
                }

                {
                  _chainId === chainId && (
                    <StyledSvg style={{ position: 'absolute', right: 10, top: 16 }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 4.11111L5.28571 8L13 1" stroke="#EBF479" stroke-width="2" stroke-linecap="round"></path></svg>
                    </StyledSvg>
                  )
                }
              </StyledChain>
            )
          })
        }
      </StyledChainList>
    </StyledChainListContainer>
  )
}
export default function LaunchpadHomePage() {
  const router = useRouter();
  const userStore = useUserStore((store: any) => store.user);
  const { loading, setLoading, pools, queryPools, contractDataMapping } = usePools(userStore.address)
  const { loading: poolLoading, queryPool } = usePool()
  const { user, queryUser } = useUser()
  const dappPathname = router.pathname ?? '';
  const { dapp } = useDappInfo(dappPathname.slice(1));

  const [checkedPoolAddress, setCheckedPoolAddress] = useState('')
  const [poolToken, setPoolToken] = useState<Token>()
  const [midToken, setMidToken] = useState<Token>()
  const [chainId, setChainId] = useState(1)
  const [price, setPrice] = useState('0')
  const [sortKey, setSortKey] = useState('')
  const [fjordModalShow, setFjordModalShow] = useState(false)
  const [upcomingAndOngoingChainId, setUpcomingAndOngoingChainId] = useState("0")
  const [poolStatusIndex, setPoolStatusIndex] = useState(0)
  const [completedPoolsChainId, setCompletedPoolsChainId] = useState("0")
  const [isFixedPriceSale, setIsFixedPriceSale] = useState(false)

  const upcomingAndOngoingPoolsMapping = useMemo(() => {
    const filterPools = pools.filter(pool => pool.status === 'upcoming' || pool.status === 'ongoing')
    const poolsMpping: any = {
      0: filterPools, // all
    }
    filterPools.forEach((pool) => {
      const pools = poolsMpping[pool?.chain_id] ?? []
      pools.push(pool)
      poolsMpping[pool?.chain_id] = pools
    })
    return poolsMpping
  }, [pools])

  const upcomingAndOngoingPools = useMemo(() => {
    const pools = upcomingAndOngoingPoolsMapping[upcomingAndOngoingChainId] ?? []
    return pools?.filter((pool: any) => {
      if (poolStatusIndex === 0) {
        return pool.status === 'ongoing'
      } else if (poolStatusIndex === 1) {
        return pool.status === 'upcoming'
      } else {
        return pool.status === 'ongoing' || pool.status === 'upcoming'
      }
    })
  }, [upcomingAndOngoingPoolsMapping, upcomingAndOngoingChainId, poolStatusIndex])


  const completedPoolsMapping = useMemo(() => {
    const filterPools = pools.filter(pool => pool.status === 'completed')
    const poolsMpping: any = {
      0: filterPools, // all
    }
    filterPools.forEach((pool) => {
      const pools = poolsMpping[pool?.chain_id] ?? []
      pools.push(pool)
      poolsMpping[pool?.chain_id] = pools
    })
    return poolsMpping
  }, [pools])

  const completedPools = useMemo(() => {
    const pools = completedPoolsMapping[completedPoolsChainId]
    return pools?.sort((prev: any, next: any) => prev[sortKey] - next[sortKey])
  }, [completedPoolsMapping, completedPoolsChainId, sortKey])

  const handleBuyOrSell = function (data: any) {
    if (data.status === 'upcoming') {
      return
    }
    setIsFixedPriceSale(data?.mode === 'fixed_price')
    setCheckedPoolAddress(data.pool)

    setPoolToken({
      chainId: data.chain_id,
      address: data.share_token_address,
      name: data.share_token_name,
      symbol: data.share_token_symbol,
      icon: data.logo,
      logoURI: data.logo,
      decimals: data.share_token_decimal,
      isNative: false,
    })

    setMidToken({
      chainId: data.chain_id,
      address: data.asset_token_address,
      name: data.asset_token_symbol,
      symbol: data.asset_token_symbol,
      icon: data.asset_token_logo,
      logoURI: data.asset_token_logo,
      decimals: data.asset_token_decimal,
      isNative: false,
    })

    setChainId(data.chain_id)
    setPrice(data.price_usd)

    setFjordModalShow(true)
  }
  const handleSort = function (key?: any) {
    key && setSortKey(key === sortKey ? "" : key)
  }
  const handlePoolStatusIndexChange = function (index: number) {
    queryPools()
    setPoolStatusIndex(index)
  }

  useEffect(() => {
    queryPools()
  }, [])
  useEffect(() => {
    userStore.address && queryUser()
  }, [userStore.address])
  return (
    <StyledContainer style={{ width: 1124, margin: '0 auto', paddingTop: 138, position: 'relative' }}>
      <StyledContainer style={{ position: 'absolute', left: 0, top: 30 }}>
        <DappBack defaultPath="/alldapps" />
      </StyledContainer>
      <StyledFjordSvgContainer>
        {FjordSvg}
      </StyledFjordSvgContainer>
      <StyledYoursContainer>
        <StyledFont color='#FFF' fontSize='20px' fontWeight='600'>You  Participated</StyledFont>
        <StyledYours onClick={() => {
          router.push("/stake/fjord/yours")
        }}>
          <StyledFlex flexDirection='column' alignItems='flex-start' gap="13px" style={{ flex: 1 }}>
            <StyledFont color='#979ABE' fontSize='18px' fontWeight='500'>Your Total Cost</StyledFont>
            <StyledFont color='#FFF' fontSize='26px' fontWeight='500'>{formatValueDecimal(user?.total_cost ?? 0, '$', 4)}</StyledFont>
          </StyledFlex>
          <StyledFlex flexDirection='column' alignItems='flex-start' gap="13px" style={{ flex: 1 }}>
            <StyledFont color='#979ABE' fontSize='18px' fontWeight='500'>Your Avg. Rate of Return</StyledFont>
            <StyledFont color='#FFF' fontSize='26px' fontWeight='500'>{Big(user?.rate_return_avg ?? 0).toFixed(0)}%</StyledFont>
          </StyledFlex>
          {
            user?.lbps?.length > 0 && (
              <StyledFlex flexDirection='column' alignItems='flex-start' gap="13px" style={{ flex: 1 }}>
                <StyledFont color='#979ABE' fontSize='18px' fontWeight='500'>In Progress</StyledFont>
                <StyledFlex>
                  {
                    user?.lbps?.map((lbp: any, index: number) => (
                      <StyledLogoContainer key={index} style={{ marginLeft: index > 0 ? -9 : 0 }}>
                        <StyledLogo src={lbp.logo} />
                      </StyledLogoContainer>
                    )) ?? (<></>)
                  }
                </StyledFlex>
              </StyledFlex>
            )
          }
          <StyledFlex>
            <svg xmlns="http://www.w3.org/2000/svg" width="7" height="10" viewBox="0 0 7 10" fill="none">
              <path d="M6.52391 4.21913C7.02432 4.61945 7.02432 5.38054 6.52391 5.78087L1.6247 9.70024C0.969933 10.2241 -4.70242e-07 9.75788 -4.3359e-07 8.91937L-9.0947e-08 1.08062C-5.42947e-08 0.242118 0.969932 -0.224055 1.62469 0.299755L6.52391 4.21913Z" fill="#979ABE" />
            </svg>
          </StyledFlex>
        </StyledYours>
      </StyledYoursContainer>
      <StyledProjectContainer>
        <StyledFlex justifyContent='space-between'>
          <StyledFont color='#FFF' fontSize='20px' fontWeight='600'>Upcoming & Ongoing</StyledFont>
          <StyledFlex gap='15px'>
            <ChainList
              chainId={upcomingAndOngoingChainId}
              setChainId={setUpcomingAndOngoingChainId}
              poolsMapping={upcomingAndOngoingPoolsMapping}
            />
            <StyledPoolStatusContainer>
              <StyledPoolStatus className={poolStatusIndex === 0 ? 'active' : ''} onClick={() => handlePoolStatusIndexChange(0)}>Live</StyledPoolStatus>
              <StyledPoolStatus className={poolStatusIndex === 1 ? 'active' : ''} onClick={() => handlePoolStatusIndexChange(1)}>Upcoming</StyledPoolStatus>
              <StyledPoolStatus className={poolStatusIndex === 2 ? 'active' : ''} onClick={() => handlePoolStatusIndexChange(2)}>All</StyledPoolStatus>
            </StyledPoolStatusContainer>
          </StyledFlex>
        </StyledFlex>
        <StyledFlex flexDirection='column' gap='30px'>
          {loading ? (
            <StyledLoadingWrapper $h="100px">
              <Loading size={60} />
            </StyledLoadingWrapper>
          ) : (
            upcomingAndOngoingPools && upcomingAndOngoingPools.length > 0 ? upcomingAndOngoingPools.map((pool: any, index: number) => (
              <StyledProject key={index}>
                <StyledProjectImageContainer>
                  <StyledProjectSupportChain>
                    <StyledChainImage src={chainCofig[pool?.chain_id]?.icon} />
                    <span>{chainCofig[pool?.chain_id]?.chainName}</span>
                  </StyledProjectSupportChain>
                  <StyledProjectImage src={pool?.banner} />
                </StyledProjectImageContainer>
                <StyledContainer style={{ flex: 1, paddingTop: 16 }}>
                  <StyledFlex alignItems='flex-start' gap='16px'>
                    <StyledTokenImageContainer style={{ width: 60, height: 60 }}>
                      <StyledTokenImage src={pool.logo} />
                    </StyledTokenImageContainer>
                    <StyledFlex flexDirection='column' alignItems='flex-start' gap='9px'>
                      <StyledFont color='#FFF' fontSize='32px' fontWeight='600'>{pool.share_token_symbol}</StyledFont>
                      <StyledFont color='#979ABE' fontSize='14px' fontWeight='500'>{pool.share_token_name}</StyledFont>
                    </StyledFlex>
                  </StyledFlex>
                  <StyledFlex justifyContent='space-between' style={{ marginTop: 106, marginBottom: 30 }}>
                    <StyledFlex flexDirection='column' alignItems='flex-start' gap='10px'>
                      <StyledFont color='#FFF' fontSize='16px' fontWeight='500'>Participants</StyledFont>
                      <StyledFont color='#FFF' fontSize='20px' fontWeight='700'>{formatValueDecimal(pool?.total_participants)}</StyledFont>
                    </StyledFlex>
                    <StyledFlex flexDirection='column' alignItems='flex-start' gap='10px'>
                      <StyledFont color='#FFF' fontSize='16px' fontWeight='500'>Funds Raised</StyledFont>
                      <StyledFont color='#FFF' fontSize='20px' fontWeight='700'>{formatValueDecimal(pool?.funds_raised_usd ?? 0, '$', 2, true)}</StyledFont>
                    </StyledFlex>
                    <StyledFlex flexDirection='column' alignItems='flex-start' gap='10px'>
                      <StyledFont color='#FFF' fontSize='16px' fontWeight='500'>Price</StyledFont>
                      <StyledFont color='#FFF' fontSize='20px' fontWeight='700'>{formatValueDecimal(pool?.price_usd ?? 0, '$', 3)}</StyledFont>
                    </StyledFlex>
                    {
                      pool?.share_token_name === 'RAGE' && (
                        <StyledFlex flexDirection='column' alignItems='flex-start'>
                          <StyledFont color='#FFF' fontSize='16px' fontWeight='500'>Purchased Shares</StyledFont>
                          <StyledFont color='#FFF' fontSize='20px' fontWeight='700'>{formatValueDecimal(contractDataMapping[pool?.pool]?.purchased_shares ?? 0, '', 3)}</StyledFont>
                        </StyledFlex>
                      )
                    }
                  </StyledFlex>
                  <StyledFlex>
                    {
                      pool?.share_token_name === 'RAGE' ? (
                        <StyledFlex flexDirection='column' alignItems='flex-start'>
                          <StyledSpecitalReward>
                            <StyledFont color='#FFF' fontSize='16px' fontWeight='500'>Special Reward 🎁</StyledFont>
                            <StyledSpecitalRewardTips>The first 100 buyers will get 500 PTS for each</StyledSpecitalRewardTips>
                          </StyledSpecitalReward>

                          <StyledFlex gap='9px'>
                            <StyledSpecitalReward>
                              <StyledFont color='#FFF' fontSize='20px' fontWeight='700'>{Math.min(pool?.buy_part ?? 0, 100)}/100</StyledFont>
                              <StyledSpecitalRewardTips style={{ bottom: -6, top: 'unset', right: '50%', transform: 'translate(50%, 100%)' }}>There are {Math.min(pool?.buy_part ?? 0, 100)} users got spcial reward currently</StyledSpecitalRewardTips>
                            </StyledSpecitalReward>

                            <StyledCircleSvg
                              className={poolLoading ? 'loading' : ''}
                              onClick={() => {
                                !poolLoading && queryPool({
                                  id: pool?.id
                                })
                              }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2 6.5712C2 4.05076 4.05347 2 6.59586 2C7.86245 2 9.00705 2.50825 9.8388 3.33211C9.85304 3.34622 9.8676 3.35981 9.88246 3.37289L8.95291 4.00183C8.7765 4.12118 8.68642 4.33284 8.7227 4.54271C8.75898 4.75258 8.91489 4.92171 9.12112 4.97492L11.9203 5.69712C12.0698 5.73569 12.2287 5.70864 12.3569 5.62277C12.4852 5.5369 12.5708 5.40038 12.5921 5.24748L12.9951 2.35867C13.0246 2.14675 12.9267 1.9373 12.7451 1.82413C12.5635 1.71097 12.3323 1.71532 12.1551 1.83522L11.4856 2.28823C11.4369 2.15032 11.3571 2.02099 11.2463 1.91117C10.0543 0.730553 8.40941 0 6.59586 0C2.95723 0 0 2.93787 0 6.5712C0 10.2045 2.95723 13.1424 6.59586 13.1424C9.29961 13.1424 11.6238 11.5213 12.6418 9.20154C12.7745 8.89923 12.885 8.58498 12.9714 8.26086C13.1136 7.72719 12.7962 7.17931 12.2625 7.03712C11.7289 6.89494 11.181 7.2123 11.0388 7.74597C10.979 7.97046 10.9024 8.1882 10.8104 8.39783C10.1014 10.0134 8.48142 11.1424 6.59586 11.1424C4.05347 11.1424 2 9.09165 2 6.5712Z" fill="#979ABE" />
                              </svg>
                            </StyledCircleSvg>
                          </StyledFlex>
                        </StyledFlex>
                      ) : (
                        <StyledFlex flexDirection='column' alignItems='flex-start'>
                          <StyledFont color='#FFF' fontSize='16px' fontWeight='500'>Purchased Shares</StyledFont>
                          <StyledFont color='#FFF' fontSize='20px' fontWeight='700'>{formatValueDecimal(contractDataMapping[pool?.pool]?.purchased_shares ?? 0, '', 3)}</StyledFont>
                        </StyledFlex>
                      )
                    }
                    <StyledProjectButtonContainer>
                      <StyledProjectButton
                        style={{
                          opacity: pool.status === "upcoming" ? "0.3" : "1",
                          cursor: pool.status === "upcoming" ? "not-allowed" : "pointer"
                        }}
                        onClick={() => handleBuyOrSell(pool)}
                      >{pool.status === "upcoming" ? "Coming Soon" : "Buy Now"}</StyledProjectButton>
                      <StyledProjectButton
                        onClick={() => {
                          router.push('/stake/fjord/detail?id=' + pool?.id)
                        }}
                      >View More</StyledProjectButton>
                    </StyledProjectButtonContainer>
                  </StyledFlex>
                </StyledContainer>
                <StyledTimerContainer>
                  {/* {pool.start_time * 1000 > Date.now() && <div>Upcoming</div>} */}
                  <StyledProjectStatus className={pool.status}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <circle cx="5.04456" cy="5.04456" r="5.04456" fill={pool.status === "ongoing" ? "#61FD53" : "#FFAE63"} />
                    </svg>
                    <span>{STATUS_TXT_MAPPING[pool.status]}</span>
                  </StyledProjectStatus>
                  {pool.start_time * 1000 > Date.now() ? (
                    <Timer endTime={Number(pool.start_time * 1000)} />
                  ) : (
                    <Timer endTime={Number(pool.end_time * 1000)} />
                  )}
                </StyledTimerContainer>
              </StyledProject>
            )) : (
              <StyledFlex justifyContent='center' style={{ paddingTop: 60 }}>
                <StyledFont color='#979ABE' fontSize='16px'>Empty</StyledFont>
              </StyledFlex>
            )
          )}
        </StyledFlex>
      </StyledProjectContainer>
      <StyledCompletedSalesContainer>

        <StyledFlex justifyContent='space-between'>
          <StyledFont color='#FFF' fontSize='20px' fontWeight='600'>Completed Token Sales</StyledFont>
          <ChainList
            chainId={completedPoolsChainId}
            setChainId={setCompletedPoolsChainId}
            poolsMapping={completedPoolsMapping}
          />
        </StyledFlex>
        <StyledCompletedSalesTable>
          <StyledCompletedSalesTHeader>
            {
              COLUMN_LIST.map((column, index) => (
                <StyledCompletedSalesTh
                  key={index}
                  style={{
                    cursor: column.sortable ? 'pointer' : 'unset',
                    flex: column.key === 'chain_id' ? 0.5 : 1
                  }}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <StyledFont
                    color="#979ABE"
                    fontSize="16px"
                    fontWeight="400"
                    style={{
                      paddingLeft: index === 0 ? 26 : 0,
                    }}
                  >{column.label}</StyledFont>
                  {
                    column?.sortable && (
                      <StyledSvg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M5.78087 7.02391C5.38055 7.52432 4.61946 7.52432 4.21913 7.02391L0.299758 2.1247C-0.224053 1.46993 0.242119 0.499999 1.08063 0.499999L8.91938 0.5C9.75788 0.5 10.2241 1.46993 9.70024 2.12469L5.78087 7.02391Z" fill={sortKey === column.key ? "#FFF" : "#979ABE"} />
                        </svg>
                      </StyledSvg>
                    )
                  }
                </StyledCompletedSalesTh>
              ))
            }
          </StyledCompletedSalesTHeader>
          <StyledCompletedSalesTBody>
            {loading ? (
              <StyledLoadingWrapper $h="100px">
                <Loading size={60} />
              </StyledLoadingWrapper>
            ) : (
              completedPools && completedPools.length > 0 ? completedPools.map((pool: any, index: number) => (
                <StyledCompletedSalesTr
                  key={index}
                  onClick={() => {
                    router.push('/stake/fjord/detail?id=' + pool?.id)
                  }}
                >
                  <StyledCompletedSalesTd>
                    <StyledFlex gap='10px' style={{ paddingLeft: 20 }}>
                      <StyledTokenImageContainer style={{ width: 36, height: 36 }}>
                        <StyledTokenImage src={pool.logo} />
                      </StyledTokenImageContainer>
                      <StyledFlex flexDirection='column' alignItems='flex-start' gap='4px'>
                        <StyledFont color='#FFF' fontSize='16px' fontWeight='500'>{pool.share_token_symbol}</StyledFont>
                        <StyledFont color='#979ABE' fontSize='14px' fontWeight='500'>{pool.share_token_symbol} Exchange</StyledFont>
                      </StyledFlex>
                    </StyledFlex>
                  </StyledCompletedSalesTd>
                  <StyledCompletedSalesTd>
                    <StyledFont color='#47C33C' fontSize='16px' fontWeight='500'>{formatValueDecimal(pool?.rate_return_usd ?? 0)}%</StyledFont>
                  </StyledCompletedSalesTd>
                  <StyledCompletedSalesTd>
                    <StyledFont color='#FFF' fontSize='16px' fontWeight='500'>{formatValueDecimal(pool?.funds_raised_usd ?? 0, '$', 2)}</StyledFont>
                  </StyledCompletedSalesTd>
                  <StyledCompletedSalesTd>
                    <StyledFont color='#FFF' fontSize='16px' fontWeight='500'>{formatValueDecimal(pool?.participants ?? 0)}</StyledFont>
                  </StyledCompletedSalesTd>
                  <StyledCompletedSalesTd style={{ flex: 0.5 }}>
                    <StyledChainImage src={chainCofig[pool?.chain_id]?.icon} />
                  </StyledCompletedSalesTd>
                  <StyledCompletedSalesTd>
                    <StyledFlex style={{ width: '100%', paddingRight: 23 }}>
                      <StyledFlex flexDirection='column' gap='4px'>
                        <StyledFont color='#FFF' fontSize='16px' fontWeight='500'>{format(new Date(pool.start_time * 1000), 'do LLL yyyy')}</StyledFont>
                        <StyledFont color='#979ABE' fontSize='14px' fontWeight='500'>{format(new Date(pool.start_time * 1000), 'HH:mm aa')} - UTC</StyledFont>
                      </StyledFlex>
                      <StyledContainer style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        <StyledSvg>
                          <svg xmlns="http://www.w3.org/2000/svg" width="7" height="10" viewBox="0 0 7 10" fill="none">
                            <path d="M6.52391 4.21913C7.02432 4.61945 7.02432 5.38054 6.52391 5.78087L1.6247 9.70024C0.969933 10.2241 -4.70242e-07 9.75788 -4.3359e-07 8.91937L-9.0947e-08 1.08062C-5.42947e-08 0.242118 0.969932 -0.224055 1.62469 0.299755L6.52391 4.21913Z" fill="#979ABE" />
                          </svg>
                        </StyledSvg>
                      </StyledContainer>
                    </StyledFlex>
                  </StyledCompletedSalesTd>
                </StyledCompletedSalesTr>
              )) : (
                <StyledFlex justifyContent='center' style={{ paddingTop: 60 }}>
                  <StyledFont color='#979ABE' fontSize='16px'>Empty</StyledFont>
                </StyledFlex>
              )
            )}
          </StyledCompletedSalesTBody>
        </StyledCompletedSalesTable>
      </StyledCompletedSalesContainer>
      {
        fjordModalShow && checkedPoolAddress && (
          <FjordModal
            isFixedPriceSale={isFixedPriceSale}
            pool={checkedPoolAddress}
            token={poolToken as Token}
            midToken={midToken as Token}
            chainId={chainId}
            price={price}
            onClose={() => {
              setCheckedPoolAddress('')
              setFjordModalShow(false)
            }}
          />
        )
      }

      <DappDetailScroll />
      <Suspense fallback={<DappFallback />}>
        <DappDetail {...dapp}/>
      </Suspense>

    </StyledContainer >
  )
}