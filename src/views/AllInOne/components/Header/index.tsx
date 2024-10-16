import React, { memo, useEffect, useRef, useState } from 'react';

import ArrowIcon from '@/components/Icons/ArrowIcon';
import Loading from '@/components/Icons/Loading';
import popupsData from '@/config/all-in-one/chains';
import chains from '@/config/chains';
import { StyledFlex } from '@/styled/styles';
import {
  StyledArrowIconWrap,
  StyledBgLogo,
  StyledHeader,
  StyledImage,
  StyledLogo,
  StyledLogoContainer,
  StyledMainLogo,
  StyledPopup,
  StyledPopupImg,
  StyledPopupItem,
  StyledPopupText,
  StyledTitle
} from '@/views/AllInOne/components/Header/styles';
import SelectedCheck from '@/views/AllInOne/components/SelectedCheck';
import { useChainSelect } from '@/views/AllInOne/hooks/useChainSelect';
import useReport from '@/views/Landing/hooks/useReport';

const AllInOneHeaderView = (props: Props) => {
  const { chain, currentChain, handleShowComponent } = props;

  const { handleReport } = useReport();

  const { handleClick } = useChainSelect({
    onRouterBefore: () => {
      handleShowComponent(false);
    },
    onCheckAfter: () => {
      setIsSelectItemClicked(false);
    }
  });

  const popupRef = useRef<HTMLDivElement | null>(null);

  const [isSelectItemClicked, setIsSelectItemClicked] = useState(false);

  const handleSelectItemClick = () => {
    setIsSelectItemClicked(!isSelectItemClicked);
  };

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

  return (
    <>
      {currentChain?.title ? (
        <StyledHeader>
          <StyledMainLogo>
            <StyledLogoContainer selectBgColor={currentChain.bgColor}>
              <StyledLogo>
                <img src={chains[currentChain.chainId].icon} alt={currentChain.title} className="chain-logo" />
              </StyledLogo>
            </StyledLogoContainer>

            <StyledFlex gap="14px" onClick={handleSelectItemClick} data-bp="10014-002">
              <StyledTitle>{currentChain.title}</StyledTitle>
              <StyledArrowIconWrap style={{ transform: isSelectItemClicked ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                <ArrowIcon size={11.5} />
              </StyledArrowIconWrap>
            </StyledFlex>
          </StyledMainLogo>
          {currentChain.bgIcon && <StyledBgLogo src={currentChain.bgIcon} />}
        </StyledHeader>
      ) : (
        <Loading />
      )}
      {isSelectItemClicked && (
        <StyledPopup ref={popupRef}>
          {Object.values(popupsData)
            .filter((item) => !item.isHideAllInOne)
            .map((item) => (
              <StyledPopupItem
                className={`${chain === item.path ? 'selected' : ''}`}
                key={item.path}
                onClick={() => handleClick(item.path)}
                data-bp="10014-003"
              >
                <StyledPopupImg>
                  <img src={chains[item.chainId].icon} alt="" style={{ width: 24 }} />
                </StyledPopupImg>
                <StyledPopupText>{item.title}</StyledPopupText>
                <div className="flex-grow"></div>
                {chain === item.path && (
                  <div className="check-mark">
                    <SelectedCheck />
                  </div>
                )}
              </StyledPopupItem>
            ))}
        </StyledPopup>
      )}
    </>
  );
};

export default memo(AllInOneHeaderView);

interface Props {
  chain: string;
  currentChain: any;

  handleShowComponent(visible: boolean): void;
}
