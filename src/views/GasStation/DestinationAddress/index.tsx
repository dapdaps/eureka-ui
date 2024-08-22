import { useCallback, useEffect,useRef, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    
`

const AddBtn = styled.div`
    color: rgba(151, 154, 190, 1);
    font-size: 14px;
    font-weight: 500;
    line-height: 16.56px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid rgba(55, 58, 83, 1);
    border-radius: 50px;
    background-color: rgba(46, 49, 66, 1);
    padding: 5px 10px;
    width: 220px;
    .plus {
        width: 17px;
        height: 17px;
        border-radius: 17px;
        background-color: rgba(235, 244, 121, 1);
        text-align: center;
        line-height: 17px;
        color: #000;
    }
    .text {

    }
`


interface Props {
   
}

export default function Amount({  } : Props) {
    return <Container>
        <AddBtn>
            <div className="plus">+</div>
            <div className="text">Add Destination Address</div>
        </AddBtn>

    </Container>
}