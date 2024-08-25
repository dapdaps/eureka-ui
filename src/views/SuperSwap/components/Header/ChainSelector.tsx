import IconEmptyNetwork from '@public/images/chains/empty-network.svg';
import IconChainArrowDown from '@public/images/tokens/chainArrowDown.svg';
import Big from 'big.js';
import { useEffect, useMemo, useState } from 'react';

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
  StyledChainTokenSymbol,
} from './styles';

export default function ChainSelector() {
  const chain = useChain();
  const chains = useChainsStore((store: any) => store.chains);
  const [showChains, setShowChains] = useState(false);
  const { switchChain } = useSwitchChain();
  const [displayedChains, setDisplayedChains] = useState<any[]>([]);
  const [tvlLoading, setTvlLoading] = useState(false);

  const sortChains = useMemo(() => {
    return chains.sort((a: any, b: any) => a.name.localeCompare(b.name));
  }, [chains]);

  useEffect(() => {
    fetchNetworkData();
    const close = () => setShowChains(false);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  useEffect(() => {
    const cachedChains = localStorage.getItem('swap-selectedChains');
    if (cachedChains) {      
      setDisplayedChains(JSON.parse(cachedChains));
    }
  }, []);

  const fetchNetworkData = async () => {
    setTvlLoading(true);
    try {
      const resultNetwork = await get(`/api/network/all`);
      const topChains = resultNetwork.data
        .sort((a: any, b: any) => Big(b.trading_volume).cmp(Big(a.trading_volume)))
        .slice(0, 3);
      const cachedChains = localStorage.getItem('swap-selectedChains');
      if (cachedChains) {
        setDisplayedChains(JSON.parse(cachedChains));
      } else {
        setDisplayedChains(topChains);
      }
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
    const updatedChains = [
      selectedChain,
      ...displayedChains.filter((c: any) => c.chain_id !== selectedChain.chain_id)
    ].slice(0, 3);
    
    setDisplayedChains(updatedChains);
    localStorage.setItem('swap-selectedChains', JSON.stringify(updatedChains));
    switchChain({ chainId: selectedChain.chain_id });
  };

  const restChains = useMemo(() => {
    return sortChains.filter((chain: any) => 
      !displayedChains.some((item: any) => item.chain_id === chain.chain_id)
    );
  }, [sortChains, displayedChains]);

  return (
    <StyledFlex gap="10px" justifyContent="space-between" style={{ marginBottom: '20px' }}>
      <StyledFlex gap="8px">
        {displayedChains.map((item: any, index: number) => (
          <StyleChainItem
            isActive={index === 0}
            onClick={() => handleChainSelect(item)}
            key={item.chain_id}
          >
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
          {chain?.chainId ? (
            <>
              <StyledChainName>{restChains.length} chains</StyledChainName>
              <IconChainArrowDown />
            </>
          ) : (
            <>
              <IconEmptyNetwork />
              <IconChainArrowDown />
            </>
          )}
        </StyledChain>
        {showChains && (
          <StyledChainListWrapper>
            <StyledChainList>
              {restChains.map((chain: any) => (
                <StyledChainItem
                  key={chain.chain_id}
                  onClick={() => handleChainSelect(chain)}
                >
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
