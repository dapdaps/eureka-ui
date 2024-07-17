import useEigenpie from '../hooks/useEigenpie';
import useApprove from '@/hooks/useApprove';
import BaseComponent from '../components/base-component';
import { memo, useState } from 'react';

function Eigenpie({ token0, token1, setShow, dapp }: any) {
  const [actionType, setActionType] = useState('stake');
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
    dapp,
  });
  const { approve, approved, approving } = useApprove({
    amount: inAmount,
    token: inToken,
    spender: spender,
  });
  return (
    <BaseComponent
      componentProps={{
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
        dapp,
        handleApprove: approve,
        handleAmountChange,
        handleStake,
        handleChangeActionType: (actionType: any) => {
          setActionType(actionType);
        },
      }}
    />
  );
}

export default memo(Eigenpie);
