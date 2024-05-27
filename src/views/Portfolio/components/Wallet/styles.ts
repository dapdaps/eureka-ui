import styled from 'styled-components';

export const HoldingTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  padding: 40px 10px 10px;

  .holding-text {
    font-family: Gantari;
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
  }

  .holding-value {
    font-family: Gantari;
    font-size: 24px;
    font-weight: 500;
    line-height: 29px;
    letter-spacing: 0em;
  }
`;

export const ProtocolSelectBox = styled.div`
  width: max-content;
  background: #303142;
  padding: 10px 16px;
  font-family: Gantari;
  font-size: 16px;
  font-weight: 400;
  border-radius: 12px;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
  cursor: default;
  position: absolute;
  right: 0;
  top: 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 100;
  .function-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;

    > div {
      cursor: pointer;
    }
  }
  .minimum-value-box {
    background: linear-gradient(0deg, rgba(11, 12, 19, 0.5), rgba(11, 12, 19, 0.5)),
      linear-gradient(0deg, #373a53, #373a53);
    border: 1px solid #373a53;
    padding: 8px 16px;
    border-radius: 12px;
    white-space: nowrap;
    margin-right: 12px;
  }
`;

export const HoldingTableWrapper = styled.div`
  position: relative;
  border-radius: 16px;
  border: 1px solid #373a53;
  background-color: #262836;
`;

export const HoldingTable = styled.table`
  width: 100%;
  border-radius: 16px;
  background: #262836;

  position: relative;
  z-index: 10;

  padding-bottom: 8px;

  thead {
    border-bottom: 1px solid #373a53;
  }

  thead th {
    font-family: Gantari;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: left;
    color: #7c7f96;
    padding: 14px 0;
    position: relative;

    > div {
      cursor: pointer;
      width: max-content;
    }
  }

  thead tr:first-child th:first-child {
    padding-left: 20px;
  }

  thead tr:first-child th:nth-child(2) {
  }

  thead tr:first-child th:nth-child(3) {
  }

  thead tr:first-child th:last-child {
    padding-right: 20px;
    > div {
      cursor: pointer;
      width: 100%;
    }
  }

  tbody td {
    font-family: Gantari;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: left;
    color: white;
    padding: 14px 0px;
    position: relative;
  }

  tbody tr td:first-child {
    padding-left: 20px;
  }

  tbody tr td:last-child {
    padding-right: 20px;
  }

  .token-info {
    display: flex;
    align-items: center;
    gap: 8px;
    .token-icon {
      width: 30px;
      height: 30px;
      border-radius: 100%;
    }

    .chain-info {
      display: flex;
      align-items: center;
      gap: 8px;
      padding-top: 2px;
    }

    .chain-icon {
      height: 16px;
      width: 16px;
      border-radius: 8px;
    }
    .chain-name {
      font-family: Gantari;
      font-size: 14px;
      font-weight: 400;
      line-height: 17px;
      letter-spacing: 0em;
      text-align: left;
      color: #7c7f96;
    }
  }
`;

export const SortArrowDownWrapper = styled.div<{ active: boolean }>`
  color: ${(p) => (p.active ? '#7C7F96' : '#373A53')};
`;


export const StyledWalletContainer = styled.div`
  border-radius: 12px;
  border: 1px solid #373A53;
  background: #262836;
`;

export const  StyledWalletTable = styled.div``;

export const  StyledWalletTableItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 27px;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  &:first-child {
    color: #7C7F96;
    border-bottom: 1px solid #373a53;
    padding-bottom: 10px;
  }
`;

export const  StyledTableItemTxt = styled.div`
  width: 21%;
  margin-right: 20px;
  display: flex;
  align-items: center;
  column-gap: 14px;
  &:first-child {
    width: 52%;
  }
  &:last-child {
    width: 10%;
    margin-right: 0;
  }
  `;

export const StyledTokenIcon = styled.div`
  width: 26px;
  height: 26px;
  position: relative;
  border: 1px solid red;
  .token {
    width: 12px;
    height: 12px;
    border-radius: 2px;
    border: 2px solid #262836;
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;
