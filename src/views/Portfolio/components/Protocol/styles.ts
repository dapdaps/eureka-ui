import { motion } from 'framer-motion';
import styled from 'styled-components';
export { ProtocolSelectBox } from '../Wallet/styles';

export const YourAssetsTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  padding: 40px 10px 10px;

  .assets-text {
    font-family: Gantari;
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
  }
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

export const ProtocolCard = styled.div`
  max-width: 1000px;
  width: 100%;
  border: 1px solid #373a53;
  border-radius: 16px;
  background: #1c1d29;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
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
        color: #fff;
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
      color: #fff;
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

export const ProtocolArrowWrapper = styled.div<{ $isExpand: boolean }>`
  height: 32px;
  width: 32px;
  border-radius: 8px;
  background: ${(p) => (p.$isExpand ? '#373a53' : 'none')};
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border: 1px solid #373a53;
  transform: ${(p) => (p.$isExpand ? 'rotate(180deg)' : 'none')};
  transition: 0.3s;
`;

export const ProtocolTable = styled.div<{ titleColor: string; $titleBg: string }>`
  background: #25283a;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  font-size: 14px;
  margin-bottom: 16px;

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
    background: ${(p) => p.$titleBg};
  }
  table {
    width: 100%;
  }
  th {
    padding-left: 20px;
    padding-bottom: 10px;
    box-sizing: border-box;
  }
  td {
    color: #fff;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 21px */
    padding: 10px 20px;
    box-sizing: border-box;
  }
  padding-bottom: 16px;
`;

export const ProtocolTableHeader = styled.thead`
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

export const ProtocolTableRow = styled.tr``;

export const StyledContainer = styled(motion.div)``;

export const StyledFold = styled.div`
  width: 325px;
  height: 70px;
  flex-shrink: 0;
  flex-grow: 0;
  border-radius: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: auto;

  .btn {
    width: 138px;
    height: 30px;
    flex-shrink: 0;
    border-radius: 8px;
    border: 1px solid #282a3c;
    background: #1b1d25;
    color: #979abe;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px;
    text-align: center;
    padding: 0;
  }
`;
