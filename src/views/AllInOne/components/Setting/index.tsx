import {
  StyledContainer,
  StyledHeader,
  StyledHeaderTitle,
  StyledCloseIcon,
  StyledBody,
  StyledBodyItem,
  StyledItemTitle,
  StyledItemSlippage,
  StyledArrowIconWrap,
  StyledPopup,
  StyledPopupText,
  StyledPopupItem,
  StyledTitle,
  StyledInput,
  StyledSuffix
} from './styles';
import Modal from '@/components/Modal';
import CloseIcon from '@/components/Icons/Close';
import { StyledFlex } from '@/styled/styles';
import ArrowIcon from '@/components/Icons/ArrowIcon';
import SelectedCheck from '@/views/AllInOne/components/SelectedCheck';
import React, { type ChangeEvent, useEffect, useRef, useState } from 'react';
import { useSettingsStore, ROUTE_LIST, SLIPPAGE_LIST, SLIPPAGE_DEFAULT } from '@/stores/settings';
import { useDebounce } from 'ahooks';
import useToast from '@/hooks/useToast';

type PropsType = {
  onClose: () => void;
  display: boolean;
}

const Setting = (props: PropsType) => {
  const popupRef = useRef<HTMLDivElement | null>(null);
  const toast = useToast();
  const store: any = useSettingsStore();
  const storeRoute = store.getRoute();
  const [ selectedSlippage, setSelectedSlippage ] = useState<number | string>('');
  const [ isSelectedRoute, setIsSelectedRoute ] = useState<boolean>(false);
  const [customSlippage, setCustomSlippage] = useState<string | undefined>();
  const inputValue = useDebounce(customSlippage, { wait: 1000 });
  const handleSelectRoute = (route: string) => {
    store.setRoute(route);
    setIsSelectedRoute(false);
  }

  const handleSelectClick = () => {
    setIsSelectedRoute(!isSelectedRoute);
  }
  const handleInputChange = function(ev: ChangeEvent<HTMLInputElement>) {
    if (isNaN(Number(ev.target.value))) return;
    const _value = ev.target.value.replace(/\s+/g, '');
    setCustomSlippage(_value);
  }

  const handleSetSlippage = (val: string | undefined) => {
    if (SLIPPAGE_LIST.find(i => i.value === val)) {
      toast.fail({
        title: 'Cannot duplicate existing'
      });
    } else if (!val) {
      toast.fail({
        title: 'Cannot empty'
      });
    }else {
      store.setSlippage(val);
    }
  }

  useEffect(() => {
    if (props.display && selectedSlippage === SLIPPAGE_DEFAULT) {
      handleSetSlippage(inputValue);
    }
  }, [inputValue]);

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
    setSelectedSlippage(SLIPPAGE_DEFAULT)
    setCustomSlippage(_storage)
  }

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
      setCustomSlippage('')
    };
  }, [props.display]);

  const handleSelectSlippage = (selectedItem: Record<string, any>) => {
    setSelectedSlippage(selectedItem.value);
    if (selectedItem.value !== SLIPPAGE_DEFAULT) {
      store.setSlippage(selectedItem.value);
      return;
    }
    if (customSlippage && !isNaN(Number(customSlippage))) {
      store.setSlippage(customSlippage);
    }
  }

  const onClose = () => {
    setSelectedSlippage('');
    if (customSlippage) {
      setCustomSlippage(undefined);
    }
    props.onClose();
  }

  return <>
    <Modal
      width={468}
      display={props.display}
      showHeader={false}
      content={
        <StyledContainer>
          <StyledHeader>
            <StyledHeaderTitle>Setting{inputValue}</StyledHeaderTitle>
            <StyledCloseIcon>
                <CloseIcon onClose={onClose} size={24}/>
            </StyledCloseIcon>
          </StyledHeader>
          <StyledBody>
            <StyledBodyItem>
              <StyledItemTitle>Preference for Route</StyledItemTitle>
              <StyledFlex gap="10px" onClick={handleSelectClick} className='select-container'>
                <StyledTitle>{ storeRoute }</StyledTitle>
                <StyledArrowIconWrap isSelected={isSelectedRoute}>
                  <ArrowIcon size={10} />
                </StyledArrowIconWrap>
                {isSelectedRoute ? (
                  <StyledPopup ref={popupRef}>
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
                    ? <StyledItemSlippage
                        key={i.key}
                        onClick={() => handleSelectSlippage(i)}
                        className={ selectedSlippage === i.value ? 'active' : '' }>
                      {i.value}%
                      </StyledItemSlippage>
                    : <StyledInput key={i.key} onClick={() => handleSelectSlippage(i)} className={ selectedSlippage === i.value ? 'active' : '' }>
                        <input
                          value={customSlippage}
                          className='custom-input'
                          placeholder={i.value}
                          onChange={handleInputChange} />
                        <StyledSuffix>%</StyledSuffix>
                    </StyledInput>))
              }
            </StyledBodyItem>
          </StyledBody>
          </StyledContainer>
      }
    />
  </>
}



export default Setting;