import { motion } from 'framer-motion';

import Empty from '@/components/Empty';
import Loading from '@/components/Icons/Loading';
import type { Category } from '@/hooks/useAirdrop';
import useChainDappMedal from '@/views/Dapp/hooks/useChainDappMedal';

import {
  StyledContainer,
  StyledLoading,
  StyledMedalContainer,
  StyledMedalInner,
  StyledMedalLogo,
  StyledMedalName,
  StyledMedals,
  StyledMedalTag,
  StyledTitle} from './styles';

const Medal = ({ id, type }: Props) => {

  const  { loading,medalList, account } = useChainDappMedal(type, id);

  return (
    <StyledContainer>
      <StyledTitle>Medal{medalList.length > 1 ? 's' : ''}</StyledTitle>
      {
        loading ? (<StyledLoading>
          <Loading />
        </StyledLoading>) : (
          medalList.length > 0 ? (<StyledMedals>
            {
              medalList.map((medal: Medal, index: number) => {
                medal.completed_percent = isNaN(Number(medal?.completed_percent)) ? '0' : medal.completed_percent;
                const _percent: any = Number(parseFloat(medal.completed_percent).toFixed(2));
                const isFinished = _percent === 100;
                return (
                  <StyledMedalContainer key={`medal_${index}`}>
                    {account && (<StyledMedalTag className={isFinished ? 'active' : ''}>
                      {isFinished ? 'Achieved' : ` Process ${_percent}%`}
                    </StyledMedalTag>)}
                    <StyledMedalInner>
                      {
                        !isFinished && (<svg xmlns="http://www.w3.org/2000/svg" width="102" height="102" viewBox="0 0 102 102" fill="none">
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
                            pathLength: _percent / 100,
                          }}
                          transition={{
                            duration: 1,
                          }}
                        />
                      </svg>)
                      }
                      <StyledMedalLogo url={medal.logo} className={!isFinished ? 'dark' : ''}/>
                    </StyledMedalInner>
                    <StyledMedalName>{medal.medal_name}</StyledMedalName>
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
  id: number;
  type: Category;
}

interface Medal {
  completed_percent: string;
  logo: string;
  medal_name: string;
}