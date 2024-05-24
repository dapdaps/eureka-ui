import { useState, useRef, useCallback, useEffect } from "react";
import styled from 'styled-components';
import type { QuoteRequest, QuoteResponse, ExecuteRequest } from 'super-bridge-sdk'

import { ArrowDown } from '../Arrow'
import Modal from "../Modal";
import Route from "../Route";
import type { Chain, Token } from "@/types";

const ListWapper = styled.div`
    &>:not(:first-child) {
        margin-top: 10px;
    }
    height: 500px;
    overflow-y: auto;
`

interface Props {
    onClose?: () => void; 
    fromChain: Chain;
    routes: QuoteResponse[] | null;
    toToken: Token;
    best: QuoteResponse | null;
    fast: QuoteResponse | null;
    routeSelected: QuoteResponse | null;
    onRouteSelected: (val: QuoteResponse) => void;
}

export default function RouteModal({ onClose, fromChain, routes, toToken, best, fast, routeSelected, onRouteSelected }: Props) {

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
        
    </Modal>
}