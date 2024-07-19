import useKarak from '../hooks/useKarak';
import useApprove from '@/hooks/useApprove';
import useAccount from '@/hooks/useAccount';
import BaseComponent from '../components/base-component';
import { memo, useEffect } from 'react';
import useKarakRequests from '../hooks/useKarakRequests';

function Karak({ box, gem, dapp, token0, token1, actionType, handleChangeActionType, setShow, onSuccess }: any) {
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
  } = useKarak({
    token0,
    token1,
    actionType,
    gem,
    dapp,
    onSuccess
  });
  const { approve, approved, approving } = useApprove({
    amount: inAmount,
    token: inToken,
    spender: spender,
  });
  const { requests, loading: requestsLoading, queryRequests, claim } = useKarakRequests();
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
        approved: actionType === 'unstake' ? true : approved,
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

export default memo(Karak);
