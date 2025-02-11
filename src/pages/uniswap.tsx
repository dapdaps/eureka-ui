import { useSetChain } from '@web3-onboard/react';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useEthersProviderContext } from '@/data/web3';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const TopContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  .top-login {
    display: flex;
    .top-login-Source {
      align-items: center;
      background: rgba(45, 50, 71, 1);
      border-radius: 12px;
      padding: 10px 12px;
      display: flex;
      color: #fff;
      margin-right: 20px;
      font-size: 14px;
      cursor: pointer;
      img {
        margin-right: 4px;
      }
    }
    .top-login-select {
      margin-right: 16px;
      background: rgba(21, 22, 23, 1);
      border-radius: 12px;
      padding: 4px;
      display: flex;
      cursor: pointer;
      position: relative;

      .select-item-wrapper {
        display: flex;
        align-items: center;
        gap: 6px;
        cursor: pointer;
      }
      .selsect-item-img {
        width: 32px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        border-radius: 8px;
        margin-right: 8px;
      }
      .selsect-item-icon {
        margin-right: 12px;
        height: 32px;
        line-height: 32px;
      }
      .login-select-popup {
        position: absolute;
        top: 50px;
        left: -178px;
        background: rgba(45, 50, 71, 1);
        border-radius: 12px;
        padding: 12px;
        width: 249px;
        .select-popups-item {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px;
          border-radius: 8px;
          .flex-grow {
            flex-grow: 1;
          }
          .popup-item-img {
            width: 32px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            border-radius: 8px;
            margin-right: 8px;
          }
          .popups-item-text {
            font-size: 14px;
            font-weight: 400;
            color: #fff;
          }
        }
        .select-popups-item:hover {
          background: rgba(31, 35, 53, 0.5);
        }
        .selected {
          background: rgba(31, 35, 53, 0.5);
        }
      }
    }
    .top-login-button {
      font-family: Gantari;
      font-size: 16px;
      line-height: 19px;
      color: #fff;
      background: rgba(121, 79, 221, 1);
      padding: 10px 16px;
      border-radius: 16px;
      cursor: pointer;
    }
  }
`;

const logoUrl = '/assets/images/bafkreihjoszjyw5ebgi2uur7jbkykdowwixexlk5oy24y24mu2q3a45qkq.svg';

const narrowUrl = '/assets/images/bafkreien4qagdjuudb6yj53wutsj4f6zfodrgv4ztftzjgkvcdtjnjk564.svg';

const sourceIcon = '/assets/images/bafkreihz27oqiw4djztfrsvmjnxcv7zfgiztdqzlkpo5jdejxpt2nybu54.svg';

const checkMark = '/assets/images/bafkreibrxtpffmzoe46yg3qbt3pivpukf5ne4zra73g6blxofkpowlmupm.svg';

const formateAddress = (address: string) => {
  if (address.indexOf('.near') > -1) return address;

  return address.slice(0, 6) + '...' + address.slice(-6);
};

const popupsData = [
  {
    icon: '/assets/images/bafkreib2xwrmfnnwcuvtuixlucdlrdwaltjthvc7uspsmjt4nfnlnes364.svg',
    bgColor: '#353E63',
    text: 'Ethereum',
    chainId: 1,
    rpcUrl: 'https://rpc.ankr.com/eth',
    token: 'ETH',
    blockExplorerUrls: ['https://etherscan.io/']
  },
  {
    icon: '/assets/images/bafkreigqoy6czilxyuo3hkdfbayvwfxvf6qz67wiiom5laidqpb3f4eh2y.svg',
    bgColor: '#284A6C',
    text: 'Arbitrum',
    chainId: 42161,
    token: 'ETH',

    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    blockExplorerUrls: ['https://arbiscan.io/']
  },
  {
    icon: '/assets/images/bafkreicu6zq3j22j5626ymafngaeqdzpo72w3nt2tgkebmbpoylc7y2bjy.svg',
    bgColor: '#57392F',
    text: 'Optimism',
    chainId: 10,
    token: 'ETH',

    rpcUrl: 'https://rpc.ankr.com/optimism',
    blockExplorerUrls: ['https://optimistic.etherscan.io/']
  },
  {
    icon: '/assets/images/bafkreifdzdcxsmntauvxdejkewxoyqns3xbmsvgappnef3fcxxpbjfq5pq.svg',
    bgColor: '#442D66',
    text: 'Polygon',
    chainId: 137,
    rpcUrl: 'https://rpc.ankr.com/polygon',
    token: 'MATIC',
    blockExplorerUrls: ['https://polygonscan.com/']
  },
  {
    icon: '/assets/images/bafkreidnp2h5uuix552e2nh4ynbcxlgv4n4bvxiite7u3cles5f6dkacfm.svg',
    bgColor: '#24376B',
    text: 'Base',
    chainId: 8453,
    rpcUrl: 'https://mainnet.base.org',

    blockExplorerUrls: ['https://explorer.baseprotocol.org/']
  },
  {
    icon: '/assets/images/bafkreiah7oxcpgdrnmfgpzbozwgvivvr26cqwzlfy6yjpm5qtzjjc2tvvu.svg',
    bgColor: '#554D42',
    text: 'BNB Chain',
    chainId: 56,
    rpcUrl: 'https://bsc.publicnode.com',
    blockExplorerUrls: ['https://bscscan.com/'],
    token: 'BNB'
  },

  {
    icon: '/assets/images/bafkreieredwbwk6u7coh3iarekx2p2zlvbkq6twkktrtfcb3l3r7j2du2e.svg',
    bgColor: '#565B49',
    text: 'Celo',
    chainId: 42220,
    rpcUrl: 'https://rpc.ankr.com/celo',
    token: 'CELO',
    blockExplorerUrls: ['https://explorer.celo.org/mainnet/']
  },

  {
    icon: '/assets/images/bafkreiatkfaofvotv3zftmsjiveu2drdkzcyosdzhijynglo57ch35nwji.png',
    bgColor: 'rgb(83,55,72)',
    text: 'Avalanche',
    chainId: 43114,
    rpcUrl: 'https://rpc.ankr.com/avalanche',
    token: 'AVAX',
    blockExplorerUrls: ['https://snowtrace.io/']
  }
];

const TopContentComponent = () => {
  const [isSelectItemClicked, setIsSelectItemClicked] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(0);

  const handleSelectItemClick = () => {
    setIsSelectItemClicked(!isSelectItemClicked);
  };

  const [sender, setSender] = useState<string>('');

  const ethersProviderContext = useEthersProviderContext();

  const { provider, useConnectWallet } = ethersProviderContext;

  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  const [
    {
      chains, // the list of chains that web3-onboard was initialized with
      connectedChain, // the current chain the user's wallet is connected to
      settingChain // boolean indicating if the chain is in the process of being set
    },
    setChain // function to call to initiate user to switch chains in their wallet
  ] = useSetChain();

  useEffect(() => {
    if (!wallet || !provider) return;

    const etherProvider = new ethers.providers.Web3Provider(window.ethereum);

    etherProvider.send('eth_requestAccounts', []).then((accounts) => {
      const currentAccount = accounts[0];
      const originalCaseAddress = ethers.utils.getAddress(currentAccount);

      setSender(originalCaseAddress.toString());
    });
  }, [wallet, provider]);

  const handleItemClick = ({ index, chainId }: { index: number; chainId: number }) => {
    if (!popupsData || !popupsData[index]) {
      console.error('Invalid index or popupsData is undefined');
      return;
    }

    const etherProvider = new ethers.providers.Web3Provider(window.ethereum);

    etherProvider
      .send('wallet_switchEthereumChain', [{ chainId: `0x${Number(chainId).toString(16)}` }])
      .catch((err) => {
        const chain = {
          chainId: `0x${Number(chainId).toString(16)}`,
          chainName: popupsData[index].text,
          nativeCurrency: popupsData[index].token
            ? { name: popupsData[index].token, symbol: popupsData[index].token, decimals: 18 }
            : {
                name: 'Ethereum',
                symbol: 'ETH',
                decimals: 18
              },
          rpcUrls: [popupsData[index].rpcUrl],
          blockExplorerUrls: popupsData[index].blockExplorerUrls
        };

        if (err.code === 4902) {
          etherProvider.send('wallet_addEthereumChain', [chain]);
        }
      });

    setSelectedItem(index);
    setIsSelectItemClicked(false);
  };

  useEffect(() => {
    if (connectedChain) {
      const findSelectedIndex = popupsData.findIndex((item) => item.chainId === eval(connectedChain.id));

      if (findSelectedIndex === -1) return;

      setSelectedItem(findSelectedIndex);
    }
  }, [connectedChain]);

  return (
    <TopContent>
      <div className="top-logo">
        <img src={logoUrl} alt="" />
      </div>
      <div className="top-login">
        <div
          className="top-login-Source"
          onClick={() => {
            window.open(
              'https://near.org/near/widget/ComponentDetailsPage?src=dapdapbos.near/widget/Uniswap.Swap.Dex&tab=source',
              '_blank'
            );
          }}
        >
          <img src={sourceIcon} alt="" />
          View Code
        </div>
        <div className="top-login-select">
          <div className="select-item-wrapper" onClick={handleSelectItemClick}>
            <div
              className="selsect-item-img"
              style={{
                backgroundColor: selectedItem !== null ? popupsData[selectedItem].bgColor : 'transparent'
              }}
            >
              {selectedItem !== null && <img src={popupsData[selectedItem].icon} alt="" />}
            </div>
            <div className="selsect-item-icon">
              <img
                style={{ transform: isSelectItemClicked ? 'rotate(180deg)' : 'rotate(0deg)' }}
                src={narrowUrl}
                alt=""
              />
            </div>
          </div>

          {isSelectItemClicked && (
            <div className="login-select-popup">
              {popupsData.map((item, index) => (
                <div
                  className={`select-popups-item ${selectedItem === index ? 'selected' : ''}`}
                  key={index}
                  onClick={() => handleItemClick({ index, chainId: item.chainId })}
                >
                  <div className="popup-item-img" style={{ backgroundColor: item.bgColor }}>
                    <img src={item.icon} alt="" />
                  </div>
                  <div className="popups-item-text">{item.text}</div>
                  <div className="flex-grow"></div>
                  {selectedItem === index && (
                    <div className="check-mark">
                      <img src={checkMark} alt="check-mark" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div
          className="top-login-button"
          onClick={() => {
            connect();
          }}
        >
          {sender ? formateAddress(sender) : 'Connect'}
        </div>
      </div>
    </TopContent>
  );
};
const Uniswap: NextPageWithLayout = () => {
  const [
    {
      chains, // the list of chains that web3-onboard was initialized with
      connectedChain, // the current chain the user's wallet is connected to
      settingChain // boolean indicating if the chain is in the process of being set
    },
    setChain // function to call to initiate user to switch chains in their wallet
  ] = useSetChain();

  return (
    <>
      <TopContentComponent />
      <ComponentWrapperPage
        componentProps={{
          chainId: connectedChain ? eval(connectedChain.id) : 1
        }}
        src={'dapdapbos.near/widget/Uniswap.Swap.Dex'}
      />
    </>
  );
};

Uniswap.getLayout = useDefaultLayout;

export default Uniswap;
