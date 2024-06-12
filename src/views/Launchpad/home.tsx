

import Loading from '@/components/Icons/Loading';
import LaunchPadModal from '@/components/launchpad-modal';
import tokenConfig from '@/components/launchpad-modal/hooks/tokenConfig';
import chainCofig from '@/config/chains';
import { useUserStore } from '@/stores/user';
import {
  StyledContainer,
  StyledFlex,
  StyledFont,
  StyledLoadingWrapper,
  StyledSvg
} from '@/styled/styles';
import { formatThousandsSeparator } from '@/utils/format-number';
import Big from 'big.js';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Timer from './components/Timer';
import usePools from './hooks/usePools';
import useUser from './hooks/useUser';
import { format } from 'date-fns';
import type { Token } from '@/types';

const StyledLinearGradientFont = styled(StyledFont)`
  background: linear-gradient(180deg, #FFF 38.5%, #677079 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`
const StyledYoursContainer = styled.div`
  cursor: pointer;
  margin: 38px 0 104px;
  display: flex;
  align-items: center;
  width: 1124px;
  height: 126px;
  padding: 0 29px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px solid #373A53;
  background: #171822;
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
  align-items: center;
  gap: 30px;
  width: 1124px;
  height: 363px;
  border-radius: 20px;
  border: 1px solid #373A53;
  background: linear-gradient(270deg, #FFF 35%, #C8FBFE 100%);
`
const StyledTimerContainer = styled.div`
  position: absolute;
  right: 30px;
  top: 30px;
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
  position: absolute;
  left: 15px;
  top: 15px;
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
  right: 14px;
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
  border: 1px solid #979ABE;
  background: #EBF479;
  color: #000;
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
  gap: 32px;
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
  background: #171822;
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
  key: "funds_raised",
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
export default function LaunchpadHomePage() {

  const router = useRouter();
  const userStore = useUserStore((store: any) => store.user);
  const { loading, pools, queryPools, contractDataMapping } = usePools(userStore.address)
  const { user, queryUser } = useUser()
  const [checkedPoolAddress, setCheckedPoolAddress] = useState('')
  const [poolToken, setPoolToken] = useState<Token>()
  const [midToken, setMidToken] = useState<Token>()
  const [chainId, setChainId] = useState(1)
  const [sortKey, setSortKey] = useState('')
  const [launchPadModalShow, setLaunchPadModalShow] = useState(false)

  const upcomingAndOngoingPools = useMemo(() => {
    return pools
      .filter(pool => pool.status === 'upcoming' || pool.status === 'ongoing')
      .sort((prev, next) => prev[sortKey] - next[sortKey])
  }, [pools, sortKey])
  const completedPools = useMemo(() => {
    return pools.filter(pool => pool.status === 'completed')
  }, [pools])
  const handleBuyOrSell = function (data: any) {
    console.log('data:', data)
    if (data.status === 'upcoming') {
      return
    }
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
      icon: tokenConfig[data.asset_token_symbol].icon,
      logoURI: tokenConfig[data.asset_token_symbol].icon,
      decimals: data.asset_token_decimal,
      isNative: false,
    })

    setChainId(data.chain_id)

    setLaunchPadModalShow(true)
  }
  const handleSort = function (key?: any) {
    key && setSortKey(key === sortKey ? "" : key)
  }
  const formatValueDecimal = function (value: any, unit = '', decimal = 0) {
    const target = Big(1).div(Math.pow(10, decimal))
    if (Big(value).eq(0)) {
      return '-'
    } else if (Big(value).gt(0)) {
      if (Big(value).lt(target)) {
        return `<${unit}${target}`
      } else {
        return Big(value).toFixed(decimal)
      }
    } else {
      return Big(value).toFixed(decimal)
    }
  }
  useEffect(() => {
    queryPools()
  }, [])
  useEffect(() => {
    if (userStore.address) {
      queryUser()
    }
  }, [userStore.address])


  return (
    <StyledContainer style={{ width: 1124, margin: '80px auto 0' }}>
      <StyledLinearGradientFont
        fontSize='60px'
        fontWeight='700'
        style={{
          textTransform: 'uppercase',
          textAlign: 'center'
        }}
      >Launchpad</StyledLinearGradientFont>
      <StyledYoursContainer onClick={() => {
        router.push("/stake/launchpad/yours")
      }}>
        <StyledFlex flexDirection='column' alignItems='flex-start' gap="13px" style={{ flex: 1 }}>
          <StyledLinearGradientFont fontSize='18px' fontWeight='500'>Your Total Cost</StyledLinearGradientFont>
          <StyledLinearGradientFont fontSize='26px' fontWeight='500'>${formatThousandsSeparator(Big(user?.total_cost ?? 0).toFixed(2))}</StyledLinearGradientFont>
        </StyledFlex>
        <StyledFlex flexDirection='column' alignItems='flex-start' gap="13px" style={{ flex: 1 }}>
          <StyledLinearGradientFont fontSize='18px' fontWeight='500'>Your Avg. Rate of Return</StyledLinearGradientFont>
          <StyledLinearGradientFont fontSize='26px' fontWeight='500'>{Big(user?.rate_return_avg ?? 0).toFixed(0)}%</StyledLinearGradientFont>
        </StyledFlex>
        {
          user?.lbps?.length > 0 && (
            <StyledFlex flexDirection='column' alignItems='flex-start' gap="13px" style={{ flex: 1 }}>
              <StyledLinearGradientFont fontSize='18px' fontWeight='500'>In Progress</StyledLinearGradientFont>
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
      </StyledYoursContainer>
      <StyledProjectContainer>
        <StyledLinearGradientFont fontSize='26px' fontWeight='700'>Upcoming & Ongoing</StyledLinearGradientFont>
        <StyledFlex flexDirection='column' gap='30px'>
          {loading ? (
            <StyledLoadingWrapper $h="100px">
              <Loading size={60} />
            </StyledLoadingWrapper>
          ) : (
            upcomingAndOngoingPools && upcomingAndOngoingPools.length > 0 ? upcomingAndOngoingPools.map((pool, index) => (
              <StyledProject key={index}>
                <StyledProjectImageContainer>
                  <StyledProjectStatus className={pool.status}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <circle cx="5.04456" cy="5.04456" r="5.04456" fill={pool.status === "ongoing" ? "#61FD53" : "#FFAE63"} />
                    </svg>
                    <span>{STATUS_TXT_MAPPING[pool.status]}</span>
                  </StyledProjectStatus>
                  <StyledProjectSupportChain>
                    <StyledChainImage src={chainCofig[pool?.chain_id].icon} />
                    <span>{chainCofig[pool?.chain_id].chainName}</span>
                  </StyledProjectSupportChain>
                  <StyledProjectImage src={pool?.banner} />
                </StyledProjectImageContainer>
                <StyledContainer style={{ flex: 1 }}>
                  <StyledFont color='#262836' fontSize='32px' fontWeight='700'>{pool.share_token_name}</StyledFont>
                  <StyledFlex
                    flexDirection='column'
                    alignItems='flex-start'
                    gap='9px'
                    style={{ marginTop: 15, marginBottom: 52 }}
                  >
                    <StyledFont color='#262836' fontSize='16px' fontWeight='500'>Token Name</StyledFont>
                    <StyledFlex gap='9px'>
                      <StyledTokenImageContainer>
                        <StyledTokenImage src={pool.logo} />
                      </StyledTokenImageContainer>
                      <StyledFont color='#262836' fontSize='20px' fontWeight='700'>{pool.share_token_symbol}</StyledFont>
                    </StyledFlex>
                  </StyledFlex>
                  <StyledFlex justifyContent='space-between' style={{ marginBottom: 30 }}>
                    <StyledFlex flexDirection='column' alignItems='flex-start' gap='10px'>
                      <StyledFont color='#262836' fontSize='16px' fontWeight='500'>Participants</StyledFont>
                      <StyledFont color='#262836' fontSize='20px' fontWeight='700'>{formatValueDecimal(pool?.participants)}</StyledFont>
                    </StyledFlex>
                    <StyledFlex flexDirection='column' alignItems='flex-start' gap='10px'>
                      <StyledFont color='#262836' fontSize='16px' fontWeight='500'>Funds Raised</StyledFont>
                      <StyledFont color='#262836' fontSize='20px' fontWeight='700'>{formatValueDecimal(pool?.funds_raised_usd ?? 0, '$', 2)}</StyledFont>
                    </StyledFlex>
                    <StyledFlex flexDirection='column' alignItems='flex-start' gap='10px'>
                      <StyledFont color='#262836' fontSize='16px' fontWeight='500'>Price</StyledFont>
                      <StyledFont color='#262836' fontSize='20px' fontWeight='700'>{formatValueDecimal(pool?.price_usd ?? 0, '$', 3)}</StyledFont>
                    </StyledFlex>
                  </StyledFlex>
                  <StyledFlex>
                    <StyledFlex flexDirection='column' alignItems='flex-start'>
                      <StyledFont color='#262836' fontSize='16px' fontWeight='500'>Purchased Shares</StyledFont>
                      <StyledFont color='#262836' fontSize='20px' fontWeight='700'>{formatValueDecimal(contractDataMapping[pool?.pool]?.purchased_shares ?? 0, '', 3)}</StyledFont>
                    </StyledFlex>

                    <StyledProjectButtonContainer>
                      <StyledProjectButton
                        style={{
                          backgroundColor: pool.status === "upcoming" ? "#979ABE" : "#EBF479",
                          cursor: pool.status === "upcoming" ? "not-allowed" : "pointer"
                        }}
                        onClick={() => handleBuyOrSell(pool)}
                      >Buy / Sell</StyledProjectButton>
                    </StyledProjectButtonContainer>
                  </StyledFlex>
                </StyledContainer>
                <StyledTimerContainer>
                  {pool.start_time * 1000 > Date.now() && <div>Upcoming</div>}
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
        <StyledLinearGradientFont fontSize='26px' fontWeight='700'>Completed Token Sales</StyledLinearGradientFont>
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
                    fontWeight="500"
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
              completedPools && completedPools.length > 0 ? completedPools.map((pool, index) => (
                <StyledCompletedSalesTr key={index}>
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
                    <StyledChainImage src={chainCofig[pool?.chain_id].icon} />
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
        launchPadModalShow && checkedPoolAddress && (
          <LaunchPadModal
            pool={checkedPoolAddress}
            token={poolToken as Token}
            midToken={midToken as Token}
            chainId={chainId}
            onClose={() => {
              setCheckedPoolAddress('')
              setLaunchPadModalShow(false)
            }}
          />
        )
      }
    </StyledContainer >
  )
}