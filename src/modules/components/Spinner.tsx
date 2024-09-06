import { memo } from "react";
import styled from "styled-components";
const StyledSpinner = styled.div`
  position: fixed;
  z-index: 8001;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
`;
const StyledSpinnerCover = styled.div`
  position: absolute;
  z-index: 50;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
  background: var(--agg-secondary-color, #000);
  opacity: 0.6;
`
const StyledSpinnerContainer = styled.div`
  position: relative;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;
const StyledSpinnerImg = styled.img`
  width: 50px;
`;

export default memo(function Spinner(props: any) {
  const {
    from
  } = props
  return (
    <StyledSpinner>
      {
        from !== 'layer' && (
          <StyledSpinnerCover />
        )
      }
      <StyledSpinnerContainer>
        <StyledSpinnerImg src={from === "layer" ? "https://ipfs.near.social/ipfs/bafkreiha6ccvtxzg36mp2l3h63pfudv7bw35z4ftwfd233ganhxm22kv7a" : "https://ipfs.near.social/ipfs/bafkreigxis5i2vafexhyfbafhwfvkebnk7epluyshqrzvkkbixrkkinudu"} />
      </StyledSpinnerContainer>
    </StyledSpinner>
  );
})
