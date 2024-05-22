import { useState, useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    height: 44px;
    text-align: center;
    line-height: 44px;
    color: rgba(0, 0, 0, 1);
    font-size: 16px;
    border-radius: 10px;
    background-color: rgba(235, 244, 121, 1);
    cursor: pointer;
    margin-top: 40px;
`

export default function SubmitBtn() {
    return <Container>Send</Container>
}
