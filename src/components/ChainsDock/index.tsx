import Big from 'big.js';
import { AnimatePresence } from 'framer-motion';
import { orderBy } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';

import ChainsDockList from '@/components/ChainsDock/List';
import { StyledContainer, StyledInner, StyledLine, StyledMask } from '@/components/ChainsDock/styles';
import popupsData, { SupportedChains } from '@/config/all-in-one/chains';
import type { Network } from '@/hooks/useNetworks';
import { useChainsStore } from '@/stores/chains';
import useTokens from '@/views/Portfolio/hooks/useTokens';

// The portfolio chains have been integrated
// sorted by A-Z
const ChainsFixed = SupportedChains.map((support) => support.chainId);

const ChainsDock = () => {
  const chains = useChainsStore((store: any) => store.chains);
  const { loading, networks } = useTokens({ networkList: chains });

  const chainList = useMemo(() => {
    let _chainListFixed: NetworkBalance[] = [];
    let _chainList: NetworkBalance[] = [];
    chains.forEach((chain: any) => {
      const obj = {
        ...chain,
        balance: Big(0),
      };
      const walletNetwork = networks.find((it: any) => it.id === chain.chain_id);
      if (walletNetwork) {
        obj.balance = walletNetwork.usd;
      }
      if (ChainsFixed.includes(chain.chain_id)) {
        _chainListFixed.push(obj);
        return;
      }
      _chainList.push(obj);
    });
    _chainListFixed = orderBy(_chainListFixed, 'name');
    _chainList = orderBy(_chainList, 'name');
    return [_chainListFixed, _chainList];
  }, [chains, networks]);

  console.log(chainList);

  const containerRef = useRef<any>(null);
  const [maskVisible, setMaskVisible] = useState<boolean>(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current.contains(e.target)) {
        setMaskVisible(false);
        return;
      }
      setMaskVisible(true);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <StyledContainer
      ref={containerRef}
    >
      <StyledInner>
        <ChainsDockList list={chainList[0]} />
        <StyledLine />
        <ChainsDockList list={chainList[1]} />
      </StyledInner>
      <AnimatePresence mode="wait">
        {
          maskVisible && (
            <StyledMask
              animate={{
                opacity: 1,
              }}
              initial={{
                opacity: 0,
              }}
              exit={{
                opacity: 0,
              }}
            />
          )
        }
      </AnimatePresence>
    </StyledContainer>
  );
};

export default ChainsDock;

export interface NetworkBalance extends Network {
  balance: Big.Big;
}
