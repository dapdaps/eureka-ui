import useRenzo from '../hooks/useRenzo';
import useApprove from '@/hooks/useApprove';
import BaseComponent from '../components/base-component';
import { memo, useState } from 'react';

function Renzo({ token0, token1, dapp, setShow }: any) {
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
  } = useRenzo({
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
        leastAmount: 0,
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

export default memo(Renzo);
