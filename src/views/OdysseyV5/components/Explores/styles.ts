import styled from 'styled-components';

export const StyledContainer = styled.div`
  margin: 0 auto 100px auto;
  max-width: 1286px;
  width: 100%;
  padding-left: 50px;
  padding-right: 50px;
  position: relative;
  font-family: Chakra Petch;
  .head-img {
    border-radius: 4px;
    position: absolute;
    top: -188px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const StyledItemWrap = styled.div`
  padding-top: 20px;
  position: relative;
  z-index: 1;
`;
export const StyledTitle = styled.div`
  color: #fff;
  text-align: center;
  font-size: 52px;
  text-transform: capitalize;
  padding-top: 238px;
  .hilight {
    color: ${() => `var(--odyssey-primary-color)`};
  }
`;
export const StyledDesc = styled.div`
  color: #fff;
  text-align: center;
  font-size: 20px;
  margin-bottom: 80px;
  line-height: 1;
  font-family: Chakra Petch Light;
`;

export const StyledExploreContainer = styled.div`
`;

export const StyledExploreTitle = styled.div`
  font-size: 26px;
  color: #fff;
  position: relative;
  &:before {
    display: block;
    content: '';
    width: 480px;
    height: 480px;
    opacity: 0.3;
    position: absolute;
    top: -106px;
    left: -100px;
    background: radial-gradient(50% 50% at 50% 50%, #DFFE00 0%, rgba(223, 254, 0, 0) 100%);
  }
`;

export const StyledExploreDesc = styled.div`
  font-family: Chakra Petch Light;
  color: #fff;
  font-size: 18px;
`;

export const Btns = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
`;

export const StyledItem = styled.div<{ $disabled: boolean }>`
  height: 70px;
  border-radius: 12px;
  border: 1px solid #373a53;
  background: #1e2028;
  box-sizing: border-box;
  padding: 14px 5px 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const StyledItemTitle = styled.div`
  flex-shrink: 0;
  color: #fff;
  font-size: 20px;
`;

export const StyledItemLeft = styled.div`
  display: flex;
  gap: 26px;
  align-items: center;
`;

export const StyledItemRight = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  position: relative;
`;

export const Unexplored = styled.div`
  color: #979abe;
  text-align: center;
  font-family: Chakra Petch Light;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const ArrowContainer = styled.div`
  color: #fff;
  transform: rotate(-90deg);
`;

export const StyledItemShadow = styled.div`
  .item-mask {
    position: absolute;
    top: 50%;
    right: -6px;
    transform: translateY(-50%);
  }
`;