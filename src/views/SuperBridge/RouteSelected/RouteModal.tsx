import { useState, useRef, useCallback, useEffect } from "react";
import styled from 'styled-components';
import type { QuoteRequest, QuoteResponse, ExecuteRequest } from 'super-bridge-sdk'

import { ArrowDown } from '../Arrow'
import Modal from "../Modal";
import Route from "../Route";
import DotFlashing from '../DotFlashing/'
import type { Chain, Token } from "@/types";

const ListWapper = styled.div`
    &>:not(:first-child) {
        margin-top: 10px;
    }
    height: 500px;
    overflow-y: auto;
`

const KeepLoading = styled.div`
    display: flex;
    justify-content: center;
    font-size: 16px;
    color: rgba(41, 125, 209, 1);
    margin-top: 30px;
`

interface Props {
    onClose?: () => void; 
    fromChain: Chain;
    routes: QuoteResponse[] | null;
    toToken: Token;
    quoteLoading: boolean;
    best: QuoteResponse | null;
    fast: QuoteResponse | null;
    routeSelected: QuoteResponse | null;
    onRouteSelected: (val: QuoteResponse) => void;
}

export default function RouteModal({ onClose, fromChain, routes, toToken, best, fast, quoteLoading, routeSelected, onRouteSelected }: Props) {

    return <Modal title="Bridge Route" top="40%" onClose={onClose}>
        <ListWapper>
        {
            routes?.map((route: QuoteResponse, index) => {
                return <Route fromChain={fromChain} route={route} fast={fast} best={best} active={routeSelected === route} toToken={toToken} onClick={() => {
                    onRouteSelected(route)
                    // onClose && onClose()
                }} showOutputTitle={false} key={route.bridgeType + index}/>
            })
        }
        </ListWapper>
        {
            quoteLoading && <KeepLoading className="keep-loading"><span>More routes</span> <DotFlashing /></KeepLoading>
        }
        
    </Modal>
}