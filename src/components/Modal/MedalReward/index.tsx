import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import styled from 'styled-components';

import Modal from '@/components/Modal';
import { useUserStore } from '@/stores/user';
import { StyledFlex, StyledFont, StyledSvg } from '@/styled/styles';
import { ellipsAccount } from '@/utils/account';
import { formatValueDecimal } from '@/utils/formate';
import Counter from '@/views/AllDapps/components/Title/Counter';
import useConvert from '@/views/Home/hooks/useConvert';
import type { ConvertType } from '@/views/Home/types';
const StyledMedalReward = styled.div`
  
`
const StyledMedalRewardTop = styled.div`
  padding: 26px 24px 37px 32px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`
const StyledUser = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
`
const StyledUserAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`
const StyledMedalRewardMiddle = styled.div`
  padding: 0 24px;
  height: 600px;
  overflow: auto;
`
const StyledLegacyWrapper = styled.div`
  padding: 0 4px;
`
const StyledLegacyContainer = styled.div`
  margin-top: 12px;
  height: 95px;
  border-radius: 12px;
  background: rgba(16, 17, 21, 0.50);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`
const StyledLegacy = styled.div`
  /* flex: 1; */
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`
const StyledLegacyLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`
const StyledLegacyValue = styled.div`
  color: #FFF;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`
const StyledGemsAndMedals = styled.div`
  border-radius: 12px;
  background: rgba(16, 17, 21, 0.50);
  padding: 20px 18px 17px;
`
const StyledGems = styled.div`
  margin-bottom: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const StyledGemSvg = styled.div`
  position: relative;
  .star {
    position: absolute;
    top: -9.58px;
    right: -11.26px;
  }
`
const StyledMedals = styled.div`
  
`
const StyledMedalsTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const StyledMedalsBottom = styled.div`
  margin-top: 28px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px 8px;
`
const StyledMedal = styled.div`
  padding-top: 9px;
  width: 112px;
  height: 120px;
  border-radius: 12px;
  border: 1px solid #202329;
  background: #101115;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`
const StyledMedalImage = styled.img`
  width: 65px;
`

const StyledMedalRewardBottom = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 18px 24px 21px;
`
const StyledMedalRewardButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 40px;
  border-radius: 10px;
  border: 1px solid #979ABE;
  color: #FFF;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 24px */
  cursor: pointer;
  &.confirm {
    border: none;
    background-color: #EBF479;
    color: #000;
  }
`
const StyledMedalRewardConfirmButton = styled.div`
  flex: 1;
`

const StyledTipsContainer = styled.div`
  position: relative;
`
const StyledTips = styled.div`
  /* display: none; */
  transform: translate(calc(-50% + 6px), calc(-100% - 8px));
  position: fixed;
  padding: 12px 18px;
  border-radius: 8px;
  border: 1px solid #333648;
  background: #1F2229;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  color: #979ABE;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
`
const TipsSvg = (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6.5" cy="6.5" r="6" stroke="#979ABE" />
    <path d="M5.82 10V4.66H7.07V10H5.82ZM6.45 3.78C6.21667 3.78 6.02333 3.70667 5.87 3.56C5.72333 3.41333 5.65 3.23667 5.65 3.03C5.65 2.81667 5.72333 2.64 5.87 2.5C6.02333 2.35333 6.21667 2.28 6.45 2.28C6.68333 2.28 6.87333 2.35 7.02 2.49C7.17333 2.62333 7.25 2.79333 7.25 3C7.25 3.22 7.17667 3.40667 7.03 3.56C6.88333 3.70667 6.69 3.78 6.45 3.78Z" fill="#979ABE" />
  </svg>
)
const GemSvg = (
  <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
    <path d="M17.0065 0.256348L28.7433 11.9932V17.2628L17.0065 28.9996H11.7368L0 17.2628V11.9932L11.7368 0.256348H17.0065Z" fill="#F4DC27" />
    <path d="M4.79055 15.2778L13.7216 24.2089L11.7368 28.9994L0 17.2626L4.79055 15.2778Z" fill="#ED9B0D" />
    <path d="M17.0066 0.256348L28.7434 11.9932L23.9529 13.9779L15.0219 5.0469L17.0066 0.256348Z" fill="#F1B600" />
    <path d="M11.7366 0.256348L13.7209 5.0469H15.0215L17.0062 0.256348H11.7366Z" fill="#F1F50E" />
    <path d="M11.7366 28.9998L13.7214 24.2092H15.021L17.0062 28.9998H11.7366Z" fill="#EDC102" />
    <path d="M23.9531 15.2756V13.9759L28.7437 11.9912V17.2608L23.9531 15.2756Z" fill="#F6CA18" />
    <path d="M4.79055 15.2761L0 17.2608V11.9912L4.79055 13.9755V15.2761Z" fill="#F1B600" />
    <path d="M17.0066 28.9999L15.0219 24.2093L23.9529 15.2778L28.7434 17.263L17.0066 28.9999Z" fill="#EFB000" />
    <path d="M4.79055 13.9779L0 11.9932L11.7368 0.256348L13.7216 5.0469L4.79055 13.9779Z" fill="#F0CC00" />
    <rect x="3.81976" y="14.6404" width="15.1588" height="15.1588" rx="3" transform="rotate(-45 3.81976 14.6404)" fill="#F4DC27" />
  </svg>
)
const StarSvg = (
  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="15" viewBox="0 0 19 15" fill="none">
    <path d="M7.20773 1.74707L8.82235 6.56461L13.6399 8.17923L8.82235 9.79385L7.20773 14.6114L5.59311 9.79385L0.775574 8.17923L5.59311 6.56461L7.20773 1.74707Z" fill="#F4DC27" />
    <path d="M15.2479 0.675049L16.1898 3.28455L19 4.15914L16.1898 5.03372L15.2479 7.64322L14.3061 5.03372L11.4958 4.15914L14.3061 3.28455L15.2479 0.675049Z" fill="#F4DC27" />
  </svg>
)
const ArrowSvg = (
  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="17" viewBox="0 0 19 17" fill="none">
    <path d="M7.76795 16C8.53775 17.3333 10.4623 17.3333 11.2321 16L18.5933 3.25C19.3631 1.91667 18.4008 0.25 16.8612 0.25H2.13878C0.599184 0.25 -0.363067 1.91667 0.406733 3.25L7.76795 16Z" fill="#EBF479" />
  </svg>
)
type LegacyType = {
  key: keyof ConvertType,
  label: string;
  tips: string;
  unit?: string;
  decimal?: number;
}
const LegacyList: LegacyType[] = [{
  key: 'pts',
  label: 'You earned',
  tips: 'The total PTS you earned',
}, {
  key: 'trading_volume',
  unit: '$',
  label: 'Your transctions',
  decimal: 2,
  tips: 'The trading volume you generated on DapDap',
}, {
  key: 'total_invite',
  label: 'Refferrals',
  tips: `The friends you've referred to join`,
}, {
  key: 'total_checkin',
  label: 'Check-In',
  tips: 'The days you have cumulatively checked in',
},]

const Tips = function ({ tips }: { tips: string }) {
  const [boundingClientRect, setBoundingClientRect] = useState<any>(null);
  return (
    <StyledTipsContainer
      onMouseEnter={(event: any) => {
        setBoundingClientRect(event?.target?.getBoundingClientRect())
      }}
      onMouseLeave={(event) => {
        setBoundingClientRect(null)
      }}
    >
      <StyledSvg style={{ cursor: 'pointer' }}>
        {TipsSvg}
      </StyledSvg>
      {
        boundingClientRect && (
          <StyledTips style={{ left: boundingClientRect.x, top: boundingClientRect.y }}>{tips}</StyledTips>
        )
      }
    </StyledTipsContainer>
  )
}
const MedalRewardModalContent = function ({ onClose }: { onClose: VoidFunction }) {
  const router = useRouter()
  const userInfo = useUserStore((store: any) => store.user);
  const { convert } = useConvert()

  const twitterUsername = useMemo(() => {
    return userInfo?.twitter?.twitter_username
  }, [userInfo])

  return (
    <StyledMedalReward>
      <StyledMedalRewardTop>
        <StyledUser>
          <StyledUserAvatar src={userInfo?.avatar} />
          <StyledFlex flexDirection='column' alignItems='flex-start' gap='9px'>
            {
              twitterUsername ? (
                <>
                  <StyledFont color="#FFF" fontSize="18px" fontWeight="600">{twitterUsername}</StyledFont>
                  <StyledFont color="#FFF" fontSize="12px">{ellipsAccount(userInfo?.address)}</StyledFont>
                </>
              ) : (
                <StyledFont color="#FFF" fontSize="18px" fontWeight="600">{ellipsAccount(userInfo?.address)}</StyledFont>
              )
            }
          </StyledFlex>
        </StyledUser>
        <StyledSvg style={{ cursor: 'pointer' }} onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M7.73284 6.00004L11.7359 1.99701C12.0368 1.696 12.0882 1.2593 11.8507 1.0219L10.9779 0.14909C10.7404 -0.0884124 10.3043 -0.0363122 10.0028 0.264491L6.00013 4.26743L1.99719 0.264591C1.69619 -0.036712 1.25948 -0.0884125 1.02198 0.14939L0.149174 1.0223C-0.0882277 1.2594 -0.0368271 1.6961 0.264576 1.99711L4.26761 6.00004L0.264576 10.0033C-0.0363271 10.3041 -0.0884277 10.7405 0.149174 10.978L1.02198 11.8509C1.25948 12.0884 1.69619 12.0369 1.99719 11.736L6.00033 7.73276L10.0029 11.7354C10.3044 12.037 10.7405 12.0884 10.978 11.8509L11.8508 10.978C12.0882 10.7405 12.0368 10.3041 11.736 10.0029L7.73284 6.00004Z" fill="#979ABE" />
          </svg>
        </StyledSvg>

      </StyledMedalRewardTop>

      <StyledMedalRewardMiddle>
        <StyledLegacyWrapper>
          <StyledFlex justifyContent='space-between' style={{ paddingLeft: 20, paddingRight: 20 }}>
            <StyledFont color='#FFF' fontWeight='600'>Your Legacy PTS</StyledFont>
            <StyledFont color='#979ABE' fontSize='14px'>Data as of [8/28/2024]</StyledFont>
          </StyledFlex>
          <StyledLegacyContainer>
            {
              LegacyList.map(legacy => (
                <StyledLegacy key={legacy.label}>
                  <StyledLegacyLabel>
                    <StyledFont color='#979ABE' fontSize='14px'>{legacy.label}</StyledFont>
                    <Tips key={legacy?.label} tips={legacy?.tips} />
                  </StyledLegacyLabel>
                  <StyledLegacyValue>{formatValueDecimal(convert ? convert[legacy?.key] : 0, legacy?.unit ?? '', legacy?.decimal ?? 0)} {legacy?.key === 'pts' ? 'PTS' : ''}</StyledLegacyValue>
                </StyledLegacy>
              ))
            }

          </StyledLegacyContainer>
        </StyledLegacyWrapper>
        <StyledFlex justifyContent='center' style={{ paddingTop: 10, paddingBottom: 14 }}>
          <StyledSvg>{ArrowSvg}</StyledSvg>
        </StyledFlex>
        <StyledGemsAndMedals>
          <StyledGems>
            <StyledFlex gap='6px'>
              <StyledFont color='#FFF' fontWeight='600'>Gems</StyledFont>
              <Tips tips='Gems earned through your PTS and interactions on DapDap' />
            </StyledFlex>
            <StyledFlex gap='13px'>
              <StyledGemSvg>
                <StyledSvg>{GemSvg}</StyledSvg>
                <StyledSvg className='star'>{StarSvg}</StyledSvg>
              </StyledGemSvg>
              <StyledFont color='#FFF' fontWeight='600'>x <Counter
                from={1}
                to={convert?.gem ?? 0}
              /></StyledFont>
            </StyledFlex>

          </StyledGems>
          <StyledMedals>
            <StyledMedalsTop>
              <StyledFlex gap='6px'>
                <StyledFont color='#FFF' fontWeight='600'>Medals</StyledFont>
                <Tips tips='Medals unlocked based on your interactions' />
              </StyledFlex>
              <StyledFont color='#FFF' fontWeight='600'>x <Counter
                from={1}
                to={convert?.medals?.length ?? 0}
              /></StyledFont>
            </StyledMedalsTop>
            <StyledMedalsBottom>
              {
                convert?.medals?.map(medal => (
                  <StyledMedal key={medal?.id}>
                    <StyledMedalImage src={medal?.logo} />
                    <StyledFont className='ellipsis' color='#FFF' fontSize='12px' fontWeight='500' lineClamp="2" style={{ width: 96 }}>{medal?.level_name}</StyledFont>
                  </StyledMedal>
                ))
              }
            </StyledMedalsBottom>
          </StyledMedals>
        </StyledGemsAndMedals>
      </StyledMedalRewardMiddle>
      <StyledMedalRewardBottom>
        <StyledMedalRewardButton
          onClick={() => {
            router.push("/profile/medals")
          }}
        >Medal Dashboard</StyledMedalRewardButton>
        <StyledMedalRewardButton
          className='confirm'
          onClick={() => {
            router.push("/profile?target=reward")
          }}
        >My Reward History</StyledMedalRewardButton>
      </StyledMedalRewardBottom>
    </StyledMedalReward>
  )
}
const MedalRewardModal = (props: Props) => {
  const { visible, onClose } = props;
  return (
    <Modal
      display={visible}
      showHeader={false}
      portal={true}
      width={680}
      content={
        <MedalRewardModalContent onClose={onClose} />
      }
    />
  );
};

export default MedalRewardModal;

interface Props {
  visible: boolean;
  onClose(): void;
}
