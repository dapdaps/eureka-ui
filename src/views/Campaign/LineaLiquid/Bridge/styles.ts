import styled from 'styled-components';

export const StyledContainer = styled.div`
  /* padding: 20px; */
  .card-body {
    margin-top: 0;
  }
  .card-content {
    margin-top: 0;
    border: none;
    background: inherit;
  }
  .card-MainTitle {
    display: none;
  }
  .card-FeeMsg {
    width: auto;
  }
  .card-ChainArrow {
    cursor: default;
  }
`;
export const StyledModalTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  color: #fff;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
export const StyledTokenList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 10px;
  margin-top: 30px;
`;
export const StyledSummary = styled.ul`
  list-style: none;
  padding: 0;
  margin: 31px 0 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: stretch;

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    color: #fff;
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    .label {
    }

    .value {
      text-align: right;

      &.success {
        color: #0f3;
      }
    }
  }
`;
export const StyledAction = styled.div`
  margin-top: 22px;

  --button-color: #ebf479;
  --button-text-color: #02051e;
`;
