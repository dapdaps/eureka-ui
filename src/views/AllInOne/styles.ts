import styled from 'styled-components';

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
    //overflow: hidden;
  }
`;

export const StyledContent = styled.div`
  width: 100%;
<<<<<<< HEAD
  /* position: relative; */
=======
>>>>>>> 007da0ba4c681be628c26f1b34a38505f8710068
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 24px 24px;
<<<<<<< HEAD
  /* z-index: 0; */
=======
>>>>>>> 007da0ba4c681be628c26f1b34a38505f8710068
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
