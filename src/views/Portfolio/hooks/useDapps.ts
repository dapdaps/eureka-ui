import { useDebounceFn } from 'ahooks';
import Big from 'big.js';
import { useCallback, useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { get } from '@/utils/http';
import { getDappLogo, getTokenLogo } from '@/views/Portfolio/helpers';
import ChainsData from '@/config/all-in-one/chains';
import chainCofig from '@/config/chains';

export default function useDapps() {
  const { account } = useAccount();

  const [loading, setLoading] = useState(false);
  const [dapps, setDapps] = useState<any>([]);
  const [dappsByChain, setDappsByChain] = useState<any>([]);
  const [totalBalance, setTotalBalance] = useState<Big.Big>();

  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });

  const fetchDapps = useCallback(async () => {
    try {
      setLoading(true);
      setDapps([]);
      const result = await get(`/db3`, {
        url: 'api/balance/dapp/list',
        params: JSON.stringify({ address: account }),
      });

      let _totalBalance = Big(0);
      const data: any = result?.data?.list || [];
      const dappsList = [];

      const _dappsByChain: DappsByChain[] = Object.values(ChainsData).map((chain) => ({
        chainId: chain.chainId,
        totalUsdValue: Big(0),
        totalUsd: '0.00',
        dappList: [],
        logo: chainCofig[chain.chainId]?.icon || chain.icon,
        name: chain.title,
        selectBgColor: chain.selectBgColor,
        bgColor: chain.bgColor,
      }));
      for (const _dapp of data) {
        let dappTotalUsd = Big(0);
        if (!_dapp.assets) continue;
        for (const typeAsset of _dapp.assets) {
          typeAsset.totalUsd = Big(0);
          if (!typeAsset.assets) continue;
          for (const tokenAsset of typeAsset.assets) {
            tokenAsset.tokenLogo = getTokenLogo(tokenAsset.symbol);
            dappTotalUsd = dappTotalUsd.plus(tokenAsset.usd || 0);
            typeAsset.totalUsd = typeAsset.totalUsd.plus(tokenAsset.usd || 0);
          }
        }
        _totalBalance = _totalBalance.plus(dappTotalUsd);
        const dappItem = {
          ..._dapp,
          totalUsd: dappTotalUsd,
          chainLogo: chainCofig[_dapp.chain_id]?.icon || '',
          dappLogo: getDappLogo(_dapp.name),
          detailList: _dapp.assets || [],
          path: '',
        };
        dappsList.push(dappItem);

        // add dapp to chain
        const chainIndex = _dappsByChain.findIndex((_chain) => _chain.chainId == _dapp.chain_id);
        if (chainIndex > -1) {
          const chainItem = _dappsByChain[chainIndex];
          chainItem.totalUsdValue = Big(chainItem.totalUsd).plus(dappTotalUsd);
          chainItem.totalUsd = Big(chainItem.totalUsdValue).toFixed(2);
          chainItem.dappList.push(dappItem);
          _dappsByChain[chainIndex] = chainItem;
        }
      }
      const _dappsByChainSorted = _dappsByChain.sort((a, b) => Big(b.totalUsdValue).toNumber() - Big(a.totalUsdValue).toNumber());

      console.log('dappsList: %o', dappsList);
      console.log('_dappsByChainSorted: %o', _dappsByChainSorted);
      console.log('_totalBalance: %o', _totalBalance);

      setDapps(dappsList);
      setDappsByChain(_dappsByChainSorted);
      setTotalBalance(_totalBalance);

      // const _dapps: any = result?.data?.list
      //   .map((record: any) => {
      //     let _totalBalance = new Big(0);
      //     const items: any = {};
      //     const _typeBalance: any = {};
      //     record.assets.forEach((item: any) => {
      //       let _typeTotalBalance = new Big(0);
      //       const _type = item.type || record.type;
      //       item.assets.forEach((asset: any) => {
      //         _totalBalance =
      //           _type.toLowerCase() === 'borrow'
      //             ? _totalBalance.minus(asset.usd || 0)
      //             : _totalBalance.add(asset.usd || 0);
      //
      //         _typeTotalBalance = _typeTotalBalance.add(asset.usd || 0);
      //       });
      //       if (items[_type]) {
      //         items[_type].push(item);
      //         _typeBalance[_type] = _typeBalance[_type].add(_typeTotalBalance);
      //       } else {
      //         items[_type] = [item];
      //         _typeBalance[_type] = _typeTotalBalance;
      //       }
      //       item.usd = _typeTotalBalance;
      //     });
      //
      //     return {
      //       ...record,
      //       assets: Object.keys(items).map((item: any) => ({
      //         type: item,
      //         assets: items[item],
      //         usd: _typeBalance[item],
      //       })),
      //       usd: _totalBalance,
      //       icon: getDappLogo(record.name),
      //       chainIcon: getChainLogo(chains[record.chain_id]?.chainName),
      //     };
      //   });
      // setDapps(_dapps);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching resultNetwork data:', error);
      setLoading(false);
      setDapps([]);
    }
  }, [account]);

  const { run } = useDebounceFn(
    () => {
      if (!account) {
        setLoading(false);
        setDapps([]);
      } else {
        check(fetchDapps);
      }
    },
    { wait: dapps ? 600 : 3000 },
  );

  useEffect(() => {
    run();
  }, [account]);

  return { loading, dapps, dappsByChain, totalBalance };
}

export interface DappsByChain {
  chainId: number;
  totalUsdValue: Big.Big;
  totalUsd: string;
  dappList: any[];
  logo: string;
  name: string;
  selectBgColor?: string;
  bgColor?: string;
}