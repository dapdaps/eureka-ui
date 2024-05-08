import React, { memo } from 'react';
import { StyledCard, StyledTitle } from '@/views/AllInOne/components/Card/styles';

const AllInOneCardView: React.FC<Props> = (props) => {
  const { children, title } = props;
  return (
    <StyledCard>
      <StyledTitle>{title}</StyledTitle>
      {children}
    </StyledCard>
  );
};

export default memo(AllInOneCardView);

interface Props {
  key?: string;
  children?: React.ReactNode;
  title?: string;
}
