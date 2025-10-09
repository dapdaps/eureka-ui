import { useEffect, useState } from 'react';

import { chainConfig } from '../chainConfig';

const URL = 'https://v2.api.native.org/swap-api-v2/v2/lend/tokens?chain=';
const URL_APY = 'https://v2.api.native.org/swap-api-v2/v2/lend/historical-apy?chain=';
const apikey = '5e31284c49d4bd203e17391d612cae6fca071eab';
export default function useTokens({ chainId }: { chainId: number }) {
  const [baseTokens, setBaseTokens] = useState<any[]>([]);
  const [listTokens, setListTokens] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [allTokensList, setAllTokensList] = useState<any[]>([]);

  const getTokens = async () => {
    console.log(chainId);

    if (!chainId || loading || !chainConfig[chainId]) return;

    setLoading(true);
    try {
      const result = await fetch(`${URL}${chainConfig[chainId]}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          apikey
        }
      });
      const resultApy = await fetch(`${URL_APY}${chainConfig[chainId]}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          apikey
        }
      });
      const data = await result.json();
      const dataApy = await resultApy.json();

      const baseTokens = [];
      const listTokens = [];

      data.forEach((token: any) => {
        if (token.type === 1) {
          baseTokens.push(token);
        } else if (token.type === 2) {
          listTokens.push(token);
        }
        dataApy.some((item: any) => {
          if (item.lpTokenAddress.toLowerCase() === token.lpTokenAddress.toLowerCase()) {
            const pairingAPY = item.pairingAPY.reduce((acc: any, item: any) => {
              return acc + item.tradingFeeAPY + item.incentiveAPY;
            }, 0);

            token.apy = item.fundingAPY + pairingAPY;
            return true;
          }
        });

        token.chainId = chainId;
      });

      setBaseTokens(baseTokens);
      setListTokens(listTokens);
      setAllTokensList(data);
      // setListTokens(data.listTokens);
    } catch (error) {
      console.error('Error fetching tokens:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTokens();
  }, [chainId]);

  return { baseTokens, listTokens, loading, allTokensList };
}
