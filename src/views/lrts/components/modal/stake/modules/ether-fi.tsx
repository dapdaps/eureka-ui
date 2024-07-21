import { useEffect } from 'react';
import BaseComponent from '../components/base-component';
import useEtherFiRequests from '../hooks/useEtherFiRequests';
import useEtherFi from '../hooks/useEtherFi';
const EtherFi = function ({ box, gem, dapp, setShow, actionType, handleAddMetaMask, handleChangeActionType, token0, token1, addAction, chainId, onSuccess }: any) {
  const {
    data,
    inAmount,
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
  } = useEtherFi({
    gem,
    dapp,
    token0,
    token1,
    addAction,
    chainId,
    actionType,
    onSuccess
  })
  const { requests, loading: requestsLoading, queryRequests, claim } = useEtherFiRequests();

  useEffect(() => {
    actionType === 'unstake' && queryRequests();
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
        outAmount,
        isLoading,
        approved,
        approving,
        leastAmount,
        actionType,
        inToken,
        outToken,
        handleMax,
        isInSufficient,
        requests,
        requestsLoading,
        queryRequests,
        claim,
        handleApprove,
        handleAmountChange,
        handleStake,
        handleAddMetaMask,
        handleChangeActionType
      }}
    />
  )
}
export default EtherFi