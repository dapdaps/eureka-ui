import ChainsDockDetail from '@/components/ChainsDock/Detail';
import type { NetworkBalance } from '@/components/ChainsDock/index';
import LazyImage from '@/components/LazyImage';
import { StyledFlex } from '@/styled/styles';

const ChainsDockList = (props: Props) => {
  const { list, onBridgeShow, loading } = props;

  return (
    <StyledFlex flexDirection="column" alignItems="end" gap="10px" style={{ flexShrink: 0 }}>
      {
        list.map((chain, index) => (
          <ChainsDockDetail key={chain.chain_id} network={chain} onBridgeShow={onBridgeShow} loading={loading}>
            <LazyImage
              key={chain.chain_id}
              containerClassName="chain-dock-img"
              src={chain.logo}
              width={36}
              height={36}
              variants={{
                hover: {
                  scale: 1.38,
                  // width: 50,
                  // height: 50,
                  marginTop: 7,
                  marginBottom: 7,
                },
                default: {
                  scale: 1,
                },
              }}
              whileHover="hover"
              initial="default"
              containerStyle={{
                transformOrigin: 'right center',
              }}
            />
          </ChainsDockDetail>
        ))
      }
    </StyledFlex>
  );
};

export default ChainsDockList;

interface Props {
  list: NetworkBalance[];
  onBridgeShow?(fromChainId: number, toChainId: number, direction: string): void;
  loading: boolean;
}
