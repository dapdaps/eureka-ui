import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { get } from '@/utils/http';
import { StyledContainer, StyledImg } from '@/views/Upgrade/styles';

const UpgradeView = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(async () => {
      const result = await get(`/get-token-price-by-dapdap`);
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
