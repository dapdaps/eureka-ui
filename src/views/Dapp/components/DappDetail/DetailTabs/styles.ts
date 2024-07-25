import styled from 'styled-components';

export const StyledContainer = styled.div`

`;

export const StyledTabContainer = styled.div`
  padding-left: 40px;
  padding-right: 25px;
`;

export const StyledTabs = styled.div`
  display: flex;
  align-items: center;
  column-gap: 66px;
  flex-grow: 1;
  flex-shrink: 0;
  flex-wrap: nowrap;
`;

export const StyledTab = styled.div<{active: boolean}>`
  font-family: Montserrat;
  font-size: 20px;
  font-weight: 600;
  background: linear-gradient(90deg, #FFF 0%, #979ABE 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-bottom: 16px;
  border-bottom: ${props => props.active ? '4px solid #EBF479' : '4px solid transparent'};
  transition: border-color 200ms ease-in-out;
  cursor: pointer;
`;


export const StyledTabsContent = styled.div`
  border-radius: 20px;
  border: 1px solid #202329;
  background-color: #18191E;
  backdrop-filter: blur(10px);
  width: 100%;
  .activity-table {
    .activity-table-body {
      .activity-table-row {
        padding-left: 13px;
        &:hover {
          background: rgba(0, 0, 0, 0.2);
          cursor: pointer;
        }
      }
    }

    .activity-table-head {
      padding-left: 13px;
      .activity-table-col {
        padding-top: 0;
        padding-bottom: 10px;
        color: #979ABE;
        font-family: Montserrat;
      }
    }
    .activity-table-col {
      padding-top: 23px;
      padding-bottom: 23px;
    }
    
  }
`;

export const StyledHead = styled.div`
  padding: 30px 40px;
  display: flex;
  align-items: center;
`;


export const StyledHeadText = styled.div`
  color: #979ABE;
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  margin-right: 60px;
  .light {
    font-size: 20px;
    color: #EBF479;
    margin-right: 8px;
  }
`;

export const StyledAddress = styled.div`
  display: flex;
  align-items: center;
  column-gap: 4px;
`;

export const StyledAvatar = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-block;
  background: conic-gradient(from 180deg at 50% 50%, #00d1ff 0deg, #ff008a 360deg);
  flex-shrink: 0;
`;

export const StyledMyAvatar = styled.div<{url: string}>`
  width: 28px;
  height: 28px;
  margin-right: 11px;
  border-radius: 50%;
  background-size: contain;
  background: ${props => props.url ? `url(${props.url }) center no-repeat` : 'conic-gradient(from 180deg at 50% 50%, #00D1FF 0deg, #FF008A 360deg)'};
`;

export const StyledHeadOther = styled.div`
  color: #979ABE;
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  text-decoration-line: underline;
  cursor: pointer;
  flex-shrink: 0;
`;

export const StyledHeadInfo = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  flex-shrink: 0;
  .head-icon {
    margin-right: 12px;
    cursor: pointer;
  }
`;

export const StyledMyAddress = styled.div`
  color: #FFF;
  text-align: center;
  font-family: Montserrat;
  font-size: 20px;
  font-weight: 600;
  line-height: 1;
  margin-right: 16px;
`;

export const StyledDateText = styled.div`
  color: #979ABE;
`;

export const StyledTitleText = styled.div`
  color: #ffffff !important;
  span {
    color: #ffffff !important;
  }
`;

export const StyledOverview = styled.div`
  padding: 50px 30px 25px 30px;
`;

export const StyledOverviewTitle = styled.div`
  color: #FFF;
  font-family: Montserrat;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;;
`;

export const StyledOverviewDesc = styled.div`
  color: #FFF;
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 400;
`;

export const StyledToken = styled.div`
  margin-top: 40px;
`;

export const StyledTokenLabel = styled.div`
  color: #FFF;
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 8px;
`;

export const StyledTokenValue = styled.div`
  color: #FFF;
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 500;
`;

export const StyledAirdrop = styled.div`
  padding: 30px;
  color: #ffffff;
`;

export const StyledAirdropHead = styled.div`
  display: flex;
  align-items: center;
  padding: 0 14px;
  padding-bottom: 30px;
  border-bottom: 1px solid #202329;
  column-gap: 92px;
`;

export const StyledAirdropLabel = styled.div`
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 8px;
`;

export const StyledAirdropValue = styled.div`
  color: #FFF;
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 600;
`;


export const StyledAirdropBody = styled.div`
  padding-top: 22px;
`;

export const StyledAirdropBodyItem = styled.div`
  margin-bottom: 16px;
  border-radius: 12px;
  background: rgba(0 ,0, 0, 0.2);
  padding: 23px 20px;
  position: relative;
  display: flex;
  justify-content: space-between;
`;

export const StyledAirdropShadow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  color: #979ABE;
  &.active {
    color: #EBF479;
  }
`;

export const StyledAirdropIcon = styled.div<{url: string}>`
  width: 12px;
  height: 9px;
  background: ${props => props.url ? `url(${props.url}) no-repeat center`: ''};
  background-size: contain;
  position: absolute;
  top: 6px;
  left: 4px;
`;

export const StyledAirdropTitle = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
`;


export const StyledAirdropArrow = styled.div`
  color: #ffffff;
  opacity: 0.8;
  transform: rotate(-90deg);
`;
