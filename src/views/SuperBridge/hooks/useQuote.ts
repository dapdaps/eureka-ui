import { useDebounce } from 'ahooks';
import { useEffect, useRef, useState } from 'react';
import type { ExecuteRequest, QuoteRequest, QuoteResponse } from 'super-bridge-sdk';
import { execute, getAllToken, getBridgeMsg, getChainScan, getIcon, getQuote, getStatus, init } from 'super-bridge-sdk';

import { report } from '@/components/BridgeX/Utils';
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

  // const inputValue = useDebounce(quoteLoading, { wait: 500 });

  async function getRoutes(quoteRequest: QuoteRequest | null) {
    if (!quoteRequest) {
      setRoutes(null);
      setQuoteLoading(false);
      setLoading(false);
      return;
    }
    setLoading(true);
    setQuoteLoading(true);
    setRoutes(null);
    const routes: QuoteResponse[] = [];
    let stop = false;

    setTimeout(() => {
      if (quoteRequest.identification === newestIdentification.current) {
        if (!stop) {
          stop = true;
          setQuoteLoading(false);
          setLoading(false);
        }
      }
    }, timeout);

    const start = Date.now();

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
    console.log('routes:', routes);

    report({
      source: 'super-bridge',
      type: 'pre-quote',
      account: quoteRequest.fromAddress,
      msg: {
        quoteRequest,
        duration: Date.now() - start,
        routes: _routes?.length
      }
    });

    if (_routes && _routes.length && _routes[0].identification === newestIdentification.current) {
      setLoading(false);
      setQuoteLoading(false);
      setRoutes(_routes);
      return;
    }

    if (quoteRequest.identification === newestIdentification.current) {
      setLoading(false);
      setQuoteLoading(false);
    }
  }

  useEffect(() => {
    getRoutes(quoteRequest);
  }, [quoteRequest]);

  useEffect(() => {
    if (identification) {
      newestIdentification.current = identification;
    }
  }, [identification]);

  return {
    routes,
    loading,
    quoteLoading
  };
}
