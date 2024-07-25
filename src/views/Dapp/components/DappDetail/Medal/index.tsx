import {
  StyledContainer,
  StyledTitle,
  StyledMedalContainer,
  StyledMedalLogo,
  StyledMedalInner,
  StyledMedalTag, StyledMedalName,
} from './styles';
import { motion } from 'framer-motion';

const Medal = () => {

  const percent = 0.35;

  return (
    <StyledContainer>
      <StyledTitle>Medal</StyledTitle>
      <StyledMedalContainer>
        <StyledMedalTag>
          Process {percent * 100}%
        </StyledMedalTag>
        <StyledMedalInner>
          <svg xmlns="http://www.w3.org/2000/svg" width="102" height="102" viewBox="0 0 102 102" fill="none">
            <circle cx="51" cy="51" r="50" stroke="#292C41" strokeWidth="2" />
            <motion.circle
              cx="51"
              cy="51"
              r="50"
              stroke="#EBF479"
              strokeWidth="2"
              transform="matrix(0, -1, 1, 0, 0 , 102)"
              initial={{
                pathLength: 0,
              }}
              animate={{
                pathLength: percent,
              }}
              transition={{
                duration: 1,
              }}
            />
          </svg>
          <StyledMedalLogo url={'/images/alldapps/icon-medal.png'} />
        </StyledMedalInner>
        <StyledMedalName>Bridger Junior</StyledMedalName>
      </StyledMedalContainer>
    </StyledContainer>
  );
};

export default Medal;