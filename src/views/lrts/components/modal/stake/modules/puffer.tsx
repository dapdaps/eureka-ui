import usePuffer from '../hooks/usePuffer';
import useApprove from '@/hooks/useApprove';
import BaseComponent from '../components/base-component';
import { memo } from 'react';

function Karak({ token0, token1, actionType, setShow }: any) {
  const { data, inAmount, outAmount, inToken, outToken, isInSufficient, isLoading, handleAmountChange, handleStake } =
    usePuffer({
      token0,
      token1,
      actionType,
    });

  return (
    <BaseComponent
      componentProps={{
        data,
        inAmount,
        outAmount,
        approved: true,
        isLoading,
        setShow,
        leastAmount: 0.01,
        actionType,
        inToken,
        outToken,
        isInSufficient,
        handleAmountChange,
        handleStake,
      }}
    />
  );
}

export default memo(Karak);
