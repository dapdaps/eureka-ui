import { motion } from 'framer-motion';
import { memo } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  width: 140px;
  height: 32px;
  border-radius: 10px;
  border: 1px solid #373a53;
  display: flex;
  align-items: center;
  padding: 0px 4px;
`;

export const StyledTabWrap = styled.div`
  flex-grow: 1;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  position: relative;
`;

export const StyledTab = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: ${({ $active }) => ($active ? '#fff' : '#7C7F96')};
  height: 24px;
  position: relative;
  z-index: 10;
`;

export const StyledTabActiveBg = styled.div`
  position: absolute;
  border-radius: 8px;
  height: 24px;
  background: #373a53;
  width: 100%;
  top: -24px;
  left: 0px;
`;

const TABS = ['Default', 'Summary'];

const Type = ({ current, onChange }: any) => {
  return (
    <StyledContainer>
      {TABS.map((tab, i) => (
        <StyledTabWrap
          onClick={() => {
            onChange(tab);
          }}
          key={tab}
        >
          <StyledTab $active={current === tab}>{tab}</StyledTab>
          {current === tab && (
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: {
                  x: i === 0 ? '50%' : '-50%',
                },
                show: {
                  x: '0%',
                  transition: {
                    staggerChildren: 0.5,
                  },
                },
              }}
            >
              <StyledTabActiveBg />
            </motion.div>
          )}
        </StyledTabWrap>
      ))}
    </StyledContainer>
  );
};

export default memo(Type);
