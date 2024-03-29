import styled from 'styled-components';

export const StyledContainer = styled.div`
  height: 204px;
  background-image: url('/images/portfolio/top_bg.webp');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: top center;
`;

export const StyledContent = styled.div`
  width: 1000px;
  height: 204px;
  margin: 0 auto;
  padding-top: 48px;
  box-sizing: border-box;
  position: relative;
`;

export const StyledUserInfoWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const DefaultProfileIcon = styled.div`
  background-image: conic-gradient(from 180deg at 50% 50%, rgb(0, 209, 255) 0deg, rgb(255, 0, 138) 360deg);
  width: 52px;
  height: 52px;
  border-radius: 50%;
`;

export const StyledAddressWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 5px;
`;

export const StyledAddress = styled.div`
  color: #fff;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const StyledMetamask = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  color: #7c7f96;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const ChartContainer = styled.div`
  color: #fff;
  width: 425px;
  height: 120px;
  position: absolute;
  right: 0;
  bottom: 0;
`;

export const ChartDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 12px; */

  position: relative;
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
