// @ts-nocheck
import Big from 'big.js';
import { ethers } from 'ethers';
import _ from 'lodash';
import pLimit from 'p-limit';
import { useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import { usePriceStore } from '@/stores/price';
import { useSteerPriceStore } from '@/stores/steer-price';
import { asyncFetch } from '@/utils/http';

export default function useSteer(ammName) {
  const prices = usePriceStore((store) => store.price);
  const steerPriceStore = useSteerPriceStore((store) => store);

  const usdPrice = prices?.['USDC'];
  const steer_prices = steerPriceStore?.steer_price;

  const { account, chain, provider } = useAccount();
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState(null);
  const [contracts, setContracts] = useState(null);
  let timer = null;

  async function getContracts() {
    try {
      const response = await import(
        `@steerprotocol/contracts/deployments/${chain?.chainName?.toLocaleLowerCase()}.json`
      );
      setContracts(response?.contracts);
    } catch (error) {
      setContracts([]);
      console.error(error);
    }
  }
  async function getPoolIcons(data) {
    const result0 = await asyncFetch(`/steer/icon?chain_id=${chain?.chainId}&address=${data?.address0}`);
    const result1 = await asyncFetch(`/steer/icon?chain_id=${chain?.chainId}&address=${data?.address1}`);

    return [result0?.token_url ?? '', result1?.token_url ?? ''];
  }
  async function getBalance(pool) {
    const contract = new ethers.Contract(
      pool?.vaultAddress,
      contracts?.HerculesMultiPositionLiquidityManager?.abi,
      provider
    );
    return await contract.balanceOf(account);
  }
  async function fetchDexPrice(addresses) {
    const response = await asyncFetch(
      `https://api.geckoterminal.com/api/v2/simple/networks/${chain?.chainName?.toLocaleLowerCase()}/token_price/${addresses}`,
      {
        headers: {
          Accept: 'application/json;version=20230302'
        }
      }
    );
    return response.data.attributes.token_prices;
  }
  async function getFeeApr(pool) {
    return await asyncFetch(`/pool/fee-apr?address=${pool?.vaultAddress}&chain=${chain?.chainId}&interval=604800`);
  }

  async function getTvl(pool, token_prices, data) {
    const contract = new ethers.Contract(
      pool?.vaultAddress,
      contracts?.HerculesMultiPositionLiquidityManager?.abi,
      provider
    );
    const getTotalAmountsResponse = await contract.getTotalAmounts();
    const amount0 = getTotalAmountsResponse ? ethers.utils.formatUnits(getTotalAmountsResponse[0], data.decimals0) : 0;
    const amount1 = getTotalAmountsResponse ? ethers.utils.formatUnits(getTotalAmountsResponse[1], data.decimals1) : 0;

    const price0 =
      data?.address0?.toLocaleLowerCase() === '0x420000000000000000000000000000000000000a'
        ? prices['ETH']
        : (token_prices?.[data?.address0?.toLocaleLowerCase()] ?? 0);

    const price1 =
      data?.address1?.toLocaleLowerCase() === '0x420000000000000000000000000000000000000a'
        ? prices['ETH']
        : (token_prices?.[data?.address1?.toLocaleLowerCase()] ?? 0);

    return Big(Big(amount0).times(price0).div(usdPrice)).plus(Big(amount1).times(price1).div(usdPrice)).toFixed();
  }
  async function getLiquidity(pool, token_prices, data) {
    const contract = new ethers.Contract(
      pool?.vaultAddress,
      contracts?.HerculesMultiPositionLiquidityManager?.abi,
      provider
    );
    const totalSupplyResponse = await contract.totalSupply();
    const getTotalAmountsResponse = await contract.getTotalAmounts();
    const total0 = getTotalAmountsResponse ? ethers.utils.formatUnits(getTotalAmountsResponse[0], data.decimals0) : 0;
    const total1 = getTotalAmountsResponse ? ethers.utils.formatUnits(getTotalAmountsResponse[1], data.decimals1) : 0;
    const totalSupply = totalSupplyResponse ? ethers.utils.formatUnits(totalSupplyResponse, 18) : 0;
    const priceLp = Big(totalSupply).gt(0)
      ? Big(
          Big(total0)
            .times(token_prices?.[data.address0?.toLocaleLowerCase()] ?? 0)
            .plus(Big(total1).times(token_prices?.[data.address1?.toLocaleLowerCase()] ?? 0))
        ).div(totalSupply)
      : 0;
    const amountLp = data.balance;
    return Big(priceLp).times(amountLp).toFixed();
  }
  async function getPool(pool) {
    try {
      const contract = new ethers.Contract(
        contracts?.SteerPeriphery?.address,
        [...contracts?.SteerPeriphery?.abi, ...contracts?.SteerPeriphery_Implementation_1?.abi],
        provider?.getSigner()
      );
      const firstResponse = await asyncFetch(`https://ipfs.io/ipfs/${pool?.strategyIpfsHash}`);

      let thirdResponse = null;
      try {
        thirdResponse = await contract.callStatic.vaultDetailsByAddress(pool?.vaultAddress);
      } catch (error) {
        thirdResponse = await contract.callStatic.algebraVaultDetailsByAddress(pool?.vaultAddress);
      }
      const fourthResponse = await getFeeApr(pool);
      const {
        token0,
        token1,
        token0Symbol,
        token1Symbol,
        token0Decimals,
        token1Decimals,
        token0Balance,
        token1Balance
      } = thirdResponse;

      const fifthResponse =
        Object.keys(steerPriceStore?.steer_price)?.length > 0
          ? steerPriceStore?.steer_price
          : await fetchDexPrice([token0, token1].join(','));

      const sixResponse = await getBalance(pool);

      const secondResponse = await getTvl(pool, fifthResponse, {
        address0: token0,
        address1: token1,
        decimals0: token0Decimals,
        decimals1: token1Decimals,
        balance: ethers.utils.formatUnits(sixResponse),
        token0Symbol,
        token1Symbol
      });

      const seventhResponse = await getLiquidity(pool, fifthResponse, {
        address0: token0,
        address1: token1,
        decimals0: token0Decimals,
        decimals1: token1Decimals,
        balance: ethers.utils.formatUnits(sixResponse)
      });

      const eighthResponse = await getPoolIcons({
        address0: token0,
        address1: token1
      });
      console.log('====eighthResponse', eighthResponse);

      Object.assign(steer_prices, fifthResponse);
      return {
        id: `${token0Symbol}-${token1Symbol}`,
        token0: token0Symbol,
        token1: token1Symbol,
        decimals0: parseInt(token0Decimals),
        decimals1: parseInt(token1Decimals),
        strategy: 'Dynamic',
        strategy2: 'Narrow',
        address0: token0,
        address1: token1,
        icons: eighthResponse,
        balance: ethers.utils.formatUnits(sixResponse),
        liquidity: seventhResponse,
        fee: Big(firstResponse?.vaultPayload?.fee).div(100).toFixed(2),
        feeApr: Big(fourthResponse?.apr ?? 0).toFixed(2) + '%',
        tvlUSD: Big(secondResponse).toFixed(2),
        // tvlUSD: Big(Big(amount0).times(fifthResponse[token0?.toLocaleLowerCase()]).div(usdPrice))
        //   .plus(Big(amount1).times(fifthResponse[token1?.toLocaleLowerCase()]).div(usdPrice))
        //   .toFixed(2),
        vaultAddress: pool?.vaultAddress
      };
    } catch (error) {
      console.log('====pool?.vaultAddress', pool?.vaultAddress);
      console.error(error);
    }
  }
  const getDataList = async () => {
    const batchSize = 2;
    const limit = pLimit(batchSize);
    const promiseArray = [];
    const firstResponse = await asyncFetch(
      `https://api.steer.finance/getSmartPools?chainId=${chain?.chainId}&dexName=${ammName.toLocaleLowerCase()}`
    );
    Object.keys(firstResponse?.pools)?.forEach((key) => {
      const pool = firstResponse?.pools;
      for (let i = 0; i < firstResponse?.pools?.[key]?.length; i++) {
        const pool = firstResponse?.pools?.[key]?.[i];
        promiseArray.push(getPool(pool));
      }
    });
    let completed = 0;
    const results = [];
    const totalRequests = promiseArray.length - 1;
    setDataList(null);
    const tasks = promiseArray.map((promise) =>
      limit(async () => {
        setLoading(true);

        try {
          const data = await promise;

          if (data) {
            results.push(data);
            completed++;
            if (completed % batchSize === 0 || completed === totalRequests) {
              const secondResponse = results.slice(completed - batchSize, completed);
              setLoading(false);

              setDataList((prev) => {
                const curr = _.cloneDeep(prev);
                return [
                  ...(curr || []),
                  ...secondResponse.map((pool) => {
                    return {
                      ...pool,
                      version: 2
                    };
                  })
                ];
              });
            }
          }
        } catch (error) {
          console.log(error);
        }
      })
    );
    await Promise.all(tasks);
    steerPriceStore.set(steer_prices);
  };
  const handleGetDataList = () => {
    !timer && getDataList();
    timer = setInterval(
      () => {
        steerPriceStore.set({});
        getDataList();
      },
      3 * 60 * 1000
    );
  };
  useEffect(() => {
    chain && getContracts();
  }, [chain]);

  useEffect(() => {
    if (contracts && chain && ammName && provider) {
      handleGetDataList();
    } else {
      timer && clearInterval(timer);
    }
  }, [contracts, provider, chain, ammName]);

  useEffect(() => {
    return () => timer && clearInterval(timer);
  }, []);

  return {
    loading,
    dataList,
    contracts
  };
}
