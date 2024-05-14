import {
  StyledContainer,
  StyledContent,
  StyledFoot,
  StyledHead,
  StyledTitle
} from "@/views/OdysseyV5/components/Blitz/styles";

const Blitz = () => {

  return (
    <StyledContainer>
      <StyledHead>
        <StyledTitle>
          <h2 className="title">
            Mode DApp Blitz
          </h2>
          <h5 className="title sub">
            Experience the Madness, Snatch Extraordinary Bounties!
          </h5>
        </StyledTitle>
      </StyledHead>
      <StyledContent></StyledContent>
      <StyledFoot></StyledFoot>
    </StyledContainer>
  );
};

export default Blitz;
