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
    name: 'vaultAllUnderlyingAssets',
    outputs: [
      { internalType: 'uint256', name: 'amount0', type: 'uint256' },
      { internalType: 'uint256', name: 'amount1', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  }
];
export default memo(function LPData(props) {
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
    chainId,
    addresses
  } = props;
  useEffect(() => {
    let count = 0;
    const _pairsDataRes = {};
    let _totalSupplyRes = [];
    let _underlyingAssetsRes = [];
    let _userPositionsRes = [];

    function formatData(params) {
      console.log(params, count);

      // if (count < 4) return;
      count = 0;

      for (let i = 0; i < pairs.length; i++) {
        const _addr = pairs[i].vaultAddress.toLocaleLowerCase();

        const { token0, token1 } = _pairsDataRes[_addr] ? _pairsDataRes[_addr] : {};
        const token0TVL = Big(token0?.tvl ?? 0).times(token0?.shareTokenPrice ?? 0);
        const token1TVL = Big(token1?.tvl ?? 0).times(token1?.shareTokenPrice ?? 0);
        let _apr = 0;
        let _aum = 0;

        if (token0TVL.gt(token1TVL)) {
          // _apr = token0.shareTokenApr;
          _apr = token0.feeApr7dAvg;

          const _token0 = pairs[i].token0;

          _aum = Big(formatUnits(token0.tvl, pairs[i].decimals0))
            .times(prices[_token0] || 0)
            .toString();
        } else {
          // _apr = token1.shareTokenApr;
          _apr = token1?.feeApr7dAvg;

          const _token1 = pairs[i].token1;

          _aum = Big(formatUnits(token1?.tvl, pairs[i]?.decimals1))
            .times(prices[_token1] || 0)
            .toString();
        }

        if (pairs[i].id === 'USDC-USDT-Oku' || pairs[i].id === 'USDC-WETH-Oku') {
          _apr = token0.shareTokenApr;
        }

        pairs[i].APR = Big(_apr).div(10000).toFixed(2, 0);
        pairs[i].AUM = _aum;

        const _totalSupply = _totalSupplyRes[i][0].toString();
        const _totalAmount0 = _underlyingAssetsRes[i][0].toString();
        const _totalAmount1 = _underlyingAssetsRes[i][1].toString();
        const _shares = _userPositionsRes[i] ? formatUnits(_userPositionsRes[i][0]) : 0;
        pairs[i].totalSupply = _totalSupply;
        pairs[i].totalAmount0 = _totalAmount0;
        pairs[i].totalAmount1 = _totalAmount1;
        pairs[i].shares = _shares;

        // pairs[i].shares = _userPositionsRes[i]
        //   ? formatUnits(_userPositionsRes[i][0])
        //   : 0;
        if (_userPositionsRes[i]) {
          const _token0Amount = Big(_shares).times(_totalAmount0).div(_totalSupply).toString();
          const _token1Amount = Big(_shares).times(_totalAmount1).div(_totalSupply).toString();
          pairs[i].token0Amount = _token0Amount;
          pairs[i].token1Amount = _token1Amount;

          pairs[i].token0Value = Big(_token0Amount)
            .times(prices[token0] || 0)
            .toString();
          pairs[i].token1Value = Big(_token1Amount)
            .times(prices[token0] || 0)
            .toString();
        }
      }

      onLoad({
        dataList: pairs
      });
    }
    function getPairsData() {
      asyncFetch('https://vault-api.teahouse.finance/vaults/type/permissionless')
        .then((res) => {
          const _curChainRes = res.vaults.filter((item) => item.network === curChain.name.toLocaleLowerCase());
          _curChainRes.forEach(({ address, latestInfo }) => {
            const _addr = address.toLocaleLowerCase();
            _pairsDataRes[_addr] = latestInfo;
          });
        })
        .catch((err) => {
          console.log('catch-getPairsData-error--', err);
        })
        .finally(() => {
          count++;
          formatData('getPairsData');
        });
    }

    function getUserPositions() {
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
          console.log('getUserPositions--', res);
          _userPositionsRes = res;
          count++;
          formatData('getUserPositions');
        })
        .catch((err) => {
          console.log('getUserPositions-error--', err);
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
    function getAllUnderlyingAssets() {
      const calls = pairs.map((item) => ({
        address: item.vaultAddress,
        name: 'vaultAllUnderlyingAssets'
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
          console.log('getAllUnderlyingAssets--', res);
          _underlyingAssetsRes = res;
          count++;
          formatData('getAllUnderlyingAssets');
        })
        .catch((err) => {
          console.log('getAllUnderlyingAssets-error--', err);
        });
    }

    getPairsData();
    getTotalSupply();
    getAllUnderlyingAssets();
    getUserPositions();
  }, []);
});
