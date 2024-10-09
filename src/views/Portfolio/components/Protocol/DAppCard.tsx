import { motion } from 'framer-motion';
import { styled } from 'styled-components';

import { formateValueWithThousandSeparatorAndFont } from '@/utils/formate';
import DAppIconWithChain from '@/views/Portfolio/components/Protocol/DAppIconWithChain';

export const StyledContainer = styled(motion.div)`
  min-width: 158px;
  height: 60px;
  flex-shrink: 0;
  flex-grow: 0;
  border-radius: 8px;
  border: 1px solid #282a3c;
  background: #1b1d25;
  color: #fff;
  font-size: 14px;
  line-height: 17px;
  font-style: normal;
  font-weight: 500;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  padding: 10px;
  transition: all 0.3s linear;
  cursor: pointer;

  &:hover {
    background: #262836;
  }

  .usd {
    font-size: 16px;
    line-height: 20px;
    font-style: normal;
    font-weight: 500;
    margin-top: 3px;
  }
`;

export const StyledContent = styled.div`
  white-space: nowrap;
`;

const DAppCard = (props: any) => {
  const { dapp, onClick = () => {} } = props;

  return (
    <StyledContainer
      variants={{
        visible: {
          opacity: 1,
          x: 0
        },
        hidden: {
          opacity: 0,
          x: 10
        }
      }}
      initial="hidden"
      exit="hidden"
      animate="visible"
      onClick={onClick}
    >
      <DAppIconWithChain size={32} icon={dapp.dappLogo} chainIcon={dapp.chainLogo} />
      <StyledContent>
        <div className="name">
          {dapp.show_name} {dapp.version}
        </div>
        <div className="usd">{formateValueWithThousandSeparatorAndFont(dapp.totalUsd, 2, true, { prefix: '$' })}</div>
      </StyledContent>
    </StyledContainer>
  );
};

export default DAppCard;
