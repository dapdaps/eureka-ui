import usePuffer from '../hooks/usePuffer';
import BaseComponent from '../components/base-component';
import { memo, useState } from 'react';

<<<<<<< HEAD
function Karak({ token0, token1, setShow, actionType, handleChangeActionType }: any) {
=======
function Karak({ token0, token1, setShow, dapp }: any) {
  const [actionType, setActionType] = useState('stake');
>>>>>>> c40ae9eacd5b1f40eb3f818e0f64742d89ec5ac7
  const { data, inAmount, outAmount, inToken, outToken, isInSufficient, isLoading, handleAmountChange, handleStake } =
    usePuffer({
      token0,
      token1,
      actionType,
      dapp,
    });

  return (
    <BaseComponent
      componentProps={{
        data,
        inAmount,
        outAmount,
        approved: true,
        isLoading,
        setShow,
        leastAmount: 0.01,
        actionType,
        inToken,
        outToken,
        isInSufficient,
        dapp,
        handleAmountChange,
        handleStake,
        handleChangeActionType,
      }}
    />
  );
}

export default memo(Karak);
