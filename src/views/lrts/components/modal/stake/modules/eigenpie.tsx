import useEigenpie from '../hooks/useEigenpie';
import useApprove from '@/hooks/useApprove';
import useAccount from '@/hooks/useAccount';
import BaseComponent from '../components/base-component';
import { memo, useEffect } from 'react';
import useEigenpieRequests from '../hooks/useEigenpieRequests';

function Eigenpie({ box, gem, dapp, token0, token1, actionType, handleChangeActionType, setShow, onSuccess }: any) {
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
  } = useEigenpie({
    token0,
    token1,
    actionType,
    gem,
    dapp,
    onSuccess
  });
  const { requests, loading: requestsLoading, queryRequests, claim } = useEigenpieRequests();
  const { approve, approved, approving } = useApprove({
    amount: inAmount,
    token: inToken,
    spender: spender,
  });

  useEffect(() => {
    queryRequests(token0.address);
  }, [chainId, token0]);

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

export default memo(Eigenpie);
