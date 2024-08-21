import useChain from '@/hooks/useChain';
import { useChainsStore } from '@/stores/chains';
import useSwitchChain from '@/hooks/useSwitchChain';
import {
  StyleChainWrapper,
  StyledChain,
  StyledChainListWrapper,
  StyledChainList,
  StyledChainItem,
  StyledChainTokenIcon,
  StyledChainTokenSymbol,
  StyleChainItem,
  StyledChainName,
} from './styles';
import { useEffect, useMemo, useState } from 'react';
import IconEmptyNetwork from '@public/images/chains/empty-network.svg';
import { StyledFlex } from '@/styled/styles';
import IconChainArrowDown from '@public/images/tokens/chainArrowDown.svg';
import { get } from '@/utils/http';
import Big from 'big.js';

export default function ChainSelector() {
  const chain = useChain();
  const chains = useChainsStore((store: any) => store.chains);
  const [showChains, setShowChains] = useState(false);
  const { switchChain } = useSwitchChain();
  const [filterTopTVL, setFilterTopTVL] = useState([]);
  const [tvlLoading, setTvlLoading] = useState(false);

  const sortChains = useMemo(() => {
    return chains.sort((a: any, b: any) => {
      return a.name.localeCompare(b.name);
    });
  }, [chains]);

  useEffect(() => {
    fetchNetworkData();
    const close = () => {
      setShowChains(false);
    };
    document.addEventListener('click', close);

    return () => {
      document.removeEventListener('click', close);
    };
  }, []);

  const fetchNetworkData = async () => {
    setTvlLoading(true);
    try {
      const resultNetwork = await get(`/api/network/all`);

      const data = resultNetwork.data
        .sort((a: any, b: any) => {
          return Big(b.trading_volume).cmp(Big(a.trading_volume));
        })
        .slice(0, 3);
      setFilterTopTVL(data);
    } catch (error) {
      console.error('Error fetching resultNetwork data:', error);
      return [];
    } finally {
      setTvlLoading(false);
    }
  };

  const restChains = useMemo(() => {
    return sortChains.filter((chain: any) => {
      return !filterTopTVL.some((item: any) => item.chain_id === chain.chain_id);
    });
  }, [sortChains, filterTopTVL]);

  return (
    <StyledFlex gap="10px" justifyContent="space-between" style={{ marginBottom: '20px' }}>
      <StyledFlex gap="8px">
        {filterTopTVL.map((item: any) => (
          <StyleChainItem
            isActive={chain?.chainId === item.chain_id}
            onClick={() => {
              switchChain({
                chainId: item.chain_id,
              });
            }}
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
          {
            chain?.chainId ? (
              <>
              <StyledChainName>{restChains.length} chains</StyledChainName>
              <IconChainArrowDown />
              </>
            ) : (
              <>
                <IconEmptyNetwork />
                <IconChainArrowDown />
              </>
            )
          }
        </StyledChain>
        {showChains && (
          <StyledChainListWrapper>
            <StyledChainList>
              {restChains.map((chain: any) => (
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
    </StyledFlex>
  );
}
