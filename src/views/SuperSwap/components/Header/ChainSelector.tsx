import ArrowIcon from '@/components/Icons/ArrowIcon';
import useChain from '@/hooks/useChain';
import { useChainsStore } from '@/stores/chains';
import useSwitchChain from '@/hooks/useSwitchChain';
import {
  StyleChainWrapper,
  StyledChain,
  StyledChainLogo,
  StyledArrowIcon,
  StyledChainListWrapper,
  StyledChainList,
  StyledChainItem,
  StyledChainTokenIcon,
  StyledChainTokenSymbol,
} from './styles';
import { useEffect, useMemo, useState } from 'react';
import IconEmptyNetwork from '@public/images/chains/empty-network.svg';

export default function ChainSelector() {
  const chain = useChain();
  const chains = useChainsStore((store: any) => store.chains);
  const [showChains, setShowChains] = useState(false);
  const { switching, switchChain } = useSwitchChain();

  const sortChains = useMemo(() => {
    return chains.sort((a: any, b: any) => {
      return a.name.localeCompare(b.name);
    });
  } , [chains])
  
  useEffect(() => {
    const close = () => {
      setShowChains(false);
    };
    document.addEventListener('click', close);

    return () => {
      document.removeEventListener('click', close);
    };
  }, []);
  return (
    <StyleChainWrapper>
      <StyledChain
        onClick={(ev) => {
          ev.stopPropagation();
          setShowChains(!showChains);
        }}
      >
        {
          chain?.icon ? <StyledChainLogo src={chain.icon} /> : <IconEmptyNetwork />
        }
        <div>{chain?.chainName}</div>
        <StyledArrowIcon>
          <ArrowIcon />
        </StyledArrowIcon>
      </StyledChain>
      {showChains && (
        <StyledChainListWrapper>
          <StyledChainList>
            {sortChains.map((chain: any) => (
              <StyledChainItem
                key={chain.chain_id}
                onClick={() => {
                  switchChain({
                    chainId: chain.chain_id,
                  });
                }}
              >
                <StyledChainTokenIcon src={chain.logo} />
                <StyledChainTokenSymbol>{chain.name}</StyledChainTokenSymbol>
              </StyledChainItem>
            ))}
          </StyledChainList>
        </StyledChainListWrapper>
      )}
    </StyleChainWrapper>
  );
}
