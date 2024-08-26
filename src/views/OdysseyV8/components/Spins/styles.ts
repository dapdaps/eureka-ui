import goldImg from '@public/images/others/odyssey/v8/components/Spins/gold.svg?url';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledContainer = styled(motion.div)`
  width: 1260px;
  margin: 30px auto 0px;
  .quest-item {
    width: 400px;
    position: relative;
    padding-bottom: 20px;
  }
  .quest-desc {
    color: #979abe;
    font-family: Montserrat;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-top: 18px;
    margin-bottom: 18px;
    height: 120px;
  }
`;

export const StyledContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  .more-is-coming {
    font-size: 20px;
    font-weight: 500;
    color: rgba(235, 244, 121, 1);
    font-family: Montserrat;
    width: 400px;
    text-align: center;
    line-height: 400px;
  }
`;
const Bg = styled.div`
  height: 497px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

export const BgFoot = styled(Bg)`
  margin-top: -200px;
  background-image: url('/images/odyssey/v4/ellipse-foot.png');
`;

export const Head = styled.div`
  padding: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 1;
`;
export const QuestBg = styled.div<{ $color: string }>`
  width: 420px;
  height: 210.753px;
  transform: rotate(-15deg);
  flex-shrink: 0;
  position: absolute;
  left: -38%;
  top: -12%;
  border-radius: 420px;
  opacity: 0.3;
  background: radial-gradient(50% 50% at 50% 50%, ${({ $color }) => $color} 0%, rgba(0, 0, 0, 0) 100%);
  z-index: 1;
`;
export const HeadLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  .name {
    color: #fff;
    text-align: center;
    font-size: 26px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;
export const LoadingWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
  width: 100%;
`;

export const HeadRight = styled.div<{ $clickable: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  width: 119px;
  height: 56px;
  background: url(${goldImg.src}) no-repeat 0 0;
  font-size: 16px;
  font-style: italic;
  font-weight: 700;
  color: rgba(0, 0, 0, 1);
  padding-left: 40px;
  cursor: pointer;
  position: relative;
  transition: 0.3s;

  .tip {
    position: absolute;
    width: 200px;
    border-radius: 6px;
    border: 1px solid rgba(55, 58, 83, 1);
    background-color: rgba(38, 40, 54, 1);
    top: 0;
    right: 100%;
    padding: 10px;
    color: #fff;
    display: none;
  }
  .icon {
    width: 22px;
    height: 22px;
  }
  &:hover {
    .tip {
      display: block;
    }
  }

  ${({ $clickable }) =>
    $clickable &&
    `&:hover{
    opacity: 0.9;
  };
    &:active{
      opacity: 0.8;
    }
  `}
`;

export const Desc = styled.div`
  font-size: 18px;
  font-weight: 800;
  line-height: 27px;
  color: #fff;
  padding: 0 24px;
`;

export const GoldWapper = styled.div`
  display: flex;
  padding: 10px 24px 0;
  justify-content: space-between;
`;

export const Gold = styled.div`
  display: flex;
  gap: 10px;
  img {
    width: 26px;
  }
  span {
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
  }
`;

export const QuestTitle = styled.div`
  font-size: 18px;
  font-weight: 800;
  line-height: 27px;
  color: #fff;
  padding: 25px 24px 10px;
`;

export const SpinLine = styled.div<{ $disabled?: boolean }>`
  margin: 0 24px;
  background: rgba(217, 217, 217, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  gap: 10px;
  border-radius: 4px;
  border: 1px solid rgba(217, 217, 217, 0);

  &:not(:first-child) {
    margin-top: 10px;
  }
  ${({ $disabled }) =>
    $disabled
      ? `cursor: not-allowed;opacity: 0.5;`
      : `cursor: pointer;&:hover {
    border: 1px solid rgba(0, 255, 209, 1);
  }`}

  .spin-count {
    color: rgba(0, 255, 209, 1);
    font-family: '5squared pixel';
    font-size: 16px;
    font-weight: 400;
    line-height: 16px;
    white-space: nowrap;
  }
  .spin-title {
    color: rgba(255, 255, 255, 1);
    font-size: 16px;
    font-weight: 400;
    line-height: 16px;
    flex: 1;
  }
`;

export const Body = styled.div`
  padding: 0px 30px 30px;
  position: relative;
  z-index: 2;
`;
export const BodyLeft = styled.div`
  width: 414px;
  flex-shrink: 0;
`;

export const QuestGoldHints = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  margin-top: 9px;
  text-align: center;
`;

export const QuestGold = styled.div`
  color: #ebf479;
  font-family: Montserrat;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 36px */
  text-transform: uppercase;
  text-align: center;
`;

export const RankGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export const Spins = styled.div`
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 16px;
  color: #00ffd1;
  font-family: '5squared pixel';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  text-transform: capitalize;
  border: 1px solid #00ffd1;
  background-color: rgba(0, 255, 209, 0.11);
  border-radius: 8px;
`;
