import { useState } from 'react';
import { utils } from 'ethers';
import Big from 'big.js';
import useAccount from '@/hooks/useAccount';
import config from '@/config/uniswap/linea';
import { useSettingsStore } from '@/stores/settings';
import positionAbi from '../abi/positionAbi';

import { getTokenAddress } from '../utils';
import { parseUnits } from 'ethers/lib/utils';

// token0
// token1 0xf56dc6695cF1f5c364eDEbC7Dc7077ac9B586068
// fee 3000
// account
// tickLower -115920
// tickUpper -115860

export default function useAddLiquidity(onSuccess: () => void, onError: () => void) {
  const [loading, setLoading] = useState(false);
  const { account, provider } = useAccount();
  const slippage = useSettingsStore((store: any) => store.slippage);

  const onAdd = async ({ token0, token1, value0, value1, fee, tickLower, tickUpper, noPair, isMint, tokenId }: any) => {
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
    const _amount0 = parseUnits(value0.toFixed(token0.decimals), token0.decimals);
    const _amount1 = parseUnits(value1.toFixed(token0.decimals), token1.decimals);
    const _amount0Min = new Big(_amount0.toString()).mul(1 - slippage).toFixed();
    const _amount1Min = new Big(_amount1.toString()).mul(1 - slippage).toFixed();
    const _deadline = Math.ceil(Date.now() / 1000) + 60;
    if (isMint) {
      calldatas.push(
        Interface.encodeFunctionData('mint', [
          _token0Address,
          _token1Address,
          fee,
          tickLower,
          tickUpper,
          _amount0,
          _amount1,
          _amount0Min,
          _amount1Min,
          account,
          _deadline,
        ]),
      );
    } else {
      calldatas.push(
        Interface.encodeFunctionData('increaseLiquidity', [
          tokenId,
          _amount0,
          _amount1,
          _amount0Min,
          _amount1Min,
          _deadline,
        ]),
      );
    }
    let value = '0x';
    if (useNative) {
      const wrappedValue = token0.address === 'native' ? _amount0 : _amount1;
      if (wrappedValue.gt(0)) {
        calldatas.push(Interface.encodeFunctionData('refundETH'));
        value = wrappedValue.toHexString();
      }
    }
    try {
      setLoading(true);
      let txn: { to: string; data: string; value: string } = {
        to: config.contracts.positionAddress,
        data: calldatas.length === 1 ? calldatas[0] : Interface.encodeFunctionData('multicall', [calldatas]),
        value,
      };
      const signer = provider.getSigner(account);
      const estimate = await signer.estimateGas(txn);
      const newTxn = {
        ...txn,
        gasLimit: estimate.mul(120).div(100),
      };
      const tx = await signer.sendTransaction(newTxn);
      const res = await tx.wait();
      if (res.status === 1) {
        onSuccess();
      } else {
        onError();
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      onError();
    }
  };

  return { loading, onAdd };
}
