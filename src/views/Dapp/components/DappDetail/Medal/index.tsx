import Loading from '@/components/Icons/Loading';
import {
  StyledContainer,
  StyledTitle,
  StyledMedalContainer,
  StyledMedalLogo,
  StyledMedalInner,
  StyledMedalTag,
  StyledMedalName,
  StyledMedals
} from './styles';
import { motion } from 'framer-motion';
import Empty from '@/components/Empty';

const Medal = (props: Props) => {

  const {
   medalList = [],
    loading
  } = props;


  return (
    <StyledContainer>
      <StyledTitle>Medal{medalList.length > 1 ? 's' : ''}</StyledTitle>
      {
        loading ? <Loading /> :(
          medalList.length > 0 ? (<StyledMedals>
            {
              medalList.map((medal, index) => {
                const isFinshed = medal.percent === 1;
                return (

                  <StyledMedalContainer key={`medal_${index}`}>
                    <StyledMedalTag className={medal.percent === 1 ? 'active' : ''}>
                      {isFinshed ? 'Acheived' : ` Process ${medal.percent * 100}%`}
                    </StyledMedalTag>
                    <StyledMedalInner>
                      {
                        !isFinshed && (<svg xmlns="http://www.w3.org/2000/svg" width="102" height="102" viewBox="0 0 102 102" fill="none">
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
                            pathLength: medal.percent,
                          }}
                          transition={{
                            duration: 1,
                          }}
                        />
                      </svg>)
                      }
                      <StyledMedalLogo url={medal.logo} />
                    </StyledMedalInner>
                    <StyledMedalName>{medal.label}</StyledMedalName>
                  </StyledMedalContainer>
                )
              })
            }
          </StyledMedals>) : (<Empty tips='No medal yet.' size={42}/>))
      }
    </StyledContainer>
  );
};

export default Medal;

interface Props {
  medalList: Medal[];
  loading?: boolean;
}

interface Medal {
  percent: number;
  logo: string;
  label: string;
}