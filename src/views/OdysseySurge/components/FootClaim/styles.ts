import styled from 'styled-components';

export const StyledContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 7;
  text-align: center;
  background-color: #33C5F4;
  width: 1344px;
  height: 103px;
  margin: 0 auto;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 35px;
  padding-right: 22px;
`;

export const StyledContentText = styled.div`
  font-size: 20px;
  color: #000;
  .count {
    font-style: italic;
    font-weight: bold;
  }
`;
