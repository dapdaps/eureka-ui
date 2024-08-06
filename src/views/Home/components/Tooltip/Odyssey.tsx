import React, { memo } from 'react';
import styled from 'styled-components';

import Image from 'next/image';
import Tag, { StatusType } from '@/views/Odyssey/components/Tag';

const OdysseyCard = (props: Props) => {
  const {
    status,
    title,
    subtitle,
    imageUrl,
    withoutCardStyle,
  } = props;

  return (
    <StyledContainer $withoutCardStyle={withoutCardStyle}>
      <Tag status={status} className='status' />
      <StyledContent>
        <StyledTitle>{title}</StyledTitle>
        <StyledTitleSub>{subtitle}</StyledTitleSub>
        <StyledImage src={imageUrl} alt={title} width={235} height={116} />
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
}

const StyledContainer = styled.div<{ $withoutCardStyle?: boolean; }>`
  position: relative;

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
const StyledImage = styled(Image)`
  width: 100%;
  height: 116px;
`;
