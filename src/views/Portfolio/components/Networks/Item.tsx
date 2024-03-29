import { memo, useMemo } from 'react';
import { useChainsStore } from '@/stores/chains';
import { formateValueWithThousandSeparator } from '@/utils/formate';
import { NetWorkTab } from './styles';
import Big from 'big.js';

const Item = ({ chainId, usd, totalBalance, network, setNetwork }: any) => {
  const chains = useChainsStore((store: any) => store.chains);
  const chain = useMemo(() => {
    return chains.find((chain: any) => chain.chain_id === chainId);
  }, [chainId]);
  const percentage = useMemo(() => {
    if (!totalBalance || !usd) return '0';
    return new Big(usd).div(totalBalance).mul(100).toFixed(2);
  }, [totalBalance, usd]);

  return (
    <NetWorkTab
      active={network === chainId}
      onClick={() => {
        setNetwork(chainId);
      }}
      className="frcs-gm"
    >
      {chain?.logo ? (
        <img className="network-icon-chain" src={chain.logo} />
      ) : (
        <div className="default-icon network-icon" />
      )}

      <div>
        <div className="network-name">{chain?.name}</div>
        <div className="value-filed frcs-gm">
          <div className="usd-value">${formateValueWithThousandSeparator(usd, 2)}</div>
          <div className="usd-value-percent">{percentage}%</div>
        </div>
      </div>
    </NetWorkTab>
  );
};

export default memo(Item);
