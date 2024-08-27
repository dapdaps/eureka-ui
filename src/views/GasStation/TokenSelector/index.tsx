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
    balances: any;
    onTokenChoose: (token: Token) => void;
}

export default function TokenSeletor({ tokenList, balances, selectedToken, onTokenChoose }: Props) {
    const [filterBalance, setFilterBalance] = useState<any>({})

    useEffect(() => {
        if (tokenList && tokenList.length && balances) {
            const _balances: any = {}
            tokenList.forEach(token => {
                if (token.isNative) {
                    _balances[token.symbol] = balances['native']
                    return
                }

                _balances[token.symbol] = balances[token.address]
            })

            setFilterBalance(_balances)
        } 

    }, [balances, tokenList])

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