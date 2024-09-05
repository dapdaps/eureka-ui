import { useEffect, useRef, useState } from 'react';
import type { ExecuteRequest, QuoteRequest, QuoteResponse } from 'super-bridge-sdk';
import { execute, getAllToken, getBridgeMsg, getChainScan, getIcon, getQuote, getStatus, init } from 'super-bridge-sdk';

import useAccount from '@/hooks/useAccount';

const timeout = 1000 * 40;

export default function useQuote(
  quoteRequest: QuoteRequest | null,
  identification: string | number,
  quickLoading: boolean = true
) {
  const [routes, setRoutes] = useState<QuoteResponse[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const { chainId, provider } = useAccount();
  const newestIdentification = useRef(identification);

  async function getRoutes() {
    if (!quoteRequest) {
      setRoutes(null);
      return;
    }
    setLoading(true);
    setQuoteLoading(true);
    setRoutes(null);
    const routes: QuoteResponse[] = [];
    let stop = false;

    setTimeout(() => {
      if (!stop) {
        stop = true;
        setQuoteLoading(false);
        setLoading(false);
      }
    }, timeout);

    const _routes = await getQuote(quoteRequest, provider?.getSigner(), function (val: QuoteResponse) {
      if (stop) {
        return;
      }

      if (val.identification === newestIdentification.current) {
        routes.push(val);
        if (quickLoading) {
          setLoading(false);
        }
        setRoutes([...routes]);
      }
    });
    if (_routes && _routes.length && _routes[0].identification === newestIdentification.current) {
      setLoading(false);
      setQuoteLoading(false);
      setRoutes(_routes);
    }

    setLoading(false);
    setQuoteLoading(false);
  }

  useEffect(() => {
    getRoutes();
  }, [quoteRequest]);

  useEffect(() => {
    newestIdentification.current = identification;
  }, [identification]);

  return {
    routes,
    loading,
    quoteLoading
  };
}
