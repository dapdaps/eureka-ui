import { useCallback, useEffect,useRef, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    
`

const Title = styled.div`
    color: rgba(151, 154, 190, 1);
    font-size: 14px;
    font-weight: 500;
    line-height: 16.56px;
`

const AmountList = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    margin-top: 10px;
    .amount-item {
        flex: 1;
        height: 44px;
        border: 1px solid rgba(55, 58, 83, 1);
        border-radius: 6px;
        background: linear-gradient(180deg, #4C5273 0%, #292D41 100%);
        text-align: center;
        line-height: 44px;
        color: #fff;
        font-family: Jura;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all .3s;
        &.active {
            border: 1px solid rgba(235, 244, 121, 1);
            background: linear-gradient(180deg, #292D41 0%, #4C5273 100%);
        }
    }
`

const amountList = [10, 20, 50, 100, 200]

interface Props {
    value: number | string | undefined;
    onChange: (v: number) => void;
}

export default function Amount({ value, onChange } : Props) {
    return <Container>
        <Title>Amount</Title>
        <AmountList>
            {
                amountList.map(item => {
                    return <div 
                    onClick={() => {
                        onChange(item)
                    }}  
                    key={item} 
                    className={`${value === item ? 'active' : ''} amount-item`}>${ item }</div>
                })
            }
        </AmountList>
        
    </Container>
}