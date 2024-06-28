import { useState } from 'react';
import useAccount from '@/hooks/useAccount';
import { Contract } from 'ethers';
import Big from 'big.js';
import useToast from '@/hooks/useToast';
import useDappConfig from '../../hooks/useDappConfig';
import { wrapNativeToken } from '@/views/Pool/utils/token';
import factoryAbi from '../../abi/factoryV2';

export default function useCreatePair({ token0, token1, fee, onSuccess }: any) {
  const [loading, setLoading] = useState(false);
  const { account, provider } = useAccount();
  const toast = useToast();
  const { contracts, chainId } = useDappConfig();

  const onCreate = async () => {
    setLoading(true);

    let toastId = toast.loading({ title: 'Confirming...' });

    try {
      const signer = provider.getSigner(account);
      const _contracts = contracts[chainId];
      const factoryAddress = fee === 0.3 ? _contracts.Factory3 : _contracts.Factory10;
      const FactoryContract = new Contract(factoryAddress, factoryAbi, signer);

      let estimateGas: any = new Big(1000000);

      const params = [wrapNativeToken(token0).address, wrapNativeToken(token1).address];

      try {
        estimateGas = await FactoryContract.estimateGas.createPair(...params);
      } catch (err: any) {
        console.log('estimateGas err', err);
        if (err?.code === 'UNPREDICTABLE_GAS_LIMIT') {
          estimateGas = new Big(3000000);
        }
      }
      console.log('estimateGas', estimateGas.toString());
      const tx = await FactoryContract.createPair(...params, {
        gasLimit: new Big(estimateGas).mul(120).div(100).toFixed(0),
      });

      toast.dismiss(toastId);
      toastId = toast.loading({ title: 'Pending...' });

      const { status, transactionHash } = await tx.wait();

      toast.dismiss(toastId);
      if (status === 1) {
        toast.success({ title: 'Create successfully!', tx: transactionHash, chainId });
        onSuccess();
      } else {
        toast.fail({ title: 'Create faily!' });
      }
      setLoading(false);
    } catch (err: any) {
      console.log(err);
      toast.dismiss(toastId);
      setLoading(false);
      toast.fail({
        title: err?.message?.includes('user rejected transaction') ? 'User rejected transaction' : `Add faily!`,
      });
    }
  };

  return { loading, onCreate };
}