import Big from 'big.js';
import { Contract } from 'ethers';
import { useCallback, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import useToast from '@/hooks/useToast';

import routerAbi from '../../abi/routerV2';
import routerV2Nile from '../../abi/routerV2Nile';
import useDappConfig from '../../hooks/useDappConfig';

export default function useRemove({ detail, percent, amount0, amount1, routerAddress, onSuccess }: any) {
  const [loading, setLoading] = useState(false);
  const { basic } = useDappConfig();
  const { account, chainId, provider } = useAccount();
  const toast = useToast();
  const { addAction } = useAddAction('dapp');

  const onRemove = useCallback(async () => {
    if (!chainId) return;
    let toastId = toast.loading({ title: 'Confirming...' });
    try {
      setLoading(true);
      const { token0, token1, liquidity, fee } = detail;
      const _liquidity = new Big(liquidity).mul(percent / 100).toFixed(0);
      const hasNativeToken = token0.isNative ? token0 : token1.isNative ? token1 : '';
      const deadline = Math.ceil(Date.now() / 1000) + 180;

      const signer = provider.getSigner(account);

      const method = hasNativeToken ? 'removeLiquidityETH' : 'removeLiquidity';

      const params = hasNativeToken
        ? [token0.isNative ? token1.address : token0.address, _liquidity, 0, 0, account, deadline]
        : [token0.address, token1.address, _liquidity, 0, 0, account, deadline];

      if (basic.name === 'Nile') {
        params.splice(hasNativeToken ? 1 : 2, 0, false);
      }

      const RouterContract = new Contract(routerAddress, basic.name === 'Nile' ? routerV2Nile : routerAbi, signer);

      let estimateGas: any = new Big(1000000);

      try {
        estimateGas = await RouterContract.estimateGas[method](...params);
      } catch (err: any) {
        console.log('estimateGas err', err);
        if (err?.code === 'UNPREDICTABLE_GAS_LIMIT') {
          estimateGas = new Big(3000000);
        }
      }
      console.log('estimateGas', estimateGas.toString());
      const tx = await RouterContract[method](...params, {
        gasLimit: new Big(estimateGas).mul(120).div(100).toFixed(0)
      });

      toast.dismiss(toastId);
      toastId = toast.loading({ title: 'Pending...' });

      const { status, transactionHash } = await tx.wait();
      setLoading(false);
      addAction({
        type: 'Liquidity',
        action: 'Remove Liquidity',
        token0: detail.token0.symbol,
        token1: detail.token1.symbol,
        template: basic.name,
        status,
        transactionHash,
        extra_data: JSON.stringify({
          amount0: amount0 * (percent / 100),
          amount1: amount1 * (percent / 100),
          action: 'Remove Liquidity',
          type: 'univ3'
        }),
        sub_type: 'Remove'
      });
      toast.dismiss(toastId);
      if (status === 1) {
        toast.success({ title: 'Remove successfully!', tx: transactionHash, chainId });
        onSuccess();
      } else {
        toast.fail({ title: 'Remove faily!' });
      }
    } catch (err: any) {
      toast.dismiss(toastId);
      setLoading(false);
      toast.fail({
        title: err?.message?.includes('user rejected transaction') ? 'User rejected transaction' : `Remove faily!`
      });
    }
  }, [detail, percent]);

  return { loading, onRemove };
}
