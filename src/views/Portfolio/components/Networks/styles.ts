import styled from 'styled-components';

export const NetworkTabWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;

  > div {
    cursor: pointer;
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
  transition: 0.3s;

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

export const NetWorkTab = styled.div<{ active: boolean }>`
  min-width: 152px;
  max-width: max-content;
  height: 50px;
  border-radius: 10px;
  background: ${(p) => (p.active ? 'linear-gradient(180deg, #EEF3BF 0%, #E9F456 100%)' : '#35374980')};
  border: 1px solid transparent;
  padding: 8px;
  display: flex;
  align-items: center;
  transition: 0.3s;

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
  .value-filed {
    display: flex;
    align-items: flex-end;
    gap: 5px;
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

  &:hover {
    border-color: #ebf479;
  }
`;
