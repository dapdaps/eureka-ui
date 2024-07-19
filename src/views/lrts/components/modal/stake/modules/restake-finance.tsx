import BaseComponent from '../components/base-component';
import useRestakeFinance from '../hooks/useRestakeFinance'

const RestakeFinance = function ({ box, gem, dapp, actionType, addAction, handleAddMetaMask, handleChangeActionType, setShow, token0, token1, onSuccess }: any) {

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
  } = useRestakeFinance({
    gem,
    dapp,
    token0,
    token1,
    addAction,
    actionType,
    onSuccess
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
        handleMax,
        handleStake,
        handleAddMetaMask,
        handleChangeActionType
      }}
    />
  );
};
export default RestakeFinance;
