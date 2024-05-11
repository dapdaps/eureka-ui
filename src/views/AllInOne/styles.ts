import styled from 'styled-components';

export const Theme = styled.div`
  --button-text-color: #fff;
  --button-color: #33549c;
  --primary-color: #33549c;
  --border-color: #292c42;
  --supply-bg-color: rgba(80, 123, 217, 0.2);
  --borrow-bg-color: rgba(202, 85, 176, 0.2);
  --supply-color: #85abff;
  --borrow-color: #ff8ee6;
  --withdraw-bg-hover-color: #33549c;
  --withdraw-bg-color: rgba(51, 84, 156, 0.5);
  --withdraw-border-color: #33549c;
  --repay-bg-color: rgba(202, 85, 176, 0.2);
  --repay-bg-hover-color: #ca55b0;
  --repay-border-color: #ca55b0;
  --switch-color: #33549c;
  --switch-border-color: #32496a;
  --secondary-border-color: #3f577b;
  --yours-table-title: #ffffff;
  --claim-bg-hover-color: #33549c;
  --claim-bg-color: rgba(51, 84, 156, 0.5);
  --claim-border-color: #33549c;
  --withdraw-color: #fff;
  --replay-color: #fff;
  --claim-color: #fff;
`;

export const StyledContainer = styled.div`
  position: relative;
  margin: 0 8%;
  color: #ffffff;
  padding-top: 50px;
  height: 100%;
  
  .all-in-one-wrapper {
    position: relative;
    z-index: 1;
    height: 100%;
    overflow: hidden;
  }
`;

export const StyledContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 24px 24px;
  z-index: 0;
`;

export const StyledBg = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 0;
  top: 100px;
`;

export const StyledNavList = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-wrap: nowrap;
  height: 144px;
  padding-top: 40px;
  gap: 16px;
  overflow: hidden;
  margin-top: 100px;
`;
