import { useEffect, useMemo, useState } from 'react';
import type { QuoteResponse } from 'super-bridge-sdk';

export default function useRouteSorted(
  routes: any,
  routeSortType: number,
  onRouteSelected: (v: QuoteResponse | null) => void,
  stopSelected = false
) {
  const [routeSelected, setRouteSelected] = useState<QuoteResponse | null>(null);
  const [best, setBest] = useState<QuoteResponse | null>(null);
  const [fast, setFast] = useState<QuoteResponse | null>(null);
  const [sortedRoutes, setSortedRoutes] = useState<QuoteResponse[] | null>([]);

  useEffect(() => {
    // if (stopSelected) {
    //     return
    // }
    let bestRoute: QuoteResponse | null = null;
    let fastRoute: QuoteResponse | null = null;
    if (routes && routes.length) {
      bestRoute = routes[0];
      fastRoute = routes[0];
      routes.forEach((route: QuoteResponse) => {
        if (Number(route.receiveAmount) > Number(bestRoute?.receiveAmount)) {
          bestRoute = route;
        }

        if (Number(route.duration) < Number(fastRoute?.duration)) {
          fastRoute = route;
        }
      });
    }
    setBest(bestRoute);
    setFast(fastRoute);

    if (!stopSelected) {
      if (routeSortType === 1) {
        setRouteSelected(bestRoute);
        onRouteSelected(bestRoute);
      } else if (routeSortType === 2) {
        setRouteSelected(fastRoute);
        onRouteSelected(fastRoute);
      }
    }

    if (!routes || routes.length === 0) {
      setRouteSelected(null);
      onRouteSelected(null);
    }
  }, [routes, routeSortType, stopSelected]);

  useEffect(() => {
    if (routes) {
      if (routeSortType === 1) {
        routes.sort((a: QuoteResponse, b: QuoteResponse) => {
          const numberAReceiveAmount = Number(a.receiveAmount);
          const numberBReceiveAmount = Number(b.receiveAmount);
          if (numberAReceiveAmount === numberBReceiveAmount) {
          }
          return Number(b.receiveAmount) - Number(a.receiveAmount);
        });
      } else {
        routes.sort((a: QuoteResponse, b: QuoteResponse) => Number(a.duration) - Number(b.duration));
      }
      setSortedRoutes(routes);
    } else {
      setSortedRoutes(null);
    }
  }, [routes, routeSortType]);

  const distinctRoutes = useMemo(() => {
    const keys: any = {};
    if (sortedRoutes && sortedRoutes.length) {
      return sortedRoutes.filter((route: QuoteResponse) => {
        if (!keys[route.bridgeType]) {
          keys[route.bridgeType] = true;
          return true;
        }
        return false;
      });
    }
    return [];
  }, [sortedRoutes]);

  return {
    routeSelected,
    best,
    fast,
    sortedRoutes: distinctRoutes,
    setRouteSelected
  };
}
