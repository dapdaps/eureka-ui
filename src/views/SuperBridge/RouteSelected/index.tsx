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
  background: linear-gradient(180deg, #262836 0%, #000000 100%);
  border-radius: 12px;
  padding: 25px 14px 10px;
  margin-bottom: 10px;
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

const Empty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 34px 0;
  .empty-text {
    color: rgba(151, 154, 190, 1);
    font-family: Montserrat;
    font-size: 14px;
    font-weight: 500;
    margin-top: 22px;
  }
`;

interface Props {
  fromChain: Chain;
  routes: QuoteResponse[] | null;
  toToken?: Token | undefined;
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
      <TitleWapper>
        <div className="title">Bridge Routes:</div>
        <div className="arrow">
          {quoteLoading ? (
            <DotFlashing val={sortedRoutes?.length || 0} />
          ) : (
            <span className="route-num">{sortedRoutes?.length}</span>
          )}
        </div>
      </TitleWapper>
      <Sep />

      {!(quoteLoading || (sortedRoutes && sortedRoutes.length)) && (
        <Empty>
          <svg width="36" height="46" viewBox="0 0 36 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.5 20.3704C3.70333 18.9517 1 15.2915 1 11C1 5.47715 5.47715 1 11 1C15.9212 1 20.0121 4.55476 20.845 9.2366"
              stroke="#979ABE"
              stroke-opacity="0.3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16.5 37.2705C18.2642 40.1097 21.4113 42.0001 25 42.0001C30.5228 42.0001 35 37.5229 35 32.0001C35 29.2027 33.8514 26.6736 32 24.8586"
              stroke="#979ABE"
              stroke-opacity="0.3"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-dasharray="2 2"
            />
            <path
              d="M29.7667 3.96638L29.7664 3.96682L29.7667 3.96638ZM29.5549 3.60563L6.06758 24.2745C5.58308 24.7009 5.88463 25.5 6.53001 25.5H15.5593L3.32516 43.6246C2.87606 44.2899 3.71787 45.0647 4.34373 44.5619L33.37 21.2457C33.8854 20.8318 33.5927 20 32.9317 20H20.4269L30.6024 4.51556C31.0505 3.8336 30.1676 3.0665 29.5549 3.60563Z"
              stroke="#979ABE"
              stroke-opacity="0.3"
              stroke-linejoin="round"
            />
          </svg>
          <div className="empty-text">Select bridging tokens</div>
        </Empty>
      )}

      {(quoteLoading || (sortedRoutes && sortedRoutes.length)) && (
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
