import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import type { ExecuteRequest, QuoteRequest, QuoteResponse } from 'super-bridge-sdk';

import type { Chain, Token } from '@/types';

import { ArrowRight } from '../Arrow';
import DotFlashing from '../DotFlashing/';
import useRouteSorted from '../hooks/useRouteSorted';
import Route from '../Route';
import RouteModal from './RouteModal';

const Container = styled.div`
  /* margin-top: 20px; */
`;

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
    .route-num {
      color: #fff;
      font-size: 16px;
      font-weight: 400;
      line-height: 16.8px;
      padding-right: 10px;
    }
  }
`;

const Sep = styled.div`
  margin-top: 16px;
`;

interface Props {
  fromChain: Chain;
  routes: QuoteResponse[] | null;
  toToken: Token;
  routeSortType: number;
  quoteLoading: boolean;
  onRouteSelected: (route: QuoteResponse | null) => void;
  stopSelected: boolean;
  updateFresh: () => void;
}

export default function RouteSelected({
  routes,
  toToken,
  routeSortType,
  fromChain,
  quoteLoading,
  onRouteSelected,
  stopSelected,
  updateFresh
}: Props) {
  const { routeSelected, best, fast, sortedRoutes, setRouteSelected } = useRouteSorted(
    routes,
    routeSortType,
    onRouteSelected,
    stopSelected
  );

  return (
    <Container>
      {(quoteLoading || (sortedRoutes && sortedRoutes.length)) && (
        <>
          <TitleWapper>
            <div className="title">Bridge Routes:</div>
            <div className="arrow">
              {quoteLoading && <DotFlashing />}
              <span className="route-num">{sortedRoutes?.length}</span>
            </div>
          </TitleWapper>
          <Sep />
        </>
      )}

      {sortedRoutes && (
        <RouteModal
          best={best}
          fast={fast}
          toToken={toToken}
          routeSelected={routeSelected}
          routes={sortedRoutes}
          fromChain={fromChain}
          quoteLoading={quoteLoading}
          onRouteSelected={(route) => {
            setRouteSelected(route);
            onRouteSelected(route);
            updateFresh();
          }}
        />
      )}
    </Container>
  );
}
