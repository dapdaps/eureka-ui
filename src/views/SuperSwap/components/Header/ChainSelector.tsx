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
import { useEffect, useState } from 'react';

export default function ChainSelector() {
  const chain = useChain();
  const chains = useChainsStore((store: any) => store.chains);
  const [showChains, setShowChains] = useState(false);
  const { switching, switchChain } = useSwitchChain();

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
        <StyledChainLogo src={chain?.icon} />
        <div>{chain?.chainName}</div>
        <StyledArrowIcon>
          <ArrowIcon />
        </StyledArrowIcon>
      </StyledChain>
      {showChains && (
        <StyledChainListWrapper>
          <StyledChainList>
            {chains.map((chain: any) => (
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
