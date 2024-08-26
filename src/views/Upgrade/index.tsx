import { StyledContainer, StyledImg } from '@/views/Upgrade/styles';
import { useEffect } from 'react';
import { get } from '@/utils/http';
import { useRouter } from 'next/router';

const UpgradeView = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(async () => {
      const result = await get(`/api/token/price/latest`);
      if (result && result.code !== 9000) {
        clearInterval(timer);
        router.replace('/');
      }
    }, 60000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <StyledContainer>
      <StyledImg src="/images/upgrade/index.png" alt="" />
    </StyledContainer>
  );
};

export default UpgradeView;
