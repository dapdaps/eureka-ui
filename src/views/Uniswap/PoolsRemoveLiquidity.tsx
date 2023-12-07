import { memo, useState } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'next/navigation';
import Spinner from '@/components/Spinner';
import PoolRemoveAmount from './components/pools/PoolRemoveAmount';
import PoolRemoveCollect from './components/pools/PoolRemoveCollect';
import PoolRemovePair from './components/pools/PoolRemovePair';
import PoolRemoveToken from './components/pools/PoolRemoveToken';
import RemoveButton from './components/pools/RemoveButton';
import Head from './components/pools/AddHead';

import useRemoveDetail from './hooks/useRemoveDetail';

const StyledContainer = styled.div`
  width: 605px;
  border-radius: 24px;
  border: 1px solid #3d363d;
  background-color: #131313;
  @media (max-width: 768px) {
    width: 100%;
    border: none;
  }
`;
const StyledBody = styled.div`
  padding: 20px;
  @media (max-width: 768px) {
    padding-top: 0px;
  }
`;

const PoolsRemoveLiquidity = () => {
  const searchParams = useSearchParams();
  const [percent, setPercent] = useState(0);
  const [useWeth, setUseWeth] = useState(false);
  const { token0, token1, detail, loading, collectData, changeToWeth } = useRemoveDetail(searchParams.get('id') || '');
  return (
    <StyledContainer>
      {!loading && detail ? (
        <>
          <Head showCleanAll={false} isRemove={true} />
          <StyledBody>
            <PoolRemovePair token0={token0} token1={token1} fee={detail?.fee} status={detail?.status} />
            <PoolRemoveAmount percent={percent} setPercent={setPercent} />
            <PoolRemoveToken
              token0={token0}
              token1={token1}
              percent={percent}
              liquidityToken0={detail?.liquidityToken0}
              liquidityToken1={detail?.liquidityToken1}
              collectToken0={collectData?.collectToken0}
              collectToken1={collectData?.collectToken1}
            />
            {detail?.useNative && (
              <PoolRemoveCollect
                useWeth={useWeth}
                setUseWeth={() => {
                  changeToWeth(!useWeth);
                  setUseWeth(!useWeth);
                }}
              />
            )}
            <RemoveButton
              token0={token0}
              token1={token1}
              liquidityToken0={detail?.liquidityToken0}
              liquidityToken1={detail?.liquidityToken1}
              liquidity={detail?.liquidity}
              percent={percent}
              tokenId={detail?.tokenId}
            />
          </StyledBody>
        </>
      ) : (
        <Spinner />
      )}
    </StyledContainer>
  );
};

export default memo(PoolsRemoveLiquidity);
