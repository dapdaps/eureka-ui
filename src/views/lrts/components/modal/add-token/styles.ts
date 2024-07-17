import Image from 'next/image';
import styled from 'styled-components';

export const StyledContainer = styled.div`
  /* width: 530px; */
  box-sizing: border-box;
  padding: 30px 30px;
`;

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 30px;
`;

export const Title = styled.div`
  font-family: Orbitron;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  background: linear-gradient(180deg, #fff 38.5%, #677079 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const SubTitle = styled.div`
  color: #fff;
  font-family: Orbitron;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const TokenIcon = styled(Image)`
  border-radius: 50%;
`;

export const Desc = styled.div`
  color: #828282;
  font-family: Orbitron;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 24px;
`;

export const Addrs = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  font-family: Orbitron;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  border-radius: 2px;
  border: 1px solid #fff;
  color: #fff;
  font-family: Orbitron;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
  &:hover {
    text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.6);
  }
`;

export const Explore = styled.a``;
export const Btns = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
