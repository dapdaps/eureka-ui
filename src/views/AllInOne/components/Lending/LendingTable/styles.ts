import styled from 'styled-components';

const Table = styled.div`
  font-family: Gantari;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 400;
  gap: 4px;
  padding: 12px 20px;
  color: #979abe;
`;
const Body = styled.div``;
const Column = styled.div`
  height: 100%;
  flex-shrink: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const Row = styled.div`
  background: #2e3142;
  border: 1px solid #373a53;
  border-radius: 16px;
  margin-bottom: 10px;
`;
const RowCols = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  padding: 12px 20px;
  height: 84px;
`;
const RowHeader = styled.div`
  width: 100%;
`;
const NormalCell = styled.div``;
const Cell = styled.div`
  height: 100%;
  flex-shrink: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  overflow: hidden;
  flex-wrap: wrap;
`;
const Total = styled.div``;
const TotalValue = styled.div`
  color: #979abe;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const Buttons = styled.div``;
const Empty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50px;
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const RewardApyItem = styled.div``;
const RewardIcon = styled.img``;
const RewardApy = styled.div``;
const ArrowIconWrapper = styled.div`
  width: 17px;
  height: 17px;
  opacity: 0.3;
  cursor: pointer;
  transform: rotate(90deg);
  transition: transform 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;

  &.active {
    opacity: 1;
  }

  &.open {
    transform: rotate(0deg);
  }

  &.open-active {
    transform: rotate(90deg);
  }
`;

export {
  Table,
  Header,
  Body,
  Column,
  Row,
  RowHeader,
  NormalCell,
  Cell,
  Total,
  TotalValue,
  Buttons,
  Empty,
  RewardApyItem,
  RewardIcon,
  RewardApy,
  ArrowIconWrapper,
  RowCols
};
