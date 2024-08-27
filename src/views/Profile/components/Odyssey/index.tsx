import Image from 'next/image';
import { useRouter } from 'next/router';

import odyssey from '@/config/odyssey';
import useToast from '@/hooks/useToast';
import { StyledFlex, StyledFont } from '@/styled/styles';

import OdysseyLoading from '../../Loading/OdysseyLoading';
import RectangleNumber from '../RectangleNumber';
import {
  StyledContainer,
  StyledEarned,
  StyledEarnedFont,
  StyledLive,
  StyledMark,
  StyledMarkNumber,
  StyledOdysseyCard,
  StyledOdysseyCardImage,
  StyledOdysseyCardL,
  StyledOdysseyCardR,
  StyledTransactionsAndEarned
} from './styles';

type CompassType = any
type PropsType = {
  loaded: boolean;
  compassList: CompassType[]
}
export default function Odyssey({ loaded, compassList }: PropsType) {
  const toast = useToast();
  const router = useRouter();
  const handleGetRewardName = function (compass: CompassType) {
    let rewardName = ""
    compass.reward.forEach((r: any) => {
      if (compass.claimed_reward[0]?.category === r.logo_key) {
        rewardName = r.name
        return
      }
    })
    return rewardName
  }
  const handleExplore = async function (compass: CompassType) {
    if (compass.status === 'un_start') {
      toast.fail({
        title: 'Odyssey is upcoming...',
      });
      return;
    }
    if (!odyssey[compass.id]) return;
    router.push(odyssey[compass.id].path);
  };
  return !loaded ? (
    <StyledContainer style={{ marginTop: 32 }}>
      <StyledFlex gap='6px' style={{ paddingLeft: 16, marginBottom: 20 }}>
        <StyledFont color='#FFF' fontSize='20px' fontWeight='600'>Odyssey</StyledFont>
        <RectangleNumber quantity={compassList?.length} />
      </StyledFlex>
      <StyledFlex gap='20px' flexWrap="wrap">
        <OdysseyLoading />
      </StyledFlex >
    </StyledContainer >
  ) : loaded && (compassList && compassList.length > 0) ? (
    <StyledContainer style={{ marginTop: 32 }}>
      <StyledFlex gap='6px' style={{ paddingLeft: 16, marginBottom: 20 }}>
        <StyledFont color='#FFF' fontSize='20px' fontWeight='600'>Odyssey</StyledFont>
        <RectangleNumber quantity={compassList?.length} />
      </StyledFlex>
      <StyledFlex gap='20px' flexWrap="wrap">
        {
          compassList.map((compass, index) => {
            const claimedReward = compass?.claimed_reward[0]
            const live = compass.status === 'ongoing'
            return (
              <StyledOdysseyCard
                key={index}
                onClick={() => {
                  handleExplore(compass)
                }}
              >
                <StyledOdysseyCardL>
                  <StyledOdysseyCardImage src={compass?.banner} />
                </StyledOdysseyCardL>
                <StyledOdysseyCardR>
                  <StyledLive>
                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <circle cx="4" cy="4" r="4" fill={live ? '#31B03E' : '#979ABE'} />
                    </svg>
                    <span>{live ? 'Live' : 'Expired'}</span>
                  </StyledLive>
                  <StyledTransactionsAndEarned>
                    {
                      claimedReward && (
                        <StyledEarned>
                          <StyledEarnedFont>
                            <span>{claimedReward?.amount} {handleGetRewardName(compass)}</span> Earned
                          </StyledEarnedFont>
                        </StyledEarned>
                      )
                    }
                  </StyledTransactionsAndEarned>
                  {
                    compass?.reward[0]?.value && (
                      <StyledMark>
                        {['ended', 'un_start'].includes(compass.status) ? (
                          <Image src={odyssey[compass.id]?.rewardDisableIcon as string} alt="" width={111} height={111} />
                        ) : (
                          <Image src={odyssey[compass.id]?.rewardEnableIcon as string} alt="" width={111} height={111} />
                        )}
                        <StyledMarkNumber>{compass?.reward[0]?.value}</StyledMarkNumber>
                      </StyledMark>
                    )
                  }
                </StyledOdysseyCardR>
              </StyledOdysseyCard>
            )
          })
        }
      </StyledFlex >
    </StyledContainer >
  ) : (
    <></>
  )
}