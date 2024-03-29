import { memo, useMemo } from 'react';
import chains from '@/config/chains';
import { formateValueWithThousandSeparator } from '@/utils/formate';
import { getChainLogo } from '../../helpers';
import { NetWorkTab } from './styles';
import Big from 'big.js';

const Item = ({ chainId, usd, totalBalance, network, setNetwork }: any) => {
  const chain = useMemo(() => {
    return chains[chainId];
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
      {chain?.icon ? (
        <img className="network-icon-chain" src={getChainLogo(chain.chainName)} />
      ) : (
        <div className="default-icon network-icon" />
      )}

      <div>
        <div className="network-name">{chain?.chainName}</div>
        <div className="value-filed frcs-gm">
          <div className="usd-value">${formateValueWithThousandSeparator(usd, 2)}</div>
          <div className="usd-value-percent">{percentage}%</div>
        </div>
      </div>
    </NetWorkTab>
  );
};

export default memo(Item);
