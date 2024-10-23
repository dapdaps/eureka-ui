import LazyImage from '@/components/LazyImage';
import { StyledFlex } from '@/styled/styles';

const LendingMarketAssetList = (props: Props) => {
  const { list } = props;

  return (
    <StyledFlex alignItems="center" style={{ overflow: 'hidden' }}>
      {list.map((asset, index) => (
        <LazyImage
          key={index}
          src={asset.icon}
          title={asset.symbol}
          style={{
            borderRadius: '50%'
          }}
          containerStyle={{
            flexShrink: 0,
            marginLeft: index === 0 ? 0 : -4
          }}
          width={26}
          height={26}
          fallbackSrc="/assets/tokens/default_icon.png"
        />
      ))}
    </StyledFlex>
  );
};

export default LendingMarketAssetList;

export interface Props {
  list: { icon: string; symbol: string }[];
}
