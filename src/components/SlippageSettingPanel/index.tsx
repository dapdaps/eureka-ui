import { AnimatePresence } from 'framer-motion';
import { memo, useEffect, useState } from 'react';

import { container, overlay } from '@/components/animation';
import { useSettingsStore } from '@/stores/settings';

import {
  Input,
  Inputs,
  InputWrapper,
  MaskLayer,
  SlippageAction,
  SlippageActions,
  StyledContainer,
  StyledContent
} from './styles';

const TYPES = ['Auto', 'Custom'];

const Setting = ({ show, setShow, panelStyle }: any) => {
  const settingStore: any = useSettingsStore();
  const [type, setType] = useState(settingStore.getSlippage() ? 'Custom' : 'Auto');
  useEffect(() => {
    if (!show && !settingStore.getSlippage()) {
      settingStore.setSlippage(0.5);
    }
  }, [show]);
  return (
    <AnimatePresence mode="wait">
      {show && (
        <>
          <MaskLayer onClick={() => setShow(false)} {...overlay} />
          <StyledContainer {...container} style={panelStyle}>
            <StyledContent>
              <div>Slippage Setting</div>
              <Inputs>
                <SlippageActions>
                  {TYPES.map((_type) => (
                    <SlippageAction
                      key={_type}
                      className={_type === type ? 'active' : ''}
                      onClick={() => {
                        setType(_type);
                        settingStore.setSlippage(_type === 'Auto' ? '' : '0.5');
                      }}
                    >
                      {_type}
                    </SlippageAction>
                  ))}
                </SlippageActions>
                <InputWrapper>
                  <Input
                    placeholder="0.5"
                    value={settingStore.getSlippage()}
                    onChange={(ev) => {
                      settingStore.setSlippage(Number(ev.target.value));
                      setType(Number(ev.target.value) !== 0.5 ? 'Custom' : 'Auto');
                    }}
                    type="number"
                    onWheel={(e) => (e.target as HTMLInputElement).blur()}
                  />
                  <div>%</div>
                </InputWrapper>
              </Inputs>
            </StyledContent>
          </StyledContainer>
        </>
      )}
    </AnimatePresence>
  );
};

export default memo(Setting);
