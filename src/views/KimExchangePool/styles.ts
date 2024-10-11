import styled from 'styled-components';

export const StyledContainer = styled.div`
  color: #fff;
  width: 1244px;
  margin: 0 auto;
`;

export const StyledTabs = styled.div`
  display: inline-flex;
  border-radius: 8px;
  border: 1px solid #373a53;
  background: rgba(33, 35, 48, 0.5);
  height: 40px;
  box-sizing: border-box;
  padding: 4px;
`;

export const StyledTab = styled.div<{ $active: boolean }>`
  height: 30px;
  line-height: 30px;
  padding: 0px 10px;
  border-radius: 8px;
  border: 1px solid ${({ $active }) => ($active ? '#373a53' : 'transparent')};
  background: ${({ $active }) => ($active ? '#32364b' : 'transparent')};
  color: ${({ $active }) => ($active ? '#fff' : '#979ABE')};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  transition: 0.5s;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 232px;
  color: #101010;
`;
