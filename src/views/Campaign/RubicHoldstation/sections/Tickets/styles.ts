import styled from 'styled-components';

export const StyledContainer = styled.div`
  padding-top: 100px;
  width: 1000px;
  margin: 0 auto;
`;

export const StyledTitle = styled.div<{ size: number }>`
  color: #fff;
  text-align: center;
  font-size: ${({ size }) => size}px;
  font-style: italic;
  font-weight: 700;
  line-height: 100%;
  text-transform: capitalize;
`;

export const StyledPrizeWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-top: 28px;
  gap: 16px;
`;

export const StyledPrize = styled.div<{ size: number; italic?: boolean; $expired?: boolean; $value?: string }>`
  font-size: ${({ size }) => size}px;
  ${({ italic }) => italic && 'font-style: italic;padding-right:10px;'};
  font-weight: 700;
  line-height: 100%;
  text-transform: capitalize;
  background: linear-gradient(116deg, #c8ff7c 11.9%, #ffa5db 64.92%, #7a78ff 104.11%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  .prize-text {
    position: relative;
    font-size: ${({ size }) => size}px;
    ${({ italic }) => italic && 'font-style: italic;padding-right:10px;'};
    font-weight: 700;
    line-height: 100%;
    text-transform: capitalize;
    background: linear-gradient(116deg, #c8ff7c 11.9%, #ffa5db 64.92%, #7a78ff 104.11%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    &::before {
      content: '';
      display: ${({ $expired }) => ($expired ? 'block' : 'none')};
      width: 100%;
      height: 2px;
      background: linear-gradient(116deg, #c8ff7c 11.9%, #ffa5db 64.92%, #7a78ff 104.11%);
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      position: absolute;
    }
  }
`;

export const StyledTickets = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 62px;
  position: relative;
`;

export const StyledRound = styled.div`
  width: 1000px;
  box-sizing: border-box;
  padding: 1px;
  background: linear-gradient(to bottom, #66676d 0%, #1c1f29 60%);
  margin-bottom: 20px;
  border-radius: 20px;
`;

export const StyledRoundInner = styled.div`
  background: linear-gradient(180deg, #2f3445 0%, #1c1f29 100%);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-sizing: border-box;
  padding: 30px 40px 0px;
  height: 186px;
`;

export const StyledRoundHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledRoundTitle = styled.div`
  color: #fff;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  text-transform: capitalize;
`;

export const StyledRoundTime = styled.div`
  color: #fff;
  text-align: right;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
`;

export const StyledRoundContent = styled.div`
  padding-top: 24px;
  display: flex;
  align-items: center;
  gap: 55px;
`;

export const StyledPrizePot = styled.div`
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
  width: 200px;
  flex-shrink: 0;
  flex-grow: 0;
`;

export const StyledRoundNumbers = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: 20px;
`;

export const StyledWonText = styled.div`
  color: #fff;
  font-size: 26px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  margin-top: 32px;
`;

export const StyledRoundContainer = styled.div`
  margin-top: 78px;
`;

export const StyledNotes = styled.div`
  color: #979abe;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 20px;

  .note-title {
  }
  .note-list {
    padding-left: 20px;
  }
  .note-item {
  }
`;

export const StyledExpired = styled.div``;

export const StyledExpiredPrized = styled.div`
  flex: 1;
  text-align: right;

  .title {
    color: #fff;
    text-align: right;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
  }
`;

export const StyledExpiredNoPrized = styled.div`
  position: relative;
  height: 80px;
  left: -40px;
  top: -20px;

  .title {
    color: #979abe;
    text-align: right;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    position: absolute;
    left: 90px;
    top: 40px;
  }
`;
