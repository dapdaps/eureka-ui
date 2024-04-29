import styled from 'styled-components';

export const StyledContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.5);
`;

export const StyledContent = styled.div`
  margin: 140px auto 0;
  width: 834px;
  border: 1px solid #3c3d00;
  background-color: white;
  position: relative;
  background-color: #191b1f;
  /* padding: 35px 55px; */
  /* background-color: #191b1f; */
  .shape {
    position: absolute;
    left: -60px;
    top: -80px;
  }
  .shape2 {
    left: -80px;
    top: -96px;
  }
  .shape3 {
    left: -143px;
    top: -68px;
  }
  .shape4 {
    left: -82px;
    top: -75px;
  }
  .shape5 {
    top: -60px;
  }
  .close {
    position: absolute;
    right: 15px;
    top: 15px;
    cursor: pointer;
  }
  .corner-left {
    position: absolute;
    left: -6px;
    bottom: -6px;
  }
  .corner-right {
    position: absolute;
    right: -6px;
    top: -6px;
  }
`;

export const ModalHead = styled.div`
  color: #fff;
  text-align: center;
  font-family: Gantari;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  height: 87px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 44px;
  position: relative;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: contain;
  &.bg-particle {
    background-image: url('/images/odyssey/v4/bg-particle.png');
  }
  &.bg-ring {
    background-image: url('/images/odyssey/v4/bg-ring.png');
  }
  &.bg-ambient {
    background-image: url('/images/odyssey/v4/bg-ambient.png');
  }
  .smoke {
    position: absolute;
    height: 100px;
    width: 837px;
    left: 0;
    bottom: -55px;
    border-radius: 1100px;
    opacity: 0.3;
    background: radial-gradient(50% 50% at 50% 50%, #fff 0%, rgba(255, 255, 255, 0) 100%);
  }
  .left {
    display: flex;
    align-items: center;
    gap: 14px;
  }
`;
export const ModalBody = styled.div`
  color: #fff;
  text-align: center;
  font-family: Gantari;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding: 25px 30px 38px;
  .desc {
    text-align: left;
    color: #979abe;
    font-family: Gantari;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    margin-bottom: 25px;
  }
  .text-left {
    text-align: left;
  }
  .text-right {
    text-align: right;
  }
  .rank-table {
    width: 100%;
    flex-shrink: 0;
    border: 1px solid #373a53;
    border-radius: 4px;
    background: rgba(55, 58, 83, 0.2);
  }
  .rank-head {
    width: 100%;
    display: table;
    color: #979abe;
    font-family: Gantari;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding: 15px 20px 5px;
  }
  .rank-th {
    float: left;
    width: 33.33333%;
  }
  .rank-row {
    width: 100%;
    display: table;
    color: #fff;
    padding: 15px 20px;
    font-family: Gantari;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .rank-col {
    float: left;
    width: 33.33333%;
  }
  .you {
    height: 48px;
    display: flex;
    align-items: center;
    color: #979abe;
    font-family: Gantari;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .your-rank {
    padding: 0 20px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 4px;
    border: 1px solid #373a53;
    background: rgba(55, 58, 83, 0.2);
    color: #fff;
    font-family: Gantari;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const Avatar = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
  border-radius: 50%;
`;
