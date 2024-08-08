import { motion } from 'framer-motion';
import { styled } from 'styled-components';

export const StyledContainer = styled(motion.div)`

`;
export const StyledHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px 19px;
  color: #979ABE;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  
  .filter-chain,
  .filter-dapp {
    height: 26px;
    flex-shrink: 0;
    padding: 0 10px;
  }
`;
export const StyledContent = styled.div`
  .execute-records-table {
    border-radius: 12px;
    border: 1px solid #373A53;
    background: #262836;
    overflow: hidden;
    
    .execute-records-table-body {
      .execute-records-table-row {
        background: #262836;
        
        &:nth-child(2n) {
          background: rgba(53, 55, 73, 0.50);
        }
      }
    }
    
    .dapp-name {
      color: #FFF;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 159.476%;
      
      .token {
        color: #979ABE;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 156.991%;
      }
    }
  }
`;

export const StyledPagination = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  
  .current-page {
    padding: 0 7px;
  }
  .page-btn {
    cursor: pointer;
  }
`;
