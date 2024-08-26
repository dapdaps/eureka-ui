import { useDebounce } from 'ahooks';
import { chain } from 'lodash';
import { forwardRef, memo,useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import useTokensBalance from '@/components/BridgeX/hooks/useTokensBalance';
import { usePriceStore } from '@/stores/price';
import type { Chain, Token } from '@/types';

import { ArrowDown } from '../Arrow';
import Modal from '../launch-modal';
import Image from './Image';
import TokenRow from './Token';

const Container = styled.div`
  display: flex;
  max-height: 500px;
`;

const ChainWapper = styled.div`
  width: 85px;
  border-right: 1px solid rgba(55, 58, 83, 1);
  padding: 20px 0 20px 0;
  max-height: 100%;
  min-height: 100px;

  .chain-tip {
    position: absolute;
    left: 0;
    top: 0;
    height: 50px;
    line-height: 50px;
    left: 70px;
    display: flex;
    align-items: center;
    z-index: 12;
    color: #fff;
    background-color: rgba(49, 51, 70, 1);
    border-radius: 0 12px 12px 0;
    border: 1px solid rgba(55, 58, 83, 1);
    border-left: 0;
    padding: 0 17px 0 10px;
    box-shadow: 10px 0px 15px 2px rgba(0, 0, 0, 0.3);
  }

  .chain-list {
    height: calc(100% - 20px);
    overflow-y: auto;
    padding-left: 20px;
    /* overflow-x: hidden; */
    margin-top: 5px;
    .chain {
      width: 50px;
      height: 50px;
      border-radius: 12px;
      border: 1px solid rgba(55, 58, 83, 1);
      cursor: pointer;
      margin-top: 8px;
      position: relative;
      .img {
        width: 32px;
        height: 32px;
        margin: 9px 0 0 9px;
      }
      &.active {
        border: 1px solid rgba(252, 196, 44, 1);
        background-color: rgba(252, 196, 44, 0.1);
      }
      .detail {
        display: none;
      }
      &:hover {
        /* .detail {
                    display: block;
                    height: 100%;
                    line-height: 50px;
                    background-color: red;
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 500px;
               } */
        background-color: rgba(49, 51, 70, 1);

        border-radius: 12px 0 0 12px;
        border: 1px solid rgba(55, 58, 83, 1);
        border-right: 0;
        box-shadow: 0px 0px 15px 2px rgba(0, 0, 0, 0.3);
      }
    }
  }
`;

const TokenWapper = styled.div`
  flex: 1;
  .ctg-wapper {
    height: calc(100% - 120px);
    overflow: auto;
  }
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
  line-height: 21.6px;
  color: rgba(255, 255, 255, 1);
`;

const TokenTop = styled.div`
  padding: 20px;
  .input-wapper {
    height: 36px;
    display: flex;
    align-items: center;
    border: 1px solid rgba(55, 58, 83, 1);
    border-radius: 8px;
    background-color: rgba(27, 30, 39, 1);
    padding: 0 10px;
    margin-top: 10px;
    .icon {
    }
    .input {
      color: #fff;
      flex: 1;
      margin-left: 5px;
      font-size: 14px;
      &::placeholder {
        color: rgba(255, 255, 255, 0.2);
      }
    }
  }
`;

const TokenList = styled.div`
  /* height: calc(100% - 120px);
    overflow: auto; */
`;

const ChainGroup = styled.div`
  .cur-chian {
    display: flex;
    align-items: center;
    color: #fff;
    gap: 10px;
    font-size: 14px;
    font-weight: 600;
    padding-left: 20px;
    margin-top: 10px;
    &.cc-selected {
      justify-content: space-between;
      padding-right: 10px;
    }
    &.can-click-chain {
      cursor: pointer;
    }
    .img {
      width: 32px;
      height: 32px;
    }
    .chain-selected {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
  .ct-title {
    font-size: 14px;
    font-weight: 400;
    line-height: 16.8px;
    color: rgba(151, 154, 190, 1);
    padding: 10px 20px;
  }
`;

interface Props {
  onClose?: () => void;
  chainList: Chain[];
  chainToken: any;
  currentChain: Chain | undefined;
  currentToken: Token | undefined;
  onChainChange: (chain: Chain) => void;
  onTokenChange: (token: Token) => void;
}

const TokenListComp = forwardRef(function TokenListComp(
  {
    chain,
    chainToken,
    currentToken,
    groupId,
    searchTxt,
    filterChain,
    searchAll,
    onChainChange,
    onTokenChange,
    onClose,
    onTempChainChange,
  }: {
    chain: Chain;
    chainToken: any;
    groupId: string;
    filterChain: Chain[] | null;
    currentToken: Token | undefined;
    onChainChange: (chain: Chain) => void;
    onTokenChange: (token: Token) => void;
    onClose?: () => void;
    searchTxt: string;
    searchAll: boolean;
    onTempChainChange: (chain: Chain) => void;
  },
  ref: any,
) {
  const displayChainId = searchAll && filterChain && filterChain.length ? filterChain[0].chainId : chain.chainId;

  const disPlayChain = searchAll && filterChain && filterChain.length ? filterChain[0] : chain;

  const { loading, balances, currentChainId } = useTokensBalance(chainToken[displayChainId]);

  return (
    <ChainGroup>
      {
        <>
          <div className="ct-title" id={`${groupId}-${chain.chainId}`}>
            Chain
          </div>
          <div className="cur-chian cc-selected" style={{ marginTop: 0 }}>
            <div className="chain-selected">
              <Image cls="img" src={chain.icon} />
              <div>{chain.chainName}</div>
            </div>
            <div style={{ justifySelf: 'end' }}>
              <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 4.80952L4.78125 9L12 1" stroke="#EBF479" stroke-width="2" stroke-linecap="round" />
              </svg>
            </div>
          </div>
          {filterChain?.map((item) => {
            if (item.chainId === chain.chainId) {
              return;
            }
            return (
              <div
                onClick={() => {
                  onTempChainChange(item);
                }}
                key={item.chainId}
                className="cur-chian can-click-chain"
              >
                <Image cls="img" src={item.icon} />
                <div>{item.chainName}</div>
              </div>
            );
          })}
          <div className="ct-title" style={{ paddingBottom: 0, paddingTop: 20 }}>
            Token
          </div>
        </>
      }

      <TokenList key={displayChainId}>
        {chainToken[displayChainId] &&
          chainToken[displayChainId]
            .sort((a: any, b: any) => {
              if (Object.keys(balances).length === 0) {
                return 0;
              }

              const aAddress = a.isNative ? 'native' : a.address;
              const bAddress = b.isNative ? 'native' : b.address;

              const aNumber = Number(balances[aAddress] || 0);
              const bNumber = Number(balances[bAddress] || 0);

              return bNumber - aNumber;
            })
            .map((token: Token) => {
              return (
                <TokenRow
                  isSelected={currentToken?.symbol === token.symbol && !searchAll}
                  key={token.symbol + token.address}
                  token={token}
                  loading={loading}
                  balances={balances}
                  chain={disPlayChain as Chain}
                  onTokenChange={(token: Token) => {
                    onChainChange(disPlayChain);
                    onTokenChange(token);
                    onClose && onClose();
                  }}
                />
              );
            })}
      </TokenList>
    </ChainGroup>
  );
});

function TokenSelectModal({
  onClose,
  chainList,
  chainToken,
  currentChain,
  currentToken,
  onChainChange,
  onTokenChange,
}: Props) {
  const [tempChain, setTempChain] = useState(currentChain);
  const [searchVal, setSearchVal] = useState('');
  const [sortedChainList, setSortedChainList] = useState<Chain[]>([]);
  const [hoverChain, setHoverChain] = useState<Chain | null>(null);
  const [tipTop, setTipTop] = useState(0);
  const [idSuffix, setIdSuffix] = useState(Date.now() + '');
  const [filterChainVal, setFilterChainVal] = useState();
  const [filterChain, setSearchedChain] = useState<Chain[] | null>([]);
  const [searchAll, setSearchAll] = useState(false);
  const wapperRef = useRef<any>();

  const inputValue = useDebounce(searchVal, { wait: 500 });

  useEffect(() => {
    if (chainList) {
      const all = chainList.map((item) => item);
      const top3 = all.splice(0, 3);

      const _sortedChainList = all.sort((a, b) => {
        return a.chainName.localeCompare(b.chainName);
      });
      const _all = top3.concat(_sortedChainList);
      setSortedChainList(_all);
    }
  }, [chainList]);

  useEffect(() => {
    if (inputValue) {
      const lowerVal = inputValue.trim().toLowerCase();
      const filterChainToken: any = {};
      const [keyChainName, tokenSymbol] = lowerVal.split(':');
      if (keyChainName && tokenSymbol) {
        const filterChain = chainList.filter((chain) => chain.chainName.toLowerCase().indexOf(keyChainName) > -1);
        if (filterChain && filterChain.length) {
          filterChain.forEach((chain) => {
            const tokenList = chainToken[chain.chainId];
            const filterList = tokenList.filter((token: Token) => {
              return (
                token.symbol.toLowerCase().indexOf(tokenSymbol) > -1 || token.address.toLowerCase() === tokenSymbol
              );
            });
            if (filterList && filterList.length) {
              filterChainToken[chain.chainId] = filterList;
              setSearchAll(true);
              setSearchedChain(filterChain);
            }
          });
        }
        // setSearchAll(true)
        // setSearchedChain([])
      } else {
        const filterChain = chainList.filter((item: Chain) => {
          return item.chainName.toLowerCase().indexOf(lowerVal) > -1;
        });

        setSearchedChain(filterChain);

        Object.keys(chainToken).forEach((key) => {
          const tokenList = chainToken[key];
          const filterList = tokenList.filter((token: Token) => {
            return token.symbol.toLowerCase().indexOf(lowerVal) > -1 || token.address.toLowerCase() === lowerVal;
          });

          if (filterList && filterList.length > 0) {
            filterChainToken[key] = filterList;
          }
        });
        setSearchAll(false);
      }
      setFilterChainVal(filterChainToken);
    } else {
      setFilterChainVal(chainToken);
      setSearchedChain([]);
      setSearchAll(false);
    }
  }, [chainList, inputValue, chainToken]);

  useEffect(() => {
    if (currentChain && idSuffix) {
      setTimeout(() => {
        const ele = document.getElementById(`${idSuffix}-${currentChain.chainId}`);
        if (ele) {
          ele.scrollIntoView();
        }
      }, 500);
    }
  }, [idSuffix, currentChain]);

  return (
    <Modal ref={wapperRef}>
      <Container>
        <ChainWapper>
          <Title style={{ paddingLeft: 20 }}>Chain</Title>
          {hoverChain && (
            <div style={{ top: tipTop }} className="chain-tip">
              <div>{hoverChain.chainName}</div>
            </div>
          )}
          <div
            className="chain-list"
            onScroll={() => {
              setHoverChain(null);
            }}
          >
            {sortedChainList?.map((chain) => {
              return (
                <div
                  key={chain.chainId}
                  id={`${idSuffix}-${chain.chainId}-p`}
                  onClick={() => {
                    setTempChain(chain);
                    const ele = document.getElementById(`${idSuffix}-${chain.chainId}`);
                    if (ele) {
                      ele.scrollIntoView();
                    }
                  }}
                  onMouseEnter={(e) => {
                    setHoverChain(chain);
                    let ele: any = e.target;
                    if (ele.tagName.toUpperCase() !== 'DIV') {
                      ele = ele.parentNode;
                    }
                    const wapperSize = wapperRef.current.getBoundingClientRect();
                    const chainSize = ele.getBoundingClientRect();
                    const top = chainSize.top - wapperSize.top;
                    setTipTop(top - 1);
                  }}
                  onMouseLeave={() => {
                    setHoverChain(null);
                  }}
                  className={`chain ${tempChain?.chainId === chain.chainId ? 'active' : ''}`}
                >
                  <Image cls="img" src={chain.icon} />
                </div>
              );
            })}
          </div>
        </ChainWapper>
        <TokenWapper>
          <TokenTop>
            <Title>Select a token</Title>
            <div className="input-wapper">
              <div className="icon">
                <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="7.01829" cy="7.01829" r="6.01829" stroke="#3D4159" stroke-width="2" />
                  <rect
                    x="14.9141"
                    y="9.64978"
                    width="6.141"
                    height="2.63186"
                    rx="1.31593"
                    transform="rotate(30 14.9141 9.64978)"
                    fill="#3D4159"
                  />
                </svg>
              </div>
              <input
                onChange={(e) => {
                  setSearchVal(e.target.value);
                }}
                value={searchVal}
                className="input"
                placeholder="e.g. ethereum:eth"
              />
            </div>
          </TokenTop>
          <div className="ctg-wapper">
            {sortedChainList.map((chain) => {
              if (chain.chainId !== tempChain?.chainId) {
                return null;
              }

              return (
                <TokenListComp
                  key={chain.chainId}
                  chain={chain}
                  searchAll={searchAll}
                  chainToken={filterChainVal}
                  currentToken={currentToken}
                  groupId={idSuffix}
                  filterChain={filterChain}
                  onChainChange={onChainChange}
                  onTempChainChange={(item) => {
                    setTempChain(item);
                    setTimeout(() => {
                      const ele = document.getElementById(`${idSuffix}-${item.chainId}-p`);
                      if (ele) {
                        ele.scrollIntoView({
                          behavior: 'smooth',
                        });
                      }
                    }, 40);
                    setSearchVal('');
                  }}
                  onTokenChange={onTokenChange}
                  onClose={onClose}
                  searchTxt={inputValue}
                />
              );
            })}
          </div>
        </TokenWapper>
      </Container>
    </Modal>
  );
}

export default memo(TokenSelectModal);
