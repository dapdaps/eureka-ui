import styled from 'styled-components';
export const StyledTradeContainer = styled.div`
    position: relative;
    margin-bottom: 20px;
    .from-currency_margin {
        margin-bottom: 10px;
    }`;
export const StyledTradeIcon = styled.div`
  position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const StyledTradeButton = styled.button<{ bgColor: string, color: string }>`
    background: ${props => props.bgColor};
    color: ${props => props.color};
    padding: 20px 0;
    text-align: center;
    width: 100%;
    font-weight: bolder;
    border-radius: 10px;
    margin-bottom: 18px;
`;

export const StyledTradeFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    .light {
        color: #fff;
        transition: all .2s ease;
    }
    .dark {
        color:#979ABE;
    }
`;

export const StyledTradeEth = styled.div`
    font-size: 14px;
    color: #979ABE;
`;

export const  StyledMarketIcon = styled.div<{ url: string }>`
    width: 20px;
height: 20px;
background: ${ props => props.url ? `url(${props.url})` : 'none' } center no-repeat;
    background-size: contain;
`;

export const  StyledMarketTitle = styled.div`
font-size: 14px;
color: #fff`;
export const  StyledMarketTag = styled.div`
    background: rgba(51, 182, 95, 0.2);
    border-radius: 4px;
    padding: 2px 5px;
    color: #33B65F;
    font-size: 12px;
`;
export const  StyledMarketCount = styled.div`
font-size: 14px;
    text-decoration: underline;
    cursor: pointer;
`;