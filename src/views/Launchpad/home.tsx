

import Loading from '@/components/Icons/Loading';
import LaunchPadModal from '@/components/launchpad-modal';
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
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Timer from './components/Timer';
import usePools from './hooks/usePools';
import useUser from './hooks/useUser';

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

`
const StyledProject = styled.div`
  position: relative;
  margin-bottom: 116px;
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

export default function LaunchpadHomePage() {

  const router = useRouter();
  const userStore = useUserStore((store: any) => store.user);
  const { loading, pools, queryPools } = usePools()
  const { user, queryUser } = useUser()
  const [checkedPoolAddress, setCheckedPoolAddress] = useState('')
  const [launchPadModalShow, setLaunchPadModalShow] = useState(false)

  const upcomingAndOngoingPools = useMemo(() => {
    return pools.filter(pool => pool.status === 'upcoming' || pool.status === 'ongoing')
  }, [pools])
  const completedPools = useMemo(() => {
    return pools.filter(pool => pool.status === 'completed')
  }, [pools])
  const handleBuyOrSell = function (data: any) {
    setCheckedPoolAddress(data.pool)
    setLaunchPadModalShow(true)
  }

  useEffect(() => {
    queryPools()
  }, [])

  useEffect(() => {
    userStore.address && queryUser()
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
          <StyledLinearGradientFont fontSize='26px' fontWeight='500'>${formatThousandsSeparator(user?.total_cost ?? 0)}</StyledLinearGradientFont>
        </StyledFlex>
        <StyledFlex flexDirection='column' alignItems='flex-start' gap="13px" style={{ flex: 1 }}>
          <StyledLinearGradientFont fontSize='18px' fontWeight='500'>Your Avg. Rate of Return</StyledLinearGradientFont>
          <StyledLinearGradientFont fontSize='26px' fontWeight='500'>{user?.rate_return_avg ?? 0}%</StyledLinearGradientFont>
        </StyledFlex>
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
                  <StyledProjectStatus>
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <circle cx="5.04456" cy="5.04456" r="5.04456" fill="#61FD53" />
                    </svg>
                    <span>Live Now</span>
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
                      <StyledFont color='#262836' fontSize='20px' fontWeight='700'>{pool?.participants}</StyledFont>
                    </StyledFlex>
                    <StyledFlex flexDirection='column' alignItems='flex-start' gap='10px'>
                      <StyledFont color='#262836' fontSize='16px' fontWeight='500'>Funds Raised</StyledFont>
                      <StyledFont color='#262836' fontSize='20px' fontWeight='700'>{pool?.funds_raised ? `$ ${pool?.funds_raised}` : '-'}</StyledFont>
                    </StyledFlex>
                    <StyledFlex flexDirection='column' alignItems='flex-start' gap='10px'>
                      <StyledFont color='#262836' fontSize='16px' fontWeight='500'>Price</StyledFont>
                      <StyledFont color='#262836' fontSize='20px' fontWeight='700'>{pool?.price ? `$ ${pool?.price}` : '-'}</StyledFont>
                    </StyledFlex>
                  </StyledFlex>
                  <StyledFlex>
                    <StyledFlex flexDirection='column' alignItems='flex-start'>
                      <StyledFont color='#262836' fontSize='16px' fontWeight='500'>Purchased Shares</StyledFont>
                      <StyledFont color='#262836' fontSize='20px' fontWeight='700'>{pool.purchased_shares}</StyledFont>
                    </StyledFlex>
                    <StyledProjectButtonContainer>
                      <StyledProjectButton onClick={() => handleBuyOrSell(pool)}>Buy / Sell</StyledProjectButton>
                      <StyledProjectButton style={{ background: '#979ABE' }}>View More</StyledProjectButton>
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
            <StyledCompletedSalesTh>
              <StyledFont
                color="#979ABE"
                fontSize="16px"
                fontWeight="500"
                style={{ paddingLeft: 26 }}
              >Token & Project</StyledFont>
            </StyledCompletedSalesTh>
            <StyledCompletedSalesTh>
              <StyledFont color="#979ABE" fontSize="16px" fontWeight="500">Rate of Return</StyledFont>
              <StyledSvg>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M5.78087 7.02391C5.38055 7.52432 4.61946 7.52432 4.21913 7.02391L0.299758 2.1247C-0.224053 1.46993 0.242119 0.499999 1.08063 0.499999L8.91938 0.5C9.75788 0.5 10.2241 1.46993 9.70024 2.12469L5.78087 7.02391Z" fill="#979ABE" />
                </svg>
              </StyledSvg>
            </StyledCompletedSalesTh>
            <StyledCompletedSalesTh>
              <StyledFont color="#979ABE" fontSize="16px" fontWeight="500">Funds Raised</StyledFont>
              <StyledSvg>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M5.78087 7.02391C5.38055 7.52432 4.61946 7.52432 4.21913 7.02391L0.299758 2.1247C-0.224053 1.46993 0.242119 0.499999 1.08063 0.499999L8.91938 0.5C9.75788 0.5 10.2241 1.46993 9.70024 2.12469L5.78087 7.02391Z" fill="#979ABE" />
                </svg>
              </StyledSvg>
            </StyledCompletedSalesTh>
            <StyledCompletedSalesTh>
              <StyledFont color="#979ABE" fontSize="16px" fontWeight="500">Participants</StyledFont>
              <StyledSvg>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M5.78087 7.02391C5.38055 7.52432 4.61946 7.52432 4.21913 7.02391L0.299758 2.1247C-0.224053 1.46993 0.242119 0.499999 1.08063 0.499999L8.91938 0.5C9.75788 0.5 10.2241 1.46993 9.70024 2.12469L5.78087 7.02391Z" fill="#979ABE" />
                </svg>
              </StyledSvg>
            </StyledCompletedSalesTh>
            <StyledCompletedSalesTh style={{ flex: 0.5 }}>
              <StyledFont color="#979ABE" fontSize="16px" fontWeight="500">Chain</StyledFont>
            </StyledCompletedSalesTh>
            <StyledCompletedSalesTh>
              <StyledFont color="#979ABE" fontSize="16px" fontWeight="500">Start Date</StyledFont>
              <StyledSvg>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M5.78087 7.02391C5.38055 7.52432 4.61946 7.52432 4.21913 7.02391L0.299758 2.1247C-0.224053 1.46993 0.242119 0.499999 1.08063 0.499999L8.91938 0.5C9.75788 0.5 10.2241 1.46993 9.70024 2.12469L5.78087 7.02391Z" fill="#979ABE" />
                </svg>
              </StyledSvg>
            </StyledCompletedSalesTh>
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
                    <StyledFlex style={{ paddingLeft: 20 }}>
                      {/* <StyledCompletedSalesImage></StyledCompletedSalesImage> */}
                      <StyledFlex flexDirection='column' alignItems='flex-start' gap='4px'>
                        <StyledFont color='#FFF' fontSize='16px' fontWeight='500'>{pool.share_token_symbol}</StyledFont>
                        <StyledFont color='#979ABE' fontSize='14px' fontWeight='500'>{pool.share_token_symbol} Exchange</StyledFont>
                      </StyledFlex>
                    </StyledFlex>
                  </StyledCompletedSalesTd>
                  <StyledCompletedSalesTd>
                    <StyledFont color='#47C33C' fontSize='16px' fontWeight='500'>230%</StyledFont>
                  </StyledCompletedSalesTd>
                  <StyledCompletedSalesTd>
                    <StyledFont color='#FFF' fontSize='16px' fontWeight='500'>{pool?.funds_raised ? `$${pool?.funds_raised}` : '-'}</StyledFont>
                  </StyledCompletedSalesTd>
                  <StyledCompletedSalesTd>
                    <StyledFont color='#FFF' fontSize='16px' fontWeight='500'>123</StyledFont>
                  </StyledCompletedSalesTd>
                  <StyledCompletedSalesTd style={{ flex: 0.5 }}>
                    <StyledSvg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <rect width="20" height="20" rx="4" fill="#ECEFF0" />
                        <path d="M9.94927 2.29993L9.84546 2.65255V12.8841L9.94927 12.9876L14.6985 10.1803L9.94927 2.29993Z" fill="#343434" />
                        <path d="M9.94909 2.29993L5.19971 10.1803L9.94909 12.9876V8.02155V2.29993Z" fill="#8C8C8C" />
                        <path d="M9.94913 13.8868L9.89062 13.9582V17.6028L9.94913 17.7736L14.7013 11.0809L9.94913 13.8868Z" fill="#3C3C3B" />
                        <path d="M9.94909 17.7736V13.8868L5.19971 11.0809L9.94909 17.7736Z" fill="#8C8C8C" />
                        <path d="M9.94922 12.9875L14.6985 10.1801L9.94922 8.02136V12.9875Z" fill="#141414" />
                        <path d="M5.19971 10.1801L9.94909 12.9875V8.02136L5.19971 10.1801Z" fill="#393939" />
                      </svg>
                    </StyledSvg>
                  </StyledCompletedSalesTd>
                  <StyledCompletedSalesTd>
                    <StyledFlex style={{ width: '100%', paddingRight: 23 }}>
                      <StyledFlex flexDirection='column' gap='4px'>
                        <StyledFont color='#FFF' fontSize='16px' fontWeight='500'>4th Jun 2024</StyledFont>
                        <StyledFont color='#979ABE' fontSize='14px' fontWeight='500'>21:00 PM - UTC</StyledFont>
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