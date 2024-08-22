import Big from 'big.js';
import { memo, useEffect, useState } from 'react';

import CloseIcon from '@/components/Icons/Close';
import Modal from '@/components/Modal';
import useTokenBalance from '@/hooks/useTokenBalance';

import Button from './Button';
import Input from './Input';
import { StyledCloseIcon, StyledContent,StyledHeader, StyledTab } from './styles';
import useWrapAndUnwrap from './useWrapAndUnWrap';

const TABS = ['Wrap', 'Unwrap'];

const WrapAndUnwrap = ({ open, onClose }: any) => {
  const [tab, setTab] = useState('Wrap');
  const [value, setValue] = useState('');
  const [errorTips, setErrorTips] = useState('');
  const { tokenBalance, isLoading, update } = useTokenBalance(
    tab === 'Wrap' ? 'native' : '0x4300000000000000000000000000000000000004',
    18,
  );
  const { loading, onWrapOrUnwrap } = useWrapAndUnwrap(
    tab,
    value,
    () => {
      update();
    },
    (tips: string) => {
      setErrorTips(tips);
    },
  );

  useEffect(() => {
    if (Big(value || 0).eq(0)) {
      setErrorTips('Enter Amount');
      return;
    }

    if (tokenBalance && Big(tokenBalance).lt(value)) {
      setErrorTips('Insufficient Balance');
      return;
    }
    setErrorTips('');
  }, [value, tokenBalance]);

  return (
    <Modal
      display={open}
      showHeader={false}
      width={420}
      onClose={onClose}
      content={
        <>
          <StyledHeader>
            {TABS.map((_tab: string) => (
              <StyledTab
                key={_tab}
                $active={tab === _tab}
                onClick={() => {
                  setTab(_tab);
                  setValue('');
                }}
              >
                {_tab}
              </StyledTab>
            ))}
            <StyledCloseIcon>
              <CloseIcon onClose={onClose} />
            </StyledCloseIcon>
          </StyledHeader>
          <StyledContent>
            <Input tab={tab} loading={isLoading} balance={tokenBalance} value={value} setValue={setValue} />
            <Button text={tab} errorTips={errorTips} loading={loading} onClick={onWrapOrUnwrap} />
          </StyledContent>
        </>
      }
    />
  );
};

export default memo(WrapAndUnwrap);
