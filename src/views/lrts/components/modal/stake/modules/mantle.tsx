import BaseComponent from "../components/base-component"
import useMantle from "../hooks/useMantle"
const Mantle = function ({ box, gem, dapp, setShow, actionType, handleChangeActionType, token0, token1, addAction, chainId }: any) {
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
    handleStake,
    handleAddMetaMask,
  } = useMantle({
    dapp,
    token0,
    token1,
    addAction,
    chainId,
    actionType
  })
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
        handleApprove,
        handleAmountChange,
        handleStake,
        handleAddMetaMask,
        handleChangeActionType,
      }}
    />
  );
};
export default Mantle;
