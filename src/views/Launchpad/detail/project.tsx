import styled from 'styled-components';

const StyledH1 = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 26px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 39px */
`;
const StyledH2 = styled.div`
  margin-top: 40px;
  color: #fff;
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
`;
const SytledMain = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;
const StyledLi = styled.li``;
export default function Comp() {
  return (
    <SytledMain>
      <StyledH1>What is Contango?</StyledH1>
      Contango lets you loop anything on-chain. On Contango you can:
      <StyledLi style={{ marginTop: 40 }}>Create leveraged positions just like perps with low funding.</StyledLi>
      <StyledLi>Lever up on the yield of liquid staking and restaking assets, like stETH or eETH. </StyledLi>
      <StyledLi>Lever up on the fixed yield of Pendle’s PTs.</StyledLi>
      <StyledLi>Create delta-neutral plays to farm funding rates.</StyledLi>
      <StyledLi>Arbitrage rates differentials on stablecoins. </StyledLi>
      <StyledLi>Farm rewards, airdrops, points on leverage.</StyledLi>
      <StyledH1 style={{ marginTop: 60 }}>Key features</StyledH1>
      <StyledH2>Liquidity Contango</StyledH2>
      positions are built on top of spot and money markets: at the time of writing, their TVL amounts to more than $60B
      across defi. This deep liquidity allows Contango to facilitate large trades with minimal impact on both rates and
      prices.
      <StyledH2>Implied funding rates (APY) </StyledH2>
      onventions on perp exchanges indicate with funding rate the variable interest rate on the underlying debt. Funding
      rates are charged periodically, e.g. every 1 or 8 hours.
      <StyledH2>Liquidations </StyledH2>
      Liquidations can happen for several reasons, mostly related to:
      <StyledLi>
        Price movements: price goes against you, your margin loses value and your position goes underwater.
      </StyledLi>
      <StyledLi>
        Funding rates changes: rates move against you, eat into your profits and your position goes underwater.
      </StyledLi>
      <StyledH2>Rewards, incentives, points</StyledH2>
      By design, almost any reward or incentive offered by the underlying money market can be accrued by Contango users,
      simply by trading. These rewards are often in the form of native tokens, like $COMP on Compound pairs, sometimes
      in the form of chain incentives like $OP on Exactly, or even in the form of plain cash incentives like $USDC on
      Moonwell.
    </SytledMain>
  );
}
