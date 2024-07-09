import Image from 'next/image';

import Loading from '@/components/Icons/Loading';
import { useUserStore } from '@/stores/user';
import { StyledLoadingWrapper } from '@/styled/styles';
import { ellipsAccount } from '@/utils/account';
import { simplifyNum } from '@/utils/format-number';
import useLeaderBoard from '@/views/OdysseyV5/hooks/useLeaderBoard';

import {
  StlyedDesc,
  StyledAllContainer,
  StyledContainer,
  StyledDescIcon,
  StyledDescText,
  StyledList,
  StyledListContainer,
  StyledListItem,
  StyledListItemIcon,
  StyledListItemIconEmpty,
  StyledListItemText,
  StyledNoData,
  StyledPlate,
  StyledSubTitle,
  StyledText,
  StyledTitle,
} from './styles';

const iconList = new Map([
  [1, 'champion.svg'],
  [2, 'runner-up.svg'],
  [3, 'third-runner-up.svg'],
]);

const Claim = (props: { id: any }) => {
  const { ranks, loading } = useLeaderBoard(props.id);
  const userInfo = useUserStore((store: any) => store.user);
  const formatRank = (myRank: any) => {
    if (isNaN(Number(myRank))) return '-';
    if (Number(myRank) === 0) return '-';
    return myRank;
  };

  return (
    <StyledAllContainer id="odysseySectionClimbToLeaderboard">
      <StyledPlate>
        <Image src="/images/odyssey/v5/climb-plate.svg" alt="" width={368} height={511} className="img-plate" />
      </StyledPlate>
      <StyledContainer>
        <StyledTitle>Climb to <span className="hilight">Leaderboard</span></StyledTitle>
        <StyledTitle>Win <span className="hilight">Extra Rewards</span></StyledTitle>
        <StyledSubTitle>
          Climb to the Top 10 for Exclusive $MODE & $USDC!
        </StyledSubTitle>
        <StlyedDesc>
          <StyledDescIcon>
            <Image src="/images/odyssey/v5/union.svg" width={8} height={8} alt="" />
          </StyledDescIcon>
          <StyledDescText>The ranking changes in real time, updated every 15 minutes, and the final list of winners is
            based on the data at the end of the campaign.</StyledDescText>
        </StlyedDesc>
        <StyledListContainer>
          <StyledList>
            <StyledListItem>Rank</StyledListItem>
            <StyledListItem>User address</StyledListItem>
            <StyledListItem>Trading Volume</StyledListItem>
          </StyledList>
          {
            loading ? (
              <StyledLoadingWrapper $h="100px">
                <Loading size={30} />
              </StyledLoadingWrapper>
            ) : (
              ranks?.data?.length ? ranks.data.map((item: any, idx: number) => (
                <StyledList key={idx}>
                  <StyledListItem>
                    {
                      iconList.get(item.rank) ? (
                        <StyledListItemIcon
                          src={`/images/odyssey/v5/${iconList.get(item.rank)}`}
                        />
                      ) : (
                        <StyledListItemIconEmpty />
                      )
                    }
                    <StyledListItemText>{item.rank}</StyledListItemText>
                  </StyledListItem>
                  <StyledListItem>
                    <StyledListItemIcon src={item?.account?.avatar} />
                    <StyledListItemText>{ellipsAccount(item.account.address)}</StyledListItemText>
                  </StyledListItem>
                  <StyledListItem>${simplifyNum(item.trading_volume)}</StyledListItem>
                </StyledList>
              )) : (
                <StyledNoData>No Data</StyledNoData>
              )
            )
          }
        </StyledListContainer>
        {
          ranks?.user && (
            <>
              <StyledText>Your current rank</StyledText>
              <StyledListContainer>
                <StyledList one={true}>
                  <StyledListItem># {formatRank(ranks?.user?.rank)}</StyledListItem>
                  <StyledListItem>
                    <StyledListItemIcon src={userInfo?.avatar} />
                    <StyledListItemText>{ellipsAccount(userInfo?.address)}</StyledListItemText>
                  </StyledListItem>
                  <StyledListItem>${simplifyNum(ranks?.user?.trading_volume)}</StyledListItem>
                </StyledList>
              </StyledListContainer>
            </>
          )
        }
      </StyledContainer>
    </StyledAllContainer>
  );
};

export default Claim;