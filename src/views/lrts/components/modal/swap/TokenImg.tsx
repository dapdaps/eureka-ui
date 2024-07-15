import styled from 'styled-components';

const StyledContainer = styled.div`
  position: relative;
`;

const StyledImg = styled.img`
  position: relative;
  z-index: 6;
`;

const StyledBg = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  left: 0px;
  top: 0px;
  filter: blur(10px);
`;

export default function TokenImg({ src, color, width }: any) {
  return (
    <StyledContainer>
      <StyledImg
        src={src}
        style={{
          width,
        }}
      />
      <StyledBg
        style={{
          background: color,
        }}
      />
    </StyledContainer>
  );
}
