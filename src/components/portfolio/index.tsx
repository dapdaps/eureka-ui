import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  position: relative;
  font-family: Gantari;
  margin: 0 auto;
  .asset-function-button {
    border: 1px solid #373a53;
    :hover {
      background: #373a53;
    }

    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px;
    border-radius: 8px;
    cursor: pointer;
    position: relative;
  }

  .dot {
    width: 4px;
    height: 4px;
    border-radius: 100%;
    background: #c7cdff;
  }

  .format-decimals {
    white-space: nowrap;
    .integer-part {
      font-size: 24px;
    }
    .decimal-part {
      font-size: 16px;
    }
  }

  .frcs {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .frcb-start {
    display: flex;
    align-items: start;
    justify-content: space-between;
    gap: 12px;
  }

  .fccc {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .frcs-gm {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .frcb {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: space-between;
  }

  .frcc {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
  }
  color: white;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;

  .address-filed {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 18px;
    font-weight: 700;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: left;

    .arrow-filed {
      width: 20px;
      height: 20px;
      background: #373a53;
      border-radius: 6px;
    }
  }

  .metamask-filed {
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: left;
    color: #7c7f96;
  }
`;

export const PortfolioTabs = styled.div`
  width: 100%;
  font-family: Gantari;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  color: #7c7f96;
  display: flex;
  align-items: center;
  gap: 2rem;
  .item {
    padding: 0px 20px 20px 20px;
    position: relative;
  }
  .item.active {
    color: white;
  }

  > div {
    cursor: pointer;
  }

  .active-bar {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 4px;
    background: #ebf479;
    border-radius: 2px;
  }
  border-bottom: 1px solid #332c4b;
`;

export const NetWorkTab = styled.div<{ active: boolean }>`
  min-width: 152px;
  max-width: max-content;
  height: 50px;
  border-radius: 10px;
  background: ${(p) => (p.active ? 'linear-gradient(180deg, #EEF3BF 0%, #E9F456 100%)' : '#35374980')};
  border: 1px solid transparent;
  padding: 8px;

  :hover {
    border: 1px solid #ebf479;
  }

  .network-icon-chain {
    width: 36px;
    height: 36px;
    border-radius: 12px;
  }
  .network-name {
    font-family: Gantari;
    font-size: 13px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
    color: #7c7f96;
    padding-bottom: 2px;
  }
  .usd-value {
    font-family: Gantari;
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: left;
    color: ${(p) => (p.active ? '#2D2F42' : 'white')};
  }
  .usd-value-percent {
    font-family: Gantari;
    font-size: 13px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
    color: #7c7f96;
  }
`;

export const AllNetWorkTab = styled.div<{ active: boolean }>`
  width: 152px;
  height: 50px;
  background: ${(p) => (p.active ? 'linear-gradient(180deg, #EEF3BF 0%, #E9F456 100%)' : '#35374980')};

  border-radius: 10px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  border: 1px solid transparent;

  :hover {
    border: 1px solid #ebf479;
  }

  > div {
    cursor: pointer;
  }
  .network-name {
    font-family: Gantari;
    font-size: 13px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
    color: #7c7f96;
  }
  .usd-value {
    font-family: Gantari;
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: left;
    color: ${(p) => (p.active ? '#2D2F42' : 'white')};
  }
`;

export const NetworkTabWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;

  > div {
    cursor: pointer;
  }
`;

export const HoldingTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;

  padding: 0px 10px;

  position: relative;

  top: 20px;

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

export const HoldingTable = styled.table`
  width: 100%;
  background: #181a27;

  position: relative;
  z-index: 10;

  padding-bottom: 8px;

  border-radius: 16px;

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
    padding-left: 20px;

    position: absolute;
    left: 30%;
  }

  thead tr:first-child th:nth-child(3) {
    padding-left: 20px;

    position: absolute;
    left: 60%;
  }

  thead tr:first-child th:last-child {
    padding-right: 28px;
    position: absolute;
    right: 0;

    > div {
      cursor: pointer;
      width: 100%;
      justify-content: end;
    }

    /* border-top-left: none; */
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

  tbody tr td:nth-child(2) {
    padding-left: 20px;
    position: absolute;
    left: 30%;
  }

  tbody tr td:nth-child(3) {
    padding-left: 20px;
    position: absolute;
    left: 60%;
  }

  tbody tr td:last-child {
    padding-right: 20px;
    position: absolute;
    right: 14px;
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

export const YourAssetsTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;

  padding: 0px 10px;

  position: relative;

  top: 18px;

  .assets-text {
    font-family: Gantari;
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
  }
`;

export const SortArrowDownWrapper = styled.div<{ active: boolean }>`
  color: ${(p) => (p.active ? '#7C7F96' : '#373A53')};
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

export const CheckBox = styled.div<{ active: boolean }>`
  width: 35px;
  height: 20px;

  cursor: pointer;

  position: relative;
  border-radius: 25px;
  border: 1px solid #2c2f4b;
  background: rgba(235, 244, 121, ${(p) => (p.active ? 1 : 0.5)});

  > div {
    position: absolute;
    cursor: pointer;
    border: 1px solid #2c2f4b;
    width: 16px;
    height: 16px;
    left: 2px;
    top: 1px;
    background: linear-gradient(0deg, #373a53, #373a53);

    border-radius: 100%;

    transform: ${(p) => (p.active ? 'translateX(80%)' : 'none')};
  }
`;

export const ProtocolArrowWrapper = styled.div<{ isExpand: boolean }>`
  height: 32px;
  width: 32px;
  border-radius: 8px;
  background: ${(p) => (p.isExpand ? '#373a53' : 'none')};
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border: 1px solid #373a53;
  transform: ${(p) => (p.isExpand ? 'rotate(180deg)' : 'none')};
`;

export const ProtocolCard = styled.div`
  max-width: 1000px;
  width: 100%;
  border: 1px solid #332c4b;
  border-radius: 16px;
  background: linear-gradient(0deg, #181a27, #181a27);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  .protocol-title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title-filed {
      display: flex;
      align-items: center;
      gap: 12px;

      .icon-filed {
        position: relative;

        .protocol-icon {
          width: 36px;
          height: 36px;
          border-radius: 100%;
          position: relative;
        }

        .chain-icon {
          position: absolute;
          height: 16px;
          width: 16px;
          right: -4px;
          bottom: -4px;
          border: 2px solid #181a27;
          border-radius: 4px;
          background: linear-gradient(0deg, #181a27, #181a27), linear-gradient(0deg, #2d2f42, #2d2f42);
        }
      }

      .protocol-name {
        font-family: Gantari;
        font-size: 18px;
        font-weight: 700;
        line-height: 22px;
        letter-spacing: 0em;
        text-align: left;
      }

      .chain-name {
        font-family: Gantari;
        font-size: 13px;
        font-weight: 400;
        line-height: 16px;
        letter-spacing: 0em;
        text-align: left;
        color: #7c7f96;
      }
    }

    .value-filed {
      display: flex;
      align-items: center;
      gap: 12px;
      .value {
        font-family: Gantari;
        font-size: 18px;
        font-weight: 500;
        line-height: 22px;
        letter-spacing: 0em;
      }
    }
  }
`;

export const ProtocolTable = styled.div<{ titleColor: string; titleBg: string }>`
  background: #25283a;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  font-size: 14px;

  position: relative;

  .token-series {
    display: flex;
    flex-wrap: wrap;
    max-width: 250px;
  }

  .symbo-series {
    /* max-width: 25%; */
    display: flex;
    font-size: 14px;
    flex-wrap: wrap;
  }

  .reward-item {
    font-size: 14px;
  }

  .balance-value {
    span {
      white-space: nowrap;

      font-size: 14px;
    }
  }

  .type-title {
    /* position: absolute; */

    width: max-content;
    padding: 20px 20px 10px 30px;

    position: relative;

    right: 10px;
    bottom: 10px;

    border-radius: 16px;
    font-size: 16px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
    color: ${(p) => p.titleColor};
    background: ${(p) => p.titleBg};
  }

  padding-bottom: 16px;
  table {
    width: 100%;

    /* padding-bottom: 12px; */

    .token-icon {
      width: 20px;
      height: 20px;
      border-radius: 100%;
    }
    thead th {
      padding: 12px 0px;
      font-family: Gantari;
      font-size: 14px;
      font-weight: 400;
      line-height: 17px;
      letter-spacing: 0em;
      text-align: left;
      color: #7c7f96;
      white-space: nowrap;
    }

    thead {
      border-bottom: 1px solid #373a53;
    }

    thead th:first-child {
      padding-left: 16px;
    }

    thead th:last-child {
      padding-right: 16px;
      text-align: right;
    }

    tbody tr td:first-child {
      padding-left: 16px;
    }

    tbody tr td {
      padding: 16px 0px;
      /* max-width: 330px; */
    }

    thead th:last-child {
      padding-right: 16px;
      text-align: right;
    }

    tbody tr td:last-child {
      text-align: right;
      padding-right: 16px;
    }
  }
`;

export const ProtocolTableHeader = styled.div<{ size: number }>`
  display: grid;
  grid-template-columns: repeat(${(p) => p.size - 1}, 1fr) auto;

  padding: 0 16px 16px 16px;

  font-family: Gantari;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
  color: #7c7f96;
  white-space: nowrap;

  border-bottom: 1px solid #373a53;
`;

export const ProtocolTableRow = styled.div<{ size: number }>`
  display: grid;
  grid-template-columns: repeat(${(p) => p.size - 1}, 1fr) auto;

  /* padding: 0 16px 12px 16px; */

  > div {
    padding-top: 16px;
  }

  > div:first-child {
    padding-left: 12px;
  }

  > div:last-child {
    padding-right: 12px;
  }
`;

export const ProtocolBalanceFiled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const TotalBalanceWrapper = styled.div`
  /* position: absolute; */
  left: 0;
  top: 0;
`;

export const DiffWrapper = styled.div<{ dir: 'desc' | 'asc' }>`
  font-family: Gantari;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;

  color: ${(p) => (p.dir === 'desc' ? '#FF6F6F' : '#63C341')};
`;

export const ChartDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 12px; */

  position: relative;
`;

export const NoAssetWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #373a53;

  position: absolute;
  flex-direction: column;

  background: #181a27;

  border-radius: 16px;

  gap: 12px;
  top: 10px;
  left: -1px;
  width: calc(100% + 2px);
  padding: 100px 0px;
`;

export const NoAssetText = styled.div`
  font-family: Gantari;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  color: #5e617e;
`;

export const HoldingTableWrapper = styled.div`
  position: relative;
  border-radius: 16px;
  border: 1px solid #373a53;
`;

export const CheckDot = styled.div<{ active: boolean }>`
  cursor: pointer;

  width: 16px;
  height: 16px;

  border-radius: 100%;

  border: 1px solid #373a53;
  background: linear-gradient(0deg, #19191f, #19191f), linear-gradient(0deg, #373a53, #373a53);

  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    display: ${(p) => (p.active ? 'block' : 'none')};
    width: 8px;
    height: 8px;
    background: #ebf479;

    border-radius: 100%;
  }
`;

export const DefaultProfileIcon = styled.div`
  background-image: conic-gradient(from 180deg at 50% 50%, rgb(0, 209, 255) 0deg, rgb(255, 0, 138) 360deg);
  width: 52px;
  height: 52px;
  border-radius: 50%;
`;
