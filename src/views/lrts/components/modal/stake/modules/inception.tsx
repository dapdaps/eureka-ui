import useInception from '../hooks/useInception';
import useApprove from '@/hooks/useApprove';
import useAccount from '@/hooks/useAccount';
import BaseComponent from '../components/base-component';
import { memo, useEffect } from 'react';
import useInceptionRequests from '../hooks/useInceptionRequests';

function Inception({ box, gem, dapp, token0, token1, actionType, handleChangeActionType, setShow }: any) {
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
  } = useInception({
    token0,
    token1,
    actionType,
    dapp: gem,
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
        handleChangeActionType,
      }}
    />
  );
}

export default memo(Inception);