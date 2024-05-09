import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { StyledFlex } from "@/styled/styles";
import {
  StyledArrowIconWrap,
  StyledContainer,
  StyledContent,
  StyledHeader,
  StyledImage,
  StyledLogo,
  StyledLogoBg,
  StyledLogoContainer,
  StyledMainHeader,
  StyledMainLogo,
  StyledPopup,
  StyledPopupImg,
  StyledPopupItem,
  StyledPopupText,
  StyledShadow,
  StyledTitle,
} from '@/views/AllInOne/styles';
import ArrowIcon from '@/components/Icons/ArrowIcon';
import popupsData from '@/config/all-in-one/chains';
import { useDebounceFn } from 'ahooks';
import useAuthCheck from '@/hooks/useAuthCheck';
import { useSetChain } from '@web3-onboard/react';
import useReport from '@/views/Landing/hooks/useReport';
import AllInOneCardView from '@/views/AllInOne/components/Card';
import { Gradient } from '@/views/AllInOne/components/Gradient';
import Trade from './components/Trade';

const checkMark = 'https://assets.dapdap.net/images/bafkreig7b3k2jhkk6znb56pdsaj2f4mzadbxdac37lypsbdgwkj2obxu4y.svg';

const AllInOneView = (props: Props) => {
  const { chain } = props;

  const { check } = useAuthCheck({ isNeedAk: false });
  const [{}, setChain] = useSetChain();
  const { handleReport } = useReport();

  const popupRef = useRef<HTMLDivElement | null>(null);

  const [currentChain, setCurrentChain] = useState<any>({});
  const [showComponent, setShowComponent] = useState(false);
  const [isSelectItemClicked, setIsSelectItemClicked] = useState(false);

  const currentChainMenuList = useMemo(() => {
    if (!currentChain.menuConfig) return [];
    return Object.values(currentChain.menuConfig).map((it: any) => {
      const menuItem = {
        ...it,
      };
      return menuItem;
    });
  }, [currentChain]);

  const handleSelectItemClick = () => {
    setIsSelectItemClicked(!isSelectItemClicked);
  };

  const handleItemClick = (path: string) => {
    check(async () => {
      setIsSelectItemClicked(false);
      const currentChain = popupsData[path];
      const result = await setChain({ chainId: `0x${currentChain.chainId.toString(16)}` });
      if (result) {
        setShowComponent(false);
        props.onRouterPush(`/all-in-one/${currentChain.path}`);
      }
    });
  };

  const { run } = useDebounceFn(
    () => {
      const _currentChain = popupsData[chain] || popupsData['arbitrum'];
      setCurrentChain(_currentChain);
      setShowComponent(true);
    },
    { wait: 500 },
  );

  useEffect(() => {
    run();
  }, [chain]);

  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsSelectItemClicked(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    handleReport('all-in-one');
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  console.log(currentChain);

  return (
    <StyledContainer>
      {/*<StyledFlex flexDirection="column" justifyContent="center">*/}
        <StyledHeader>
          <StyledMainHeader>
            <StyledLogoBg src={currentChain.bgIcon} />
            <StyledMainLogo>
              <StyledLogoContainer selectBgColor={currentChain.selectBgColor}>
                {
                  currentChain.iconColor ?
                    (
                      <StyledLogo>
                        <StyledImage src={currentChain.icon} iconColor={currentChain.iconColor}/>
                      </StyledLogo>
                    ) :
                    (
                      <StyledLogo>
                        <img src={currentChain.icon} alt={currentChain.title} className="chain-logo" />
                      </StyledLogo>
                    )
                }
              </StyledLogoContainer>
              <StyledFlex gap="14px" onClick={handleSelectItemClick} data-bp="10014-002">
                <StyledTitle>{currentChain.title}</StyledTitle>
                <StyledArrowIconWrap style={{ transform: isSelectItemClicked ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <ArrowIcon size={11.5}  />
                </StyledArrowIconWrap>
              </StyledFlex>
              {isSelectItemClicked && (
                <StyledPopup ref={popupRef}>
                  {Object.values(popupsData).map((item) => (
                    <StyledPopupItem
                      className={`${chain === item.path ? 'selected' : ''}`}
                      key={item.path}
                      onClick={() => handleItemClick(item.path)}
                      data-bp="10014-003"
                    >
                      <StyledPopupImg style={{ backgroundColor: item.bgColor }}>
                        <img src={item.icon} alt="" />
                      </StyledPopupImg>
                      <StyledPopupText>{item.title}</StyledPopupText>
                      <div className="flex-grow"></div>
                      {chain === item.path && (
                        <div className="check-mark">
                          <img src={checkMark} alt="check-mark" />
                        </div>
                      )}
                    </StyledPopupItem>
                  ))}
                </StyledPopup>
              )}
            </StyledMainLogo>
          </StyledMainHeader>
          <StyledShadow>
            <Gradient
              bgColor={currentChain.selectBgColor}
              width={720}
              height={241}
              rx={280}
              ry={40.5}
            />
          </StyledShadow>
        </StyledHeader>
        <Trade chain={currentChain}/>
        {/*{*/}
        {/*  showComponent && (*/}
        {/*    <StyledContent>*/}
        {/*      {currentChainMenuList.map((item: any, idx: number) => {*/}
        {/*        const len = currentChainMenuList.length;*/}
        {/*        const getCardWidth = () => {*/}
        {/*          const index = idx + 1;*/}
        {/*          if (len >= 4) {*/}
        {/*            if ([1, 0].includes(index % 4)) {*/}
        {/*              return { width: `calc(40% - 6px)`, flexShrink: 0, flexGrow: 0 };*/}
        {/*            }*/}
        {/*            if ([2, 3].includes(index % 4)) {*/}
        {/*              return { width: `calc(60% - 6px)`, flexShrink: 0, flexGrow: 0 };*/}
        {/*            }*/}
        {/*          }*/}
        {/*          return { flex: 1 };*/}
        {/*        };*/}
        {/*        return (*/}
        {/*          <AllInOneCardView*/}
        {/*            key={item.tab}*/}
        {/*            title={item.tab}*/}
        {/*            subTitle={item.description}*/}
        {/*            bgColor={currentChain.selectBgColor}*/}
        {/*            style={getCardWidth()}*/}
        {/*          >*/}
        {/*            <Trade chain={currentChain}/>*/}
        {/*          </AllInOneCardView>*/}
        {/*        );*/}
        {/*      })}*/}
        {/*    </StyledContent>*/}
        {/*  )*/}
        {/*}*/}
      {/*</StyledFlex>*/}
    </StyledContainer>
  );
};

export default memo(AllInOneView);

interface Props {
  chain: string;
  onRouterPush(path: string): void;
}
