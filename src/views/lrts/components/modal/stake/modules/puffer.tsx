import usePuffer from '../hooks/usePuffer';
import BaseComponent from '../components/base-component';
import { memo, useState } from 'react';

function Karak({ token0, token1, setShow }: any) {
  const [actionType, setActionType] = useState('stake');
  const { data, inAmount, outAmount, inToken, outToken, isInSufficient, isLoading, handleAmountChange, handleStake } =
    usePuffer({
      token0,
      token1,
      actionType,
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
        handleAmountChange,
        handleStake,
        handleChangeActionType: (actionType: any) => {
          setActionType(actionType);
        },
      }}
    />
  );
}

export default memo(Karak);
