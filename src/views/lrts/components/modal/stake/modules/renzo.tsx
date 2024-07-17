import useRenzo from '../hooks/useRenzo';
import useApprove from '@/hooks/useApprove';
import useAccount from '@/hooks/useAccount';
import BaseComponent from '../components/base-component';
import { memo, useEffect } from 'react';
import useRenzoRequests from '../hooks/useRenzoRequests';

function Renzo({ box, gem, dapp, token0, token1, setShow, actionType, handleChangeActionType }: any) {
  const { chainId } = useAccount();
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
    handleMax,
    handleStake,
  } = useRenzo({
    token0,
    token1,
    actionType,
    dapp: gem,
  });
  const { approve, approved, approving } = useApprove({
    amount: inAmount,
    token: inToken,
    spender: spender,
  });
  const { requests, loading: requestsLoading, queryRequests, claim } = useRenzoRequests();
  useEffect(() => {
    queryRequests();
  }, [chainId]);
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
        leastAmount: 0,
        actionType,
        inToken,
        outToken,
        isInSufficient,
        requests,
        requestsLoading,
        queryRequests,
        claim,
        handleApprove: approve,
        handleAmountChange,
        handleMax,
        handleStake,
        handleChangeActionType,
      }}
    />
  );
}

export default memo(Renzo);
