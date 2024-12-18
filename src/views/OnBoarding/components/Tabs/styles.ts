import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 32px;
  border: 1px solid #373a53;
  background: #21242a;
  width: 551px;
  height: 66px;
  padding: 8px;
  box-sizing: border-box;
  margin: 0 auto;
`;

export const StyledTabWrap = styled.div`
  flex-grow: 1;
  font-size: 20px;
  font-weight: 600;
  height: 50px;
  cursor: pointer;
  position: relative;
`;

export const StyledTab = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  color: ${({ $active }) => ($active ? '#1e2028' : '#fff')};
  height: 50px;
  position: relative;
  z-index: 10;
`;

export const StyledTabActiveBg = styled.div`
  position: absolute;
  border-radius: 30px;
  height: 50px;
  background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
  width: 100%;
  top: -50px;
`;
