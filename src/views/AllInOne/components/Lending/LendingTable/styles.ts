import styled from 'styled-components';

const Table = styled.div`
  font-family: Gantari;
  font-size: 14px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 400;
  gap: 4px;
  padding: 16px 20px 10px 20px;
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
  padding: 13px 16px;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #2e3142;
  }
`;
const RowCols = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
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
const RewardApyItem = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  margin-top: 4px;
  column-gap: 2px;
  color: #979abe;
  font-size: 12px;
`;
const RewardIcon = styled.img`
  width: 14px;
  height: 14px;
  object-fit: contain;
`;
const RewardApy = styled.div`
  white-space: nowrap;
`;
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
