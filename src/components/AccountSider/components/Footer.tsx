import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import useUserReward from '@/hooks/useUserReward'
import { useLayoutStore } from '@/stores/layout';

const StyledContainer = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-shrink: 0;
`;

export const StyledProfileButton = styled(motion.button)`
  border-radius: 10px;
  background: #EBF479;
  width: 262px;
  height: 46px;
  flex-shrink: 0;
  color: #000;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
`;

const Calendar = styled.div`
  width: 46px;
  height: 46px;
  border-radius: 8px;
  border: 1px solid rgba(55, 58, 83, 1);
  background-color: rgba(55, 58, 83, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const PrizeWapper = styled.div`
  flex: 1;
  border: 1px solid rgba(55, 58, 83, 1);
  height: 34px;
  border-radius: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  gap: 10px;
`

export default function Footer() {
  const router = useRouter();
  const { info, loading} = useUserReward()
  const setLayoutStore = useLayoutStore((store) => store.set);

  return (
    <div>
      <StyledContainer>
        <StyledProfileButton
          whileHover={{ opacity: 0.8 }}
          whileTap={{ opacity: 0.6 }}
          onClick={() => {
            router.push('/profile');
            setLayoutStore({ showAccountSider: false });
          }}
          data-bp="30012-001"
        >
          My Profile
        </StyledProfileButton>

        <Calendar onClick={() => {
          router.push('/profile');
          setLayoutStore({ showAccountSider: false });
        }}>
          <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 3.54839V3.54839C2.79086 3.54839 1 5.33925 1 7.54839L1 15C1 17.2091 2.79086 19 5 19H17C19.2091 19 21 17.2091 21 15V6.54839C21 4.89153 19.6569 3.54839 18 3.54839H16.5M10 3.54839H11.5M7.5 1V4.5M14 1V4.5M6.62903 11.5L10.129 14.5L15.5 8" stroke="#EBF479" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </Calendar>
      </StyledContainer>
      <StyledContainer style={{ paddingTop: 0 }}>
        <PrizeWapper>
          <img src="/images/dashboard/pts.svg" />
          <div>{ info.reward } PTS</div>
        </PrizeWapper>
        <PrizeWapper>
          <img src="/images/dashboard/prize.svg" />
          <div>#{ info.rank }</div>
        </PrizeWapper>
      </StyledContainer>
    </div>
  );
}
