import { useDebounceFn } from 'ahooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom'
import styled from 'styled-components';

import useTokenBalance from '@/hooks/useTokenBalance';

import TokenRow from './TokenRow';

const Container = styled.div`
   position: absolute;
   left: 0;
   top: 0;
   right: 0;
   bottom: 0;
   background-color: rgba(38, 40, 54, 1);
    /* border: 1px solid rgba(55, 58, 83, 1); */
    border-radius: 16px;
   

`

const CloseIcon = styled.div`
    position: absolute;
    width: 12px;
    height: 12px;
    right: 20px;
    top: 20px;
    cursor: pointer;
    color: rgba(151, 154, 190, 1);
`

const Header = styled.div`
    font-size: 18px;
    font-weight: 700;
    line-height: 21.6px;
    color: rgba(255, 255, 255, 1);
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    padding: 20px;
`

const ChainList = styled.div`
    display: flex;
    gap: 15px;
    align-items: center;
    padding: 0 20px 20px;
    .chain {
        width: 58px;
        height: 58px;
        border-radius: 12px;
        border: 1px solid rgba(55, 58, 83, 1);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &.active {
            border: 1px solid rgba(252, 196, 44, 1);
        }
        img {
            width: 38px;
            height: 38px;
        }
    }
`

const TokenList = styled.div`
    border-top: 1px solid rgba(151, 154, 190, .1);
`

export const ChainTokens = ({
    chain,
    token,
    chains,
    tokens,
    onChainTokenChange,
    onClose,
}: {
    chain: any,
    token: any,
    chains: any,
    tokens: any,
    onChainTokenChange: (chainId: any, token: any) => void
    onClose: () => void
}) => {
    const [tokenList, setTokenList] = useState<any>([])

    useEffect(() => {
        if (chain && tokenList.length === 0) {
            const tokenList = tokens[chain.chainId as number]
            setTokenList(tokenList)
        }
    }, [])

    return <Container>
        <CloseIcon onClick={() => {
            onClose()
        }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.73284 6.00004L11.7359 1.99701C12.0368 1.696 12.0882 1.2593 11.8507 1.0219L10.9779 0.14909C10.7404 -0.0884124 10.3043 -0.0363122 10.0028 0.264491L6.00013 4.26743L1.99719 0.264591C1.69619 -0.036712 1.25948 -0.0884125 1.02198 0.14939L0.149174 1.0223C-0.0882277 1.2594 -0.0368271 1.6961 0.264576 1.99711L4.26761 6.00004L0.264576 10.0033C-0.0363271 10.3041 -0.0884277 10.7405 0.149174 10.978L1.02198 11.8509C1.25948 12.0884 1.69619 12.0369 1.99719 11.736L6.00033 7.73276L10.0029 11.7354C10.3044 12.037 10.7405 12.0884 10.978 11.8509L11.8508 10.978C12.0882 10.7405 12.0368 10.3041 11.736 10.0029L7.73284 6.00004Z" fill="#979ABE" />
            </svg>
        </CloseIcon>
        <Header onClick={() => {
            onClose()
        }}>
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 1L2 6L6 11" stroke="white" stroke-width="2" stroke-linecap="round" />
            </svg>
            <span>Select a token</span>
        </Header>
        <ChainList>
            {
                chains.map((item: any) => {
                    return <div
                        key={item.chainId}
                        className={"chain" + (chain?.chainId === item.chainId ? ' active' : '')}
                        onClick={() => {
                            const tokenList = tokens[item.chainId as number]
                            setTokenList(tokenList)
                            onChainTokenChange(item, tokenList[0])
                        }}
                    >
                        <img src={item.icon} />
                    </div>
                })
            }
        </ChainList>
        {
            chains.map((item: any) => {
                if (item.chainId !== chain?.chainId) {
                    return null
                }
                return <TokenList key={item.chainId} >
                    {
                        tokens[item.chainId as number]?.map((tokenItem: any) => {
                            return <TokenRow onClick={() => {
                                onClose && onClose()
                            }} key={tokenItem.symbol} chain={item} token={token} tokenItem={tokenItem}></TokenRow>
                        })
                    }
                </TokenList>
            })
        }
    </Container>

};

export default ChainTokens;
