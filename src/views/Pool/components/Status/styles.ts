import styled from 'styled-components';

const StatusColor = {
  in: '#55A76C',
  out: 'rgb(238, 179, 23)',
  removed: '#FF75BF',
};

export const StyledStatus = styled.div<{ status: 'in' | 'out' | 'removed' }>`
  color: ${({ status }) => StatusColor[status]};
  display: flex;
  align-items: center;
  gap: 6px;
  &::before {
    content: '';
    display: inline;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: ${({ status }) => StatusColor[status]};
  }
`;
