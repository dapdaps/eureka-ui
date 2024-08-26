import Big from 'big.js';
import Image from 'next/image';
import React, { memo } from 'react';
import styled from 'styled-components';

import type { FormattedRewardList } from '@/views/AllDapps/hooks/useDappReward';
import Tag, { StatusType } from '@/views/Odyssey/components/Tag';

export const formatValue = (value: string): string => {
  if (!value) return ''
  const unitsConfig = [
    { unit: 'B', threshold: 1e9 },
    { unit: 'M', threshold: 1e6 },
    { unit: 'K', threshold: 1e3 },
  ];

  // ⚠️ the value may not always be a number
  // it could be signed($123.45) or represent a range(15-25K),
  // so it cannot be calculated this way
  if (!/^\d+(.\d+)?$/.test(value) && !unitsConfig.some((it) => new RegExp(`^\d+(.\d+)?${it.unit}$`).test(value))) {
    return value;
  }

  value = value.toUpperCase();
  if (unitsConfig.some(config => value.endsWith(config.unit))) {
    return `${value}`;
  }
  for (const config of unitsConfig) {
    if (Big(value).gte(config.threshold)) {
      const newValue = Big(value).div(config.threshold).toFixed(2);
      return `${parseFloat(newValue) + config.unit}`;
    }
  }
  const newValue = Big(value).toFixed(2);
  return `${parseFloat(newValue).toString()}`;
};

const OdysseyCard = (props: Props) => {
  const {
    status,
    title,
    subtitle,
    imageUrl,
    withoutCardStyle,
    reward,
    onClick = () => {},
  } = props;

  return (
    <StyledContainer $withoutCardStyle={withoutCardStyle} onClick={onClick}>
      <Tag status={status} className='status' />
      <StyledContent>
        <StyleHead>
          {
            reward?.value && <StyledValue>{formatValue(reward.value)} <span>{reward?.name}</span></StyledValue>
          }
        </StyleHead>
        <StyledTitle>{title}</StyledTitle>
        {/* <StyledTitleSub>{subtitle}</StyledTitleSub> */}
        <StyledImage src={imageUrl} alt={title} width={235} height={116} $status={status} />
      </StyledContent>
    </StyledContainer>
  );
};

export default memo(OdysseyCard);

export interface Props {
  status: StatusType;
  title: string;
  subtitle: string;
  imageUrl: string;
  withoutCardStyle?: boolean;
  reward?: Partial<FormattedRewardList>;

  onClick?(e: React.MouseEvent<HTMLElement, MouseEvent>): void;
}

const StyleHead = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin-bottom: 5px;
`

const StyledValue = styled.div`
  font-family: Montserrat;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  color: #EBF479;
  margin-right: 5px;
  span {
    color: #fff;
  }
`

const StyledContainer = styled.div<{ $withoutCardStyle?: boolean; }>`
  position: relative;
  cursor: pointer;

  ${({ $withoutCardStyle }) => {
    if (!$withoutCardStyle) {
      return `
        width: 263px;
        height: 215px;
        flex-shrink: 0;
        border-radius: 12px;
        border: 1px solid #464B56;
        background: #21232A;
        box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.25);
      `;
    }
    return '';
  }}
  > .status {
    position: absolute;
    z-index: 1;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    height: 26px;
  }
`;
const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledTitle = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
  color: #fff;
  max-width: 214px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: Montserrat;
  margin-bottom: 5px;
`;
const StyledTitleSub = styled.div`
  font-size: 16px;
  line-height: 16px;
  font-weight: 500;
  color: #fff;
  margin-bottom: 10px;
  max-width: 214px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const StyledImage = styled(Image)<{ $status?: StatusType }>`
  width: 235px;
  height: 116px;
  filter: ${({ $status }) => $status ? ($status === StatusType.ongoing ? 'unset' : 'grayscale(100%)') : 'unset'};
  object-fit: cover;
`;
