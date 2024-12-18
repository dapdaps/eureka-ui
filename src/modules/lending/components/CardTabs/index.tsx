import { StyledTab, StyledTabs } from '@/modules/lending/components/CardTabs/styles';
import type { Tab } from '@/modules/lending/models';

const LendingCardTabs = (props: Props) => {
  const { tabs = [], active, onChange } = props;

  return (
    <StyledTabs>
      {tabs
        .sort((a, b) => a.sort - b.sort)
        .map((tab) => (
          <StyledTab
            onClick={() => {
              onChange?.(tab);
            }}
            className={tab.key === active ? 'active' : ''}
            key={tab.key}
          >
            {tab.label}
          </StyledTab>
        ))}
    </StyledTabs>
  );
};

export default LendingCardTabs;

export interface Props {
  tabs: Tab[];
  active?: string;

  onChange?(tab: Tab): void;
}
