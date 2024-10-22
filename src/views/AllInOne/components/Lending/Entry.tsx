import React, { useMemo } from 'react';

import Lending from '@/modules/lending/AllInOne';
import { StyledLendingEntry } from '@/views/AllInOne/components/Lending/styles';

const LendingEntry = (props: any) => {
  const { chain } = props;

  const currentMenu = useMemo<any>(() => {
    const defaultMenu = { tab: 'lending', description: '' };
    if (!chain) return defaultMenu;
    if (!chain.menuConfig) return defaultMenu;
    const currMenu = Object.values(chain.menuConfig).find((it: any) => it.tab.toLowerCase() === 'lending');
    return currMenu || defaultMenu;
  }, [chain]);

  return (
    <StyledLendingEntry className="StyledLendingEntry max-h-[400px]">
      <Lending chain={chain} menu={currentMenu} isHideSpinner={true} isHideHeader={true} isHideSwitchChain={true} />
    </StyledLendingEntry>
  );
};

export default LendingEntry;
