import { useState } from 'react';
import styled from 'styled-components';

import { StyledFlex, StyledSvg,StyledText } from '@/views/bns/styles';

import { useShowTipsStore } from './hooks/useShowTipsStore';

const StyledTips = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ebf479;
  z-index: 999;
`;

const ConfirmOfficialUrl = ({
    className
}: {
    className?: string;
}) => {
  const setConfirmOfficialUrlStore  = useShowTipsStore(store => store.set)
  const showConfirmOfficialUrl  = useShowTipsStore(store => store.showConfirmOfficialUrl)
  return (
    <>
      {showConfirmOfficialUrl && (
        <StyledTips className={className}>
          <StyledFlex $gap="8px">
            <StyledText $color="#000" $size="20px" $weight="500">
              👀 Please confirm you are visiting the official URL:
            </StyledText>
            <StyledText $color="#000" $size="20px" $weight="700">
              dapdap.net
            </StyledText>
          </StyledFlex>

          <StyledSvg
            style={{
              position: 'absolute',
              right: 21,
              top: 21,
              cursor: 'pointer',
            }}
            onClick={() => {
              setConfirmOfficialUrlStore({
                    showConfirmOfficialUrl: false
                });
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M7.73284 6.00004L11.7359 1.99701C12.0368 1.696 12.0882 1.2593 11.8507 1.0219L10.9779 0.14909C10.7404 -0.0884125 10.3043 -0.0363122 10.0028 0.264491L6.00013 4.26743L1.99719 0.264591C1.69619 -0.036712 1.25948 -0.0884125 1.02198 0.14939L0.149174 1.0223C-0.0882276 1.2594 -0.0368271 1.6961 0.264576 1.99711L4.26761 6.00004L0.264576 10.0033C-0.0363271 10.3041 -0.0884276 10.7405 0.149174 10.978L1.02198 11.8509C1.25948 12.0884 1.69619 12.0369 1.99719 11.736L6.00033 7.73276L10.0029 11.7354C10.3044 12.037 10.7405 12.0884 10.978 11.8509L11.8508 10.978C12.0882 10.7405 12.0368 10.3041 11.736 10.0029L7.73284 6.00004Z"
                fill="black"
              />
            </svg>
          </StyledSvg>
        </StyledTips>
      )}
    </>
  );
};

export default ConfirmOfficialUrl;
