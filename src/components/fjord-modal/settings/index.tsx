import { useEffect, useRef } from 'react';
import { type FC, useState } from 'react';
import styled from 'styled-components';

import Tabs from '../setting-tabs';
const Wrap = styled.span`
  cursor: pointer;
  path {
    fill: #979abe;
  }
  &:hover {
    path {
      fill: #fff;
    }
  }
`;
const SettingModal = styled.div`
  position: absolute;
  right: 0;
  width: 333px;
  height: 131px;
  padding: 23px 26px;
  border-radius: 16px;
  border: 1px solid #373a53;
  background: #262836;
  box-shadow: 10px 10px 20px 0px rgba(0, 0, 0, 0.25);
`;
const Title = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 23px;
`;
const Content = styled.div`
  display: flex;
  gap: 10px;
`;
const AmountInput = styled.input`
  width: 103px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #373a53;
  background: #1b1e27;
  color: #fff;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 0 24px 0 12px;
  &::placeholder {
    color: rgba(151, 154, 190, 1);
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;
const Suffix = styled.span`
  position: absolute;
  top: 12px;
  right: 12px;
  color: #fff;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const InputGroup = styled.div`
  position: relative;
`;

interface IProps {
  style?: any;
  amount: string;
  onAmountChange: (v: string) => void;
}

const Settings: FC<IProps> = ({ style, amount, onAmountChange }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [currentTab, setCurrentTab] = useState('AUTO');
  const tabData = [
    {
      name: 'Auto',
      key: 'AUTO',
    },
    {
      name: 'Custom',
      key: 'CUSTOM',
    },
  ];

  const onTabsChange = (key: string) => {
    if (key === 'AUTO') {
      onAmountChange('0.25')
    }
    setCurrentTab(key);
  };
  const ref = useRef<any>();
  const toggleRef = useRef<any>();

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current?.contains(event.target) && !toggleRef.current.contains(event.target)) {
      setShowSettings(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <Wrap style={style}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="18"
        viewBox="0 0 16 18"
        fill="none"
        ref={toggleRef}
        onClick={() => setShowSettings(!showSettings)}
      >
        <path
          d="M7.17184 0.222355C7.42364 0.0766877 7.70926 0 8 0C8.29074 0 8.57637 0.0766877 8.82816 0.222355L15.1718 3.89274C15.4236 4.03841 15.6327 4.24792 15.7781 4.50021C15.9235 4.75251 16 5.0387 16 5.33003V12.67C16 12.9613 15.9235 13.2475 15.7781 13.4998C15.6327 13.7521 15.4236 13.9616 15.1718 14.1073L8.82816 17.7776C8.57637 17.9233 8.29074 18 8 18C7.70926 18 7.42364 17.9233 7.17184 17.7776L0.828158 14.1073C0.576372 13.9616 0.367286 13.7521 0.221915 13.4998C0.0765431 13.2475 7.38473e-06 12.9613 0 12.67V5.33003C7.38473e-06 5.0387 0.0765431 4.75251 0.221915 4.50021C0.367286 4.24792 0.576372 4.03841 0.828158 3.89274L7.17184 0.222355ZM8 1.65964L1.65632 5.33003V12.67L8 16.3404L14.3437 12.67V5.33003L8 1.65964ZM8 5.68064C8.87856 5.68064 9.72115 6.03035 10.3424 6.65286C10.9636 7.27536 11.3126 8.11965 11.3126 9C11.3126 9.88035 10.9636 10.7246 10.3424 11.3471C9.72115 11.9696 8.87856 12.3194 8 12.3194C7.12144 12.3194 6.27886 11.9696 5.65762 11.3471C5.03638 10.7246 4.68737 9.88035 4.68737 9C4.68737 8.11965 5.03638 7.27536 5.65762 6.65286C6.27886 6.03035 7.12144 5.68064 8 5.68064ZM8 7.34032C7.78249 7.34032 7.56711 7.38325 7.36616 7.46665C7.1652 7.55006 6.98261 7.67231 6.82881 7.82643C6.67501 7.98054 6.553 8.16351 6.46977 8.36487C6.38653 8.56623 6.34369 8.78205 6.34369 9C6.34369 9.21795 6.38653 9.43377 6.46977 9.63513C6.553 9.8365 6.67501 10.0195 6.82881 10.1736C6.98261 10.3277 7.1652 10.4499 7.36616 10.5333C7.56711 10.6168 7.78249 10.6597 8 10.6597C8.43928 10.6597 8.86057 10.4848 9.17119 10.1736C9.48181 9.86232 9.65632 9.44018 9.65632 9C9.65632 8.55983 9.48181 8.13768 9.17119 7.82643C8.86057 7.51518 8.43928 7.34032 8 7.34032Z"
          // fill=""
        />
      </svg>
      {showSettings && (
        <div ref={ref}>
          <SettingModal>
            <Title>Mas Slippage Setting</Title>
            <Content>
              <Tabs tabData={tabData} current={currentTab} onTabsChange={onTabsChange}></Tabs>
              <InputGroup>
                <AmountInput type='number' disabled={currentTab === 'AUTO'} value={amount} onChange={(e) => {
                  const value = e.target.value
                  if (value === '') {
                    onAmountChange && onAmountChange(e.target.value)
                    return
                  }

                  onAmountChange && onAmountChange(e.target.value)
                }}/>
                <Suffix>%</Suffix>
              </InputGroup>
            </Content>
          </SettingModal>
        </div>
      )}
    </Wrap>
  );
};

export default Settings;
