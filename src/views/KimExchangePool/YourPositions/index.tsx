import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { memo } from 'react';

import Loading from '@/components/Icons/Loading';
import useAccount from '@/hooks/useAccount';
import { formateValue } from '@/utils/formate';
import Status from '@/views/Pool/components/Status';
import { checkIsFullRange, tickToPrice } from '@/views/Pool/utils/tickMath';

import usePoolInfo from '../hooks/usePoolInfo';
import { COLUMNS } from './config';
import Empty from './Empty';
import {
  LoadingWrapper,
  StyledContainer,
  StyledGhostButton,
  StyledHandler,
  StyledHeader,
  StyledIcon,
  StyledIcons,
  StyledPool,
  StyledPrimaryButton,
  StyledRange,
  StyledRow,
  StyledTitle
} from './styles';

const Position = ({ token0, token1, tickLower, tickUpper, liquidity, address, onClick, onRemove, onAdd }: any) => {
  const isFullRange = checkIsFullRange({ tickLower, tickUpper });
  const { info, loading } = usePoolInfo(address);

  return (
    <StyledRow onClick={onClick}>
      {COLUMNS.map((column) => (
        <div key={column.key} style={{ width: column.width }}>
          {column.key === 'pool' && (
            <StyledPool>
              <StyledIcons>
                <StyledIcon src={token0.icon} />
                <StyledIcon style={{ marginLeft: '-8px' }} src={token1.icon} />
              </StyledIcons>
              <StyledTitle>
                {token0.symbol}/{token1.symbol}
              </StyledTitle>
            </StyledPool>
          )}
          {column.key === 'range' && (
            <StyledRange>
              <span className="gray">Min:</span>
              <span>
                {isFullRange ? 0 : formateValue(1 / tickToPrice({ tick: tickLower, token0, token1 }), 3)}{' '}
                {token0.symbol} per {token1.symbol}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="8" viewBox="0 0 18 8" fill="none">
                <path
                  d="M0.646447 3.64645C0.451184 3.84171 0.451184 4.15829 0.646447 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646447 3.64645ZM17.3536 4.35355C17.5488 4.15829 17.5488 3.84171 17.3536 3.64645L14.1716 0.464466C13.9763 0.269204 13.6597 0.269204 13.4645 0.464466C13.2692 0.659728 13.2692 0.976311 13.4645 1.17157L16.2929 4L13.4645 6.82843C13.2692 7.02369 13.2692 7.34027 13.4645 7.53553C13.6597 7.7308 13.9763 7.7308 14.1716 7.53553L17.3536 4.35355ZM1 4.5H17V3.5H1V4.5Z"
                  fill="#979ABE"
                />
              </svg>
              <span className="gray">Max:</span>
              <span>
                {isFullRange ? '∞' : formateValue(1 / tickToPrice({ tick: tickUpper, token0, token1 }), 3)}{' '}
                {token0.symbol} per {token1.symbol}
              </span>
            </StyledRange>
          )}
          {column.key === 'status' && (
            <Status
              loading={loading}
              tickLower={tickLower}
              tickUpper={tickUpper}
              liquidity={liquidity}
              currentTick={info?.currentTick}
            />
          )}
          {column.key === 'handler' && (
            <StyledHandler>
              <StyledPrimaryButton
                onClick={(ev) => {
                  ev.stopPropagation();
                  onAdd();
                }}
              >
                Increase
              </StyledPrimaryButton>
              {Number(liquidity) > 0 && (
                <StyledGhostButton
                  onClick={(ev) => {
                    ev.stopPropagation();
                    onRemove();
                  }}
                >
                  Remove
                </StyledGhostButton>
              )}
            </StyledHandler>
          )}
        </div>
      ))}
    </StyledRow>
  );
};

const YourPositions = ({ pools, loading, currentChain }: any) => {
  const router = useRouter();
  const { chainId } = useAccount();
  const searchParams = useSearchParams();

  return (
    <StyledContainer>
      {!!pools?.length && (
        <StyledHeader>
          {COLUMNS.map((column) => (
            <div key={column.key} style={{ width: column.width }}>
              {column.label}
            </div>
          ))}
        </StyledHeader>
      )}
      {loading ? (
        <LoadingWrapper>
          <Loading size={30} />
        </LoadingWrapper>
      ) : (
        <>
          {pools?.map((pool: any) => (
            <Position
              key={pool.tokenId}
              {...pool}
              onClick={() => {
                const params = new URLSearchParams(searchParams);
                params.set('id', pool.tokenId);
                router.push(`/dapp/${router.query.dappRoute}/position?${params.toString()}`);
              }}
              onRemove={() => {
                const params = new URLSearchParams(searchParams);
                params.set('id', pool.tokenId);
                router.push(`/dapp/${router.query.dappRoute}/remove?${params.toString()}`);
              }}
              onAdd={() => {
                const params = new URLSearchParams(searchParams);
                params.set('id', pool.tokenId);
                router.push(`/dapp/${router.query.dappRoute}/increase?${params.toString()}`);
              }}
            />
          ))}
          {pools.length === 0 && <Empty isChainSupport={currentChain.chain_id === chainId} chain={currentChain} />}
        </>
      )}
    </StyledContainer>
  );
};

export default memo(YourPositions);
