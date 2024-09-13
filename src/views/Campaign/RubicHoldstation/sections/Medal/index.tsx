import React, { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';

import { formateValueWithThousandSeparatorAndFont } from '@/utils/formate';
import RubicHoldstationContext from '@/views/Campaign/RubicHoldstation/context';
import MedalCard from '@/views/Profile/components/MedalCard';
import type { MedalType } from '@/views/Profile/types';

import { StyledContainer, StyledContent, StyledTitle } from './styles';

const MedalSection = () => {
  const context = useContext(RubicHoldstationContext);
  const { data, loading } = context.medals;

  const renderTooltip = (value: any, total: any, prefix?: string) => {
    return `
      ${formateValueWithThousandSeparatorAndFont(value, 1, true, { prefix })}
      /
      ${formateValueWithThousandSeparatorAndFont(total, 1, true, { prefix })}
    `;
  };

  return (
    <StyledContainer>
      <StyledTitle>Participate in Campaign and win Medals</StyledTitle>
      <StyledContent>
        {loading
          ? [...new Array(2).keys()].map((idx) => <Skeleton key={idx} width={488} height={150} borderRadius={12} />)
          : data.map((medal: MedalType, idx: number) => (
              <MedalCard
                tooltip={
                  medal.trading_volume === 0
                    ? renderTooltip(medal.completed_threshold, medal.threshold)
                    : renderTooltip(medal.completed_volume, medal.trading_volume, '$')
                }
                className="campaign-medal"
                key={idx}
                medal={medal}
                barWidth="400px"
                style={{
                  flex: 1,
                  height: 150,
                  background: '#1E2028',
                  border: '1px solid #373A53'
                }}
                nameStyle={{
                  fontSize: 16
                }}
              />
            ))}
      </StyledContent>
    </StyledContainer>
  );
};

export default MedalSection;
