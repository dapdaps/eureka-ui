import usePuffer from '../hooks/usePuffer';
import BaseComponent from '../components/base-component';
import { memo, useState } from 'react';

function Karak({ token0, token1, setShow, actionType, gem, handleChangeActionType }: any) {
  const { data, inAmount, outAmount, inToken, outToken, isInSufficient, isLoading, handleAmountChange, handleStake } =
    usePuffer({
      token0,
      token1,
      actionType,
      gem,
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
        dapp: gem,
        hasNoUnstake: true,
        handleAmountChange,
        handleStake,
        handleChangeActionType,
      }}
    />
  );
}

export default memo(Karak);
