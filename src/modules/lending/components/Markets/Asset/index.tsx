import { StyledAsset, StyledIcon, StyledSymbol } from './styles';

const LendingMarketAsset = (props: Props) => {
  const { icon, symbol } = props;

  return (
    <StyledAsset>
      <StyledIcon src={icon} />
      <StyledSymbol>{symbol}</StyledSymbol>
    </StyledAsset>
  );
};

export default LendingMarketAsset;

export interface Props {
  icon: string;
  symbol: string;
}
