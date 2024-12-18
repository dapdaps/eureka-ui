import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

import { useTokenPriceListStore } from '@/stores/tokenPrice';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const TokenList = styled.div`
  overflow: hidden;
  padding-left: 10px;
  height: 100%;
`;

const TokenContent = styled(motion.div)<{ isHovered: boolean }>`
  display: flex;
  align-items: center;
  gap: 60px;
  height: 100%;
  animation: translateLeft 30s linear 0s infinite normal none running;
  animation-play-state: ${({ isHovered }) => (isHovered ? 'paused' : 'running')};

  @keyframes translateLeft {
    0% {
      transform: translateZ(0);
    }
    100% {
      transform: translate3d(-100%, 0, 0);
    }
  }
`;

const IndexList = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ChainIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 4px;
  border-radius: 50%;
`;

const ChainText = styled.span`
  font-family: Montserrat;
  font-size: 12px;
  font-weight: 500;
  line-height: 12px;
  display: block;
  text-align: left;
  white-space: nowrap;
`;

const ChainIndex = styled.div<{ isPositive: boolean }>`
  font-family: Montserrat;
  font-size: 10px;
  font-weight: 400;
  line-height: 10px;
  color: ${({ isPositive }) => (isPositive ? '#41C37D' : '#FF3D83')};
  white-space: nowrap;
  display: flex;
  align-items: center;
  .token-isPositive {
    height: 10px;
    line-height: 10px;
  }
  .token-percent {
    height: 10px;
    line-height: 10px;
  }
`;

interface Token {
  price: string;
  change_percent: string;
  logo: string;
  symbol: string;
  isPositive: boolean;
}

const LoadingCard = () => {
  return Array.from({ length: 16 }).map((_, index) => (
    <IndexList key={index}>
      <Skeleton width={20} height={20} />
      <Skeleton width={60} height={20} />
      <Skeleton width={40} height={20} />
    </IndexList>
  ));
};

const InfiniteScrollChain = ({ className }: { className?: string }) => {
  const [isHovered, setIsHovered] = useState<any>(false);

  const { list, loading } = useTokenPriceListStore();

  const tokenList = useMemo(() => {
    if (!list) return [];
    return list.map((token: Token) => {
      return {
        ...token,
        change_percent: Math.abs(parseFloat(token?.change_percent)) || 0,
        isPositive: parseFloat(token.change_percent) > 0
      };
    });
  }, [list]);

  return (
    <StyledWrapper className={className}>
      <TokenList>
        <TokenContent
          isHovered={isHovered || loading}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {loading ? (
            <LoadingCard />
          ) : (
            <>
              {[...tokenList, ...tokenList].map((token: Token, index: number) => (
                <IndexList key={`duplicate-${index}`}>
                  <ChainIcon src={token.logo} alt="" />
                  <ChainText>
                    {token.symbol} {parseFloat(token.price).toFixed(2)}
                  </ChainText>
                  <ChainIndex isPositive={token.isPositive}>
                    <div className="token-isPositive">{token.isPositive ? '+' : '-'}</div>
                    <div className="token-percent">{parseFloat(token.change_percent).toFixed(2)}%</div>
                  </ChainIndex>
                </IndexList>
              ))}
            </>
          )}
        </TokenContent>
      </TokenList>
    </StyledWrapper>
  );
};

export default InfiniteScrollChain;
