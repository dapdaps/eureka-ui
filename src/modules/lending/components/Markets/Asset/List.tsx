import { StyledIcon } from '@/modules/lending/components/Markets/Asset/styles';
import { StyledFlex } from '@/styled/styles';

const LendingMarketAssetList = (props: Props) => {
  const { list } = props;

  return (
    <StyledFlex alignItems="center" style={{ overflow: 'hidden' }}>
      {list.map((asset, index) => (
        <StyledIcon
          key={index}
          src={asset.icon}
          title={asset.symbol}
          style={{
            marginLeft: index === 0 ? 0 : -4
          }}
          whileHover={{
            scale: 1.1
          }}
        />
      ))}
    </StyledFlex>
  );
};

export default LendingMarketAssetList;

export interface Props {
  list: { icon: string; symbol: string }[];
}
