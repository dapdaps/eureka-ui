import { useEffect } from 'react';
import BaseComponent from '../components/base-component';
import useRestakeFinance from '../hooks/useRestakeFinance';
import useRestakeFinanceRequests from '../hooks/useRestakeFinanceRequests';

const RestakeFinance = function ({ box, gem, dapp, actionType, addAction, handleAddMetaMask, handleChangeActionType, setShow, token0, token1, onSuccess }: any) {

  const {
    data,
    inAmount,
    setInAmount,
    outAmount,
    isLoading,
    approved,
    approving,
    leastAmount,
    inToken,
    outToken,
    isInSufficient,
    handleApprove,
    handleAmountChange,
    handleMax,
    handleStake,
  } = useRestakeFinance({
    gem,
    dapp,
    token0,
    token1,
    addAction,
    actionType,
    onSuccess
  })
  const { requests, loading: requestsLoading, queryRequests, claim } = useRestakeFinanceRequests();
  useEffect(() => {
    actionType === 'unstake' && queryRequests(token0.address);
  }, [actionType]);
  return (
    <BaseComponent
      componentProps={{
        box,
        gem,
        dapp,
        data,
        setShow,
        inAmount,
        setInAmount,
        outAmount,
        isLoading,
        approved,
        approving,
        leastAmount,
        actionType,
        inToken,
        outToken,
        isInSufficient,
        requests,
        requestsLoading,
        queryRequests,
        claim,
        handleApprove,
        handleAmountChange,
        handleMax,
        handleStake,
        handleAddMetaMask,
        handleChangeActionType
      }}
    />
  );
};
export default RestakeFinance;
