import { motion } from 'framer-motion';
import Image from 'next/image';
import styled from 'styled-components';

import { StatusType } from '@/views/Odyssey/components/Tag';

export const StyledContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 6px;
  margin-top: 20px;
  padding-right: 0;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const StyledBadge = styled(motion.div)<{ $status?: StatusType }>`
  height: 32px;
  flex-shrink: 0;
  border-radius: 34px;
  background: #21222b;
  padding: 0 14px 0 11px;
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  position: relative;
  opacity: ${({ $status }) => ($status ? ($status === StatusType.ongoing ? 1 : 0.5) : 1)};

  &.group {
    padding-left: 8px;
    padding-right: 10px;
    gap: 0;

    > img {
      border: 2px solid #292b33;
      border-radius: 50%;
      &:not(:first-child) {
        margin-left: -6px;
      }
    }
  }

  .dapp-card-odyssey-tooltip {
    z-index: 2;
    width: auto;
  }
`;
export const StyledBadgeItem = styled(motion.div)`
  position: relative;
  margin-left: -6px;

  &:first-child {
    margin-left: 0;
  }

  .dapp-card-odyssey-tooltip {
    z-index: 2;
    width: auto;
  }
`;
export const StyledBadgeImage = styled(motion(Image))`
  /* border-radius: 50%; */
  /* border: 2px solid #292B33; */
  position: relative;
`;
export const StyledBadgeTooltip = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 14px;
  gap: 20px;
  height: 215px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px solid #464b56;
  background: #21232a;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.25);
`;
