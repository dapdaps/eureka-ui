import { Asset, Icon, StyledChainIcon, StyledIconWrap, Symbol } from '@/modules/lending/components/CompoundV3/Asset/styles';

const CompoundV3Asset = (props: Props) => {
  const { icon, symbol, curChain, size } = props;

  return (
    <Asset className={size}>
      <StyledIconWrap>
        <Icon src={icon} />
        <StyledChainIcon>
          <img src={curChain.logo} />
        </StyledChainIcon>
      </StyledIconWrap>
      {
        symbol && <Symbol>{symbol}</Symbol>
      }
    </Asset>
  );
};

export default CompoundV3Asset;

export interface Props {
  icon: string;
  symbol?: string;
  curChain: any;
  size?: string;
}
