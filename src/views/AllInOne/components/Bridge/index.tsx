import React, { memo, useState } from 'react';

import useTokensAndChains from '@/components/Bridge/hooks/useTokensAndChains';
import Arrow2Down from '@/views/AllInOne/components/Arrow2Down';
import BridgeCard from '@/views/AllInOne/components/Bridge/Card';
import {
  StyledBody,
  StyledBridgeContainer,
  StyledContainer,
  StyledDownIcon,
  StyledFoot,
} from '@/views/AllInOne/components/Bridge/styles';
import AllInOneButton from '@/views/AllInOne/components/Button';

const BridgeView = (props: Props) => {
  const { chain, disabled } = props;
 
  const { tokens } = useTokensAndChains();

  const [fromChainId, setFromChainId] = useState<number>();
  const [toChainId, setToChainId] = useState<number>(chain?.chainId);
  const [fromPoolId, setFromPoolId] = useState<number>();
  const [toPoolId, setToPoolId] = useState<number>();

  const selectDefaultToken = (target: string, chainId: number) => {
    const tokenList = Object.values(tokens).filter((it) => it.chainId === chainId);
    const currToken = tokenList.find((it) => it.chainId === chainId);
    if (!currToken) return;
    handleTokenSelect(target, currToken.poolId as number);
  };

  const handleChainSelect = (target: string, chainId: number) => {
    if (target === 'from') {
      if (chainId === toChainId) return;
      setFromChainId(chainId);
    }
    if (target === 'to') {
      if (chainId === fromChainId) return;
      setToChainId(chainId);
    }
    selectDefaultToken(target, chainId);
  };
  const handleTokenSelect = (target: string, poolId: number) => {
    if (target === 'from') {
      setFromPoolId(poolId);
      return;
    }
    if (target === 'to') {
      setToPoolId(poolId);
    }
  };

  return (
    <StyledBridgeContainer className={`StyledBridgeContainer ${disabled ? 'disabled' : ''}`}>
      <StyledContainer>
        <StyledBody>
          <BridgeCard
            type="editable"
            title="From"
            chainId={fromChainId}
            poolId={fromPoolId}
            onChainSelect={(chainId) => handleChainSelect('from', chainId)}
            onTokenSelect={(poolId) => handleTokenSelect('from', poolId)}
            disabled={disabled}
          />
          <StyledDownIcon disabled={disabled}>
            <Arrow2Down />
          </StyledDownIcon>
          <BridgeCard
            styles={{ marginTop: 12 }}
            title="To"
            chainId={toChainId}
            poolId={toPoolId}
            onChainSelect={(chainId) => handleChainSelect('to', chainId)}
            onTokenSelect={(poolId) => handleTokenSelect('to', poolId)}
            disabled={disabled}
          />
        </StyledBody>
        <StyledFoot>
          <AllInOneButton
            $background={chain?.selectBgColor}
            $borderColor={chain?.selectBgColor}
            color={chain?.iconColor}
            loading={false}
            disabled={disabled}
            onClick={() => {}}
          >
            Input Amount
          </AllInOneButton>
        </StyledFoot>
      </StyledContainer>
    </StyledBridgeContainer>
  );
};

export default memo(BridgeView);

interface Props {
  chain?: any;
  disabled?: boolean;
}
