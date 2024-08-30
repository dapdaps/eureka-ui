import { memo } from 'react';

import { StyledItemIcon, StyledItemName, StyledMarketList, StyledMarketListItem } from './styles';

const MarketItems = (props: Props) => {
  const { list, currMarket, onMarketChange } = props;

  const markets = [
    // {
    //   name: 'All',
    // },
    ...list
  ];

  const market = props.currMarket ?? markets?.[0]?.name ?? '';

  const onChange = (currMarket: string) => {
    onMarketChange(currMarket);
  };

  return (
    <StyledMarketList>
      {markets.map((item, idx) => (
        <StyledMarketListItem
          key={idx}
          className={item.name === market ? 'active' : ''}
          onClick={() => onChange(item.name)}
        >
          {item.icon && <StyledItemIcon src={item.icon} alt={item.name} />}
          {item.name === 'All' ? (
            <>
              <StyledItemName>All</StyledItemName>
              <StyledItemName>Market</StyledItemName>
            </>
          ) : (
            <StyledItemName>{item.name}</StyledItemName>
          )}
        </StyledMarketListItem>
      ))}
    </StyledMarketList>
  );
};

export default memo(MarketItems);

type ListItem = {
  icon?: string;
  name: string;
};

type Props = {
  list: ListItem[];
  currMarket: string;
  onMarketChange: (market: string) => void;
};
