
import { useEffect } from 'react';
import BaseComponent from '../components/base-component';
import useLido from '../hooks/useLido';
import useLidoRequest from '../hooks/useLidoRequests';
const Lido = function ({ box, gem, dapp, setShow, token0, token1, addAction, actionType, handleChangeActionType, chainId, onSuccess }: any) {
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
    handleAddMetaMask,
  } = useLido({
    gem,
    dapp,
    token0,
    token1,
    addAction,
    chainId,
    actionType,
    onSuccess
  })
  const { requests, loading: requestsLoading, queryRequests, claim } = useLidoRequest();

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
        handleChangeActionType,
      }}
    />
  );
};
export default Lido;
