import { useEffect } from "react";
import BaseComponent from "../components/base-component";
import useMantle from "../hooks/useMantle";
import useMantleRequests from "../hooks/useMantleRequests";
const Mantle = function ({ box, gem, dapp, setShow, actionType, handleChangeActionType, token0, token1, addAction, chainId, onSuccess }: any) {
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
  } = useMantle({
    gem,
    dapp,
    token0,
    token1,
    addAction,
    chainId,
    actionType,
    onSuccess
  })
  const { requests, loading: requestsLoading, queryRequests, claim } = useMantleRequests();
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
export default Mantle;
