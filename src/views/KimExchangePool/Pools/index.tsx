import { useRouter } from 'next/router';

import Loading from '@/components/Icons/Loading';
import { formateValueWithThousandSeparator } from '@/utils/formate';

import { COLUMNS } from './config';
import {
  LoadingWrapper,
  StyledApr,
  StyledContainer,
  StyledHeader,
  StyledIcon,
  StyledIcons,
  StyledPool,
  StyledRow,
  StyledTag,
  StyledTitle,
} from './styles';

const Pools = ({ pools, loading }: any) => {
  const router = useRouter();
  return (
    <StyledContainer>
      <StyledHeader>
        {COLUMNS.map((column) => (
          <div key={column.key} style={{ width: column.width }}>
            {column.label}
          </div>
        ))}
      </StyledHeader>
      {loading ? (
        <LoadingWrapper>
          <Loading size={30} />
        </LoadingWrapper>
      ) : (
        pools.map((pool: any) => (
          <StyledRow
            key={pool.address}
            onClick={() => {
              router.push(
                `/dapp/${router.query.dappRoute}/add?token0=${pool.token0.address}&token1=${pool.token1.address}`,
              );
            }}
          >
            {COLUMNS.map((column) => (
              <div key={column.key} style={{ width: column.width }}>
                {column.key === 'pool' && (
                  <StyledPool>
                    <StyledIcons>
                      <StyledIcon src={pool.token0.icon} />
                      <StyledIcon src={pool.token1.icon} style={{ marginLeft: '-8px' }} />
                    </StyledIcons>
                    <StyledTitle>
                      {pool.token0.symbol} / {pool.token1.symbol}
                    </StyledTitle>
                    {pool.boost && (
                      <StyledTag style={{ color: '#00D1FF' }}>
                        <span>Boost</span>
                        <div className="tag-tips">
                          {pool.boost.map((item: string) => (
                            <div key={item}>{item}</div>
                          ))}
                        </div>
                      </StyledTag>
                    )}
                    {pool.event && (
                      <StyledTag style={{ color: '#81ED70' }}>
                        <span>Event</span>
                        <div className="tag-tips">
                          {pool.event.map((item: string) => (
                            <div key={item}>{item}</div>
                          ))}
                        </div>
                      </StyledTag>
                    )}
                  </StyledPool>
                )}
                {column.key === 'tvl' && <div>${formateValueWithThousandSeparator(pool.tvl, 2)}</div>}
                {column.key === 'apr' && (
                  <StyledApr key={column.key}>
                    <span>{pool.apr}%</span>
                    <div className="apr-tips">
                      <div>
                        <span className="gray">Swap fees APR:</span> {pool.feeApr}%{' '}
                      </div>
                      <div>
                        <span className="gray">Market maker APR:</span> {pool.marketApr}%
                      </div>
                    </div>
                  </StyledApr>
                )}
                {column.key === 'market' && (
                  <div key={column.key}>
                    {pool.kim && <div>{pool.kim} KIM</div>}
                    {pool.xkim && <div style={{ marginTop: '5px' }}>{pool.xkim} xKIM</div>}
                  </div>
                )}
              </div>
            ))}
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="10" viewBox="0 0 8 10" fill="none">
              <path
                d="M6.93407 4.21913C7.43448 4.61945 7.43448 5.38054 6.93407 5.78087L2.03485 9.70024C1.38009 10.2241 0.410156 9.75788 0.410156 8.91937L0.410156 1.08062C0.410156 0.242118 1.38009 -0.224055 2.03485 0.299756L6.93407 4.21913Z"
                fill="#979ABE"
              />
            </svg>
          </StyledRow>
        ))
      )}
    </StyledContainer>
  );
};

export default Pools;
