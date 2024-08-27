import Big from 'big.js'
import { useEffect, useState } from  'react'
import styled from 'styled-components';

const AlertWapper = styled.div`
    width: 446px;
    background: rgba(235, 244, 121, .1);
    display: flex;
    align-items: start;
    padding: 12px 17px;
    border-radius: 12px;
    margin-top: 16px;
`

const WarnIcon = styled.div`

`

const WarnText = styled.div`
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    color: rgba(235, 244, 121, 1);
    margin-left: 10px;
`

export default function Alert() {
    return <AlertWapper>
    <WarnIcon>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="6" cy="6" r="5.5" stroke="#EBF479" />
            <path d="M6 6L6 9" stroke="#EBF479" stroke-width="1.4" stroke-linecap="round" />
            <circle cx="6" cy="3.75" r="0.75" fill="#EBF479" />
        </svg>
    </WarnIcon>
    <WarnText>
        Warning: Transfers to exchanges that do notu can ignore this warning.
    </WarnText>
</AlertWapper> 
}

