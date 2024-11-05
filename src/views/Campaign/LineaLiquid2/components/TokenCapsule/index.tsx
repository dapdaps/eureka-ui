import { StyledApy, StyledContainer, StyledIcon, StyledSymbol } from './styles';

const TokenCapsule = (props: Props) => {
  const { icon, symbol, apy, onClick, selected, address } = props;

  const handleClick = () => {
    if (selected === address) return;
    onClick && onClick(address);
  };

  return (
    <StyledContainer key={address} $selected={selected === address} onClick={handleClick}>
      <StyledIcon src={icon} alt="" />
      <StyledSymbol>{symbol}</StyledSymbol>
      <StyledApy>{apy}</StyledApy>
    </StyledContainer>
  );
};

export default TokenCapsule;

interface Props {
  icon: string;
  symbol: string;
  apy: string;
  address: string;
  selected?: string;
  onClick?(address: string): void;
}
