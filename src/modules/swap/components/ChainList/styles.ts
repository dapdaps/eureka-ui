import styled from 'styled-components';

export const StyledContainer = styled.div`
  position: relative;
`;

export const ArrowWrapper = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SelectChainWrapper = styled.div`
  border-radius: 12px;
  padding: 8px 6px;
  width: 250px;
  position: absolute;
  z-index: 200;

  top: 28px;

  background: rgba(45, 50, 71, 1);

  .active {
    background: rgba(31, 35, 53, 0.5);
  }

  > div {
    cursor: pointer;
    display: flex;
    padding: 6px;
    margin: 4px 0px;
    :hover {
      background: rgba(31, 35, 53, 0.5);
    }

    padding-right: 8px;

    align-items: center;
    justify-content: space-between;
    width: 100%;
    border-radius: 8px;

    .chain-filed {
      display: flex;
      align-items: center;
      gap: 8px;
      .chain-icon {
        width: 22px;
        height: 22px;
        border-radius: 8px;
      }

      .chain-name {
        font-size: 14px;
        font-weight: 400;
        line-height: 19px;
        letter-spacing: 0em;
        text-align: left;
        color: white;
      }
    }
  }

  .check-icon {
    display: none;
  }

  .active-check-icon {
    display: block;
    color: var(--border-color);
  }
`;

export const Overlay = styled.div`
  position: fixed;
  z-index: 100;
  display: flex;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
`;
