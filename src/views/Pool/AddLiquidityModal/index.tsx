import { memo, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import Modal from '@/components/Modal';
import dappConfig from '@/config/dapp';
import { LiquidityContext } from '@/views/Pool/context';

import AddLiquidity from '../AddLiquidity/V3';

const StyledContainer = styled.div`
  max-height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;
`;

const AddLiquidityModal = ({ open, dapp, chain, defaultTokens, type, onClose }: any) => {
  const [localConfig, setLocalConfig] = useState<any>(null);
  const [tokens, setTokens] = useState<any>([]);

  const getLocalConfig = useCallback(async () => {
    if (!dapp.path) {
      setLocalConfig(null);
      return;
    }
    const config = dappConfig[dapp.path];

    const result: any = (await import(`@/config/pool/dapps/${dapp.path}`))?.default;

    setLocalConfig({ ...result, theme: config.theme });
  }, [dapp]);

  useEffect(() => {
    getLocalConfig();
  }, [dapp]);

  useEffect(() => {
    if (!localConfig || !localConfig.tokens || !localConfig.tokens[chain.chain_id] || !defaultTokens) return;
    const _tokens = localConfig.tokens[chain.chain_id];
    const [token0, token1] = defaultTokens.split(',');
    let _token0: any = null;
    let _token1: any = null;
    Object.values(_tokens).some((token: any) => {
      const symbol = token.symbol !== '$WAI' ? token.symbol : 'WAI';
      if (symbol === token0) {
        _token0 = token;
      }
      if (symbol === token1) {
        _token1 = token;
      }
      return _token0 && _token1;
    });

    setTokens([_token0, _token1]);
  }, [localConfig, defaultTokens]);

  return (
    <Modal
      display={open}
      width={604}
      showHeader={false}
      content={
        <StyledContainer>
          <LiquidityContext.Provider
            value={{
              dapp,
              currentChain: chain,
              ...localConfig,
              defaultTokens: tokens,
            }}
          >
            <AddLiquidity from="modal" onClose={onClose} type={type} />
          </LiquidityContext.Provider>
        </StyledContainer>
      }
    />
  );
};

export default memo(AddLiquidityModal);
