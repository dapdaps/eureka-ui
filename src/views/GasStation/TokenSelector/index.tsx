import { useCallback, useEffect,useRef, useState } from 'react';
import styled from 'styled-components';

import type { Token } from '@/types';

import TokenPanel from './TokenPanel'

const Container = styled.div`

`

const Title = styled.div`
    color: rgba(151, 154, 190, 1);
    font-size: 14px;
    font-weight: 500;
    line-height: 16.56px;
`

const TokenContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-top: 10px;
`

interface Props {
    selectedToken: Token | undefined;
    tokenList: Token[];
    chainTokenList: Token[];
    balances: any;
    onTokenChoose: (token: Token) => void;
}

export default function TokenSeletor({ tokenList, balances, chainTokenList, selectedToken, onTokenChoose }: Props) {
    const [filterBalance, setFilterBalance] = useState<any>({})

    useEffect(() => {
        if (chainTokenList && chainTokenList.length && balances) {
            const _balances: any = {}
            tokenList.forEach(token => {
                const filterTokens = chainTokenList.filter(_token => _token.symbol === token.symbol)
                if (filterTokens && filterTokens.length) {
                    const filterToken = filterTokens[0]
                    if (filterToken.isNative) {
                        _balances[filterToken.symbol] = balances['native']
                        return
                    }

                    _balances[filterToken.symbol] = balances[filterToken.address]
                }
            })

            setFilterBalance(_balances)
        } else {
            setFilterBalance({})
        }

    }, [chainTokenList, balances, tokenList])

    return <Container>
        <Title>Source Token</Title>
        <TokenContainer>
            {
                tokenList.map(token => {
                    return <TokenPanel
                        active={selectedToken?.symbol === token.symbol}
                        balance={filterBalance[token.symbol]}
                        token={token}
                        key={token.symbol} 
                        onTokenChoose={onTokenChoose}
                        />
                })
            }
        </TokenContainer>
    </Container>
}