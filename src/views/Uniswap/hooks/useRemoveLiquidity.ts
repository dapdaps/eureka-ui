import { useState } from 'react';
import { utils } from 'ethers';
import Big from 'big.js';
import useAccount from '@/hooks/useAccount';
import { useSettingsStore } from '@/stores/settings';
import config from '@/config/uniswap/linea';
import positionAbi from '../abi/positionAbi';
import { getTokenAddress } from '../utils';

export default function useRemoveLiquidity(onSuccess: () => void, onError: () => void) {
  const [loading, setLoading] = useState(false);
  const { account, provider } = useAccount();
  const slippage = useSettingsStore((store: any) => store.slippage);

  const onRemove = async ({ token0, token1, liquidityToken0, liquidityToken1, liquidity, percent, tokenId }: any) => {
    if (!account || !provider) return;
    const Interface = new utils.Interface(positionAbi);
    const calldatas: string[] = [];
    const _liquidity = new Big(liquidity).mul(percent / 100).toFixed();
    const useNative = token0.address === 'native' ? token0 : token1.address === 'native' ? token1 : undefined;
    const _amount0 = new Big(liquidityToken0 || 0)
      .mul(percent / 100)
      .mul(10 ** token0.decimals)
      .toFixed(0);
    const _amount1 = new Big(liquidityToken1 || 0)
      .mul(percent / 100)
      .mul(10 ** token1.decimals)
      .toFixed(0);
    const _amount0Min = new Big(_amount0.toString()).mul(1 - slippage).toFixed(0);
    const _amount1Min = new Big(_amount1.toString()).mul(1 - slippage).toFixed(0);
    const _deadline = Math.ceil(Date.now() / 1000) + 60;

    calldatas.push(
      Interface.encodeFunctionData('decreaseLiquidity', [
        {
          tokenId,
          liquidity: _liquidity,
          amount0Min: _amount0Min,
          amount1Min: _amount1Min,
          deadline: _deadline,
        },
      ]),
    );

    calldatas.push(
      Interface.encodeFunctionData('collect', [
        {
          tokenId,
          recipient: useNative ? '0x0000000000000000000000000000000000000000' : account,
          amount0Max: '340282366920938463463374607431768211455',
          amount1Max: '340282366920938463463374607431768211455',
        },
      ]),
    );

    if (useNative) {
      calldatas.push(
        Interface.encodeFunctionData('unwrapWETH9', [
          useNative.address === token0.address ? _amount0Min : _amount1Min,
          account,
        ]),
      );
      calldatas.push(
        Interface.encodeFunctionData('sweepToken', [
          useNative.address === token0.address ? token1.address : token0.address,
          useNative.address === token0.address ? _amount1 : _amount0,
          account,
        ]),
      );
    }

    try {
      setLoading(true);
      let txn: { to: string; data: string } = {
        to: config.contracts.positionAddress,
        data: calldatas.length === 1 ? calldatas[0] : Interface.encodeFunctionData('multicall', [calldatas]),
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

  return { loading, onRemove };
}
