import { memo, useEffect, useState } from 'react';

import { useOdysseyV3Store } from '@/stores/odyssey';

import Card from './Card';
import ProcessBar from './ProcessBar';
import { StyledCards,StyledContainer } from './styles';
import Total from './Total';

const Game = ({ detail, onRefreshDetail }: any) => {
  const [step, setStep] = useState(0);
  const slices = useOdysseyV3Store((store: any) => store.slices);
  useEffect(() => {
    setStep(detail?.synthesizedIndex || 0);
  }, [detail?.synthesizedIndex]);
  return (
    <StyledContainer>
      <StyledCards>
        {[0, 1, 2, 3].map((item) => (
          <Card
            completed={!detail?.total_spins ? 2 : step > item ? 0 : Math.floor(detail?.total_spins / 15) > item ? 1 : 2}
            index={item}
            reward={detail?.rules?.[item]}
            remain={
              !detail?.total_spins
                ? 0
                : step > item
                  ? 0
                  : Math.floor(detail?.total_spins / 15) > item
                    ? 15
                    : detail.total_spins - item * 15
            }
            sliceOrders={slices[item]}
            key={item}
          />
        ))}
      </StyledCards>
      <ProcessBar spins={detail.total_spins} />
      <Total
        spins={detail?.total_spins}
        rewards={detail?.available_rewards}
        synthesizedIndex={step}
        onSynthesisSuccess={() => {
          setStep((prev) => prev + 1);
          onRefreshDetail();
        }}
        onSuccess={() => {
          onRefreshDetail();
        }}
      />
    </StyledContainer>
  );
};

export default memo(Game);
