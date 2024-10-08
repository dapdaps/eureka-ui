import Big from 'big.js';
import { useEffect, useMemo, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import useChain from '@/hooks/useChain';
import useSwitchChain from '@/hooks/useSwitchChain';
import { useChainsStore } from '@/stores/chains';
import { StyledFlex } from '@/styled/styles';
import { get } from '@/utils/http';

import {
  StyleChainItem,
  StyleChainWrapper,
  StyledChain,
  StyledChainItem,
  StyledChainList,
  StyledChainListWrapper,
  StyledChainName,
  StyledChainTokenIcon,
  StyledChainTokenSymbol
} from './styles';

export default function ChainSelector({ onLoadChain }: any) {
  const chain = useChain();
  const { chainId } = useAccount();
  const chains = useChainsStore((store: any) => store.chains);
  const [showChains, setShowChains] = useState(false);
  const { switchChain } = useSwitchChain();
  const [displayedChains, setDisplayedChains] = useState<any[]>([]);
  const [_, setTvlLoading] = useState(false);

  const sortChains = chains.sort((a: any, b: any) => a.name.localeCompare(b.name));

  useEffect(() => {
    const close = () => setShowChains(false);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  useEffect(() => {
    const cachedChains = localStorage.getItem('swap-selectedChains');
    if (cachedChains) {
      const parsedChains = JSON.parse(cachedChains);
      updateDisplayedChains(parsedChains, chainId);
    } else {
      fetchNetworkData();
    }
  }, [chainId, chains]);

  const updateDisplayedChains = (chainList: any[], currentChainId?: number) => {
    let updatedChains = [...chainList];

    if (currentChainId) {
      const currentChain = chains.find((c: any) => c.chain_id === currentChainId);
      if (currentChain) {
        updatedChains = [currentChain, ...chainList.filter((c: any) => c.chain_id !== currentChainId)];
      }
    }

    updatedChains = updatedChains.slice(0, 3);

    while (updatedChains.length < 3 && updatedChains.length < chains.length) {
      const nextChain = chains.find((c: any) => !updatedChains.some((uc: any) => uc.chain_id === c.chain_id));
      if (nextChain) updatedChains.push(nextChain);
    }
    setDisplayedChains(updatedChains);
    localStorage.setItem('swap-selectedChains', JSON.stringify(updatedChains));
    onLoadChain(updatedChains[0]);
  };

  const fetchNetworkData = async () => {
    setTvlLoading(true);
    try {
      const resultNetwork = await get(`/api/network/all`);
      const topChains = resultNetwork.data
        .slice(0, 3)
        .sort((a: any, b: any) => Big(b.trading_volume).cmp(Big(a.trading_volume)));

      updateDisplayedChains(topChains, chainId);
    } catch (error) {
      console.error('Error fetching network data:', error);
    } finally {
      setTvlLoading(false);
    }
  };

  const handleChainSelect = (selectedChain: any) => {
    if (!chain?.chainId) {
      switchChain({ chainId: selectedChain.chain_id });
      return;
    }
    updateDisplayedChains([selectedChain, ...displayedChains], selectedChain.chain_id);
    switchChain({ chainId: selectedChain.chain_id });
  };

  const restChains = useMemo(() => {
    return sortChains.filter((chain: any) => !displayedChains.some((item: any) => item.chain_id === chain.chain_id));
  }, [sortChains, displayedChains]);

  return (
    <StyledFlex gap="10px" justifyContent="space-between" style={{ marginBottom: '20px' }}>
      <StyledFlex gap="8px">
        {displayedChains.map((item: any, index: number) => (
          <StyleChainItem isActive={index === 0} onClick={() => handleChainSelect(item)} key={item.chain_id}>
            <img className="chain-img" src={item?.logo} alt="" />
            <div className="chain-name">{item.name}</div>
          </StyleChainItem>
        ))}
      </StyledFlex>
      <StyleChainWrapper>
        <StyledChain
          onClick={(ev) => {
            ev.stopPropagation();
            setShowChains(!showChains);
          }}
        >
          <StyledChainName>{restChains.length} chains</StyledChainName>
          <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L6 5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </StyledChain>
        {showChains && (
          <StyledChainListWrapper>
            <StyledChainList>
              {restChains.map((chain: any) => (
                <StyledChainItem key={chain.chain_id} onClick={() => handleChainSelect(chain)}>
                  <StyledChainTokenIcon src={chain.logo} />
                  <StyledChainTokenSymbol>{chain.name}</StyledChainTokenSymbol>
                </StyledChainItem>
              ))}
            </StyledChainList>
          </StyledChainListWrapper>
        )}
      </StyleChainWrapper>
    </StyledFlex>
  );
}
