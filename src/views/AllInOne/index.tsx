import { useRouter } from 'next/router';
import { memo } from 'react';

import { StyledFlex } from '@/styled/styles';
import AllInOneCardView from '@/views/AllInOne/components/Card';
import AllInOneHeaderView from '@/views/AllInOne/components/Header';
import { useChain } from '@/views/AllInOne/hooks/useChain';
import { StyledBg, StyledContainer, StyledContent } from '@/views/AllInOne/styles';
import PageBack from '@/components/PageBack';

const AllInOneView = (props: Props) => {
  const { chain } = props;

  const router = useRouter();

  const { currentChain, showComponent, setShowComponent, currentChainMenuList } = useChain(props);

  const handleMenuSelect = (tab: string) => {
    router.push(`/all-in-one/${currentChain.path}/${tab}`);
  };

  return (
    <StyledContainer>
      <PageBack defaultPath="/" style={{ width: 60, marginLeft: 24 }} />
      <StyledFlex flexDirection="column" justifyContent="center" className="all-in-one-wrapper">
        <AllInOneHeaderView
          chain={chain}
          currentChain={currentChain}
          handleShowComponent={(visible) => {
            setShowComponent(visible);
          }}
        />

        {showComponent && (
          <StyledContent>
            {currentChainMenuList.map((item: any) => {
              return (
                <AllInOneCardView
                  key={item.tab}
                  title={item.tab}
                  subTitle={item.description}
                  bgColor={currentChain.selectBgColor}
                  style={item.entryCardWidth}
                  path={currentChain.path}
                  chainId={currentChain.chainId}
                  onSelect={() => {
                    handleMenuSelect(item.tab.toLowerCase());
                  }}
                >
                  <item.component chain={currentChain} disabled />
                </AllInOneCardView>
              );
            })}
          </StyledContent>
        )}
      </StyledFlex>
      <StyledBg $color={currentChain.selectBgColor} />
    </StyledContainer>
  );
};

export default memo(AllInOneView);

interface Props {
  chain: string;
}
