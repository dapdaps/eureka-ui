import Title from '@public/images/home/next-gen-defi.svg';
import Big from 'big.js';
import { random } from 'lodash';
import { useCallback, useMemo, useState } from 'react';

import LazyImage from '@/components/LazyImage';
import popupsData, { SupportedChains } from '@/config/all-in-one/chains';
import { useChainsStore } from '@/stores/chains';
import {
  StyledContainer,
  StyledGrid,
  StyledGridCell,
  StyledGridRow,
  StyledInner,
  StyledMaskBottom,
  StyledMaskLeft,
  StyledMaskRight,
  StyledMaskTop,
  StyledTitle,
  StyledTitleSub,
} from '@/views/Home/components/GridChains/styles';
import useDapps from '@/views/Portfolio/hooks/useDapps';
import useTokens from '@/views/Portfolio/hooks/useTokens';

import GridChainBalance from './Balance';
import GridChainDetail from './Detail';

const CellSize = 100;
const GridHeight = 1500;
const GridWidth = 2000;
const Rows = Math.floor(GridHeight / CellSize);
const Cols = Math.floor(GridWidth / CellSize);

const ChainList: Omit<GridChain, 'id' | 'logo' | 'native_currency' | 'name'>[] = [
  {
    chainId: popupsData['polygon-zkevm'].chainId,
    icon: popupsData['polygon-zkevm'].icon,
    path: popupsData['polygon-zkevm'].path,
    bg: popupsData['polygon-zkevm'].theme.button.bg,
    text: popupsData['polygon-zkevm'].theme.button.text,
    position: [4, 14],
    balance: Big(0),
    totalUsd: Big(0),
  },
  {
    chainId: popupsData.metis.chainId,
    icon: popupsData.metis.icon,
    path: popupsData.metis.path,
    bg: popupsData.metis.theme.button.bg,
    text: popupsData.metis.theme.button.text,
    position: [5, 11],
    balance: Big(0),
    totalUsd: Big(0),
  },
  {
    chainId: popupsData.mode.chainId,
    icon: popupsData.mode.icon,
    path: popupsData.mode.path,
    bg: popupsData.mode.theme.button.bg,
    text: popupsData.mode.theme.button.text,
    position: [6, 13],
    balance: Big(0),
    totalUsd: Big(0),
  },
  {
    chainId: popupsData.scroll.chainId,
    icon: popupsData.scroll.icon,
    path: popupsData.scroll.path,
    bg: popupsData.scroll.theme.button.bg,
    text: popupsData.scroll.theme.button.text,
    position: [6, 15],
    balance: Big(0),
    totalUsd: Big(0),
  },
  {
    chainId: popupsData.blast.chainId,
    icon: popupsData.blast.icon,
    path: popupsData.blast.path,
    bg: popupsData.blast.theme.button.bg,
    text: popupsData.blast.theme.button.text,
    position: [8, 12],
    balance: Big(0),
    totalUsd: Big(0),
  },
  {
    chainId: popupsData.zksync.chainId,
    icon: popupsData.zksync.icon,
    path: popupsData.zksync.path,
    bg: popupsData.zksync.theme.button.bg,
    text: popupsData.zksync.theme.button.text,
    position: [8, 14],
    balance: Big(0),
    totalUsd: Big(0),
  },
  {
    chainId: popupsData.mantle.chainId,
    icon: popupsData.mantle.icon,
    path: popupsData.mantle.path,
    bg: popupsData.mantle.theme.button.bg,
    text: popupsData.mantle.theme.button.text,
    position: [8, 17],
    balance: Big(0),
    totalUsd: Big(0),
  },
  {
    chainId: popupsData.arbitrum.chainId,
    icon: popupsData.arbitrum.icon,
    path: popupsData.arbitrum.path,
    bg: popupsData.arbitrum.theme.button.bg,
    text: popupsData.arbitrum.theme.button.text,
    position: [9, 11],
    balance: Big(0),
    totalUsd: Big(0),
  },
  {
    chainId: popupsData.gnosis.chainId,
    icon: popupsData.gnosis.icon,
    path: popupsData.gnosis.path,
    bg: popupsData.gnosis.theme.button.bg,
    text: popupsData.gnosis.theme.button.text,
    position: [10, 9],
    balance: Big(0),
    totalUsd: Big(0),
  },
  {
    chainId: popupsData.polygon.chainId,
    icon: popupsData.polygon.icon,
    path: popupsData.polygon.path,
    bg: popupsData.polygon.theme.button.bg,
    text: popupsData.polygon.theme.button.text,
    position: [10, 15],
    balance: Big(0),
    totalUsd: Big(0),
  },
  {
    chainId: popupsData.base.chainId,
    icon: popupsData.base.icon,
    path: popupsData.base.path,
    bg: popupsData.base.theme.button.bg,
    text: popupsData.base.theme.button.text,
    position: [11, 7],
    balance: Big(0),
    totalUsd: Big(0),
  },
  {
    chainId: popupsData.manta.chainId,
    icon: popupsData.manta.icon,
    path: popupsData.manta.path,
    bg: popupsData.manta.theme.button.bg,
    text: popupsData.manta.theme.button.text,
    position: [11, 13],
    balance: Big(0),
    totalUsd: Big(0),
  },
  {
    chainId: popupsData.linea.chainId,
    icon: popupsData.linea.icon,
    path: popupsData.linea.path,
    bg: popupsData.linea.theme.button.bg,
    text: popupsData.linea.theme.button.text,
    position: [12, 9],
    balance: Big(0),
    totalUsd: Big(0),
  },
  {
    chainId: popupsData.avalanche.chainId,
    icon: popupsData.avalanche.icon,
    path: popupsData.avalanche.path,
    bg: popupsData.avalanche.theme.button.bg,
    text: popupsData.avalanche.theme.button.text,
    position: [12, 12],
    balance: Big(0),
    totalUsd: Big(0),
  },
  {
    chainId: popupsData.optimism.chainId,
    icon: popupsData.optimism.icon,
    path: popupsData.optimism.path,
    bg: popupsData.optimism.theme.button.bg,
    text: popupsData.optimism.theme.button.text,
    position: [12, 17],
    balance: Big(0),
    totalUsd: Big(0),
  },
  {
    chainId: popupsData.bnb.chainId,
    icon: popupsData.bnb.icon,
    path: popupsData.bnb.path,
    bg: popupsData.bnb.theme.button.bg,
    text: popupsData.bnb.theme.button.text,
    position: [10, 18],
    balance: Big(0),
    totalUsd: Big(0),
  },
];

const GridChains = () => {
  const chains = useChainsStore((store: any) => store.chains);

  const { loading, networks } = useTokens({ networkList: chains });
  const { loading: dappsLoading, dappsByChain } = useDapps();

  const [visible, setVisible] = useState(false);
  const [network, setNetwork] = useState<GridChain | undefined>();

  const handleNetwork = (chain: GridChain) => {
    setNetwork(chain);
    setVisible(true);
  };

  const chainList = useMemo(() => {
    const _chainList: GridChain[] = [];
    ChainList.forEach((item) => {
      for (const chain of chains) {
        if (item.chainId === chain.chain_id) {
          const obj = {
            ...item,
            name: chain.name,
            logo: chain.logo,
            id: chain.id,
            native_currency: chain.native_currency,
          };
          const walletNetwork = networks.find((it: any) => it.id === item.chainId);
          if (walletNetwork) {
            obj.balance = walletNetwork.usd;
          }
          const walletDappNetwork = dappsByChain.find((it: any) => it.chainId === chain.chain_id);
          if (walletDappNetwork) {
            obj.totalUsd = walletDappNetwork.totalUsdValue;
          }
          _chainList.push(obj);
          break;
        }
      }
    });
    return _chainList;
  }, [chains, networks, dappsByChain]);

  const checkImage = useCallback((row: number, col: number) => {
    return chainList.some((it) => it.position[0] - 1 === row && it.position[1] - 1 === col);
  }, [chainList]);

  return (
    <StyledContainer>
      <StyledMaskTop />
      <StyledInner>
        <StyledMaskLeft />
        <StyledMaskRight />
        <StyledMaskBottom />
        <StyledGrid>
          {
            [...Array(Rows)].map((_, row) => (
              <StyledGridRow key={row}>
                {
                  [...new Array(Cols)].map((_, col) => (
                    <StyledGridCell
                      key={`${row}-${col}`}
                      $size={CellSize}
                      $row={row}
                      variants={{
                        hover: {
                          background: chainList[random(0, chainList.length - 1)]?.bg,
                          transition: {
                            delay: 0,
                          },
                        },
                        default: {
                          background: '#000000',
                        },
                      }}
                      whileHover={checkImage(row, col) ? 'default' : 'hover'}
                      initial="default"
                      transition={{
                        delay: 0.3,
                        duration: 0.6,
                      }}
                    >
                      {
                        chainList.map((chain) => {
                          if (chain.position[0] - 1 === row && chain.position[1] - 1 === col) {
                            return SupportedChains.some((support) => support.chainId === chain.chainId) ? (
                              <GridChainBalance balance={chain.balance}>
                                <LazyImage
                                  containerClassName="cell-image"
                                  key={chain.chainId}
                                  src={chain.logo}
                                  alt=""
                                  width={CellSize}
                                  height={CellSize}
                                  variants={{
                                    hover: {
                                      opacity: 1,
                                      y: -10,
                                      x: -5,
                                      filter: 'drop-shadow(0 10px 30px rgba(4, 105, 255, 0.50))',
                                      transition: { type: 'spring', stiffness: 200, damping: 15, duration: 1 },
                                    },
                                    default: {
                                      opacity: 0.5,
                                      y: 0,
                                      x: 0,
                                      filter: 'unset',
                                    },
                                  }}
                                  whileHover="hover"
                                  initial="default"
                                  onClick={() => handleNetwork(chain)}
                                />
                              </GridChainBalance>
                            ) : (
                              <LazyImage
                                containerClassName="cell-image"
                                key={chain.chainId}
                                src={chain.logo}
                                alt=""
                                width={CellSize}
                                height={CellSize}
                                variants={{
                                  hover: {
                                    opacity: 1,
                                  },
                                  default: {
                                    opacity: 0.5,
                                  },
                                }}
                                whileHover="hover"
                                initial="default"
                                onClick={() => handleNetwork(chain)}
                              />
                            );
                          }
                          return null;
                        })
                      }
                    </StyledGridCell>
                  ))
                }
              </StyledGridRow>
            ))
          }
        </StyledGrid>
        <StyledTitle>
          <Title />
        </StyledTitle>
        <StyledTitleSub>
          Track and manage your assets across L2s in one place.
        </StyledTitleSub>
      </StyledInner>
      <GridChainDetail
        network={network}
        visible={visible}
        onClose={() => {
          setVisible(false);
          setNetwork(undefined);
        }}
        loading={loading}
      />
    </StyledContainer>
  );
};

export default GridChains;

export interface GridChain {
  id: number;
  chainId: number;
  name: string;
  icon: string;
  logo: string;
  // [row, col]
  position: [number, number];
  balance: Big.Big;
  totalUsd: Big.Big;
  bg: string;
  text: string;
  path: string;
  native_currency: string;
}
