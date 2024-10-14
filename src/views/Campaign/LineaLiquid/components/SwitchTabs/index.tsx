import { useMemo } from 'react';

import { StyledContainer, StyledCursor, StyledCursorWrapper, StyledTab, StyledTabs } from './styles';

const SwitchTabs = (props: Props) => {
  const { tabs, current, cursorStyle, style, tabStyle, onChange } = props;

  const currentIndex = useMemo(() => {
    const idx = tabs.findIndex((it) => it.value === current);
    if (idx < 0) return 0;
    return idx;
  }, [tabs, current]);

  const handleChange = (tab: any) => {
    if (tab.value === current) return;
    onChange && onChange(tab.value);
  };

  return (
    <StyledContainer style={style}>
      <StyledCursorWrapper>
        <StyledCursor
          style={{
            width: `${100 / tabs.length}%`,
            left: 0,
            ...cursorStyle
          }}
          animate={{
            x: `${100 * currentIndex}%`
          }}
        />
      </StyledCursorWrapper>
      <StyledTabs>
        {tabs.map((tab, idx) => (
          <StyledTab
            key={idx}
            style={{
              width: `${100 / tabs.length}%`,
              opacity: tab.disabled ? 0.3 : 1,
              cursor: tab.disabled ? 'not-allowed' : 'pointer',
              color: current === tab.value ? '#ffffff' : '#979ABE',
              ...tabStyle
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (tab.disabled) return;
              handleChange(tab);
            }}
          >
            {tab.label}
          </StyledTab>
        ))}
      </StyledTabs>
    </StyledContainer>
  );
};

export default SwitchTabs;

interface Props {
  tabs: { value: string; label: any; disabled?: boolean }[];
  current?: string;
  style?: React.CSSProperties;
  cursorStyle?: React.CSSProperties;
  tabStyle?: React.CSSProperties;

  onChange?(current: string): void;
}
