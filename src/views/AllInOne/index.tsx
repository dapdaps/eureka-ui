import { useRouter } from 'next/router';
import { memo, useState } from 'react';

import PageBack from '@/components/PageBack';
import { StyledFlex } from '@/styled/styles';
import AllInOneCardView from '@/views/AllInOne/components/Card';
import AllInOneHeaderView from '@/views/AllInOne/components/Header';
import { useChain } from '@/views/AllInOne/hooks/useChain';
import { StyledBg, StyledContainer, StyledContent } from '@/views/AllInOne/styles';

const AllInOneView = (props: Props) => {
  const { chain } = props;
  const [showMask, setShowMask] = useState(false);
  const router = useRouter();

  const { currentChain, showComponent, setShowComponent, currentChainMenuList } = useChain(props);

  const handleMenuSelect = (tab: string) => {
    router.push(`/all-in-one/${currentChain.path}/${tab}`);
  };

  const getCardStyle = (i: number) => {
    if (currentChainMenuList.length === 2) return 'w-1/2';
    if (currentChainMenuList.length === 3) return `w-[calc(32%-7px)] ${i < 2 ? 'md:w-[calc(50%-5px)]' : 'md:w-full'}`;
    return `${!!(i % 3) ? 'w-[calc(60%-12px)]' : 'w-[calc(40%-12px)]'} ${i < 2 ? 'md:w-[calc(50%-5px)]' : 'md:w-full'}`;
  };

  return (
    <StyledContainer className="pt-[50px] md:pt-[0px] max-w-[1200px] mx-[auto]">
      <div className="md:hidden">
        <PageBack defaultPath="/" style={{ width: 60, marginLeft: 24 }} />
      </div>
      <StyledFlex flexDirection="column" justifyContent="center" className="all-in-one-wrapper">
        <AllInOneHeaderView
          chain={chain}
          currentChain={currentChain}
          handleShowComponent={(visible) => {
            setShowComponent(visible);
          }}
        />

        {showComponent && (
          <StyledContent className="gap-[24px] md:gap-[10px] px-[24px] md:px-[12px] pb-[100px]">
            {currentChainMenuList.map((item: any, i: number) => {
              return (
                <AllInOneCardView
                  key={item.tab}
                  title={item.tab}
                  subTitle={item.description}
                  bgColor={currentChain.selectBgColor}
                  path={currentChain.path}
                  chainId={currentChain.chainId}
                  onSelect={() => {
                    if (window.innerWidth > 750) {
                      handleMenuSelect(item.tab.toLowerCase());
                    } else {
                      setShowMask(true);
                    }
                  }}
                  className={getCardStyle(i)}
                >
                  <item.component chain={currentChain} disabled />
                </AllInOneCardView>
              );
            })}
          </StyledContent>
        )}
      </StyledFlex>
      <StyledBg $color={currentChain.selectBgColor} />
      {showMask && (
        <div
          className="fixed z-50 w-[100vw] h-[100vh] top-0 left-0	bg-black/50 backdrop-blur-sm flex flex-col justify-center items-center"
          onClick={() => {
            setShowMask(false);
          }}
        >
          <div className="text-[18px] w-4/5 text-center	font-Montserrat">
            Mobile is temporarily unavailable. Explore DapDap via desktop for the full experience.
          </div>
          <img src="/images/pc.png" className="w-[60px] h-[60px] mt-[30px]" />
        </div>
      )}
    </StyledContainer>
  );
};

export default memo(AllInOneView);

interface Props {
  chain: string;
}
