import styled from 'styled-components';

export const StyledContainer = styled.div`
  width: 100%;
  border-radius: 20px;
  border: 1px solid #202329;
  background-color: #18191E;
  padding: 34px;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 30px 100px;
  flex-wrap: wrap;
`;


export const StyledDetailContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 21px;
  flex-shrink: 0;
`;

export const StyledSummaryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-grow: 1;
  flex-shrink: 0;
  column-gap: 16px;
`;

export const StyledDetailLogo = styled.div<{ $logo: string; }>`
  border-radius: 22px;
  border: 3px solid #202329;
  width: 82px;
  height: 82px;
  background: ${({ $logo }) => `url("${$logo}") no-repeat center`};
  background-size: contain;
`;
export const StyledDetailContent = styled.div`
`;
export const StyledDetailName = styled.div`
  color: #FFF;
  font-family: Montserrat;
  font-size: 20px;
  font-weight: 700;
`;
export const StyledDetailCategory = styled.div`
  line-height: 1;
  border-radius: 30px;
  padding: 4px 9px;
  .Swap {
    color: rgba(172, 252, 237, 1);
    border: 1px solid rgba(172, 252, 237, 1);
  }
  .Bridge {
    color: rgba(227, 233, 157, 1);
    border: 1px solid rgba(227, 233, 157, 1);
  }
  .DEX {
    color: rgba(172, 252, 237, 1);
    border: 1px solid rgba(172, 252, 237, 1);
  }
  .Lending {
    color: rgba(173, 255, 181, 1);
    border: 1px solid rgba(173, 255, 181, 1);
  }
  .Liquidity {
    color: #aad6ff;
    border: 1px solid #aad6ff;
  }
  .Staking {
    color: rgba(193, 191, 255, 1);
    border: 1px solid rgba(193, 191, 255, 1);
  }
  .Yield {
    color: rgba(249, 181, 230, 1);
    border: 1px solid rgba(249, 181, 230, 1);
  }
`;
export const StyledNetworksContainer = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
`;
export const StyledNetworks = styled.div<{ $logo: string; }>`
  width: 20px;
  height: 20px;
  background: ${({ $logo }) => `url("${$logo}") no-repeat center`};
  border-radius: 6px;
  background-size: contain;
`;
export const StyledDetailDesc = styled.div`
  display: flex;
  align-items: center;
  column-gap: 12px;
  margin-bottom: 13px;
`;

export const StyledSummary = styled.div`
  text-align: left;

`;
export const StyledSummaryValue = styled.div`
  color: #FFF;
  font-family: Montserrat;
  font-size: 26px;
  font-weight: 600;
  line-height: 1;
  flex-shrink: 0;
  display: flex;
  align-items: flex-end;
  column-gap: 10px;
`;
export const StyledSummaryLabel = styled.div`
  color: #979ABE;
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 10px;
  flex-shrink: 0;
`;
export const StyledSummaryAdd = styled.div`
  display: flex;
  color: #06C17E;
  font-family: Montserrat;
  font-size: 12px;
  font-weight: 500;
  align-items: center;
  transform: translateY(-5px);
`;
export const StyledSummaryAddIcon = styled.div`
  width: 10px;
  height: 8px;
  display: flex;
  align-items: center;
  margin-right: 2px;
`;