import React, { type ChangeEvent, useEffect, useRef, useState } from 'react';

import ArrowIcon from '@/components/Icons/ArrowIcon';
import CloseIcon from '@/components/Icons/Close';
import Modal from '@/components/Modal';
import { ROUTE_LIST, SLIPPAGE_DEFAULT, SLIPPAGE_LIST, useSettingsStore } from '@/stores/settings';
import { StyledFlex } from '@/styled/styles';
import SelectedCheck from '@/views/AllInOne/components/SelectedCheck';

import {
  StyledArrowIconWrap,
  StyledBody,
  StyledBodyItem,
  StyledCloseIcon,
  StyledContainer,
  StyledHeader,
  StyledHeaderTitle,
  StyledInput,
  StyledItemSlippage,
  StyledItemTitle,
  StyledPopup,
  StyledPopupItem,
  StyledPopupText,
  StyledSuffix,
  StyledTitle,
} from './styles';

const Setting = (props: PropsType) => {
  const popupRef = useRef<HTMLDivElement | null>(null);

  const store: any = useSettingsStore();
  const storeRoute = store.getRoute();
  const [selectedSlippage, setSelectedSlippage] = useState<number | string>('');
  const [isSelectedRoute, setIsSelectedRoute] = useState<boolean>(false);
  const [customSlippage, setCustomSlippage] = useState<string | undefined>();

  const handleSelectRoute = (route: string) => {
    store.setRoute(route);
    setIsSelectedRoute(false);
  };

  const handleSelectClick = () => {
    setIsSelectedRoute(!isSelectedRoute);
  };

  const getInputValue = (ev: ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(ev.target.value))) return '';
    return ev.target.value.replace(/\s+/g, '');
  };

  const handleInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const _value = getInputValue(ev);
    setCustomSlippage(_value);
  };

  const handleInputBlur = (ev: ChangeEvent<HTMLInputElement>) => {
    const _value = getInputValue(ev);
    if (_value) {
      handleSetSlippage(_value);
    }
    // if the input value equal 0.5/1/3, clear custom input and selected it automatically
    if (SLIPPAGE_LIST.find(i => i.value === _value)) {
      setSelectedSlippage(_value);
      setCustomSlippage('');
    } else {
      setSelectedSlippage(SLIPPAGE_DEFAULT);
    }
    if (!_value) {
      const _storage = store.getSlippage();
      if (SLIPPAGE_LIST.find(s => s.value === _storage)) {
        setSelectedSlippage(_storage);
      }
    }
  };

  const handleInputFocus = () => {
    handleSelectSlippage(SLIPPAGE_LIST[SLIPPAGE_LIST.length - 1]);
  };

  const handleSetSlippage = (val?: string) => {
    store.setSlippage(val);
  };

  const getStorageSplippage = () => {
    const _storage = store.getSlippage();
    if (isNaN(Number(_storage))) {
      setSelectedSlippage(SLIPPAGE_DEFAULT);
      setCustomSlippage('');
      return;
    }
    if (SLIPPAGE_LIST.find(s => s.value === _storage)) {
      setSelectedSlippage(_storage);
      return;
    }
    setSelectedSlippage(SLIPPAGE_DEFAULT);
    setCustomSlippage(_storage);
  };

  const handleSelectSlippage = (selectedItem: Record<string, any>) => {
    setSelectedSlippage(selectedItem.value);
    if (selectedItem.value !== SLIPPAGE_DEFAULT) {
      store.setSlippage(selectedItem.value);
      return;
    }
    if (customSlippage && !isNaN(Number(customSlippage))) {
      store.setSlippage(customSlippage);
    }
  };

  const onClose = () => {
    setSelectedSlippage('');
    if (customSlippage) {
      setCustomSlippage(undefined);
    }
    props.onClose();
  };

  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsSelectedRoute(false);
      }
    };
    if (props.display) {
      getStorageSplippage();
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      setCustomSlippage('');
    };
  }, [props.display]);

  return (
    <>
      <Modal
        width={468}
        display={props.display}
        showHeader={false}
        onClose={onClose}
        content={
          <StyledContainer>
            <StyledHeader>
              <StyledHeaderTitle>Setting</StyledHeaderTitle>
              <StyledCloseIcon>
                <CloseIcon onClose={onClose} size={24} />
              </StyledCloseIcon>
            </StyledHeader>
            <StyledBody>
              <StyledBodyItem>
                <StyledItemTitle>Preference for Route</StyledItemTitle>
                <StyledFlex gap="10px"  ref={popupRef} onClick={handleSelectClick} className="select-container">
                  <StyledTitle>{storeRoute}</StyledTitle>
                  <StyledArrowIconWrap isSelected={isSelectedRoute}>
                    <ArrowIcon size={10} />
                  </StyledArrowIconWrap>
                  {isSelectedRoute ? (
                    <StyledPopup>
                      {ROUTE_LIST.map((item) => (
                        <StyledPopupItem
                          className={`${storeRoute === item.value ? 'selected' : ''}`}
                          key={item.key}
                          onClick={() => handleSelectRoute(item.value)}
                        >
                          <StyledPopupText>{item.value}</StyledPopupText>
                          <div className="flex-grow"></div>
                          {storeRoute === item.value && (
                            <div className="check-mark">
                              <SelectedCheck />
                            </div>
                          )}
                        </StyledPopupItem>
                      ))}
                    </StyledPopup>
                  ) : null}
                </StyledFlex>
              </StyledBodyItem>
              <StyledBodyItem>
                <StyledItemTitle>Swap Slippage</StyledItemTitle>
                {
                  SLIPPAGE_LIST.map(i => (
                    i.value !== 'Custom'
                      ? (
                        <StyledItemSlippage
                          key={i.key}
                          onClick={() => handleSelectSlippage(i)}
                          className={selectedSlippage === i.value ? 'active' : ''}
                        >
                          {i.value}%
                        </StyledItemSlippage>
                      )
                      : (
                        <StyledInput
                          key={i.key}
                          className={selectedSlippage === i.value ? 'active' : ''}
                        >
                          <input
                            value={customSlippage}
                            className="custom-input"
                            placeholder={i.value}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            onFocus={handleInputFocus}
                          />
                          <StyledSuffix>%</StyledSuffix>
                        </StyledInput>
                      )))
                }
              </StyledBodyItem>
            </StyledBody>
          </StyledContainer>
        }
      />
    </>
  );
};

export default Setting;

type PropsType = {
  onClose: () => void;
  display: boolean;
}
