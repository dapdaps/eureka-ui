import { memo } from 'react';

import { StyledFlex } from "@/styled/styles";
import AllInOneCardView from '@/views/AllInOne/components/Card';
import { Gradient } from '@/views/AllInOne/components/Gradient';
import AllInOneHeaderView from '@/views/AllInOne/components/Header';
import { useChain } from '@/views/AllInOne/hooks/useChain';
import { StyledBg, StyledContainer, StyledContent } from '@/views/AllInOne/styles';
import { useRouter } from "next/router";

const AllInOneView = (props: Props) => {
  const { chain } = props;

  const router = useRouter();

  const { currentChain, showComponent, setShowComponent, currentChainMenuList } = useChain(props);

  const handleMenuSelect = (tab: string) => {
    router.push(`/all-in-one/${currentChain.path}/${tab}`);
  };

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

        {
          showComponent && (
            <StyledContent>
              {currentChainMenuList.map((item: any, idx: number) => {
                const len = currentChainMenuList.length;
                const getCardWidth = () => {
                  const index = idx + 1;
                  if (len >= 4) {
                    if ([1, 0].includes(index % 4)) {
                      return { width: `calc(40% - 12px)`, flexShrink: 0, flexGrow: 0 };
                    }
                    if ([2, 3].includes(index % 4)) {
                      return { width: `calc(60% - 12px)`, flexShrink: 0, flexGrow: 0 };
                    }
                  }
                  return { flex: 1 };
                };
                return (
                  <AllInOneCardView
                    key={item.tab}
                    title={item.tab}
                    subTitle={item.description}
                    bgColor={currentChain.selectBgColor}
                    style={getCardWidth()}
                    path={currentChain.path}
                    onSelect={() => {
                      handleMenuSelect(item.tab);
                    }}
                  >
                    <item.component chain={currentChain} disabled />
                  </AllInOneCardView>
                );
              })}
            </StyledContent>
          )
        }
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

export default memo(AllInOneView);

interface Props {
  chain: string;
}
