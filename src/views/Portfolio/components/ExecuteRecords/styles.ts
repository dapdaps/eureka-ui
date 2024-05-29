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
  }
`;

export const StyledPagination = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 6px;
  
  .current-page {
    padding: 0 7px;
  }
  .page-btn {
    cursor: pointer;
  }
`;
