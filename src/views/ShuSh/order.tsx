import { useRouter } from 'next/router';
import { memo, useEffect } from 'react';

import Spinner from '@/components/Spinner';

import Common from './common';
import OrderPanel from './components/OrderPanel';
import useChechStatus from './hooks/useChechStatus';
import useNetworksAndTokens from './hooks/useNetworksAndTokens';
import { StyledBack, StyledEmpty } from './styles';

const ShuShOrderView = ({ id }: any) => {
  const { loading, statusResult, queryStatus } = useChechStatus(true);
  const { loading: tokensLoading, tokens } = useNetworksAndTokens();
  const router = useRouter();
  useEffect(() => {
    if (id) queryStatus(id);
  }, [id]);
  return (loading || tokensLoading) && !statusResult ? (
    <Spinner />
  ) : (
    <Common anonymous={statusResult?.semi === undefined ? statusResult?.anonymous : statusResult.semi} from="order">
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
      {statusResult ? (
        <OrderPanel
          order={statusResult}
          tokens={tokens}
          defaultExpand={true}
          onSuccess={() => {
            queryStatus(id);
          }}
        />
      ) : (
        <StyledEmpty>No results.</StyledEmpty>
      )}
    </Common>
  );
};

export default memo(ShuShOrderView);
