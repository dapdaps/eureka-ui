import styled from 'styled-components';

export const Table = styled.div``;
export const Header = styled.div`
  font-size: 14px;
  font-weight: 400;
  padding: 10px 20px 0px;
  display: flex;
  color: #7c7f96;
  @media (max-width: 640px) {
    display: none;
  }
`;
export const Body = styled.div`
  min-height: 50px;
`;
export const Column = styled.div``;
export const Row = styled.div`
  display: flex;
  padding: 0px 20px;
  transition: 0.5s;
  height: 56px;
  align-items: center;
  &:last-child {
    border-radius: 0px 0px 12px 12px;
  }
  &:hover {
    background-color: var(--agg-hover-color, rgba(53, 55, 73, 0.5));
  }
  @media (max-width: 640px) {
    background-color: #181a27;
    border: 1px solid #332c4b;
    border-radius: 10px;
    flex-direction: column;
    height: auto;
    padding: 20px 0px;
    margin-top: 10px;
    .special-key {
      display: none;
    }

    &:last-child {
      border-radius: 10px;
    }
  }
`;
export const RowHeader = styled.div`
  display: flex;
  @media (max-width: 640px) {
    justify-content: space-between;
    padding: 0px 20px 10px;
    border-bottom: 1px solid #2e3145;
  }
  @media (min-width: 640px) {
    .special-total {
      display: none;
    }
  }
`;
export const NormalCell = styled.div`
  display: flex;
  align-items: center;
  .column-name {
    display: none;
    color: #7c7f96;
    font-size: 13px;
  }
  @media (max-width: 640px) {
    justify-content: space-between;
    padding: 10px 20px 5px;
    align-items: flex-start;
    .column-name {
      display: block;
    }
    .row-value {
      color: #fff;
      font-size: 15px;
    }
  }
`;
export const Cell = styled.div`
  color: var(--agg-primary-color, #fff);
  font-size: 14px;
  font-weight: 400;
  @media (max-width: 640px) {
    width: 100% !important;
    &:first-child {
      margin-bottom: 10px;
    }
  }
`;
export const Total = styled.div`
  color: var(--agg-primary-color, #fff);
  font-size: 14px;
  font-weight: 400;
  @media (max-width: 640px) {
    text-align: right;
  }
`;
export const TotalValue = styled.div`
  color: var(--agg-thirdry-color, rgba(255, 255, 255, 0.5));
  font-size: 12px;
  font-weight: 400;
  @media (max-width: 640px) {
    text-align: right;
  }
`;
export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  @media (max-width: 640px) {
    justify-content: center;
    width: 100%;
    padding: 10px 20px 0px;
  }
`;
export const Empty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: #7c7f96;
  min-height: 50px;
`;
export const RewardApyItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
export const RewardIcon = styled.img`
  width: 14px;
  height: 14px;
`;
export const RewardApy = styled.div`
  font-weight: 400;
  line-height: 14px;
  color: var(--agg-thirdry-color, rgba(255, 255, 255, 0.5));
`;
