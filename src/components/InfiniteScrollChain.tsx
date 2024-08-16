import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
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
  animation: translateLeft 15s linear infinite;
  animation-play-state: ${({ isHovered }) => (isHovered ? 'paused' : 'running')};

  @keyframes translateLeft {
    0% {
      transform: translate(0);
    }
    100% {
      transform: translateX(-50%);
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
`;

const ChainText = styled.span`
  font-family: Montserrat;
  font-size: 12px;
  font-weight: 500;
  line-height: 12px;
  min-width: 80px;
  display: block;
  text-align: left;
  white-space: nowrap;
`;

const ChainIndex = styled.span<{ isPositive: boolean }>`
  font-family: Montserrat;
  font-size: 10px;
  font-weight: 400;
  line-height: 10px;
  color: ${({ isPositive }) => (isPositive ? '#41C37D' : '#FF3D83')};
`;

const InfiniteScrollChain = ({ className }: { className?: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  const { list, loading } = useTokenPriceListStore();

  const tokenList = useMemo(() => {
    if (!list) return [];
    // list 
  }, [list])

  return (
    <StyledWrapper className={className}>
      <TokenList>
        <TokenContent
        isHovered={isHovered}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
          {Array.from({ length: 100 }).map((_, index) => (
            <IndexList key={index}>
              <ChainIcon src="/images/chains/blast.png" alt="" />
              <ChainText>Blast 8.68</ChainText>
              <ChainIndex isPositive={index % 2 === 0}>+1.23%</ChainIndex>
            </IndexList>
          ))}
        </TokenContent>
      </TokenList>
    </StyledWrapper>
  );
};

export default InfiniteScrollChain;
