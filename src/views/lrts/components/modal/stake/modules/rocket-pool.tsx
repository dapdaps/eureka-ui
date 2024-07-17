import useAccount from '@/hooks/useAccount';

import BaseComponent from '../components/base-component';
import useRocketPool from '../hooks/useRocketPool';


const RocketPool = function (props: any) {
  const { box, gem, dapp, actionType, handleChangeActionType, setShow, token0, token1 } = props;
  const { account, provider } = useAccount();
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
    handleStake
  } = useRocketPool({ actionType, token0, token1, provider, account });

  return (
    <BaseComponent
      componentProps={{
        box,
        gem,
        dapp,
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
        setShow,
        handleApprove,
        handleAmountChange,
        handleStake,
        handleChangeActionType
      }}
    />
  )
}
export default RocketPool