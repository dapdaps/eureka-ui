import { useState } from 'react';
import { utils } from 'ethers';
import Big from 'big.js';
import useAccount from '@/hooks/useAccount';
import { useSettingsStore } from '@/stores/settings';
import config from '@/config/uniswap/linea';
import positionAbi from '../abi/positionAbi';
import useRequestModal from '../../../hooks/useRequestModal';
import { balanceFormated } from '@/utils/balance';
import useToast from '@/hooks/useToast';
import { useTransactionsStore } from '@/stores/transactions';

export default function useRemoveLiquidity(onSuccess: () => void, onError: () => void) {
  const [loading, setLoading] = useState(false);
  const { account, provider } = useAccount();
  const slippage = useSettingsStore((store: any) => store.slippage) || 0.5;
  const { openRequestModal } = useRequestModal();

  const toast = useToast();
  const addTransaction = useTransactionsStore((store: any) => store.addTransaction);

  const onRemove = async ({ token0, token1, liquidityToken0, liquidityToken1, liquidity, percent, tokenId }: any) => {
    if (!account || !provider) return;
    const Interface = new utils.Interface(positionAbi);
    const calldatas: string[] = [];
    const _liquidity = new Big(liquidity).mul(percent / 100).toFixed(0);
    const useNative = token0.address === 'native' ? token0 : token1.address === 'native' ? token1 : undefined;
    const _amount0 = new Big(liquidityToken0 || 0).mul(percent / 100).mul(10 ** token0.decimals);
    const _amount1 = new Big(liquidityToken1 || 0).mul(percent / 100).mul(10 ** token1.decimals);
    const amount0 = _amount0.lt(0) ? '0' : _amount0.toFixed(0);
    const amount1 = _amount1.lt(0) ? '0' : _amount1.toFixed(0);
    const _amount0Min = new Big(_amount0.toString()).mul(1 - slippage);
    const _amount1Min = new Big(_amount1.toString()).mul(1 - slippage);
    const _deadline = Math.ceil(Date.now() / 1000) + 60;
    const amount0Min = _amount0Min.lt(0) ? '0' : _amount0Min.toFixed(0);
    const amount1Min = _amount1Min.lt(0) ? '0' : _amount1Min.toFixed(0);
    calldatas.push(
      Interface.encodeFunctionData('decreaseLiquidity', [
        {
          tokenId,
          liquidity: _liquidity,
          amount0Min: 0,
          amount1Min: 0,
          deadline: _deadline,
        },
      ]),
    );

    calldatas.push(
      Interface.encodeFunctionData('collect', [
        {
          tokenId,
          recipient: useNative ? config.contracts.positionAddress : account,
          amount0Max: '340282366920938463463374607431768211455',
          amount1Max: '340282366920938463463374607431768211455',
        },
      ]),
    );
    if (useNative) {
      // const _nativeAmount = useNative.address === token0.address ? amount0 : amount1;
      calldatas.push(Interface.encodeFunctionData('unwrapWETH9', ['0', account]));
      // const otherAmount = useNative.address === token0.address ? amount1 : amount0;
      calldatas.push(
        Interface.encodeFunctionData('sweepToken', [
          useNative.address === token0.address ? token1.address : token0.address,
          '0',
          account,
        ]),
      );
    }
    const tradeText = `Removed liquidity ${balanceFormated(liquidityToken0, 4)} ${token0.symbol} and ${balanceFormated(
      liquidityToken1,
      4,
    )} ${token1.symbol}`;
    try {
      setLoading(true);
      openRequestModal({
        status: 1,
        text: tradeText,
        open: true,
      });
      const txn: any = {
        to: config.contracts.positionAddress,
        data: calldatas.length === 1 ? calldatas[0] : Interface.encodeFunctionData('multicall', [calldatas]),
      };
      const signer = provider.getSigner(account);
      let estimateGas = new Big(1000000);
      try {
        estimateGas = await signer.estimateGas(txn);
      } catch (err: any) {
        if (err?.code === 'UNPREDICTABLE_GAS_LIMIT') {
          estimateGas = new Big(6000000);
        }
      }
      const newTxn = {
        ...txn,
        gasLimit: estimateGas.mul(120).div(100).toString(),
      };
      const tx = await signer.sendTransaction(newTxn);
      openRequestModal({
        text: tradeText,
        status: 0,
        tx: tx.hash,
        open: true,
        from: 'pool',
      });
      setLoading(false);
      const res = await tx.wait();
      if (res.status === 1) {
        onSuccess();
        toast.success({
          title: 'Transaction Successful!',
          text: tradeText,
        });
      } else {
        onError();
        toast.fail({
          title: 'Transaction Failed!',
          text: tradeText,
        });
      }
      addTransaction({
        icons: [token0.icon, token1.icon],
        failed: res.status !== 1,
        tx: tx.hash,
        handler: 'Removed Liquidity',
        desc: `${balanceFormated(liquidityToken0, 4)} ${token0.symbol} and ${balanceFormated(liquidityToken1, 4)} ${
          token1.symbol
        }`,
        time: Date.now(),
      });
    } catch (err: any) {
      console.log('err', err);
      if (err.code !== 'ACTION_REJECTED') {
        openRequestModal({
          status: 3,
          text: tradeText,
          open: true,
        });
      } else {
        openRequestModal({
          open: false,
        });
        toast.fail({
          title: 'Transaction Failed',
          text: `User rejected the request. Details: 
          MetaMask Tx Signature: User denied transaction signature. `,
        });
      }
      setLoading(false);
      onError();
    }
  };

  return { loading, onRemove };
}
