import { useRouter } from 'next/router';
import { memo } from 'react';

import { StyledFlex } from '@/styled/styles';
import AllInOneCardView from '@/views/AllInOne/components/Card';
import AllInOneDetailCardView from '@/views/AllInOne/components/Card/DetailCard';
import { Gradient } from '@/views/AllInOne/components/Gradient';
import AllInOneHeaderView from '@/views/AllInOne/components/Header';
import { useChain } from '@/views/AllInOne/hooks/useChain';
import { StyledBg, StyledContainer, StyledContent, StyledNavList } from '@/views/AllInOne/styles';

const AllInOneDetailView = (props: Props) => {
  const { chain, menu } = props;

  const router = useRouter();

  const {
    currentChain,
    showComponent,
    setShowComponent,
    currentMenu,
    currentChainMenuList,
  } = useChain(props);

  const handleMenuSelect = (tab: string) => {
    router.replace(`/all-in-one/${currentChain.path}/${tab}`);
  };

  console.log(currentMenu);
  if (currentMenu === false) {
    router.back();
  }

  return (
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

        <StyledContent>
          {
            showComponent && currentMenu && (
              <AllInOneDetailCardView
                key={currentMenu.tab}
                title={currentMenu.tab}
                subTitle={currentMenu.description}
                bgColor={currentChain.selectBgColor}
              >
                <currentMenu.component chain={currentChain} />
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
                  if (item.tab === menu) return;
                  handleMenuSelect(item.tab);
                }}
              >
                <item.component chain={currentChain} />
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
  );
};

export default memo(AllInOneDetailView);

interface Props {
  chain: string;
  menu: string;
}

