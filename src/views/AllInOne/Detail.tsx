import { useRouter } from 'next/router';
import { memo, useMemo, useState } from 'react';

import { StyledFlex } from '@/styled/styles';
import AllInOneCardView from '@/views/AllInOne/components/Card';
import AllInOneDetailCardView from '@/views/AllInOne/components/Card/DetailCard';
import { Gradient } from '@/views/AllInOne/components/Gradient';
import AllInOneHeaderView from '@/views/AllInOne/components/Header';
import { useChain } from '@/views/AllInOne/hooks/useChain';
import { StyledBg, StyledContainer, StyledContent, StyledNavList } from '@/views/AllInOne/styles';
import chainCofig from '@/config/chains'

import Bridge from '@/views/AllInOne/components/Bridge';
import SuperBridge from '@/views/SuperBridge/BridgeAction/BridgeContent'
import Lending from '@/views/AllInOne/components/Lending';
import Liquidity from '@/views/AllInOne/components/Liquidity';
import Trade from '@/views/AllInOne/components/Trade';

import Settings from './components/Setting/index'

const AllInOneDetailView = (props: Props) => {
  const { chain, menu } = props;

  const router = useRouter();

  const [showSettings, setShowSettings] = useState<boolean>(false);

  const {
    currentChain,
    showComponent,
    setShowComponent,
    currentChainMenuList,
  } = useChain(props);

  const handleMenuSelect = (tab: string) => {
    router.replace(`/all-in-one/${currentChain.path}/${tab}`);
  };

  const currentMenu = useMemo<any>(() => {
    const defaultMenu = { tab: menu, description: "" };
    if (!currentChain) return defaultMenu;
    if (!currentChain.menuConfig) return defaultMenu;
    const currMenu = Object.values(currentChain.menuConfig).find((it: any) => it.tab.toLowerCase() === menu);
    return currMenu || defaultMenu;
  }, [menu, currentChain]);

  const cardWidth = useMemo(() => {
    if (['liquidity', 'lending'].includes(menu)) return '1244px';
    return undefined;
  }, [menu]);

  const cardConfig = useMemo(() => {
    return !['liquidity', 'lending'].includes(menu);
  }, [menu]);


  return (
    <>
      <StyledContainer>
        <StyledFlex
          flexDirection="column"
          justifyContent="center"
          className="all-in-one-wrapper"
        >
          <AllInOneHeaderView
            chain={chain}
            currentChain={currentChain}
            handleShowComponent={(visible) => {
              setShowComponent(visible);
            }}
          />

          <StyledContent className="detail">
            {
              showComponent && (
                <AllInOneDetailCardView
                  key={menu}
                  title={currentMenu?.tab}
                  subTitle={currentMenu.description}
                  bgColor={currentChain.selectBgColor}
                  style={{ width: cardWidth }}
                  config={cardConfig}
                  onShowSettings={() => setShowSettings(true)}
                >
                  {
                    menu === 'bridge' && (
                      // <Bridge chain={currentChain} />
                      <SuperBridge
                        theme={currentChain.selectBgColor}
                        showTitle={false}
                        chainList={[chainCofig[1], chainCofig[currentChain.chainId]]}
                      />
                    )
                  }
                  {
                    menu === 'lending' && (
                      <Lending chain={currentChain} menu={currentMenu} />
                    )
                  }
                  {
                    menu === 'liquidity' && (
                      <Liquidity chain={currentChain} menu={currentMenu} />
                    )
                  }
                  {
                    menu === 'trade' && (
                      <Trade chain={currentChain} />
                    )
                  }
                </AllInOneDetailCardView>
              )
            }
          </StyledContent>
          <StyledNavList>
            {currentChainMenuList.map((item: any) => {
              return (
                <AllInOneCardView
                  type="nav"
                  key={item.tab}
                  title={item.tab}
                  subTitle={item.description}
                  bgColor={currentChain.selectBgColor}
                  path={currentChain.path}
                  onSelect={() => {
                    const _tab = item.tab.toLowerCase();
                    if (_tab === menu) return;
                    handleMenuSelect(_tab);
                  }}
                >
                  <item.component chain={currentChain} menu={item} />
                </AllInOneCardView>
              );
            })}
          </StyledNavList>
        </StyledFlex>
        <StyledBg>
          <Gradient
            bgColor={currentChain.selectBgColor}
            width={720}
            height={241}
            rx={280}
            ry={40.5}
          />
        </StyledBg>
      </StyledContainer>
      <Settings display={showSettings} onClose={() => setShowSettings(false)} />
    </>
  );
};

export default memo(AllInOneDetailView);

interface Props {
  chain: string;
  menu: string;
}

