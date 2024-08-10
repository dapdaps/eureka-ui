import styled from 'styled-components';

export { StyledCoin } from '@/views/Quest/styles';
export { StyledFist } from '@/views/QuestLeaderboard/styles';

export const StyledTabs = styled.div`
  display: flex;
  align-items: center;
  gap: 100px;
  padding: 20px 0;
  border-bottom: 1px solid #202329;
`;

export const StyledTabWrap = styled.div<{ $active?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  /* padding-bottom: 16px; */
  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -20px;
    width: 100%;
    height: 4px;
    background-color: ${({ $active }) => ($active ? '#EBF479' : 'transparent')};
  }
`;

export const StyledTab = styled.div`
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  background: linear-gradient(90deg, #FFF 0%, #979ABE 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
`;
export const StyledNumber = styled.div`
  
`

