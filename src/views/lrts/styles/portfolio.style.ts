import Image from 'next/image';
import styled from 'styled-components';

export const Container = styled.div`
  background: url(/images/lrts/bg-home.png) center no-repeat #000;
  background-size: contain;
  font-family: Orbitron;
  padding-top: 91px;
`;
export const Assets = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding: 0 38px;
  fill: rgba(50, 50, 50, 0.6);
  stroke-width: 1px;
  stroke: #3f3f3f;
  backdrop-filter: blur(10px);
  border: 1px solid #3f3f3f;
  border-radius: 5px;
  margin-bottom: 20px;
  .head {
    padding: 30px 0;
    border-bottom: 1px solid #3f3f3f;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .body {
  }
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 34px;
    margin-bottom: 15px;
  }
  .bottom {
    padding: 16px 0 33px;
    display: flex;
    align-items: center;
    gap: 200px;
  }
  .process {
    height: 12px;
    border-radius: 2px;
    border: 1px solid #323232;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
  }
  .process-bar {
    position: absolute;
    left: 0;
    top: 0;
    height: 12px;

    border-radius: 2px;
    border: 1px solid #323232;

    backdrop-filter: blur(10px);
  }
  .process-bar-stake {
    width: 30%;
    background: rgba(189, 189, 189, 0.5);
  }
  .process-bar-nostake {
    width: 15%;
    background: rgba(255, 255, 255, 0.5);
  }
  .key {
    color: #828282;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 10px;
  }
  .value {
    font-size: 26px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    background: linear-gradient(180deg, #fff 38.5%, #677079 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export const Ad = styled(Image)`
  display: block;
  margin: 0 auto 30px;
`;

export const AssetTab = styled.div`
  .title {
    font-family: Orbitron;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    background: linear-gradient(180deg, #fff 38.5%, #677079 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;
