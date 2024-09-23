// @ts-nocheck
import Big from 'big.js';
import { ethers } from 'ethers';
import { memo, useEffect } from 'react';

import { asyncFetch } from '@/utils/http';
const { formatUnits, parseUnits } = ethers.utils;
const ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getPricePerFullShare',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  }
];
export default memo(function Data(props) {
  const {
    CHAIN_LIST,
    curChain,
    multicallAddress,
    multicall,
    account,
    provider,
    prices,
    update,
    onLoad,
    pairs,
    chainId
  } = props;
  useEffect(() => {
    if (!account || !update || !multicallAddress) return;
    const pairIds = pairs.map((pair) => pair.id);
    let count = 0;
    const _lpsDataRes = {};
    const _apyDataRes = {};
    let _totalSupplyRes = [];
    let _yourDepositsRes = [];
    let _pricePerFullShareRes = [];

    function formatData(params) {
      console.log(params, count);

      if (count < 5) return;

      count = 0;
      console.log('_lpsDataRes--', _lpsDataRes);
      const array = ['sushi-cow-linea-usdc-weth-rp'];
      for (let i = 0; i < pairs.length; i++) {
        const lpsData = _lpsDataRes[pairs[i].id];
        const apyData = _apyDataRes[pairs[i].id];
        pairs[i].detail = { ...lpsData, ...apyData };

        pairs[i].deposits = _yourDepositsRes[i]
          ? Big(formatUnits(_yourDepositsRes[i][0])).times(formatUnits(_pricePerFullShareRes[i][0])).toFixed(7, 0)
          : 0;

        const _beefyTVL = array.includes(pairs[i].id)
          ? Big(lpsData?.totalSupply)
              .times(lpsData.price || 0)
              .toString()
          : Big(formatUnits(_totalSupplyRes[i][0]))
              .times(formatUnits(_pricePerFullShareRes[i][0]))
              .times(lpsData.price || 0)
              .toString();
        const _gammaTVL = Big(lpsData.price || 0)
          .times(lpsData.totalSupply)
          .toString();
        pairs[i].beefyTVL = _beefyTVL;
        pairs[i].gammaTVL = _gammaTVL;
        pairs[i].APY = Big(apyData.totalApy).times(100).toFixed(2);
        const _pow = 1 / 365;
        pairs[i].DAILY = Number((Math.pow(Big(1).plus(apyData.totalApy).toString(), _pow) - 1) * 100).toFixed(4);
      }

      onLoad({
        dataList: pairs
      });
    }
    function getLpsData() {
      asyncFetch('https://api.beefy.finance/lps/breakdown')
        .then((res) => {
          pairIds.forEach((pairId) => {
            _lpsDataRes[pairId] = res[pairId];
          });
        })
        .catch((err) => {
          console.log('catch-getLpsData-error--', err);
        })
        .finally(() => {
          count++;
          formatData('getLpsData');
        });
    }
    function getApyData() {
      asyncFetch('https://api.beefy.finance/apy/breakdown')
        .then((res) => {
          pairIds.forEach((pairId) => {
            _apyDataRes[pairId] = res[pairId];
          });
        })
        .catch((err) => {
          console.log('catch-getLpsData-error--', err);
        })
        .finally(() => {
          count++;
          formatData('getLpsData');
        });
    }

    function getTotalSupply() {
      const calls = pairs.map((item) => ({
        address: item.vaultAddress,
        name: 'totalSupply'
        //   params: [],
      }));
      multicall({
        abi: ABI,
        calls,
        options: {},
        multicallAddress,
        provider
      })
        .then((res) => {
          console.log('getTotalSupply--', res);
          _totalSupplyRes = res;
          count++;
          formatData('getTotalSupply');
        })
        .catch((err) => {
          console.log('getTotalSupply-error--', err);
        });
    }
    function getPricePerFullShare() {
      const calls = pairs.map((item) => ({
        address: item.vaultAddress,
        name: 'getPricePerFullShare'
        //   params: [],
      }));
      multicall({
        abi: ABI,
        calls,
        options: {},
        multicallAddress,
        provider
      })
        .then((res) => {
          console.log('getPricePerFullShare--', res);
          _pricePerFullShareRes = res;
          count++;
          formatData('getPricePerFullShare');
        })
        .catch((err) => {
          console.log('getPricePerFullShare-error--', err);
        });
    }
    function getYourDeposits() {
      const calls = pairs.map((item) => ({
        address: item.vaultAddress,
        name: 'balanceOf',
        params: [account]
      }));
      multicall({
        abi: ABI,
        calls,
        options: {},
        multicallAddress,
        provider
      })
        .then((res) => {
          console.log('getYourDeposits--', res);
          _yourDepositsRes = res;
          count++;
          formatData('getYourDeposits');
        })
        .catch((err) => {
          console.log('getYourDeposits-error--', err);
        });
    }

    getLpsData();
    getApyData();
    getTotalSupply();
    getPricePerFullShare();
    getYourDeposits();
  }, [account, update]);
});
