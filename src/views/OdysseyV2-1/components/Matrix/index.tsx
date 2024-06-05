import MatrixGame from '@/views/OdysseyV2-1/components/Matrix/MatrixGame';

import {
  StyledMatrixBorder,
  StyledMatrixContainer,
  StyledMatrixLogo,
  StyledMatrixTag,
  StyledSubTitle,
  StyledTitle,
  StyledTitleContainer,
} from './styles';

const Matrix = (props: any) => {
  return (
    <StyledMatrixContainer>
      <StyledMatrixBorder>
        <StyledMatrixTag>
          DAPDAP ODYSSEY VOL.2*
        </StyledMatrixTag>
        <StyledTitleContainer>
          <StyledMatrixLogo />
          <StyledTitle>The Matrix</StyledTitle>
        </StyledTitleContainer>
        <StyledSubTitle>By exploring the dApp to light up the card, unlock the horizontal or vertical of cards to earn
          PTS</StyledSubTitle>
        <MatrixGame {...props} />
      </StyledMatrixBorder>
    </StyledMatrixContainer>
  );
};

export default Matrix;
