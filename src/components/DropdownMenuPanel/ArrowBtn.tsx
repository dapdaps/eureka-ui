import styled from 'styled-components';

const StyledBtn = styled.button`
  position: absolute;
  z-index: 5;
  background-color: transparent;
  &:not(:disabled):hover {
    opacity: 0.8;
  }
  &:not(:disabled):active {
    opacity: 0.6;
  }
`;

const StyledLeftButton = styled(StyledBtn)`
  left: -24px;
  top: 64px;
`;
const StyledRightButton = styled(StyledBtn)`
  right: -24px;
  top: 64px;
`;

export const LeftButton = ({ onClick }: any) => {
  return (
    <StyledLeftButton onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="38" height="46" viewBox="0 0 38 46" fill="none">
        <rect x="1" y="1" width="36" height="44" rx="12" fill="#393A4C" stroke="white" strokeOpacity="0.2" />
        <path d="M23 16L16 23L23 30" stroke="#979ABE" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </StyledLeftButton>
  );
};

export const RightButton = ({ onClick }: any) => {
  return (
    <StyledRightButton onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="38" height="46" viewBox="0 0 38 46" fill="none">
        <rect x="1" y="1" width="36" height="44" rx="12" fill="#393A4C" stroke="white" strokeOpacity="0.2" />
        <path d="M16 16L23 23L16 30" stroke="#979ABE" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </StyledRightButton>
  );
};
