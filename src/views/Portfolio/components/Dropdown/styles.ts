import { styled } from 'styled-components';

export const StyledContainer = styled.div`
  height: 26px;
  color: #979ABE;
  text-align: right;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  padding: 0 10px 0 9px;
  border-radius: 6px;
  border: 1px solid #3D405A;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 9px;
  cursor: pointer;
  position: relative;


  .dropdown {
    width: 100%;
    position: absolute;
    z-index: 1;
    right: 0;
    top: 24px;
    background: #1B1D25;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    border: 1px solid #3D405A;
    display: none;
    max-height: 350px;
    overflow-y: auto;
    overflow-x: hidden;

    &.visible {
      display: block;
    }

    .dropdown-list {
      list-style: none;
      padding: 4px 0;
      margin: 0;
      display: flex;
      text-align: left;
      flex-direction: column;
      align-items: stretch;
    }

    .dropdown-item {
      padding: 4px 12px;
      transition: all .3s linear;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      &:hover,
      &.selected {
        background: #000;
      }
    }
  }

  .arrow {
    transition: transform .1s linear;
  }
`;
