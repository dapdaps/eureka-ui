import { memo, useState } from 'react';
import styled from 'styled-components';
import Spinner from '@/components/Spinner';

import { useSearchParams } from 'next/navigation';
import useDetail from './hooks/useDetail';

import Back from './components/pools/Back';
import PoolBaseData from './components/pools/PoolBaseData';
import PoolPair from './components/pools/PoolPair';
import PoolPriceRange from './components/pools/PoolPriceRange';

const StyledContainer = styled.div`
  width: 810px;
`;

const PoolsDetailLiquidity = () => {
  const searchParams = useSearchParams();
  const { loading, detail, collectData, getCollectData } = useDetail(searchParams.get('id') || '');
  const [isReverse, setIsReverse] = useState(true);

  return (
    <StyledContainer>
      <Back />
      {!loading && detail ? (
        <>
          <PoolPair detail={detail} isReverse={isReverse} tokenId={searchParams.get('id') || ''} />
          <PoolBaseData
            detail={detail}
            isReverse={isReverse}
            collectData={collectData}
            onSuccess={() => {
              getCollectData();
            }}
          />
          <PoolPriceRange
            detail={detail}
            isReverse={isReverse}
            onSetReverse={() => {
              setIsReverse(!isReverse);
            }}
          />
        </>
      ) : (
        <Spinner />
      )}
    </StyledContainer>
  );
};

export default memo(PoolsDetailLiquidity);
