import styled from 'styled-components';

export const StyledContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 7;
  background-color: #000;
  .content {
    display: flex;
    align-items: center;
    width: 1266px;
    margin: 0 auto -1px;
    height: 120px;
    padding: 0 26px 0 40px;
    justify-content: space-between;
    .txt {
      color: #fff;
      font-family: Montserrat;
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
    }
  }
`;

export const StyledContent = styled.div``;
