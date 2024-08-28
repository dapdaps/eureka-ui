import IconALl from '@public/images/networks/icon-all.svg';
import type Big from 'big.js';
import { orderBy } from 'lodash';
import { memo, useEffect, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { SupportedChains } from '@/config/all-in-one/chains';
import { formateValueWithThousandSeparatorAndFont } from '@/utils/formate';
import type { NetworkItem } from '@/views/Portfolio/hooks/useTokens';

import Item from './Item';
import {
  StyledItemContent,
  StyledItemIcon,
  StyledItemName,
  StyledItemNum,
  StyledItemUSD,
  StyledNetworkTabWrapper,
  StyledTabItem,
} from './styles';

const ALL = {
  key: -1,
  chainName: 'All Networks',
};

const Networks = (props: {
  networks: NetworkItem[],
  totalBalance?: Big.Big,
  network: number,
  setNetwork: any;
  loading?: boolean;
}) => {
  const { networks, totalBalance, network, setNetwork, loading } = props;

  const wrapperRef = useRef(null);
  const [foldVisible, setFoldVisible] = useState(false);
  const [cols, setCols] = useState(5);
  const [fold, setFold] = useState(true);
  const [displayNetworks, setDisplayNetworks] = useState<NetworkItem[]>([]);
  const [hiddenNetworks, setHiddenNetworks] = useState<NetworkItem[]>([]);

  const handleFold = () => {
    setFold(!fold);
  };

  useEffect(() => {
    const itemWidth = 188;
    const itemGap = 15;
    const networkSorted: [NetworkItem[], NetworkItem[]] = [[], []];
    if (networks) {
      networks.forEach((n) => {
        if (SupportedChains.some((support) => support.chainId === n.id)) {
          networkSorted[0].push(n);
          return;
        }
        networkSorted[1].push(n);
      });
    }
    networkSorted[0] = orderBy(networkSorted[0], 'name');
    networkSorted[1] = orderBy(networkSorted[1], 'name');
    const networkSortedMerge: NetworkItem[] = [...networkSorted[0], ...networkSorted[1]];

    const handleChainNav = () => {
      if (!wrapperRef.current || !networkSortedMerge) return;
      const wrapperWidth = parseFloat(getComputedStyle(wrapperRef.current).width);
      const contentLength = networkSortedMerge.length + 1;
      const _cols = Math.floor((wrapperWidth + itemGap) / (itemWidth + itemGap));
      const _rows = Math.ceil(contentLength / _cols);
      setCols(_cols);
      if (_rows > 2) {
        setFoldVisible(true);
        setDisplayNetworks(networkSortedMerge.slice(0, _cols * 2 - 2));
        setHiddenNetworks(networkSortedMerge.slice(_cols * 2 - 2));
      } else {
        setFoldVisible(false);
        setDisplayNetworks(networkSortedMerge);
        setHiddenNetworks([]);
        setFold(true);
      }
    };
    handleChainNav();
    window.addEventListener('resize', handleChainNav);
    return () => {
      window.removeEventListener('resize', handleChainNav);
    };
  }, [networks]);

  return (
    <StyledNetworkTabWrapper ref={wrapperRef} fold={fold}>
      {
        loading ? (
          [...new Array(10).keys()].map((i) => (
            <Skeleton
              key={i}
              width="188px"
              height="50px"
              borderRadius="10px"
              containerClassName="skeleton"
            />
          ))
        ) : (
          <>
            <StyledTabItem
              className={network === ALL.key ? 'active' : ''}
              onClick={() => {
                setNetwork(-1);
              }}
            >
              <StyledItemIcon className="item-icon">
                <IconALl />
              </StyledItemIcon>
              <StyledItemContent>
                <StyledItemName>{ALL.chainName}</StyledItemName>
                <StyledItemNum>
                  <StyledItemUSD>{formateValueWithThousandSeparatorAndFont(totalBalance, 0, true, { prefix: '$', isShort: false })}</StyledItemUSD>
                </StyledItemNum>
              </StyledItemContent>
            </StyledTabItem>
            {displayNetworks?.map((chain) => {
              return (
                <Item
                  key={chain.id}
                  chain={chain}
                  totalBalance={totalBalance}
                  network={network}
                  setNetwork={setNetwork}
                />
              );
            })}
            {
              foldVisible && fold && (
                <StyledTabItem style={{ marginLeft: 'auto' }} onClick={handleFold}>
                  <StyledItemName>unfold {networks.length - cols * 2 + 2} chains</StyledItemName>
                </StyledTabItem>
              )
            }
            {hiddenNetworks?.map((chain) => {
              return (
                <Item
                  chain={chain}
                  key={chain.id}
                  totalBalance={totalBalance}
                  network={network}
                  setNetwork={setNetwork}
                />
              );
            })}
            {
              foldVisible && !fold && (
                <StyledTabItem style={{ marginLeft: 'auto' }} onClick={handleFold}>
                  <StyledItemName>fold {networks.length - cols * 2 + 2} chains</StyledItemName>
                </StyledTabItem>
              )
            }
          </>
        )
      }
    </StyledNetworkTabWrapper>
  );
};

export default memo(Networks);
