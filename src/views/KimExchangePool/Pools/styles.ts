import styled from 'styled-components';

export { LoadingWrapper } from '../styles';

export const StyledContainer = styled.div`
  padding-top: 18px;
`;

export const StyledHeader = styled.div`
  padding: 12px 24px;
  display: flex;
  align-items: center;
  color: #979abe;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
`;

export const StyledRow = styled.div`
  display: flex;
  align-items: center;
  height: 82px;
  border-radius: 16px;
  border: 1px solid #373a53;
  background: #262836;
  padding-left: 24px;
  padding-right: 27px;
  margin-bottom: 10px;
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;

  &:hover {
    background: rgba(151, 154, 190, 0.1);
  }
`;

export const StyledPool = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledIcons = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

export const StyledIcon = styled.img`
  width: 26px;
  height: 26px;
`;

export const StyledTitle = styled.div`
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 7px;
`;

export const StyledTag = styled.div`
  height: 20px;
  line-height: 20px;
  padding: 0px 8px;
  border-radius: 24px;
  background: rgba(151, 154, 190, 0.1);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  margin-left: 5px;
  position: relative;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  .tag-tips {
    width: 130px;
    padding: 7px 10px;
    box-sizing: border-box;
    border-radius: 6px;
    border: 1px solid #373a53;
    background: #262836;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    display: none;
    position: absolute;
    left: -30px;
    flex-direction: column;
    gap: 3px;
    bottom: 26px;
  }

  &:hover .tag-tips {
    display: flex;
  }
`;

export const StyledApr = styled.div`
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: inline-block;
  position: relative;
  cursor: pointer;
  border-bottom: 1px dotted #979abe;

  &:hover {
    opacity: 0.8;
  }

  .apr-tips {
    width: 190px;
    height: 51px;
    border-radius: 6px;
    border: 1px solid #373a53;
    background: #262836;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
    color: #fff;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    display: none;
    box-sizing: border-box;
    padding: 7px 12px;
    position: absolute;
    left: 0px;
    bottom: -60px;
  }
  .gray {
    color: #979abe;
  }

  &:hover .apr-tips {
    display: block;
  }
`;
