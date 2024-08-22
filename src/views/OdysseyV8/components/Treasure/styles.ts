import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledContainer = styled(motion.div)`
  max-width: 1400px;
  margin: 30px auto 0px;
  background: url('/images/odyssey/v8/treasure-bg.png');
  .modal-6 {
    display: block;
    padding-bottom: 100px;
  }
`;

export const StyledContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  &.row-top {
    padding-right: 12.9%;
  }
  &.row-bot {
    padding-left: 5.8%;
    justify-content: flex-end;
  }
`;
export const IconGroup = styled.div`
  position: absolute;
  display: flex;
  img {
    margin-left: -5px;
  }
`;

const Treasure = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 350px;
  cursor: pointer;

  .title {
    white-space: nowrap;
    top: -16px;
  }
  .star {
    position: absolute;
  }
  .star4 {
    position: absolute;
    top: 97px;
    left: -15px;
  }
  .scale {
    transition: transform 0.3s;
    &:hover {
      transform: scale(1.1);
    }
  }
`;

export const Treasure1 = styled(Treasure)`
  margin-left: -2%;
  .title {
    left: calc(50% + 17px);
    width: 230px;
  }
  .td1 {
    position: absolute;
    left: calc(50% + 14px);
    top: 60px;
  }
`;
export const Treasure2 = styled(Treasure)`
  margin-left: 20%;

  .title {
    left: calc(50% + 17px);
  }
  .td2 {
    position: absolute;
    width: 180px;
    gap: 5px;
    display: flex;
    left: calc(50% + 14px);
    top: 59px;
  }
  .particle {
    left: 7px;
    top: 132px;
  }
  .hyperlock {
    left: 236px;
    top: 251px;
  }
`;
export const Treasure3 = styled(Treasure)`
  margin-left: 30%;

  .title {
    right: calc(50% + 17px);
  }
  .td3 {
    position: absolute;
    right: calc(50% + 17px);
    top: 58px;
    width: 190px;
    display: flex;
    justify-content: space-between;
  }
`;
export const Treasure4 = styled(Treasure)`
  width: 363px;
  height: 300px;
  margin-right: 14.12%;

  .title {
    left: calc(50% + 17px);
  }
  .td4 {
    position: absolute;
    left: calc(50% + 17px);
    top: 31px;
  }
  .track1 {
    position: absolute;
    top: 66px;
    left: 70px;
  }

  .thruster {
    left: 300px;
    top: 114px;
  }
  .renzo {
    left: 124px;
    top: 174px;
  }
  .hyperlock {
    left: 389px;
    top: 42px;
  }
  .particle {
    left: 173px;
    top: 86px;
  }
`;
export const Treasure5 = styled(Treasure)`
  width: 346px;
  height: 300px;
  margin-right: 13.41%;

  .title {
    right: calc(50% + 17px);
    text-align: right;
  }

  .td5 {
    position: absolute;
    right: calc(50% + 17px);
    top: 55px;
  }
  .pac {
    position: absolute;
    left: -55px;
    top: 100px;
    z-index: 2;
  }
  .ring {
    position: absolute;
    left: 142px;
    top: 88px;
    z-index: 1;
  }
`;
export const Treasure6 = styled(Treasure)`
  width: 263px;
  height: 300px;
  margin-right: -3%;

  .title {
    right: calc(50% + 17px);
  }
  .td6 {
    top: 34px;
    right: calc(50% + 15px);
  }

  /* .badge {
    position: absolute;
    top: 31px;
    right: calc(50% + 17px);
    height: 26px;
    border-radius: 13px;
    background: rgba(249, 249, 37, 0.2);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;
    color: #ebf479;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    padding: 3px 3px 3px 29px;

    > img {
      position: absolute;
      left: -7px;
    }
  } */
`;

export const Badge = styled.div`
  height: 26px;
  border-radius: 13px;
  background: rgba(249, 249, 37, 0.2);
  display: flex;
  align-items: center;
  color: #ebf479;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  padding: 3px 13px 3px 3px;

  .badge-icon {
    margin-left: -7px;
  }
  .badge-title {
    margin-left: -5px;
    white-space: nowrap;
  }
`;

export const Title = styled.div`
  position: absolute;
  color: #ebf479;
  font-family: Montserrat;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 26px */
`;
export const Desc = styled.div``;

export const ModalTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #ebf479;
  font-family: Montserrat;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  margin-bottom: 20px;
`;

export const ModalSub = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: -15px;
  margin-bottom: 15px;
`;

export const ModalStep = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 33px;
  .step {
    color: #ebf479;
    font-size: 18px;
    font-weight: 700;
  }
  .gap {
    height: 1px;
    width: 40px;
    border: 1px dashed #979abe;
  }
`;
export const ModalDesc = styled.div`
  color: white;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  margin-bottom: 20px;
  .bold {
    color: #ebf479;
  }
`;
export const ModalIconGroup = styled.div`
  display: flex;
`;
export const ModalBody = styled.div`
  .modal-body-1 {
    display: flex;
    gap: 60px;
  }
  .modal-body-2 {
    display: flex;
    gap: 26px;
    .step {
      color: #ebf479;
      text-align: center;
      font-family: Montserrat;
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
    }
    .desc {
      color: #ebf479;
      text-align: center;
      font-family: Montserrat;
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
  .modal-sec-1 {
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    align-items: center;
    background-color: #000000;
    padding: 54px 0 37px;
  }
  .modal-sec-2 {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #000000;
    padding: 14px 0 50px;
  }
  .modal-sec-3 {
    height: 380px;
    flex-grow: 1;
    background-color: #000000;
    padding: 30px 18px 18px;
  }
  .coin-title {
    margin-top: 13px;
    color: #fff;
    font-family: Montserrat;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 100%; /* 20px */
  }
  .coin-group {
    display: flex;
    align-items: baseline;
  }
  .tags {
    display: flex;
    align-items: center;
    gap: 7px;
    margin: 20px auto 30px;
  }
  .prep {
    padding: 6px 14px;
    border: 1px solid #363940;
    color: #979abe;
    font-family: Montserrat;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%; /* 12px */
  }
  .points {
    padding: 6px 14px;
    border-radius: 4px;
    background: #fa0;
    color: #000;
    font-family: Montserrat;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%; /* 12px */
  }

  .modal-list {
    padding: 19px 25px;
    background-color: #000;
    margin-bottom: 20px;
  }
  .modal-desc {
    color: #979abe;
    font-family: Montserrat;
    font-size: 12px;
    font-weight: 400;
  }
  .modal-list-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .head-left {
      flex-grow: 1;
      display: flex;
      align-items: center;
    }
    .head-title {
      color: #ebf479;
      font-family: Montserrat;
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
    }
    .tag-thr {
      /* width: 156px; */
      height: 36px;
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      background: #252525;
      margin-left: 7px;
    }
    .tag-juice {
      /* width: 92px; */
      height: 36px;
      gap: 5px;
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      background: #252525;
      margin-left: 7px;
    }
  }
  .tag-points {
    padding: 0 5px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    border: 1px solid #3d405a;
    color: #979abe;
    text-align: center;
    font-family: Montserrat;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
  }
  .coin-pairs {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 14px 0;
    .pairs {
    }
    .txt {
      color: #fff;
      font-family: Montserrat;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 120%; /* 19.2px */
    }
  }
  .tag-coins {
    padding: 0 7px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    border: 1px solid #3d405a;
    color: #979abe;
    text-align: center;
    font-family: Montserrat;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
  }
  .modal-list-body {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    .body-left {
      .lp-img {
        margin-left: -18px;
      }
      flex-grow: 1;
      display: flex;
      align-items: center;
      gap: 10px;
      .body-left-content {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
      }
      .body-left-content-title {
        color: #fff;
        font-family: Montserrat;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 150%; /* 24px */
      }
      .body-left-content-desc {
        color: #979abe;
        font-family: Montserrat;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%; /* 18px */
      }
    }
  }
  .modal-list-foot {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
  }
  .reward-list {
    display: flex;
    align-items: center;
    gap: 9px;
    width: 356px;
    margin-bottom: 14px;
  }
  .juice-btn {
    margin: 0 auto;
  }
  .txt {
    color: #fff;
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
  }
  .gap {
    flex-grow: 1;
    height: 1px;
    border: 1px dashed #979abe;
  }
  .reward-desc {
    position: relative;
    width: 356px;
    color: #fff;
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
  }
`;
export const ModalList = styled.div``;
export const ModalSection = styled.div``;
export const ToDappButton = styled.div`
  width: 206px;
  height: 42px;
  flex-shrink: 0;
  color: #ebf479;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  cursor: pointer;
  transition: 0.5s;
  border: 1px solid #ebf479;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    width: 14px;
    height: 14px;
    border-right: 1px solid #ebf479;
    background-color: #000000;
    top: -7px;
    left: -7px;
    transform: rotate(45deg);
  }
  &::after {
    content: '';
    position: absolute;
    width: 14px;
    height: 14px;
    border-left: 1px solid #ebf479;
    background-color: #000000;
    bottom: -7px;
    right: -7px;
    transform: rotate(45deg);
  }
  &:hover {
    background-color: #ebf479;
    color: #1e202f;
  }
  &:active {
    opacity: 0.9;
  }
`;

export const TrapLayout = {
  borderColor: '#FFDD4D',
  corner: 34,
};
