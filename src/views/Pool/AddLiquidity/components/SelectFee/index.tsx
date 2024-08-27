import { AnimatePresence } from 'framer-motion';
import { memo, useEffect, useState } from 'react';

import { FEES } from '@/config/pool';
import useDappConfig from '@/views/Pool/hooks/useDappConfig';

import FeeNoExsitHints from '../FeeNoExsitHints';
import {
  StyledContainer,
  StyledFee,
  StyledFeeDesc,
  StyledFees,
  StyledFeeTitle,
  StyledHeader,
  StyledHeaderLeft,
  StyledSelectedFee,
  StyledToggleButton,
} from './styles';

const SelectFee = ({ fee, disabled, onSelectFee }: any) => {
  const [show, setShow] = useState(!fee);
  const { fees } = useDappConfig();

  useEffect(() => {
    setShow(!fee);
  }, [fee]);
  return (
    <StyledContainer>
      <StyledHeader>
        <StyledHeaderLeft $empty={false}>
          <div>{disabled || !fee ? 'The % you will earn in fees.' : `${fee / 10 ** 4}% fee tier`}</div>
          {/* <StyledSelectedFee>67% select</StyledSelectedFee> */}
        </StyledHeaderLeft>
        <StyledToggleButton
          onClick={() => {
            setShow((prev) => !prev);
          }}
        >
          {show ? 'Hide' : 'Show'}
        </StyledToggleButton>
      </StyledHeader>
      <AnimatePresence initial={false}>
        {show && (
          <StyledFees
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.3 }}
          >
            {fees.map((item: any, i: number) => (
              <StyledFee
                key={item}
                $active={item === fee}
                onClick={() => {
                  if (!disabled) onSelectFee(item);
                }}
                style={{ cursor: !disabled ? 'pointer' : 'not-allowed' }}
              >
                <StyledFeeTitle>
                  <span>{item / 10 ** 4} %</span>
                  {item === fee && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      style={{ color: 'var(--border-color)' }}
                    >
                      <circle cx="10" cy="10" r="10" fill="currentColor" />
                      <path
                        d="M6 9.5L9 12.5L14.5 7"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </StyledFeeTitle>
                <StyledFeeDesc>{FEES[item].desc}</StyledFeeDesc>
              </StyledFee>
            ))}
          </StyledFees>
        )}
      </AnimatePresence>
      {!fee && <FeeNoExsitHints />}
    </StyledContainer>
  );
};

export default memo(SelectFee);
