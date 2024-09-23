import styled from 'styled-components';

export const StyledEntry = styled.button`
  width: 130px;
  height: 42px;
  flex-shrink: 0;
  border-radius: 26px;
  border: 1px solid #979abe;
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
  background: transparent;
`;

export const StyledContainer = styled.div`
  text-align: left;
  padding: 0 35px 35px;
  text-transform: none;
`;
export const StyledSection = styled.section`
  margin-top: 20px;
`;
export const StyledTitle = styled.div`
  color: #fff;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;
export const StyledText = styled.div`
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;
export const StyledList = styled.ul`
  padding-left: 20px;
  margin-top: 14px;
`;
export const StyledListItem = styled.li`
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  > ol {
    padding-left: 20px;
  }
`;
