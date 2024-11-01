// @ts-nocheck
import dynamic from 'next/dynamic';
import { memo, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { Spinner } from '@/components/lib/Spinner';
import dappConfig from '@/config/dapp';
const StyledContainer = styled.div``;
export default memo(function Liquidity(props) {
  const { dapps, chainId, curChain, themeMapping, onChangeDapp } = props;
  const markets = dapps
    ? Object.keys(dapps).map((key) => {
        return {
          key,
          ...dapps[key]
        };
      })
    : [];

  const [state, updateState] = useMultiState({
    currentMarket: null,
    isChainSupported: false
  });
  const DynamicComponent = useMemo(() => {
    if (currentMarket) {
      return dynamic(() => import(`@/modules/${dappConfig[currentMarket?.key]?.type}/${currentMarket?.name}`), {
        ssr: false,
        loading: () => {
          return <Spinner />;
        }
      });
    } else {
      return null;
    }
  }, [markets, currentMarket]);

  onChangeDapp && onChangeDapp(markets[0]);

  const handleChangeMarket = (index) => {
    setCurrentIndex(index);
  };
  useEffect(() => {
    const isSupported = chainId === curChain.chainId;
    updateState({
      isChainSupported: isSupported
    });
  }, [state.currentMarket, chainId]);

  useEffect(() => {
    if (!state?.currentMarket) {
      updateState({
        currentMarket: markets[0]
      });
    }
  }, [markets, state?.currentMarket]);
  return (
    <StyledContainer style={themeMapping[currentMarket?.key]?.theme}>
      {currentMarket && DynamicComponent && (
        <DynamicComponent
          {...{
            ...props,
            markets,
            currentMarket: currentMarket,
            isDapps: true,
            dexConfig: currentMarket,
            defaultDex: currentMarket?.name,
            isChainSupported: isChainSupported,
            onChangeMarket: handleChangeMarket
          }}
        />
      )}
    </StyledContainer>
  );
});
