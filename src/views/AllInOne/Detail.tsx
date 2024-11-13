import { useRouter } from 'next/router';
import { memo, useMemo, useState } from 'react';

import PageBack from '@/components/PageBack';
import chainCofig from '@/config/chains';
import Lending from '@/modules/lending/AllInOne';
import { StyledFlex } from '@/styled/styles';
import AllInOneCardView from '@/views/AllInOne/components/Card';
import AllInOneDetailCardView from '@/views/AllInOne/components/Card/DetailCard';
import AllInOneHeaderView from '@/views/AllInOne/components/Header';
import Liquidity from '@/views/AllInOne/components/Liquidity';
import Trade from '@/views/AllInOne/components/Trade';
import { useChain } from '@/views/AllInOne/hooks/useChain';
import { StyledBg, StyledContainer, StyledContent, StyledNavList } from '@/views/AllInOne/styles';
import SuperBridge from '@/views/SuperBridge/BridgeAction/BridgeContent';

import Settings from './components/Setting/index';

const AllInOneDetailView = (props: Props) => {
  const { chain, menu } = props;

  const router = useRouter();

  const [showSettings, setShowSettings] = useState<boolean>(false);

  const { currentChain, showComponent, setShowComponent, currentChainMenuList } = useChain(props);

  const handleMenuSelect = (tab: string, reload?: boolean) => {
    router.replace(`/all-in-one/${currentChain.path}/${tab}`).then(() => reload && setShowComponent(true));
  };

  const currentMenu = useMemo<any>(() => {
    const defaultMenu = { tab: menu, description: '' };
    if (!currentChain) return defaultMenu;
    if (!currentChain.menuConfig) return defaultMenu;
    const currMenu = Object.values(currentChain.menuConfig).find((it: any) => it.tab.toLowerCase() === menu);
    return currMenu || defaultMenu;
  }, [menu, currentChain]);

  const cardWidth = useMemo(() => {
    if (['liquidity', 'lending'].includes(menu)) return '1244px';
    if (menu === 'bridge') return 'auto';
    return undefined;
  }, [menu]);

  const cardConfig = useMemo(() => {
    return !['liquidity', 'lending'].includes(menu);
  }, [menu]);

  const formatLikeId = () => {
    if (currentChain.chainId && currentMenu.id) {
      const _id = currentChain.chainId + '' + currentMenu.id;
      return isNaN(Number(_id)) ? null : Number(_id);
    }
    return null;
  };

  const onSwitchTab = (tab: any) => {
    const _tab = tab.toLowerCase();
    if (_tab === menu) {
      setShowComponent(() => {
        handleMenuSelect(_tab, true);
        return false;
      });
      return;
    }
    handleMenuSelect(_tab);
  };

  return (
    <>
      <StyledContainer>
        <div className={`${['swap', 'bridge'].includes(menu) ? 'ml-[212px]' : 'ml-[24px]'} md:mt-[20px] md:ml-[20px]`}>
          <PageBack style={{ width: 60 }} />
        </div>
        <StyledFlex flexDirection="column" justifyContent="center" className="all-in-one-wrapper">
          <AllInOneHeaderView
            chain={chain}
            currentChain={currentChain}
            handleShowComponent={(visible) => {
              setShowComponent(visible);
            }}
          />

          <StyledContent className="detail">
            {showComponent && (
              <AllInOneDetailCardView
                likeId={formatLikeId()}
                key={menu}
                title={currentMenu?.tab}
                subTitle={currentMenu.description}
                bgColor={currentChain.selectBgColor}
                style={{ width: cardWidth }}
                config={cardConfig}
                onShowSettings={() => setShowSettings(true)}
              >
                {menu === 'bridge' && (
                  // <Bridge chain={currentChain} />
                  <SuperBridge
                    theme={currentChain}
                    showTitle={false}
                    chainList={[chainCofig[1], chainCofig[currentChain.chainId]]}
                  />
                )}
                {menu === 'lending' && <Lending chain={currentChain} menu={currentMenu} />}
                {menu === 'liquidity' && <Liquidity chain={currentChain} menu={currentMenu} />}
                {menu === 'swap' && <Trade chain={currentChain} />}
              </AllInOneDetailCardView>
            )}
          </StyledContent>
          <StyledNavList className="h-[144px] pt-[40px] gap-[16px] items-stretch flex-nowrap justify-center md:justify-start md:flex-wrap	md:items-center md:h-auto md:pt-[10px] md:pb-[12px] md:gap-[12px] md:pl-[calc(50vw-174px)] md:border-t md:border-t-[#373A53]">
            {currentChainMenuList.map((item: any) => {
              return (
                <>
                  <AllInOneCardView
                    type="nav"
                    key={'nav' + item.tab}
                    title={item.tab}
                    subTitle={item.description}
                    bgColor={currentChain.selectBgColor}
                    path={currentChain.path}
                    chainId={currentChain.chainId}
                    className="md:hidden"
                    onSelect={() => {
                      onSwitchTab(item.tab);
                    }}
                  >
                    <item.component chain={currentChain} menu={item} />
                  </AllInOneCardView>
                  <button
                    key={'tab' + item.tab}
                    className="hidden w-[108px] h-[36px] rounded-[18px] border border-solid border-[#373A53] md:block"
                    style={{
                      background: item.tab.toLowerCase() === menu ? currentChain.selectBgColor : 'transparent',
                      color: item.tab.toLowerCase() === menu ? currentChain.textColor : '#fff'
                    }}
                    onClick={() => {
                      onSwitchTab(item.tab);
                    }}
                  >
                    {item.tab}
                  </button>
                </>
              );
            })}
          </StyledNavList>
        </StyledFlex>
        <StyledBg $color={currentChain.selectBgColor} />
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
