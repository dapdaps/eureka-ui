import styled from "styled-components";

export const StyledCard = styled.div`
  position: relative;
  border: 1px solid #373A53;
  border-radius: 16px;
  background: #262836;
`;
export const StyledCardHead = styled.div`
  padding: 12px 20px;
  border-radius: 16px 16px 0 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  align-items: center;
`;
export const StyledCardBody = styled.div`
  border-top: 1px solid #373A53;
  padding: 12px 20px;
  border-radius: 0 0 16px 16px;
  
  &.editable {
    background: #20212D;
  }
`;
export const StyledCardHeadLeft = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
  .title {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
    line-height: 19px;
    color: #FFFFFF;
  }
`;
export const StyledCardHeadRight = styled.div`
  width: 0;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  text-align: right;
  color: #979ABE;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
`;
export const StyledCardHeadEdit = styled.button`
  display: block;
  width: 26px;
  height: 26px;
  border: 1px solid #373A53;
  border-radius: 8px;
  background: #2E3142;
`;
export const StyledCardContent = styled.div`
  .content-row {}
  .body {}
  .foot {
    margin-top: 12px;
  }
  .foot-right {
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 8px;
  }
`;
export const StyledCardContentInput = styled.input`
  border: 0;
  background: none;
  height: 36px;
  line-height: 36px;
  color: #979ABE;
  font-size: 26px;
  font-weight: 500;
  outline: none;
  flex: 1;
  width: 0;
`;
export const StyledGasToken = styled.button`
  border: 1px solid #EBF479;
  height: 26px;
  line-height: 24px;
  border-radius: 13px;
  background: #2E3142;
  color: #EBF479;
  font-size: 14px;
  text-align: center;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  gap: 8px;
  white-space: nowrap;
  padding: 0 10px;

  &[disabled] {
    cursor: pointer;
  }
`;
