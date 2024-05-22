import styled from 'styled-components';

export const StyledContainer = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  text-align: left;
  padding: 20px;
  cursor: pointer;
  transition: 0.5s;
  .gray {
    color: #8e8e8e;
  }
  &:hover {
    background: rgba(151, 154, 190, 0.1);
  }
  @media (max-width: 768px) {
    .gray {
      display: none;
    }
  }
`;
export const StyledDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const StyledPool = styled.div`
  display: flex;
  gap: 6px;
`;
export const StyledRange = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  svg {
    flex-shrink: 0;
  }
`;
