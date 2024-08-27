import { memo } from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

import Loading from '@/components/Icons/Loading';
import { StyledCoin } from '@/views/Quest/styles';

import useClaim from '../../hooks/useClaim';
import useSynthesis from '../../hooks/useSynthesis';
import { STEPS } from './config';

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 178px;
  padding-top: 44px;
`;

const StyledItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledLabel = styled.div`
  color: #979abe;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%; /* 20px */
  text-transform: capitalize;
  margin-bottom: 14px;
`;

const StyledAmount = styled.div`
  color: #ffeeda;
  font-family: Montserrat;
  font-size: 42px;
  font-style: normal;
  font-weight: 800;
  line-height: 100%; /* 42px */
  text-transform: capitalize;
  opacity: 0.9;
`;

const StyledUnits = styled(StyledAmount)`
  font-size: 20px;
  margin-left: 5px;
  line-height: 28px;
`;

const StyledRewards = styled.div`
  display: flex;
  align-items: flex-end;
`;

const StyledButton = styled.button`
  width: 280px;
  height: 52px;
  border-radius: 10px;
  background: #ffeeda;
  color: #000;
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%; /* 18px */
  text-transform: capitalize;
  margin-top: 16px;
  transition: 0.3s;

  &:disabled {
    opacity: 0.3;
  }
  &:not(:disabled):hover {
    opacity: 0.8;
  }
  &:not(:disabled):active {
    opacity: 0.6;
  }
`;

const Total = ({ spins, rewards, synthesizedIndex, onSuccess, onSynthesisSuccess }: any) => {
  const { loading, onClaim } = useClaim(onSuccess);
  const { loading: synthesizing, onSynthesis } = useSynthesis(onSynthesisSuccess);
  return (
    <StyledContainer>
      <StyledItem>
        <StyledLabel>Your Fragments:</StyledLabel>
        <StyledAmount>
          {spins === undefined ? <Skeleton width="60px" height="26px" borderRadius="6px" /> : spins}
        </StyledAmount>
        <StyledButton disabled={spins - synthesizedIndex * 15 < 15 || synthesizing} onClick={onSynthesis}>
          {synthesizing ? <Loading size={20} /> : `Synthesis Scroll ${STEPS[synthesizedIndex] || 'I'}`}
        </StyledButton>
      </StyledItem>
      <StyledItem>
        <StyledLabel>Your Reward</StyledLabel>
        <StyledRewards>
          <StyledCoin $size={44} />
          <StyledAmount style={{ marginLeft: '16px' }}>
            {rewards === undefined ? <Skeleton width="60px" height="26px" borderRadius="6px" /> : rewards}
          </StyledAmount>
          <StyledUnits>PTS</StyledUnits>
        </StyledRewards>
        <StyledButton disabled={loading || Number(rewards) === 0} onClick={onClaim}>
          {loading ? <Loading size={20} /> : 'Claim'}
        </StyledButton>
      </StyledItem>
    </StyledContainer>
  );
};

export default memo(Total);
