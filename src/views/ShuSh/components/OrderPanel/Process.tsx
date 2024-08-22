import { memo } from 'react';
import styled from 'styled-components';

import { STEPS } from '../../config';
import ProcessIcon from './ProcessIcon';

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 23px 23px 0px;
  padding-bottom: 20px;
`;

const StyledIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  width: 100%;
`;

const StyledLine = styled.div`
  height: 1px;
  flex-grow: 1;
  background-color: #373a53;
`;

const Process = ({ status }: any) => {
  return (
    <StyledContainer>
      <StyledIcons>
        {STEPS.map((step, i) => (
          <>
            <ProcessIcon
              active={status >= i}
              loading={status === i}
              key={`${step.status}-icon`}
              icon={step.icon}
              label={step.label}
            />
            {i < STEPS.length - 1 && <StyledLine key={`${step.status}-line`} />}
          </>
        ))}
      </StyledIcons>
    </StyledContainer>
  );
};

export default memo(Process);
