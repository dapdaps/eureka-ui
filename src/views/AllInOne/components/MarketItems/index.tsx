import {StyledMarketList, StyledMarketListItem, StyledItemIcon, StyledItemName} from './styles';
type ListItem = {
  icon?: string;
  name: string;
};
type Props = {
  list: ListItem[];
  currMarket: string;
  onMarketChange: (market: string) => void;
}

const All = {
  name: 'All Market'
}
const AllList = All.name.split(' ');
const MarketItems = (props: Props) => {

  const { list, currMarket, onMarketChange } = props;
  
  const market = props.currMarket ?? list?.[0]?.name ?? '';
  const onChange = (currMarket: string) => {
    onMarketChange(currMarket);
  }
  const getMarketItem = (item: ListItem, names?: string[]) => <StyledMarketListItem className={item.name === market ? 'active' : ''} onChange={() => onChange(item.name)}>
    { item.icon && <StyledItemIcon /> }
    {
      names?.length ? names.map(name => <StyledItemName >{name}</StyledItemName>) : <StyledItemName >{item.name}</StyledItemName>
    }

  </StyledMarketListItem>;

  return (
    <StyledMarketList>
      { getMarketItem(All, AllList) }
      {
        list.map(item => <StyledMarketListItem className={item.name === market ? 'active' : ''} onChange={() => onChange(item.name)}>
          { item.icon && <StyledItemIcon /> }
          <StyledItemName >{item.name}</StyledItemName>
        </StyledMarketListItem>)
      }

    </StyledMarketList>
  );
}

export default MarketItems;