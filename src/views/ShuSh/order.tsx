import { memo, useEffect } from 'react';
import { useRouter } from 'next/router';
import Spinner from '@/components/Spinner';
import Common from './common';
import OrderPanel from './components/OrderPanel';
import useChechStatus from './hooks/useChechStatus';
import useNetworksAndTokens from './hooks/useNetworksAndTokens';
import { StyledBack } from './styles';

const ShuShOrderView = ({ id }: any) => {
  const { loading, statusResult, queryStatus } = useChechStatus(true);
  const { loading: tokensLoading, tokens } = useNetworksAndTokens();
  const router = useRouter();
  useEffect(() => {
    if (id) queryStatus(id);
  }, [id]);
  return (loading || tokensLoading) && !statusResult ? (
    <Spinner />
  ) : statusResult ? (
    <Common anonymous={statusResult.semi}>
      <StyledBack
        onClick={() => {
          router.back();
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="5" height="8" viewBox="0 0 5 8" fill="none">
          <path d="M4 7L1 4L4 1" stroke="#979ABE" strokeLinecap="round" />
        </svg>
        <span>Back</span>
      </StyledBack>
      <OrderPanel
        order={statusResult}
        tokens={tokens}
        defaultExpand={true}
        onSuccess={() => {
          queryStatus(id);
        }}
      />
    </Common>
  ) : (
    <div />
  );
};

export default memo(ShuShOrderView);
