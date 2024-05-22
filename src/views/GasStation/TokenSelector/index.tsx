import { useState, useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';

import TokenPanel from './TokenPanel'
import type { Token } from '@/types';

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
    tokenList: Token[]
}

export default function TokenSeletor({ tokenList }: Props) {
    return <Container>
        <Title>Source Token</Title>
        <TokenContainer>
            {
                tokenList.map(token => {
                    return <TokenPanel token={token} key={token.symbol} />
                })
            }
        </TokenContainer>
    </Container>
}