import useEigenpie from '../hooks/useEigenpie';
import useApprove from '@/hooks/useApprove';
import BaseComponent from '../components/base-component';
import { memo, useState } from 'react';

function Eigenpie({ box, gem, dapp, token0, token1, actionType, handleChangeActionType, setShow }: any) {
  const {
    data,
    inAmount,
    outAmount,
    inToken,
    outToken,
    isInSufficient,
    isLoading,
    spender,
    handleAmountChange,
    handleStake,
  } = useEigenpie({
    token0,
    token1,
    actionType,
    gem,
  });
  const { approve, approved, approving } = useApprove({
    amount: inAmount,
    token: inToken,
    spender: spender,
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
        isLoading: approving || isLoading,
        setShow,
        approved,
        approving,
        leastAmount: 0.001,
        actionType,
        inToken,
        outToken,
        isInSufficient,
        dapp: gem,
        handleApprove: approve,
        handleAmountChange,
        handleStake,
        handleChangeActionType,
      }}
    />
  );
}

export default memo(Eigenpie);
