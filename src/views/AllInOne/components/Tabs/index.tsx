import { StyledTabItem,StyledTabsContainer } from './styles';

type Props = {
  tabs: {
    key: string;
    label: string;
    value: string;
  }[];
  currTab: string;
  onTabChange: (tab: string) => void;
}
const Tabs = (props: Props) => {
  const {
    currTab,
    tabs = [],
    onTabChange = () => {},
  } = props;
  const tab = currTab ?? tabs?.[0]?.key ?? '';
  const onChange = (current: string) => {
    onTabChange(current);
  }

  return (
    <StyledTabsContainer>
      {
        tabs.map(item => (
          <StyledTabItem
            key={item.key}
            className={currTab === item.key ? 'active' : ''}
            onClick={() => onChange(item.key)}
          >
            {item.label}
          </StyledTabItem>
        ))
      }
    </StyledTabsContainer>
  );
}

export default Tabs;