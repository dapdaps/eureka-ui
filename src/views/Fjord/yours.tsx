"use client"
import Big from 'big.js';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Breadcrumb from '@/components/Breadcrumb';
import FjordModal from '@/components/fjord-modal';
import tokenConfig from '@/components/fjord-modal/hooks/tokenConfig';
import { useRedeem } from '@/components/fjord-modal/hooks/useFjordTrade';
import Loading from '@/components/Icons/Loading';
import useAccount from '@/hooks/useAccount';
import { useUserStore } from '@/stores/user';
import {
  StyledContainer,
  StyledFlex,
  StyledFont,
  StyledLoadingWrapper,
  StyledSvg
} from '@/styled/styles';
import type { Token } from '@/types';
import { formatThousandsSeparator } from '@/utils/format-number';

import useUser from './hooks/useUser';
import useUserPools from './hooks/useUserPools';

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

const StyledCategoryContainer = styled.div`
  border-bottom: 1px solid #262836;
  display: flex;
  align-items: center;
`
const StyledCategory = styled.div`
  padding: 20px 26px;
  color: #979ABE;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  &.active {
    border-color: #543DC9;
    color: #FFF;
  }
`
const StyledParticipatedTable = styled.div``
const StyledParticipatedTHeader = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  margin: 38px 0 20px;

`
const StyledParticipatedTh = styled.div`
  display: flex;
  gap: 10px;
  flex: 1;
`
const StyledParticipatedTBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
const StyledParticipatedTr = styled.div`
  display: flex;
  align-items: center;
  height: 89px;
  border-radius: 12px;
  border: 1px solid #373A53;
  background: #171822;
`
const StyledParticipatedTd = styled.div`
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
const StyledParticipatedButton = styled.div`
  cursor: pointer;
  width: 135px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #543DC9;
  display: flex;
  align-items: center;
  justify-content: center;
`
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
export default function LaunchpadYoursPage() {
  const router = useRouter();
  const userStore = useUserStore((store: any) => store.user);
  const { loading, userPools, queryUserPools, contractDataMapping } = useUserPools(userStore.address)
  const { user, queryUser } = useUser()
  const [categoryIndex, setCategoryIndex] = useState(0)
  const [checkedPoolAddress, setCheckedPoolAddress] = useState('')
  const [poolToken, setPoolToken] = useState<Token>()
  const [midToken, setMidToken] = useState<Token>()
  const [chainId, setChainId] = useState(1)
  const [price, setPrice] = useState('0')
  const { account, provider } = useAccount();
  const [fjordModalShow, setFjordModalShow] = useState(false)
  const [inProgressNumber, setInProgressNumber] = useState(0)
  const { excuteRedeemTrade } = useRedeem()

  const handleQueryUserPools = function () {
    userStore.address && queryUserPools({
      status: categoryIndex === 0 ? 'ongoing' : 'completed'
    })
  }
  const handleRedeem = async function (data: any) {
    excuteRedeemTrade(data.pool, provider?.getSigner())
  }
  const handleBuyOrSellOrRedeem = function (data: any) {
    if (['upcoming', 'ongoing'].includes(data.status)) {
      setCheckedPoolAddress(data?.pool)
      setPoolToken({
        chainId: 1,
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
    } else {
      handleRedeem(data)
    }
  }
  const simplifyNumber = function (number: number, decimal: number) {
    if (typeof Number(number) !== 'number') return 0;
    if (isNaN(Number(number))) return 0;
    if (number >= 1E3 && number < 1E6) {
      return Math.floor(number / 1E3) + 'K';
    } else if (number >= 1E6) {
      return Math.floor(number / 1E6) + 'M';
    } else {
      return Big(number).toFixed(decimal);
    }
  }
  const formatValueDecimal = function (value: any, unit = '', decimal = 0, simplify = false) {
    const target = Big(1).div(Math.pow(10, decimal))
    if (Big(value).eq(0)) {
      return '-'
    } else if (Big(value).gt(0)) {
      if (Big(value).lt(target)) {
        return `<${unit}${target}`
      } else {
        return unit + (simplify ? simplifyNumber(value, decimal) : Big(value).toFixed(decimal))
      }
    } else {
      return unit + (simplify ? simplifyNumber(value, decimal) : Big(value).toFixed(decimal))
    }
  }


  useEffect(() => {
    console.log('=userPools', userPools)
    if (categoryIndex === 0 && userPools) {
      setInProgressNumber(userPools?.length ?? 0)
    }
  }, [userPools])

  useEffect(() => {
    userStore.address && queryUser()
  }, [userStore.address])

  useEffect(() => {
    userStore.address && handleQueryUserPools()
  }, [userStore.address, categoryIndex])
  return (
    <StyledContainer style={{ width: 1124, margin: '0 auto', paddingTop: 138, position: 'relative' }}>
      <StyledContainer style={{ position: 'absolute', left: -60, top: 30 }}>
        <Breadcrumb
          navs={[
            { name: 'Home', path: '/' },
            { name: 'Fjord', path: '/stake/fjord' },
          ]}
        />
      </StyledContainer>
      <StyledFjordSvgContainer>
        {FjordSvg}
      </StyledFjordSvgContainer>
      <StyledFlex
        gap='8px'
        style={{ marginBottom: 33, cursor: "pointer" }}
        onClick={() => {
          router.back()
        }}
      >
        <StyledSvg>
          <svg xmlns="http://www.w3.org/2000/svg" width="5" height="8" viewBox="0 0 5 8" fill="none">
            <path d="M4 7L1 4L4 1" stroke="#979ABE" stroke-linecap="round" />
          </svg>
        </StyledSvg>
        <StyledFont color='#979ABE' fontSize='14px' fontFamily='Gantari'>Back</StyledFont>
      </StyledFlex>
      <StyledFont color='#FFF' fontSize='32px' fontWeight='600'>You  Participated</StyledFont>
      <StyledFlex style={{ marginTop: 30, marginBottom: 60 }}>
        <StyledFlex flexDirection='column' alignItems='flex-start' gap="13px" style={{ flex: 1 }}>
          <StyledFont color='#979ABE' fontSize='14px' fontWeight='500'>Total Cost</StyledFont>
          <StyledFont color='#FFF' fontSize='26px' fontWeight='600'>{formatValueDecimal(user?.total_cost ?? 0, '$', 4)}</StyledFont>
        </StyledFlex>
        <StyledFlex flexDirection='column' alignItems='flex-start' gap="13px" style={{ flex: 1 }}>
          <StyledFont color='#979ABE' fontSize='14px' fontWeight='500'>Your Avg. Rate of Return</StyledFont>
          <StyledFont color='#FFF' fontSize='26px' fontWeight='600'>{formatValueDecimal(user?.rate_return_avg_usd ?? 0)}%</StyledFont>
        </StyledFlex>
        {
          user?.lbps?.length > 0 && (
            <StyledFlex flexDirection='column' alignItems='flex-start' gap="13px" style={{ flex: 1 }}>
              <StyledFont color='#979ABE' fontSize='14px'>In Progress</StyledFont>
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
      </StyledFlex>
      <StyledCategoryContainer>
        <StyledCategory className={categoryIndex === 0 ? "active" : ""} onClick={() => setCategoryIndex(0)}>In progress ({inProgressNumber})</StyledCategory>
        <StyledCategory className={categoryIndex === 1 ? "active" : ""} onClick={() => setCategoryIndex(1)}>History</StyledCategory>
      </StyledCategoryContainer>
      {
        categoryIndex === 0 ? (
          <StyledParticipatedTable>
            <StyledParticipatedTHeader>
              <StyledParticipatedTh>
                <StyledFont
                  color="#979ABE"
                  fontSize="16px"
                  fontWeight="400"
                  style={{ paddingLeft: 20 }}
                >Token & Project</StyledFont>
              </StyledParticipatedTh>
              <StyledParticipatedTh>
                <StyledFont
                  color="#979ABE"
                  fontSize="16px"
                  fontWeight="400"
                >Cost / Latest price</StyledFont>
              </StyledParticipatedTh>
              <StyledParticipatedTh>
                <StyledFont
                  color="#979ABE"
                  fontSize="16px"
                  fontWeight="400"
                >Rate of Return</StyledFont>
              </StyledParticipatedTh>
              <StyledParticipatedTh>
                <StyledFont
                  color="#979ABE"
                  fontSize="16px"
                  fontWeight="400"
                >Purchased Shares</StyledFont>
              </StyledParticipatedTh>
              <StyledParticipatedTh style={{ flex: 1.5 }}>
                <StyledFont
                  color="#979ABE"
                  fontSize="16px"
                  fontWeight="400"
                >LBP Status</StyledFont>
              </StyledParticipatedTh>
            </StyledParticipatedTHeader>
            <StyledParticipatedTBody>
              {loading ? (
                <StyledLoadingWrapper $h="100px">
                  <Loading size={60} />
                </StyledLoadingWrapper>
              ) : (
                userPools && userPools.length > 0 ? userPools.map((userPool, index) => (
                  <StyledParticipatedTr key={index}>
                    <StyledParticipatedTd>
                      <StyledFlex gap='10px' style={{ paddingLeft: 20 }}>
                        <StyledLogoContainer>
                          <StyledLogo src={userPool?.launchpad_lbp?.logo} />
                        </StyledLogoContainer>
                        <StyledFlex flexDirection='column' alignItems='flex-start' gap='4px'>
                          <StyledFlex gap='8px'>
                            <StyledFont color='#FFF' fontSize='16px'>{userPool?.launchpad_lbp?.share_token_symbol}</StyledFont>
                            <StyledSvg>
                              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <g clipPath="url(#clip0_13116_9622)">
                                  <path d="M9.0242 9.99611H0.0078125V0.964111H4.5121V1.9243H0.967999V9.02031H8.06401V5.48401H9.0242V9.99611Z" fill="#979ABE" />
                                  <path d="M9.08663 0.222412L9.77359 0.909375L5.33956 5.3356L4.6604 4.65645L9.08663 0.222412Z" fill="#979ABE" />
                                  <path d="M9.98442 2.97034H9.01643V0.971899H6.92432V0.00390625H9.99223L9.98442 2.97034Z" fill="#979ABE" />
                                </g>
                                <defs>
                                  <clipPath id="clip0_13116_9622">
                                    <rect width="10" height="10" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </StyledSvg>
                          </StyledFlex>
                          <StyledFont color='#979ABE' fontSize='14px'>{userPool?.launchpad_lbp?.share_token_name}</StyledFont>
                        </StyledFlex>
                      </StyledFlex>
                    </StyledParticipatedTd>
                    <StyledParticipatedTd>
                      <StyledFont color='#FFF' fontSize='16px'>{formatValueDecimal(userPool?.trading_volume ?? 0, '$', 4)} / {formatValueDecimal(userPool?.launchpad_lbp?.price_usd ?? 0, '$', 4)}</StyledFont>
                    </StyledParticipatedTd>
                    <StyledParticipatedTd>
                      <StyledFont color={Big(userPool?.rate_return_usd ?? 0).lt(0) ? '#FF508F' : '#47C33C'} fontSize='16px'>{(Big(userPool?.rate_return_usd ?? 0).lt(0) ? '' : '+') + Big(userPool?.rate_return_usd).toFixed(0) ?? 0}%</StyledFont>
                    </StyledParticipatedTd>
                    <StyledParticipatedTd>
                      <StyledFont color={['upcoming', 'ongoing'].includes(userPool?.launchpad_lbp?.status) ? '#FFF' : '#979ABE'} fontSize='16px'>{formatValueDecimal(contractDataMapping[userPool?.launchpad_lbp?.pool]?.purchased_shares ?? 0, '', 3)}</StyledFont>
                    </StyledParticipatedTd>
                    <StyledParticipatedTd style={{ flex: 1.5 }}>
                      <StyledFlex
                        justifyContent='space-between'
                        style={{ width: '100%', paddingRight: 15 }}
                      >
                        <StyledFont color='#FFF' fontSize='16px'>{userPool?.launchpad_lbp?.status}</StyledFont>
                        <StyledParticipatedButton style={{ backgroundColor: ['upcoming', 'ongoing'].includes(userPool?.launchpad_lbp?.status) ? '#543DC9' : '#1E2027', border: ['upcoming', 'ongoing'].includes(userPool?.launchpad_lbp?.status) ? 'none' : '1px solid #543DC9' }} onClick={() => handleBuyOrSellOrRedeem(userPool.launchpad_lbp)}>
                          <StyledFont color='#FFF' fontSize='18px' fontWeight='500'>{['upcoming', 'ongoing'].includes(userPool?.launchpad_lbp?.status) ? 'Buy / Sell' : 'Redeem'}</StyledFont>
                        </StyledParticipatedButton>
                      </StyledFlex>

                    </StyledParticipatedTd>
                  </StyledParticipatedTr>
                )) : (
                  <StyledFlex justifyContent='center' style={{ paddingTop: 60 }}>
                    <StyledFont color='#979ABE' fontSize='16px'>Empty</StyledFont>
                  </StyledFlex>
                )
              )}
            </StyledParticipatedTBody>
          </StyledParticipatedTable>
        ) : (
          <StyledParticipatedTable>
            <StyledParticipatedTHeader>
              <StyledParticipatedTh>
                <StyledFont
                  color="#979ABE"
                  fontSize="16px"
                  fontWeight="400"
                  style={{ paddingLeft: 20 }}
                >Token & Project</StyledFont>
              </StyledParticipatedTh>
              <StyledParticipatedTh>
                <StyledFont
                  color="#979ABE"
                  fontSize="16px"
                  fontWeight="400"
                >Cost / Latest price</StyledFont>
              </StyledParticipatedTh>
              <StyledParticipatedTh>
                <StyledFont
                  color="#979ABE"
                  fontSize="16px"
                  fontWeight="400"
                >Rate of Return</StyledFont>
              </StyledParticipatedTh>
              <StyledParticipatedTh>
                <StyledFont
                  color="#979ABE"
                  fontSize="16px"
                  fontWeight="400"
                >Total Profit</StyledFont>
              </StyledParticipatedTh>
              <StyledParticipatedTh>
                <StyledFont
                  color="#979ABE"
                  fontSize="16px"
                  fontWeight="400"
                >Holding Time</StyledFont>
              </StyledParticipatedTh>
            </StyledParticipatedTHeader>

            <StyledParticipatedTBody>
              {loading ? (
                <StyledLoadingWrapper $h="100px">
                  <Loading size={60} />
                </StyledLoadingWrapper>
              ) : (
                userPools && userPools.length > 0 ? userPools.map((userPool, index) => (
                  <StyledParticipatedTr key={index}>
                    <StyledParticipatedTd>
                      <StyledFlex style={{ paddingLeft: 20 }}>
                        <StyledLogoContainer>
                          <StyledLogo src={userPool?.launchpad_lbp?.logo} />
                        </StyledLogoContainer>
                        <StyledFlex flexDirection='column' alignItems='flex-start' gap='4px'>
                          <StyledFlex gap='8px'>
                            <StyledFont color='#FFF' fontSize='16px'>{userPool?.launchpad_lbp?.share_token_symbol}</StyledFont>
                            <StyledSvg>
                              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <g clip-path="url(#clip0_13116_9622)">
                                  <path d="M9.0242 9.99611H0.0078125V0.964111H4.5121V1.9243H0.967999V9.02031H8.06401V5.48401H9.0242V9.99611Z" fill="#979ABE" />
                                  <path d="M9.08663 0.222412L9.77359 0.909375L5.33956 5.3356L4.6604 4.65645L9.08663 0.222412Z" fill="#979ABE" />
                                  <path d="M9.98442 2.97034H9.01643V0.971899H6.92432V0.00390625H9.99223L9.98442 2.97034Z" fill="#979ABE" />
                                </g>
                                <defs>
                                  <clipPath id="clip0_13116_9622">
                                    <rect width="10" height="10" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </StyledSvg>
                          </StyledFlex>
                          <StyledFont color='#979ABE' fontSize='14px'>{userPool?.launchpad_lbp?.share_token_name}</StyledFont>
                        </StyledFlex>
                      </StyledFlex>
                    </StyledParticipatedTd>
                    <StyledParticipatedTd>
                      <StyledFont color='#FFF' fontSize='16px'>${formatThousandsSeparator(Big(userPool?.trading_volume ?? 0).toFixed(4))} / ${formatThousandsSeparator(Big(userPool?.launchpad_lbp?.price_usd ?? 0).toFixed(4))}</StyledFont>
                    </StyledParticipatedTd>
                    <StyledParticipatedTd>
                      <StyledFont color={Big(userPool?.rate_return_usd ?? 0).lt(0) ? '#FF508F' : '#47C33C'} fontSize='16px'>{(Big(userPool?.rate_return_usd ?? 0).lt(0) ? '' : '+') + Big(userPool?.rate_return_usd).toFixed(0) ?? 0}%</StyledFont>
                    </StyledParticipatedTd>
                    <StyledParticipatedTd>
                      <StyledFont color={Big(userPool?.profit_usd ?? 0).lt(0) ? '#FF508F' : '#47C33C'} fontSize='16px'>{(Big(userPool?.profit_usd ?? 0).lt(0) ? '-$' : '+$') + userPool?.profit_usd ?? 0}</StyledFont>
                    </StyledParticipatedTd>
                    {
                      userPool?.created_at && userPool?.launchpad_lbp.end_time && (
                        <StyledParticipatedTd>
                          <StyledFont color='#FFF' fontSize='16px'>{format(new Date(userPool?.created_at), 'MM/d/yyyy')} - {format(new Date(userPool?.launchpad_lbp.end_time), 'MM/d/yyyy')}</StyledFont>
                        </StyledParticipatedTd>
                      )
                    }
                  </StyledParticipatedTr>
                )) : (
                  <StyledFlex justifyContent='center' style={{ paddingTop: 60 }}>
                    <StyledFont color='#979ABE' fontSize='16px'>Empty</StyledFont>
                  </StyledFlex>
                )
              )}

            </StyledParticipatedTBody>
          </StyledParticipatedTable>
        )
      }
      {
        fjordModalShow && checkedPoolAddress && (
          <FjordModal
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
    </StyledContainer >
  )
}