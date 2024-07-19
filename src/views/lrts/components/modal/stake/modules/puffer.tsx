import usePuffer from '../hooks/usePuffer';
import BaseComponent from '../components/base-component';
import { memo, useState } from 'react';

function Karak({ box, gem, dapp, token0, token1, setShow, actionType, handleChangeActionType, onSuccess }: any) {
  const {
    data,
    inAmount,
    outAmount,
    inToken,
    outToken,
    isInSufficient,
    isLoading,
    handleAmountChange,
    handleMax,
    handleStake,
  } = usePuffer({
    token0,
    token1,
    gem,
    dapp,
    actionType,
    onSuccess
  });

  return (
    <BaseComponent
      componentProps={{
        box,
        gem,
        dapp,
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
        hasNoUnstake: true,
        handleAmountChange,
        handleMax,
        handleStake,
        handleChangeActionType,
      }}
    />
  );
}

export default memo(Karak);
