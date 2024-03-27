import { memo, useEffect, useState } from 'react';
import { useOdysseyV3Store } from '@/stores/odyssey';
import Card from './Card';
import ProcessBar from './ProcessBar';
import Total from './Total';
import { StyledContainer, StyledCards } from './styles';

const Game = ({ detail, onRefreshDetail }: any) => {
  const [step, setStep] = useState(0);
  const slices = useOdysseyV3Store((store: any) => store.slices);
  useEffect(() => {
    if (detail?.synthesizedIndex) {
      setStep(detail.synthesizedIndex);
    }
  }, [detail]);
  return (
    <StyledContainer>
      <StyledCards>
        {[0, 1, 2, 3].map((item) => (
          <Card
            completed={step > item}
            index={item}
            reward={detail?.rules?.[item]}
            remain={detail?.total_spins ? detail.total_spins - 15 * item : 0}
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
