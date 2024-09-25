import { useEffect, useState } from 'react';
import styled from 'styled-components';

import chainCofig from '@/config/chains';
import { get } from '@/utils/http';

const StyledWrapper = styled.div`
  background: url('/images/home/price-board-bg.png') no-repeat;
  background-size: cover;
  width: 1139px;
  height: 402px;
  margin-top: 20px;
  position: relative;
`;

const StyledTitle = styled.div`
  font-family: Montserrat;
  font-size: 32px;
  font-weight: 900;
  line-height: 32px;
  text-align: left;
  background: linear-gradient(90deg, #53577b 0%, #222537 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-left: 130px;
  margin-top: 20px;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(17, 67px);
  grid-template-rows: repeat(6, 67px);
  width: 1139px;
  height: 402px;
  position: absolute;
  left: 0;
  top: 0;
`;

const StyledContainer = styled.div``;

const PriceBox = styled.div<{ row: number; col: number; isBest?: boolean; isLowest?: boolean }>`
  grid-row: ${({ row }) => row};
  grid-column: ${({ col }) => col};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 67px;
  height: 67px;
  text-align: center;
  color: white;
  position: relative;
  cursor: pointer;

  &:hover {
    .stick {
      color: white;
      .isBest {
        background: rgba(113, 176, 252, 1);
        color: white;
      }
      .isLowest {
        color: white;
        background: rgba(255, 121, 194, 1);
      }
    }
    img {
      opacity: 1;
    }
  }
  .stick {
    position: absolute;
    top: ${({ isBest, isLowest }) => (isBest || isLowest ? '-46px' : '-18px')};
    width: 80px;
    max-width: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 2;
    font-family: Montserrat;
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    color: #53577b;
    transition: color 0.3s ease;
    .isBest {
      background: rgba(113, 176, 252, 0.1);
      font-family: Montserrat;
      font-size: 10px;
      font-weight: 400;
      line-height: 10px;
      text-align: center;
      padding: 5px 7px;
      color: #71b0fc;
      border-radius: 4px;
      margin-bottom: 8px;
      transition: background 0.3s ease;
    }
    .isLowest {
      background: rgba(255, 121, 194, 0.1);
      font-family: Montserrat;
      font-size: 10px;
      font-weight: 400;
      line-height: 10px;
      text-align: center;
      padding: 5px 7px;
      color: #ff79c2;
      border-radius: 4px;
      margin-bottom: 8px;
      transition: background 0.3s ease;
    }
  }
`;

const Icon = styled.img`
  width: 56px;
  height: 56px;
  opacity: 0.3;
  transition: opacity 0.3s ease;
`;

interface IPriceData {
  price: number;
  icon: string;
  isBest?: boolean;
  isLowest?: boolean;
  chain_id: number;
}

const PriceBoard = ({ onSelectChain }: { onSelectChain: (chain_id: number) => void }) => {
  const [priceData, setPriceData] = useState<IPriceData[]>([]);
  const [_, setLoading] = useState(false);

  const fetchPriceData = async () => {
    try {
      setLoading(true);
      const { data } = await get('/api/token/price/chain', {
        symbol: 'ETH'
      });

      const bestPriceItem = data.reduce((max: any, item: any) => (item.price > max.price ? item : max), data[0]);
      const lowestPriceItem = data.reduce((min: any, item: any) => (item.price < min.price ? item : min), data[0]);

      const bestChainId = bestPriceItem.chain_id;
      const lowestChainId = lowestPriceItem.chain_id;

      const priceData = data.map((item: IPriceData) => ({
        price: item.price,
        icon: chainCofig[item.chain_id].icon,
        isBest: item.chain_id === bestChainId,
        isLowest: item.chain_id === lowestChainId,
        chain_id: item.chain_id
      }));
      setPriceData(priceData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPriceData();
  }, []);

  const generateGridIndexMap = (priceData: IPriceData[]) => {
    const bestIndex = priceData.findIndex((data) => data.isBest);
    const lowestIndex = priceData.findIndex((data) => data.isLowest);

    const gridIndexMap = Array(priceData.length).fill({ row: 0, col: 0 });

    gridIndexMap[bestIndex] = { row: 2, col: 15 };
    gridIndexMap[lowestIndex] = { row: 5, col: 3 };

    const middlePositions = [
      ...[4, 7, 10, 13].map((col) => ({ row: 3, col })),
      ...[5, 8, 11, 14].map((col) => ({ row: 4, col })),
      ...[6, 9, 12, 15].map((col) => ({ row: 5, col })),
      ...[5, 8, 11, 14].map((col) => ({ row: 6, col }))
    ];

    let middlePriceIndex = 0;

    for (let i = 0; i < priceData.length; i++) {
      if (i !== bestIndex && i !== lowestIndex) {
        if (middlePriceIndex < middlePositions.length) {
          gridIndexMap[i] = middlePositions[middlePriceIndex];
          middlePriceIndex++;
        }
      }
    }
    return gridIndexMap;
  };

  const gridIndexMap = generateGridIndexMap(priceData);

  return (
    <StyledWrapper>
      <StyledTitle>ETH Price Board</StyledTitle>
      <StyledContainer>
        <Container>
          {priceData.map((data: IPriceData, index: number) => (
            <PriceBox
              key={index}
              row={gridIndexMap[index].row}
              col={gridIndexMap[index].col}
              isBest={data.isBest}
              isLowest={data.isLowest}
              onClick={() => onSelectChain(data.chain_id)}
            >
              <div className="stick">
                {data.isBest && <div className="isBest">Best price</div>}
                {data.isLowest && <div className="isLowest">Lowest price</div>}
                <div>{data.price}</div>
              </div>
              <Icon src={data.icon} alt="Token Icon" />
            </PriceBox>
          ))}
        </Container>
      </StyledContainer>
    </StyledWrapper>
  );
};

export default PriceBoard;
