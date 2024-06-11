import Loading from '@/components/Icons/Loading';
import LaunchPadModal from '@/components/launchpad-modal';
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
import useUser from './hooks/useUser';
import useUserPools from './hooks/useUserPools';
import tokenConfig from '@/components/launchpad-modal/hooks/tokenConfig'

import type { Chain, Token } from '@/types';
import { differenceInDays, format } from 'date-fns';

const StyledLinearGradientFont = styled(StyledFont)`
  background: linear-gradient(180deg, #FFF 38.5%, #677079 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
    border-color: #EBF479;
    color: #EBF479;
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
  background: #EBF479;
  display: flex;
  align-items: center;
  justify-content: center;
`
export default function LaunchpadYoursPage() {
  const router = useRouter();
  const userStore = useUserStore((store: any) => store.user);
  const { loading, userPools, queryUserPools } = useUserPools()
  const { user, queryUser } = useUser()
  const [categoryIndex, setCategoryIndex] = useState(0)
  const [checkedPoolAddress, setCheckedPoolAddress] = useState('')
  const [poolToken, setPoolToken] = useState<Token>()
  const [midToken, setMidToken] = useState<Token>()
  const [chainId, setChainId] = useState(1)
  const [launchPadModalShow, setLaunchPadModalShow] = useState(false)
  const [inProgressNumber, setInProgressNumber] = useState(0)

  const handleQueryUserPools = function () {
    userStore.address && queryUserPools({
      status: categoryIndex === 0 ? 'ongoing' : 'completed'
    })
  }
  const handleRedeem = function (data: any) {

  }
  const handleBuyOrSellOrRedeem = function (data: any) {
    if (['upcoming', 'ongoing'].includes(data.launchpad_lbp.status)) {
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
        icon: tokenConfig[data.asset_token_symbol].icon,
        logoURI: tokenConfig[data.asset_token_symbol].icon,
        decimals: data.asset_token_decimal,
        isNative: false,
      })

      setChainId(data.chain_id)

      setLaunchPadModalShow(true)
    } else {
      handleRedeem(data)
    }
  }
  useEffect(() => {
    userStore.address && queryUser()
  }, [userStore.address])

  useEffect(() => {
    if (categoryIndex === 0 && userPools) {
      setInProgressNumber(userPools?.length ?? 0)
    }
  }, [userPools, categoryIndex])

  useEffect(() => {
    userStore.address && handleQueryUserPools()
  }, [userStore.address, categoryIndex])
  return (
    <StyledContainer style={{ width: 1124, margin: '30px auto 0' }}>
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
      <StyledLinearGradientFont fontSize='26px' fontWeight='700'>You  Participated</StyledLinearGradientFont>
      <StyledFlex style={{ marginTop: 20, marginBottom: 60 }}>
        <StyledFlex flexDirection='column' alignItems='flex-start' gap="13px" style={{ flex: 1 }}>
          <StyledLinearGradientFont fontSize='18px'>Total Cost</StyledLinearGradientFont>
          <StyledLinearGradientFont fontSize='26px' fontWeight='600'>${formatThousandsSeparator(Big(user?.total_cost ?? 0).toFixed(2))}</StyledLinearGradientFont>
        </StyledFlex>
        <StyledFlex flexDirection='column' alignItems='flex-start' gap="13px" style={{ flex: 1 }}>
          <StyledLinearGradientFont fontSize='18px'>Your Avg. Rate of Return</StyledLinearGradientFont>
          <StyledLinearGradientFont fontSize='26px' fontWeight='600'>{Big(user?.rate_return_avg ?? 0).toFixed(0)}%</StyledLinearGradientFont>
        </StyledFlex>
        {
          user?.lbps?.length > 0 && (
            <StyledFlex flexDirection='column' alignItems='flex-start' gap="13px" style={{ flex: 1 }}>
              <StyledLinearGradientFont fontSize='18px'>In Progress</StyledLinearGradientFont>
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
                  fontWeight="500"
                  style={{ paddingLeft: 20 }}
                >Token & Project</StyledFont>
              </StyledParticipatedTh>
              <StyledParticipatedTh>
                <StyledFont
                  color="#979ABE"
                  fontSize="16px"
                  fontWeight="500"
                >Cost / Latest price</StyledFont>
              </StyledParticipatedTh>
              <StyledParticipatedTh>
                <StyledFont
                  color="#979ABE"
                  fontSize="16px"
                  fontWeight="500"
                >Rate of Return</StyledFont>
              </StyledParticipatedTh>
              <StyledParticipatedTh>
                <StyledFont
                  color="#979ABE"
                  fontSize="16px"
                  fontWeight="500"
                >Purchased Shares</StyledFont>
              </StyledParticipatedTh>
              <StyledParticipatedTh style={{ flex: 1.5 }}>
                <StyledFont
                  color="#979ABE"
                  fontSize="16px"
                  fontWeight="500"
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
                  < StyledParticipatedTr key={index}>
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
                      <StyledFont color='#FFF' fontSize='16px'>${formatThousandsSeparator(Big(userPool?.trading_volume ?? 0).toFixed(4))} / ${formatThousandsSeparator(Big(userPool?.launchpad_lbp?.price ?? 0).toFixed(4))}</StyledFont>
                    </StyledParticipatedTd>
                    <StyledParticipatedTd>
                      <StyledFont color={Big(userPool?.rate_return_usd ?? 0).lt(0) ? '#FF508F' : '#47C33C'} fontSize='16px'>{(Big(userPool?.rate_return_usd ?? 0).lt(0) ? '' : '+') + Big(userPool?.rate_return_usd).toFixed(0) ?? 0}%</StyledFont>
                    </StyledParticipatedTd>
                    <StyledParticipatedTd>
                      <StyledFont color={['upcoming', 'ongoing'].includes(userPool?.launchpad_lbp?.status) ? '#FFF' : '#979ABE'} fontSize='16px'>{formatThousandsSeparator(userPool?.launchpad_lbp?.purchased_shares ?? 0)}</StyledFont>
                    </StyledParticipatedTd>
                    <StyledParticipatedTd style={{ flex: 1.5 }}>
                      <StyledFlex
                        justifyContent='space-between'
                        style={{ width: '100%', paddingRight: 15 }}
                      >
                        <StyledFont color='#FFF' fontSize='16px'>{userPool?.launchpad_lbp?.status}</StyledFont>
                        <StyledParticipatedButton style={{ backgroundColor: ['upcoming', 'ongoing'].includes(userPool?.launchpad_lbp?.status) ? '#EBF479' : '#50FFE9' }} onClick={() => handleBuyOrSellOrRedeem(userPool)}>
                          <StyledFont fontSize='18px' fontWeight='500'>{['upcoming', 'ongoing'].includes(userPool?.launchpad_lbp?.status) ? 'Buy / Sell' : 'Redeem'}</StyledFont>
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
                  fontWeight="500"
                  style={{ paddingLeft: 20 }}
                >Token & Project</StyledFont>
              </StyledParticipatedTh>
              <StyledParticipatedTh>
                <StyledFont
                  color="#979ABE"
                  fontSize="16px"
                  fontWeight="500"
                >Cost / Latest price</StyledFont>
              </StyledParticipatedTh>
              <StyledParticipatedTh>
                <StyledFont
                  color="#979ABE"
                  fontSize="16px"
                  fontWeight="500"
                >Rate of Return</StyledFont>
              </StyledParticipatedTh>
              <StyledParticipatedTh>
                <StyledFont
                  color="#979ABE"
                  fontSize="16px"
                  fontWeight="500"
                >Total Profit</StyledFont>
              </StyledParticipatedTh>
              <StyledParticipatedTh>
                <StyledFont
                  color="#979ABE"
                  fontSize="16px"
                  fontWeight="500"
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
                      <StyledFont color='#FFF' fontSize='16px'>${formatThousandsSeparator(Big(userPool?.trading_volume ?? 0).toFixed(4))} / ${formatThousandsSeparator(Big(userPool?.launchpad_lbp?.price ?? 0).toFixed(4))}</StyledFont>
                    </StyledParticipatedTd>
                    <StyledParticipatedTd>
                      <StyledFont color={Big(userPool?.rate_return_usd ?? 0).lt(0) ? '#FF508F' : '#47C33C'} fontSize='16px'>{(Big(userPool?.rate_return_usd ?? 0).lt(0) ? '' : '+') + Big(userPool?.rate_return_usd).toFixed(0) ?? 0}%</StyledFont>
                    </StyledParticipatedTd>
                    <StyledParticipatedTd>
                      <StyledFont color={Big(userPool?.profit_usd ?? 0).lt(0) ? '#FF508F' : '#47C33C'} fontSize='16px'>{(Big(userPool?.profit_usd ?? 0).lt(0) ? '-$' : '+$') + userPool?.profit_usd ?? 0}</StyledFont>
                    </StyledParticipatedTd>
                    <StyledParticipatedTd>
                      <StyledFont color='#FFF' fontSize='16px'>{format(userPool?.created_at, 'MM/d/yyyy')} - {format(userPool?.launchpad_lbp.end_time, 'MM/d/yyyy')}</StyledFont>
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
        )
      }
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