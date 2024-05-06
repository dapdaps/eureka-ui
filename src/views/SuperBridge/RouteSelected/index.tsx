import { useState, useRef, useCallback, useEffect } from "react";
import styled from 'styled-components';
import type { QuoteRequest, QuoteResponse, ExecuteRequest } from 'super-bridge-sdk'

import { ArrowRight } from '../Arrow'
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
    routes: QuoteResponse[] | null
}

export default function RouteSelected(
    {  }: Props
) {
    const [routeModalShow, setRouteModalShow] = useState<boolean>(false)

    return <Container>
        <TitleWapper>
            <div className="title">Select Bridge Route</div>
            <div className="arrow" onClick={() => { setRouteModalShow(true) }}>
                <span className="route-num">2 Routes</span>
                <ArrowRight />
            </div>
        </TitleWapper>
        <Sep />
        <Route active/>
        {
            routeModalShow && <RouteModal onClose={() => { setRouteModalShow(false) }} />
        }
    </Container>
}