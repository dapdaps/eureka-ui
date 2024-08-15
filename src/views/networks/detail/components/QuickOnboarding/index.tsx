import { memo, useMemo } from 'react';
import useAllInOneOpen from '@/hooks/useAllInOneOpen';
import { StyledContainer, StyledItem } from './styles';

const MENUS = [
  {
    label: 'All-in-One',
    key: 'Chain-Navi',
  },
];
const BP_MAPPING: any = {
  "Chain-Navi": "1006-002-001",
  "Bridge": "1006-002-002",
  "Swap": "1006-002-003",
  "Liquidity": "1006-002-004",
  "Lending": "1006-002-005",
  "Stake": "1006-002-006"
}

const QuickOnboarding = ({ chain }: any) => {
  const { menuConfig, path } = chain;

  const { open } = useAllInOneOpen();

  const menuList = useMemo(() => {
    const _menuList = MENUS.map((it) => ({ ...it }));
    if (menuConfig) {
      for (const menuKey in menuConfig) {
        _menuList.push({
          label: menuConfig[menuKey].tab,
          key: menuConfig[menuKey].tab,
        });
      }
    }
    return _menuList;
  }, [menuConfig]);

  return (
    <StyledContainer>
      {menuList.map((item: any) => (
        <StyledItem
          data-bp={BP_MAPPING[item?.key]}
          key={item.key}
          $key={item.key}
          $bgColor={chain?.theme.button.bg}
          $color={chain?.theme.button.text}
          onClick={() => {
            if (item.key === 'Chain-Navi') {
              if (!chain?.defaultTab) {
                return;
              }
              open(path, chain.defaultTab);
              return;
            }
            if (!menuConfig[item.key]) return;
            open(`${path}/${item.key.toLowerCase()}`, item.key);
          }}
        >
          {item.label}
          {
            item.key === 'Chain-Navi' ? null : (
              <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1 5.2C0.558172 5.2 0.2 5.55817 0.2 6C0.2 6.44183 0.558172 6.8 1 6.8L1 5.2ZM17.5657 6.56569C17.8781 6.25327 17.8781 5.74674 17.5657 5.43432L12.4745 0.343147C12.1621 0.0307274 11.6556 0.0307274 11.3431 0.343147C11.0307 0.655566 11.0307 1.1621 11.3431 1.47452L15.8686 6L11.3431 10.5255C11.0307 10.8379 11.0307 11.3444 11.3431 11.6569C11.6556 11.9693 12.1621 11.9693 12.4745 11.6569L17.5657 6.56569ZM1 6.8L17 6.8L17 5.2L1 5.2L1 6.8Z"
                  fill="white"
                />
              </svg>
            )
          }
        </StyledItem>
      ))}
    </StyledContainer>
  );
};

export default memo(QuickOnboarding);
