import useKarak from '../hooks/useKarak';
import useApprove from '@/hooks/useApprove';
import BaseComponent from '../components/base-component';
import { memo, useState } from 'react';

function Karak({ token0, token1, setShow, dapp }: any) {
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
  } = useKarak({
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
        approved: actionType === 'unstake' ? true : approved,
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

export default memo(Karak);
