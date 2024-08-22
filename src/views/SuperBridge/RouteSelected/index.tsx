import { useCallback, useEffect,useRef, useState } from "react";
import styled from 'styled-components';
import type { ExecuteRequest,QuoteRequest, QuoteResponse } from 'super-bridge-sdk'

import type { Chain, Token } from "@/types";

import { ArrowRight } from '../Arrow'
import DotFlashing from '../DotFlashing/'
import useRouteSorted from '../hooks/useRouteSorted'
import Route from '../Route'
import RouteModal from './RouteModal';

const Container = styled.div`
    margin-top: 20px;
`

const TitleWapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
        font-size: 16px;
        font-weight: 400;
        line-height: 19.2px;
        color: #fff;
    }
    .arrow {
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        .route-num {
            color: rgba(151, 154, 190, 1);
            font-size: 14px;
            font-weight: 400;
            line-height: 16.8px;
            text-decoration: underline;
        }
    }
`

const Sep = styled.div`
    margin-top: 16px;
`

interface Props {
    fromChain: Chain;
    routes: QuoteResponse[] | null;
    toToken: Token;
    routeSortType: number;
    quoteLoading: boolean;
    onRouteSelected: (route: QuoteResponse | null) => void;
}

export default function RouteSelected(
    { routes, toToken, routeSortType, fromChain, quoteLoading, onRouteSelected }: Props
) {
    const [routeModalShow, setRouteModalShow] = useState<boolean>(false)

    const {
        routeSelected,
        best,
        fast,
        sortedRoutes,
        setRouteSelected,
    } = useRouteSorted(routes, routeSortType, onRouteSelected)

    console.log(quoteLoading)

    return <Container>
        <TitleWapper>
            <div className="title">Select Bridge Route</div>
            <div className="arrow" onClick={() => { setRouteModalShow(true) }}>
                {
                    quoteLoading && <DotFlashing />
                }
                <span className="route-num">{routes?.length} Routes</span>
                <ArrowRight />
            </div>
        </TitleWapper>
        <Sep />
        {
            routeSelected && <Route onClick={() => {
                setRouteModalShow(true)
            }} fromChain={fromChain} best={best} fast={fast} toToken={toToken} route={routeSelected} active/>
        }
        {
            routeModalShow && <RouteModal 
            best={best} 
            fast={fast} 
            toToken={toToken} 
            routeSelected={routeSelected} 
            routes={sortedRoutes} 
            fromChain={fromChain}
            quoteLoading={quoteLoading}
            onClose={() => { setRouteModalShow(false) }} 
            onRouteSelected={(route) => { 
                setRouteSelected(route)
                onRouteSelected(route)
             }}
            />
        }
    </Container>
}