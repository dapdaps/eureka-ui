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

  const SelectBg: React.FC<{
    bgColor: string;
  }> = ({ bgColor }) => (
    <svg width="720" height="241" viewBox="0 0 720 241" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.5" filter="url(#filter0_f_510_1870)">
        <ellipse cx="360" cy="120.5" rx="280" ry="40.5" fill={bgColor} />
      </g>
      <defs>
        <filter
          id="filter0_f_510_1870"
          x="0"
          y="0"
          width="720"
          height="241"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="40" result="effect1_foregroundBlur_510_1870" />
        </filter>
      </defs>
    </svg>
  );

  const ArrowTopRight = ({ size = 14, color = '#979ABE', classname }: { size?: number, color?: string, classname: string}) => {
    return <svg className={classname} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 15L15 1M15 1H1M15 1V15" stroke={color} stroke-width="1.5" />
    </svg>;

  }

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

  console.log(currentChainMenuList);

  return (
    <StyledContainer>
      <StyledFlex flexDirection="column" justifyContent="center">
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
            <SelectBg bgColor={currentChain.selectBgColor} />
          </StyledShadow>
        </StyledHeader>

        {
          showComponent && (
            <StyledContent>
              {currentChainMenuList.map((item: any) => (
                <AllInOneCardView key={item.tab} title={item.tab}>
                  Form
                </AllInOneCardView>
              ))}
            </StyledContent>
          )
        }
      </StyledFlex>
    </StyledContainer>
  );
};

export default memo(AllInOneView);

interface Props {
  chain: string;
  onRouterPush(path: string): void;
}
