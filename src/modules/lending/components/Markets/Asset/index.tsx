import { StyledAsset, StyledIcon, StyledSymbol, StyledTip } from './styles';

const LendingMarketAsset = (props: Props) => {
  const { icon, symbol, isCanSupply } = props;

  return (
    <StyledAsset>
      <StyledIcon src={icon} />
      <StyledSymbol>{symbol}</StyledSymbol>
      {isCanSupply === false && <StyledTip>Deposit Paused</StyledTip>}
    </StyledAsset>
  );
};

export default LendingMarketAsset;

export interface Props {
  icon: string;
  symbol: string;
  isCanSupply?: boolean;
}
