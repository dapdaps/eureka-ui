import styled from 'styled-components';

export const StyledExtraReward = styled.div`
  height: 42px;
`;

export const StyledExtraRewardContent = styled.div`
  width: 560px;
  height: 116px;
  border-radius: 20px;
  background: linear-gradient(90deg, #b6c133 0%, #fdfe03 100%);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

export const StyledCoin = styled.div`
  position: absolute;
  top: -10px;
  left: -18px;
  background-image: url(/images/rewards/reward-coin.png);
  background-size: 100%;
  background-repeat: no-repeat;
  width: 66px;
  height: 58px;
`;

export const StyledTitle = styled.div`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  padding: 10px 28px 0px 60px;
  position: relative;
  .bold {
    font-style: italic;
    font-weight: 900;
  }
`;

export const StyledLinkButton = styled.div`
  color: #0075ff;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-decoration-line: underline;
  position: absolute;
  right: 28px;
  bottom: 4px;
`;
