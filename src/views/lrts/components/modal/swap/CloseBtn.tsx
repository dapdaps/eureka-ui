import styled from 'styled-components';

const StyledContainer = styled.div`
  position: absolute;
  right: 0px;
  top: -1px;
  cursor: pointer;
  width: 94px;
  height: 47px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.5s;

  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.7;
  }

  .bg {
    position: absolute;
    z-index: 1;
  }
  .close-icon {
    position: absolute;
    z-index: 2;
    cursor: pointer;
    margin-left: 28px;
  }
`;

export default function CloseBtn({ onClick }: any) {
  return (
    <StyledContainer onClick={onClick}>
      <svg className="bg" xmlns="http://www.w3.org/2000/svg" width="97" height="49" viewBox="0 0 97 49" fill="none">
        <path
          d="M2 1H92C94.2091 1 96 2.79086 96 5V48H41.9098C40.7019 48 39.5587 47.4542 38.7993 46.5149L2 1Z"
          fill="#272727"
          stroke="#3F3F3F"
        />
      </svg>
      <svg
        className="close-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
      >
        <path
          d="M9.02165 7.00005L13.6919 2.32984C14.0429 1.97867 14.1029 1.46918 13.8258 1.19221L12.8075 0.173938C12.5304 -0.103148 12.0216 -0.0423642 11.6699 0.308572L7.00015 4.97866L2.33006 0.308689C1.97889 -0.0428307 1.4694 -0.103148 1.19231 0.174288L0.174037 1.19268C-0.102932 1.4693 -0.042965 1.97879 0.308672 2.32996L4.97888 7.00005L0.308672 11.6705C-0.0423816 12.0214 -0.103166 12.5306 0.174037 12.8077L1.19231 13.826C1.4694 14.1031 1.97889 14.043 2.33006 13.692L7.00038 9.02155L11.67 13.6913C12.0218 14.0432 12.5305 14.1031 12.8076 13.826L13.8259 12.8077C14.1029 12.5306 14.0429 12.0214 13.692 11.67L9.02165 7.00005Z"
          fill="#979ABE"
        />
      </svg>
    </StyledContainer>
  );
}
