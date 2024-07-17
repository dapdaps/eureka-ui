import BaseComponent from "../components/base-component"
import useMantle from "../hooks/useMantle"
const Mantle = function ({ dapp, setShow, token0, token1, addAction, chainId }: any) {
  const {
    data,
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
    handleChangeActionType
  } = useMantle({
    dapp,
    token0,
    token1,
    addAction,
    chainId
  })
  return (
    <BaseComponent
      componentProps={{
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
