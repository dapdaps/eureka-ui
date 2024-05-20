import styled from 'styled-components';

export const StyledTop = styled.div`
`;

export const StyledCardContainer = styled.div`
  position: relative;
`;

export const StyledDappWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const StyledDappIcon = styled.img`
  width: 72px;
  height: 72px;
  border: 3px solid #202329;
  flex-shrink: 0;
  border-radius: 22px;
  margin-right: 16px;
`;

export const StyledDappTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-grow: 1;
`;

export const StyledDappTitle = styled.div`
  font-family: Chakra Petch;
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 6px;
  flex-grow: 1;
`;

export const StyledDappDesc = styled.div`
  color: #979abe;
  font-weight: 300;
  font-size: 16px;
  font-style: normal;
  line-height: normal;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const StyledFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
`;

export const StyledFooterActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 9px;
  align-items: center;
`;

export const StyledCardTagContainer = styled.div`
  position: relative;
  height: 100%;
  flex-shrink: 0;
  top: -12px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const StyledCardTag = styled.div`
  border-radius: 16px;
  display: flex;
  align-items: center;
  color: #fff;
  max-width: 100px;
  height: 20px;
  background: #2A2A2A;
  padding-right: 7px;
  &.main {
    background: #DFFE00;
    color: #000;
    font-style: italic;
  }
  &.text {
    padding: 0 6px;
  }

  &:not(&:last-child) {
    margin-bottom: 8px;
  }
  
  &:hover {
    .display {
      display: block;
    }
  }
`;

export const StyledTagIcon = styled.img`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #343434;
  position: relative;
  object-fit: contain;
  flex-shrink: 0;
  box-sizing: content-box;
  left: -2px;
  &:not(&:first-child) {
    left: -7px;
  }
`;

export const StyledTagText = styled.div`
  font-style: italic;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
  line-height: 1;
  padding-right: 4px;
  &.renzo-text {
    position: relative;
    left: -4px;
  }
`;

export const StyledFooterLeft = styled.div`
display: flex;
align-items: center;
column-gap: 10px;
`;

export const StyledFooterRight = styled.div`
  transform: rotate(-90deg);
  color: #fff;
`;

export const StyledCardTagTip = styled.div<{show: boolean, top: number, left?:number, right?: number}>`
  position: absolute;
  font-style: italic;
  padding: 4px 10px;
  border-radius: 8px;
  border: 1px solid #373A53;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25);
  background: #262836;
  max-width: 500px;
  z-index: 999;
  font-size: 12px;
  color: #fff;
  white-space: nowrap;
  display: ${props => props.show ? 'block' : 'none'};
  top: ${props => props.top ? `${props.top}px` : 0};
  left: ${props => props?.left ? `${props.left}px` : 'unset'};
  right: ${props => props?.right ? `${props.right}px` : 'unset'};
`;

export const StyledDappName = styled.div`
  color: #fff;
  font-size: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const StyledTagIconDefault = styled.div<{url: string}>`
  background: ${props => props.url ? `url(${props.url}) center no-repeat` : 'transparent'};
  width: 16px;
  height: 16px;
  border: 2px solid #343434;
  border-radius: 50%;
  position: relative;
  box-sizing: content-box;
  left: -2px;
  flex-shrink: 0;
  &.other {
    background-color: #fff;
    left: -7px;
  }
`;