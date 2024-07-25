import {
  StyledContainer,
  StyledTitle,
  StyledMedalContainer,
  StyledMedalLogo,
  StyledMedalInner,
  StyledMedalTag
} from './styles';


const Medal = () => {

  return (
    <StyledContainer>
      <StyledTitle>Medal</StyledTitle>

      <StyledMedalContainer>
        <StyledMedalInner>
          <svg xmlns="http://www.w3.org/2000/svg" width="102" height="102" viewBox="0 0 102 102" fill="none">
            <circle cx="51" cy="51" r="50" stroke="#292C41" stroke-width="2" />
            <path d="M51 1C78.6142 1 101 23.3858 101 51C101 64.6857 95.5015 77.0872 86.5932 86.1159" stroke="#EBF479"
                  stroke-width="2" stroke-linecap="round" />
          </svg>
          <StyledMedalLogo url={'/images/alldapps/icon-medal.png'}/>
        </StyledMedalInner>
        <StyledMedalTag>Process 30%</StyledMedalTag>
      </StyledMedalContainer>

    </StyledContainer>
  );
};

export default Medal;