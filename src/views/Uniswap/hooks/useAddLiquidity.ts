import { useState } from 'react';
import { utils } from 'ethers';
import Big from 'big.js';
import useAccount from '@/hooks/useAccount';
import config from '@/config/uniswap/linea';
import { useSettingsStore } from '@/stores/settings';
import positionAbi from '../abi/positionAbi';
import { getTokenAddress } from '../utils';

export default function useAddLiquidity(onSuccess: () => void, onError?: () => void) {
  const [loading, setLoading] = useState(false);
  const { account, provider } = useAccount();
  const slippage = useSettingsStore((store: any) => store.slippage);

  const onAdd = async ({
    token0,
    token1,
    value0,
    value1,
    fee,
    tickLower,
    tickUpper,
    noPair,
    isMint,
    tokenId,
    poolTokens,
  }: any) => {
    if (!account || !provider) return;
    const _token0Address = getTokenAddress(token0.address, true);
    const _token1Address = getTokenAddress(token1.address, true);
    const useNative = token0.address === 'native' ? token0 : token1.address === 'native' ? token1 : undefined;
    const Interface = new utils.Interface(positionAbi);
    const calldatas: string[] = [];
    if (noPair) {
      calldatas.push(
        Interface.encodeFunctionData('createAndInitializePoolIfNecessary', [
          _token0Address,
          _token1Address,
          fee,
          new Big(Math.sqrt(value1 / value0)).mul(2 ** 96).toString(),
        ]),
      );
    }
    const _amount0 = new Big(value0 || 0).mul(10 ** token0.decimals).toFixed();
    const _amount1 = new Big(value1 || 0).mul(10 ** token1.decimals).toFixed();
    const _amount0Min = new Big(_amount0.toString()).mul(1 - slippage).toFixed();
    const _amount1Min = new Big(_amount1.toString()).mul(1 - slippage).toFixed();
    const _deadline = Math.ceil(Date.now() / 1000) + 60;

    if (isMint) {
      console.log({
        token0: _token0Address,
        token1: _token1Address,
        fee: fee,
        tickLower: tickLower,
        tickUpper: tickUpper,
        amount0Desired: _amount0,
        amount1Desired: _amount1,
        amount0Min: _amount0Min,
        amount1Min: _amount1Min,
        recipient: account,
        deadline: _deadline,
      });
      let isReverse = false;
      if (poolTokens && poolTokens.token0 && poolTokens.token1) {
        isReverse = _token0Address === poolTokens.token1.address;
      }
      calldatas.push(
        Interface.encodeFunctionData('mint', [
          {
            token0: isReverse ? _token1Address : _token0Address,
            token1: isReverse ? _token0Address : _token1Address,
            fee: fee,
            tickLower: tickLower,
            tickUpper: tickUpper,
            amount0Desired: _amount0,
            amount1Desired: _amount1,
            amount0Min: _amount0Min,
            amount1Min: _amount1Min,
            recipient: account,
            deadline: _deadline,
          },
        ]),
      );
    } else {
      calldatas.push(
        Interface.encodeFunctionData('increaseLiquidity', [
          {
            tokenId: tokenId,
            amount0Desired: _amount0,
            amount1Desired: _amount1,
            amount0Min: _amount0Min,
            amount1Min: _amount1Min,
            deadline: _deadline,
          },
        ]),
      );
    }
    let value = '0';
    if (useNative) {
      const wrappedValue = token0.address === 'native' ? _amount0 : _amount1;
      if (new Big(wrappedValue).gt(0)) {
        calldatas.push(Interface.encodeFunctionData('refundETH'));
        value = wrappedValue;
      }
    }
    try {
      setLoading(true);
      const txn: { to: string; data: string; value: string } = {
        to: config.contracts.positionAddress,
        data: calldatas.length === 1 ? calldatas[0] : Interface.encodeFunctionData('multicall', [calldatas]),
        value,
      };
      const signer = provider.getSigner(account);
      let estimateGas = new Big(200000);
      try {
        estimateGas = await signer.estimateGas(txn);
      } catch (err) {
        console.log('err', err);
      }
      // TODO
      setLoading(false);
      return;
      const newTxn = {
        ...txn,
        gasLimit: estimateGas.mul(120).div(100).toString(),
      };
      const tx = await signer.sendTransaction(newTxn);
      const res = await tx.wait();
      if (res.status === 1) {
        onSuccess();
      } else {
        onError?.();
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      onError?.();
    }
  };

  return { loading, onAdd };
}
