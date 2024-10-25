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

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isChainSupported, setIsChainSupported] = useState<boolean>(false);
  const currentMarket = useMemo(() => {
    return markets?.[currentIndex];
  }, [markets, currentIndex]);

  const DynamicComponent = useMemo(() => {
    console.log('===currentMarket', currentMarket);
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
    setIsChainSupported(isSupported);
  }, [currentMarket, chainId]);

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
