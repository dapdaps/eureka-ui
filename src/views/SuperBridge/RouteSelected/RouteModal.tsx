import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import type { QuoteResponse } from 'super-bridge-sdk';

import type { Chain, Token } from '@/types';

import Route from '../Route';

const ListWapper = styled.div`
  & > :not(:first-child) {
    margin-top: 10px;
  }
  min-height: 260px;
  max-height: 600px;
  overflow-y: auto;
  padding-right: 14px;
  /* margin-bottom: 14px; */
`;

interface Props {
  fromChain: Chain;
  routes: QuoteResponse[] | null;
  toToken?: Token | undefined;
  quoteLoading: boolean;
  best: QuoteResponse | null;
  fast: QuoteResponse | null;
  routeSelected: QuoteResponse | null;
  onRouteSelected: (val: QuoteResponse) => void;
}

export default function RouteModal({
  fromChain,
  routes,
  toToken,
  best,
  fast,
  quoteLoading,
  routeSelected,
  onRouteSelected
}: Props) {
  return (
    <ListWapper style={{ paddingRight: routes && routes.length > 6 ? 8 : 14 }}>
      {toToken &&
        !!routes &&
        routes.length > 0 &&
        routes?.map((route: QuoteResponse, index) => {
          return (
            <Route
              fromChain={fromChain}
              route={route}
              fast={fast}
              best={best}
              active={routeSelected === route}
              toToken={toToken}
              onClick={() => {
                onRouteSelected(route);
              }}
              showOutputTitle={false}
              key={route.bridgeType}
            />
          );
        })}
    </ListWapper>
  );
}
