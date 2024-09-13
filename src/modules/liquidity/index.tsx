// @ts-nocheck
import dynamic from 'next/dynamic';
import { memo, useEffect } from 'react';
import styled from 'styled-components';

import { Spinner } from '@/components/lib/Spinner';
import dappConfig from '@/config/dapp';
import { useMultiState } from '@/modules/hooks';
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
    currentMarket: markets[0],
    isChainSupported: false
  });
  const DynamicComponent = dynamic(
    () => import(`@/modules/${dappConfig[state?.currentMarket?.key]?.type}/${state?.currentMarket?.name}`),
    {
      ssr: false,
      loading: () => {
        return <Spinner />;
      }
    }
  );
  onChangeDapp && onChangeDapp(markets[0]);

  const handleChangeMarket = (dapp) => {
    updateState({
      currentMarket: dapp
    });
  };
  useEffect(() => {
    const isSupported = chainId === curChain.chainId;
    updateState({
      isChainSupported: isSupported
    });
  }, [state.currentMarket, chainId]);
  return (
    <StyledContainer style={themeMapping[state?.currentMarket?.key]?.theme}>
      {state.currentMarket && DynamicComponent && (
        <DynamicComponent
          {...{
            ...props,
            markets,
            currentMarket: state.currentMarket,
            isDapps: true,
            dexConfig: state.currentMarket,
            defaultDex: state?.currentMarket?.name,
            isChainSupported: state.isChainSupported,
            onChangeMarket: handleChangeMarket
          }}
        />

        // <Widget
        //   src={state?.currentMarket?.dappSrc}
        //   props={{
        //     markets,
        //     currentMarket: state.currentMarket,
        //     isDapps: true,
        //     dexConfig: state.currentMarket,
        //     defaultDex: state?.currentMarket?.name,
        //     isChainSupported: state.isChainSupported,
        //     onChangeMarket: handleChangeMarket,
        //     ...props
        //   }}
        // />
      )}
    </StyledContainer>
  );
});
