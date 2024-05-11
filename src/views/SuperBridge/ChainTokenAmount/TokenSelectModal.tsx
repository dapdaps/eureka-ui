import { useState, useRef, useCallback, useEffect } from "react";
import styled from 'styled-components';
import { useDebounce } from 'ahooks';

import useTokensBalance from "@/components/BridgeX/hooks/useTokensBalance";
import { ArrowDown } from '../Arrow'
import Modal from "../Modal";
import TokenRow from './Token'

import type { Chain, Token } from '@/types';

const Container = styled.div`
    display: flex;
    max-height: 500px;
`

const ChainWapper = styled.div`
    width: 85px;
    border-right: 1px solid rgba(55, 58, 83, 1);
    padding: 20px 0 20px 20px;
    max-height: 100%;
    min-height: 100px;
    
    .chain-list {
        height: calc(100% - 20px);
        overflow-y: auto;
        margin-top: 5px;
        .chain {
            width: 50px;
            height: 50px;
            border-radius: 12px;
            border: 1px solid rgba(55, 58, 83, 1);
            cursor: pointer;
            margin-top: 8px;
            .img {
                width: 32px;
                height: 32px;
                margin: 9px 0 0 9px;
            }
            &.active {
                border: 1px solid rgba(252, 196, 44, 1);
                background-color: rgba(252, 196, 44, 0.1);
            }
        }
    }
`

const TokenWapper = styled.div`
    flex: 1;
    
`

const Title = styled.div`
    font-size: 18px;
    font-weight: 700;
    line-height: 21.6px;
    color: rgba(255, 255, 255, 1);
`

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
        }
    }
`

const TokenList = styled.div`
    height: calc(100% - 120px);
    overflow: auto;
`

interface Props {
    onClose?: () => void;
    chainList: Chain[];
    chainToken: any;
    currentChain: Chain | undefined;
    currentToken: Token | undefined;
    onChainChange: (chain: Chain) => void;
    onTokenChange: (token: Token) => void;
}

export default function TokenSelectModal({
    onClose,
    chainList,
    chainToken,
    currentChain,
    currentToken,
    onChainChange,
    onTokenChange,
}: Props) {
    const [tokenList, setTokenList] = useState([]);
    const [tempChain, setTempChain] = useState(currentChain)
    const [searchVal, setSearchVal] = useState('')
    const [filterTokenList, setFilterTokenList] = useState([])

    const { loading, balances, currentChainId } = useTokensBalance(filterTokenList)

    const inputValue = useDebounce(searchVal, { wait: 500 });

    useEffect(() => {
        if (!inputValue) {
            setFilterTokenList(tokenList)
            return
        }

        const filterTokenList = tokenList.filter((token: Token) => {
            return token.symbol.toUpperCase().indexOf(inputValue.toUpperCase()) > -1 
            || token.address.indexOf(inputValue) > -1
        })

        setFilterTokenList(filterTokenList || [])
    }, [tokenList, inputValue])

    useEffect(() => {
        if (tempChain && chainToken) {
            const tokenList = chainToken[tempChain.chainId]
            // if (balances && Object.keys(balances).length > 0) {
            //     tokenList.sort((a, b) => balances[a])
            // }
            setTokenList(tokenList)
        }
    }, [tempChain, chainToken, balances])

    return <Modal paddingSize={0} onClose={onClose}>
        <Container>
            <ChainWapper>
                <Title>Chain</Title>
                <div className="chain-list">
                    {
                        chainList?.map(chian => {
                            return <div
                                key={chian.chainId}
                                onClick={() => {
                                    setTempChain(chian)
                                }}
                                className={`chain ${tempChain?.chainId === chian.chainId ? 'active' : ''}`}>
                                <img src={chian.icon} className="img" />
                            </div>
                        })
                    }

                </div>
            </ChainWapper>
            <TokenWapper>
                <TokenTop>
                    <Title>Select a token</Title>
                    <div className="input-wapper">
                        <div className="icon">
                            <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="7.01829" cy="7.01829" r="6.01829" stroke="#3D4159" stroke-width="2" />
                                <rect x="14.9141" y="9.64978" width="6.141" height="2.63186" rx="1.31593" transform="rotate(30 14.9141 9.64978)" fill="#3D4159" />
                            </svg>
                        </div>
                        <input onChange={(e) => {
                            setSearchVal(e.target.value)
                        }} className="input" placeholder="search token or paste address" />
                    </div>
                </TokenTop>
                <TokenList key={tempChain?.chainId}>
                    {
                        filterTokenList?.map((token: Token) => {
                            return <TokenRow
                                isSelected={currentToken?.symbol === token.symbol}
                                key={token.symbol + token.address}
                                token={token}
                                loading={loading}
                                balances={currentChainId === tempChain?.chainId ? balances : {}}
                                chain={tempChain as Chain}
                                onTokenChange={(token: Token) => {
                                    onChainChange(tempChain as Chain)
                                    onTokenChange(token)
                                    onClose && onClose()
                                }}
                            />
                        })
                    }
                </TokenList>
            </TokenWapper>
        </Container>
    </Modal>
}