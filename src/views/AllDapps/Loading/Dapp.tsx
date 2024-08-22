import React, { memo } from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

const StyledDapps = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  column-gap: 14px;
  row-gap: 20px;
  flex-wrap: wrap;
  margin-top: 36px;
  .skeleton-head {
    margin-bottom: 76px;
    display: block;
  }
`;
const StyledDapp = styled.div`
  width: 405px;
  border: 1px solid #202329;
  border-radius: 20px;
  padding: 20px;
`;
const StyledDappInner = styled.div`
  display: flex;
  column-gap: 20px;
  align-items: flex-end;
  margin-bottom: 14px;
  .skeleton-title {
    flex-grow: 1;
  }
`;

const LoadingCard = (props: { style?: React.CSSProperties; }) => {
  return (
    <StyledDapp style={props.style}>
      <Skeleton width="100%" height="24px" borderRadius="16px" containerClassName="skeleton-head" />
      <StyledDappInner>
        <Skeleton width="72px" height="72px" borderRadius="16px" containerClassName="skeleton" />
        <Skeleton width="100%" height="24px" borderRadius="6px" containerClassName="skeleton-title" />
      </StyledDappInner>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <Skeleton width="100%" height="34px" borderRadius="6px" containerClassName="skeleton" />
        <Skeleton width="100%" height="32px" borderRadius="6px" containerClassName="skeleton" />
      </div>
    </StyledDapp>
  );
};

const DappLoading = ({ length = 18, style, cardStyle }: DappLoadingProps) => {
  return (
    <StyledDapps style={style}>
      {new Array(length).fill('1').map((dapp: any, index: number) => (
        <LoadingCard key={index} style={cardStyle} />
      ))}
    </StyledDapps>
  );
};

export default memo(DappLoading);

interface DappLoadingProps {
  length?: number;
  style?: React.CSSProperties;
  cardStyle?: React.CSSProperties;
}
