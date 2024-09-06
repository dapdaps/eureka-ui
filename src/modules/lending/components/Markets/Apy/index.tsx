import { RewardApy, RewardApyItem, RewardIcon, StyledApy, StyledBox } from './styles';

const LendingMarketApy = (props: Props) => {
  const { apy, distributionApy = [], rewardKey } = props;

  return (
    <StyledBox>
      <StyledApy>{apy}</StyledApy>
      {distributionApy &&
        distributionApy
          .filter((reward) => {
            const apy = reward[rewardKey]?.slice(0, -1);
            return !!Number(apy);
          })
          .map((reward) => (
            <RewardApyItem key={reward.symbol}>
              {reward.icon ? <RewardIcon src={reward.icon} /> : null}
              <RewardApy>{reward[rewardKey]}</RewardApy>
            </RewardApyItem>
          ))}
    </StyledBox>
  );

};

export default LendingMarketApy;

export interface Props {
  apy: string;
  distributionApy: Record<string, string>[];
  rewardKey: string;
}
