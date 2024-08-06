import React from 'react';
import styled from 'styled-components';

export const NoAssetText = styled.div`
  font-family: Gantari;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  color: #5e617e;
`;

export const NoAssetWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  border: 0;
  flex-direction: column;

  border-radius: 16px;

  gap: 12px;
  top: 10px;
  left: -1px;
  width: calc(100% + 2px);
  padding: 50px 0px;
`;

export const NoAssetsIcon = (
  <svg width="34" height="32" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17 8L18.1694 13.1769L22.6569 10.3431L19.8231 14.8306L25 16L19.8231 17.1694L22.6569 21.6569L18.1694 18.8231L17 24L15.8306 18.8231L11.3431 21.6569L14.1769 17.1694L9 16L14.1769 14.8306L11.3431 10.3431L15.8306 13.1769L17 8Z"
      stroke="#5E617E"
    />
    <path d="M17 6L17 0" stroke="#5E617E" />
    <path d="M17 32L17 26" stroke="#5E617E" />
    <path d="M0 16L7 16" stroke="#5E617E" />
    <path d="M27 16L34 16" stroke="#5E617E" />
    <path d="M23.8943 22.1443L26.3691 24.6191" stroke="#5E617E" />
    <path d="M7.63084 5.88059L10.1057 8.35547" stroke="#5E617E" />
    <path d="M23.8945 8.35573L26.3694 5.88086" stroke="#5E617E" />
    <path d="M7.63084 24.6194L10.1057 22.1445" stroke="#5E617E" />
  </svg>
);

export const NoDataLayout = ({ shrink, tips, icon }: { shrink?: boolean, tips?: any, icon?: boolean }) => {
  return (
    <NoAssetWrapper
      style={{
        padding: shrink ? '20px 0px' : '',
      }}
    >
      {icon && NoAssetsIcon}

      <NoAssetText>{tips || 'No asset found'}</NoAssetText>
    </NoAssetWrapper>
  );
};
