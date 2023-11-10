import { useState } from 'react';
import { utils } from 'ethers';
import Big from 'big.js';
import useAccount from '@/hooks/useAccount';
import config from '@/config/uniswap/linea';
import useTokens from './useTokens';
import positionAbi from '../abi/positionAbi';
import { getTokenAddress } from '../utils';
import useRequestModal from './useRequestModal';

export default function useAddLiquidity(onSuccess: () => void, onError?: () => void) {
  const [loading, setLoading] = useState(false);
  const { account, provider } = useAccount();
  const { addHistoryToken } = useTokens();
  const { openRequestModal } = useRequestModal();
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
    price,
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
          new Big(Math.sqrt(price)).mul(2 ** 96).toString(),
        ]),
      );
    }
    const _amount0 = new Big(value0 || 0).mul(10 ** token0.decimals).toFixed(0);
    const _amount1 = new Big(value1 || 0).mul(10 ** token1.decimals).toFixed(0);
    const _deadline = Math.ceil(Date.now() / 1000) + 60;

    if (isMint) {
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
            amount0Desired: isReverse ? _amount1 : _amount0,
            amount1Desired: isReverse ? _amount0 : _amount1,
            amount0Min: 0,
            amount1Min: 0,
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
            amount0Min: 0,
            amount1Min: 0,
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
    const modalTrade = {
      token0: token0.symbol,
      token1: token1.symbol,
      value0: value0,
      value1: value1,
    };
    try {
      setLoading(true);
      const txn: { to: string; data: string; value: string } = {
        to: config.contracts.positionAddress,
        data: calldatas.length === 1 ? calldatas[0] : Interface.encodeFunctionData('multicall', [calldatas]),
        value,
      };
      const signer = provider.getSigner(account);
      let estimateGas = new Big(500000);

      try {
        estimateGas = await signer.estimateGas(txn);
      } catch (err) {
        console.log('err', err);
      }
      const gasPrice = await provider.getGasPrice();
      const newTxn = {
        ...txn,
        gasLimit: estimateGas.mul(120).div(100).toString(),
        gasPrice: gasPrice,
      };
      openRequestModal({
        status: 1,
        trade: modalTrade,
        open: true,
      });
      const tx = await signer.sendTransaction(newTxn);
      openRequestModal({
        status: 2,
        trade: modalTrade,
        tx: tx.hash,
        open: true,
      });
      const res = await tx.wait();
      if (res.status === 1) {
        addHistoryToken({
          [token0.address]: token0,
          [token1.address]: token1,
        });
        onSuccess();
      } else {
        onError?.();
      }
      openRequestModal({
        status: res.status === 1 ? 0 : 3,
        trade: modalTrade,
        tx: tx.hash,
        open: true,
      });
      setLoading(false);
    } catch (err: any) {
      onError?.();
      if (err.code !== 'ACTION_REJECTED') {
        openRequestModal({
          status: 3,
          trade: modalTrade,
          open: true,
        });
      } else {
        openRequestModal({
          open: false,
        });
      }
      setLoading(false);
    }
  };

  return { loading, onAdd };
}
