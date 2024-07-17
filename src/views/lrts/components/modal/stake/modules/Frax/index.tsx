import useAccount from '@/hooks/useAccount';

import FraxComponent from './frax-component';
import useFrax from './hooks/useFrax';


const Frax = function (props: any) {
  const { setShow, token0, token1 } = props;
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
  } = useFrax({ token0, token1, provider, account });
  
  return (
    <FraxComponent
      componentProps={{
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
        setShow,
        token0, 
        token1,
        handleApprove,
        handleAmountChange,
        handleStake
      }}
    />
  )
}
export default Frax