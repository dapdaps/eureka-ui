import styled from 'styled-components';

export const StyledContainer = styled.div`
  padding-top: 142px;
`;

export const StyledBanner = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 2;
  padding-left: 90px;

  &::before {
    content: '';
    position: absolute;
    left: -350px;
    top: 90px;

    width: 698px;
    height: 698px;
    display: block;
    border-radius: 698px;
    opacity: 0.3;
    background: radial-gradient(50% 50% at 50% 50%, #ff6bbb 0%, rgba(255, 107, 187, 0) 100%);
  }
`;

export const StyledTitle = styled.div`
  margin-top: 48px;
  color: #fff;
  font-size: 90px;
  font-style: italic;
  font-weight: 700;
  line-height: 100%;
  width: 703px;
  position: relative;
`;

export const StyledSubTitle = styled.div`
  color: #fff;
  font-size: 26px;
  font-style: italic;
  font-weight: 600;
  line-height: 100%;
  margin-top: 28px;
`;

export const StyledTotal = styled.div`
  width: 1244px;
  height: 145px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  position: relative;
  display: flex;
  align-items: center;
  padding: 42px 0px;
  margin: 0 auto;
  top: -44px;
  z-index: 1;

  &::before {
    position: absolute;
    top: -170px;
    left: 55%;
    content: '';
    display: block;
    width: 340px;
    height: 340px;
    border-radius: 340px;
    opacity: 0.3;
    background: radial-gradient(50% 50% at 50% 50%, #b06bff 0%, rgba(176, 107, 255, 0) 100%);
  }
`;

export const StyledTotalItem = styled.div`
  flex-grow: 1;
`;

export const StyledTotalLabel = styled.div`
  color: #fff;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: capitalize;
`;

export const StyledTotalValue = styled.div`
  color: #fff;
  text-align: center;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  text-transform: capitalize;
  margin-top: 9px;
`;

export const StyledTotalLine = styled.div`
  width: 1px;
  height: 100%;
  background-color: #fff;
`;
