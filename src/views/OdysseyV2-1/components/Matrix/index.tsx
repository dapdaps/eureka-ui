import {
  StyledMatrixContainer,
  StyledMatrixBorder,
  StyledTitleContainer,
  StyledMatrixTag,
  StyledTitle,
  StyledSubTitle,
  StyledGameContainer
} from './styles';

const Matrix = () => {
  return <StyledMatrixContainer>
    <StyledMatrixBorder>
      <StyledMatrixTag>
        DAPDAP ODYSSEY VOL.2*
      </StyledMatrixTag>
      <StyledTitleContainer>
        <StyledTitle>The Matrix</StyledTitle>
        <StyledSubTitle>By exploring the dApp to light up the card, unlock the horizontal or vertical of cards to earn PTS</StyledSubTitle>
        <StyledGameContainer></StyledGameContainer>
      </StyledTitleContainer>
  </StyledMatrixBorder>
</StyledMatrixContainer>
  ;
}

export default Matrix;