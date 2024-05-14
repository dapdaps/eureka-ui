import styled from 'styled-components';

export const StyledTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledDappWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

export const StyledDappIcon = styled.img`
  width: 72px;
  height: 72px;
  border: 3px solid #202329;
  flex-shrink: 0;
  border-radius: 12px;
`;

export const StyledDappTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StyledDappTitle = styled.div`
  color: #fff;
  font-family: Chakra Petch;
  font-size: 20px;
`;

export const StyledDappDesc = styled.div`
  color: #979abe;
  font-family: Chakra Petch Light;
  font-size: 16px;
  font-style: normal;
  line-height: normal;
`;

export const StyledFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
`;

export const StyledExecution = styled.div`
  color: #979abe;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

export const StyledFooterActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 9px;
  align-items: center;
`;

export const StyledCardTagContainer = styled.div`
  position: relative;
`;

export const StyledCardTag = styled.div`
  border-radius: 16px;
  display: flex;
  align-items: center;
  color: #fff;
  //background: #DFFE00;
  background: #2A2A2A;
  padding: 1px 8px 1px 0;
  min-width: 80px;
  max-width: 100px;
  overflow: hidden;

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
`;

export const StyledTagText = styled.div`
  font-style: italic;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
 padding-left: 4px;
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

export const StyledCardTagTip = styled.div`
  position: absolute;
  left: 90px;
  font-style: italic;
  padding: 4px 10px;
  display: none;
  border-radius: 8px;
  border: 1px solid #373A53;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25);
  background: #262836;
  max-width: 300px;
  z-index: 999;
`;