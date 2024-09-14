import styled from 'styled-components';

export const StyledContainer = styled.div`
  width: 100%;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 15px;
  margin: 0 auto;

  margin-top: 12px;

  .bridge-text {
    display: flex;
    align-items: center;
    gap: 12px;
    .icon {
      height: 30px;
    }

    .text-wrapper {
      display: flex;
      flex-direction: column;
    }
    .text-l {
      font-size: 16px;
      font-weight: 600;
      line-height: 22px;
      letter-spacing: 0em;
    }
    .text-m {
      font-size: 14px;
      font-weight: 400;
      line-height: 19px;
      letter-spacing: 0em;
    }
  }
`;
