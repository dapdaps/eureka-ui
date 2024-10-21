import { StyledAsset, StyledIcon, StyledSymbol } from './styles';

const LendingMarketAsset = (props: Props) => {
  const { icon, symbol, isMulti, onClick } = props;

  return (
    <StyledAsset onClick={onClick} $isMulti={isMulti}>
      <StyledIcon src={icon} />
      <StyledSymbol>{symbol}</StyledSymbol>
      {isMulti && (
        <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L6 5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
    </StyledAsset>
  );
};

export default LendingMarketAsset;

export interface Props {
  icon?: string;
  symbol?: string;
  isMulti?: boolean;

  onClick?(): void;
}
