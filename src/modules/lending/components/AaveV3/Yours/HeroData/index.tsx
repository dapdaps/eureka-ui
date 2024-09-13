import { styled } from 'styled-components';

import formatNumber from '../../utils/formatNumber';

const HeroDataContainer = styled.div`
  margin: 30px auto;
  width: 500px;
  display: flex;
  justify-content: space-between;
  color: var(--agg-primary-color, #fff);
`;

const KVData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  .key {
    font-size: 18px;
    font-weight: 500;
  }
  .value {
    font-size: 16px;
    font-weight: 700;
    display: flex;
    align-items: center;
  }
  .text-green {
    color: #2cffa7;
  }
`;

const Yours = (props: any) => {
  const {
    netWorth,
    netAPY,
    healthFactor,
    config,
    totalMarketSize,
    totalAvailable,
    totalBorrows,
    BlastPoints,
    BlastGold,
  } = props;

  console.log(props, 'HeroData>=====');
  

  if (!netWorth || !netAPY || !healthFactor) {
    return <div />;
  }

  const { heroData } = config;

  const heroDataMap: any = {
    'Net Worth': netWorth,
    'Net APY': netAPY,
    'Health Factor': healthFactor > 10000 ? '∞' : healthFactor,
    'Total market size': formatNumber(totalMarketSize),
    'Total available': formatNumber(totalAvailable),
    'Total borrows': formatNumber(totalBorrows),
    'Blast Points': BlastPoints,
    'Blast Gold': BlastGold,
  };

  const heroDataTitle = heroData.map((item: any) => ({
    name: item,
    value: heroDataMap[item],
  }));

  return (
    <HeroDataContainer>
      {heroDataTitle.map((row: any) => (
        <KVData key={row.name}>
          <div className="key">{row.name}</div>
          <div
            className={['value', row.value === 'Health Factor' ? 'text-green' : undefined]
              .filter((value) => !!value)
              .join(' ')}
          >
            {row.value}
          </div>
        </KVData>
      ))}
    </HeroDataContainer>
  );
};

export default Yours;
