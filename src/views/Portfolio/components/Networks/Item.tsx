import Big from 'big.js';
import { memo, useMemo } from 'react';

import chains from '@/config/chains';
import { formateValueWithThousandSeparator } from '@/utils/formate';

import { getChainLogo } from '../../helpers';
import {
  StyledItemContent,
  StyledItemIcon,
  StyledItemName,
  StyledItemNum,
  StyledItemUSD,
  StyledTabItem,
} from './styles';

const Item = ({ chainId, usd, totalBalance, network, setNetwork, icon }: any) => {
  const chain = useMemo(() => {
    return chains[chainId];
  }, [chainId]);
  const percentage = useMemo(() => {
    if (!totalBalance || !usd) return '0';
    return new Big(usd).div(totalBalance).mul(100).toFixed(2);
  }, [totalBalance, usd]);

  return (
    <StyledTabItem
      className={network === chainId ? 'active' : ''}
      onClick={() => {
        setNetwork(chainId);
      }}
    >
      <StyledItemIcon
        className="item-icon"
        url={icon ? '' : getChainLogo(chain?.chainName)}
      >
        {icon ?? null}
      </StyledItemIcon>
      <StyledItemContent>
        <StyledItemName>{chain?.chainName}</StyledItemName>
        <StyledItemNum>
          <StyledItemUSD>${formateValueWithThousandSeparator(usd, 2)}</StyledItemUSD>
          {percentage && <StyledItemName>{percentage}%</StyledItemName>}
        </StyledItemNum>
      </StyledItemContent>
    </StyledTabItem>
  );
};

export default memo(Item);
