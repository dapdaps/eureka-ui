import useInception from '../hooks/useInception';
import useApprove from '@/hooks/useApprove';
import useAccount from '@/hooks/useAccount';
import BaseComponent from '../components/base-component';
import { memo, useEffect } from 'react';
import useInceptionRequests from '../hooks/useInceptionRequests';

function Inception({ box, gem, dapp, token0, token1, actionType, handleAddMetaMask, handleChangeActionType, setShow, onSuccess }: any) {
  const { chainId } = useAccount();
  const {
    data,
    inAmount,
    setInAmount,
    outAmount,
    inToken,
    outToken,
    isInSufficient,
    isLoading,
    spender,
    handleAmountChange,
    handleMax,
    handleStake,
  } = useInception({
    token0,
    token1,
    actionType,
    gem,
    dapp,
    onSuccess
  });
  const { requests, loading: requestsLoading, queryRequests, claim } = useInceptionRequests();
  const { approve, approved, approving } = useApprove({
    amount: inAmount,
    token: inToken.isNative ? null : inToken,
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
        setInAmount,
        outAmount,
        isLoading: approving || isLoading,
        setShow,
        approved: inToken.isNative || actionType === 'unstake' ? true : approved,
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
        handleAddMetaMask,
        handleChangeActionType,
      }}
    />
  );
}

export default memo(Inception);
